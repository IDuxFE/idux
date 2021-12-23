/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import type { InputModalityDetector } from './inputModalityDetector'
import type { ComponentPublicInstance, ComputedRef, InjectionKey, Ref, WatchStopHandle } from 'vue'

import { computed, inject, onScopeDispose, shallowRef, watchEffect } from 'vue'

import { _getEventTarget, _getShadowRoot, isBrowser, normalizePassiveListenerOptions } from '@idux/cdk/platform'
import { convertElement, createSharedComposable } from '@idux/cdk/utils'

import { TOUCH_BUFFER_MS, useSharedInputModalityDetector } from './inputModalityDetector'

export type FocusOrigin = 'touch' | 'mouse' | 'keyboard' | 'program' | null

/**
 * Corresponds to the options that can be passed to the native `focus` event.
 * via https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus
 */
export interface FocusOptions {
  /** Whether the browser should scroll to the element when it is focused. */
  preventScroll?: boolean
}

/**
 * Detection mode used for attributing the origin of a focus event.
 *
 * **immediate**: Any mousedown, keydown, or touchstart event that happened in the previous tick
 *  or the current tick will be used to assign a focus event's origin (to either mouse, keyboard, or touch).
 *  This is the default option.
 *
 * **eventual**: A focus event's origin is always attributed to the last corresponding
 *  mousedown, keydown, or touchstart event, no matter how long ago it occurred.
 */
export type FocusMonitorDetectionMode = 'immediate' | 'eventual'

/** Injectable service-level options for FocusMonitor. */
export interface FocusMonitorOptions {
  detectionMode?: FocusMonitorDetectionMode
  inputModalityDetector?: InputModalityDetector
}

/** InjectionToken for FocusMonitorOptions. */
export const FOCUS_MONITOR_OPTIONS_TOKEN: InjectionKey<FocusMonitorOptions> = Symbol('cdk-focus-monitor-options')

export const FOCUS_MONITOR_DEFAULT_OPTIONS: FocusMonitorOptions = {
  detectionMode: 'immediate',
}

type MonitoredElementInfo = {
  checkChildren: boolean
  subject: Ref<FocusMonitorEvent>
  rootNode: HTMLElement | ShadowRoot | Document
}

type ElementType =
  | Ref<ComponentPublicInstance | HTMLElement | null | undefined>
  | ComponentPublicInstance
  | HTMLElement
  | null
  | undefined

/**
 * Event listener options that enable capturing and also
 * mark the listener as passive if the browser supports it.
 */
const captureEventListenerOptions = normalizePassiveListenerOptions({
  passive: true,
  capture: true,
})

export interface FocusMonitorEvent {
  /**
   * Focus origin.
   *
   * **mouse**: indicates the element was focused with the mouse
   * **keyboard**: indicates the element was focused with the keyboard
   * **touch**: indicates the element was focused by touching on a touchscreen
   * **program**:  indicates the element was focused programmatically
   * **null**: indicates the element was blurred
   */
  origin: FocusOrigin

  /**
   * Focus event, which may be 'undefined' if the focus is triggered by 'focusVia'.
   */
  event?: FocusEvent
}

export interface FocusMonitor {
  /**
   * Monitors focus on an element and applies appropriate CSS classes.
   *
   * @param element The element to monitor
   * @param checkChildren Whether to count the element as focused when its children are focused.
   * @returns An observable that emits when the focus state of the element changes.
   *     When the element is blurred, null will be emitted.
   */
  monitor(element: ElementType, checkChildren?: boolean): ComputedRef<FocusMonitorEvent>

  /**
   * Stops monitoring an element and removes all focus classes.
   *
   * @param element The element to stop monitoring.
   */
  stopMonitoring(element: ElementType): void

  /**
   * Focuses the element via the specified focus origin.
   *
   * @param element Element to focus.
   * @param origin Focus origin.
   * @param options Options that can be used to configure the focus behavior.
   */
  focusVia(element: ElementType, origin: FocusOrigin, options?: FocusOptions): void

  /**
   * Blur the element.
   *
   * @param element Element to blur.
   */
  blurVia: (element: ElementType) => void
}

/** Monitors mouse and keyboard events to determine the cause of focus events. */
export function useFocusMonitor(options?: FocusMonitorOptions): FocusMonitor {
  const contextOptions = inject(FOCUS_MONITOR_OPTIONS_TOKEN, FOCUS_MONITOR_DEFAULT_OPTIONS)

  /** Options for this InputModalityDetector. */
  const _options = { ...contextOptions, ...options }
  const _detectionMode = _options.detectionMode
  const _inputModalityDetector = _options.inputModalityDetector ?? useSharedInputModalityDetector()

  /** The focus origin that the next focus event is a result of. */
  let _origin: FocusOrigin = null

  /** The FocusOrigin of the last focus event tracked by the FocusMonitor. */
  let _lastFocusOrigin: FocusOrigin

  /** Whether the window has just been focused. */
  let _windowFocused = false

  /** The timeout id of the window focus timeout. */
  let _windowFocusTimeoutId: number

  /** The timeout id of the origin clearing timeout. */
  let _originTimeoutId: number

  /**
   * Whether the origin was determined via a touch interaction. Necessary as properly attributing
   * focus events to touch interactions requires special logic.
   */
  let _originFromTouchInteraction = false

  /** Map of elements being monitored to their info. */
  const _elementInfo = new Map<HTMLElement, MonitoredElementInfo>()

  /** The number of elements currently being monitored. */
  let _monitoredElementCount = 0

  /**
   * Keeps track of the root nodes to which we've currently bound a focus/blur handler,
   * as well as the number of monitored elements that they contain. We have to treat focus/blur
   * handlers differently from the rest of the events, because the browser won't emit events
   * to the document when focus moves inside of a shadow root.
   */
  const _rootNodeFocusListenerCount = new Map<HTMLElement | Document | ShadowRoot, number>()

  /**
   * Event listener for `focus` events on the window.
   * Needs to be an arrow function in order to preserve the context when it gets bound.
   */
  const _windowFocusListener = () => {
    // Make a note of when the window regains focus, so we can
    // restore the origin info for the focused element.
    _windowFocused = true
    _windowFocusTimeoutId = setTimeout(() => (_windowFocused = false))
  }

  /** Subject for stopping our InputModalityDetector subscription. */
  let _stopInputModalityDetector: WatchStopHandle | null = null

  /**
   * Event listener for `focus` and 'blur' events on the document.
   * Needs to be an arrow function in order to preserve the context when it gets bound.
   */
  const _rootNodeFocusAndBlurListener = (event: Event) => {
    const target = _getEventTarget<HTMLElement>(event)
    const handler = event.type === 'focus' ? _onFocus : _onBlur

    // We need to walk up the ancestor chain in order to support `checkChildren`.
    for (let element = target; element; element = element.parentElement) {
      handler(event as FocusEvent, element)
    }
  }

  /**
   * Monitors focus on an element and applies appropriate CSS classes.
   *
   * @param element The element to monitor
   * @param checkChildren Whether to count the element as focused when its children are focused.
   * @returns An observable that emits when the focus state of the element changes.
   *     When the element is blurred, null will be emitted.
   */
  function monitor(element: ElementType, checkChildren = false): ComputedRef<FocusMonitorEvent> {
    const nativeElement = convertElement(element)

    // Do nothing if we're not on the browser platform or the passed in node isn't an element.
    if (!isBrowser || !nativeElement || nativeElement.nodeType !== 1) {
      return computed(() => ({ origin: null }))
    }

    // If the element is inside the shadow DOM, we need to bind our focus/blur listeners to
    // the shadow root, rather than the `document`, because the browser won't emit focus events
    // to the `document`, if focus is moving within the same shadow root.
    const rootNode = _getShadowRoot(nativeElement) || _getDocument()
    const cachedInfo = _elementInfo.get(nativeElement)

    // Check if we're already monitoring this element.
    if (cachedInfo) {
      if (checkChildren) {
        // TODO(COMP-318): this can be problematic, because it'll turn all non-checkChildren
        // observers into ones that behave as if `checkChildren` was turned on. We need a more
        // robust solution.
        cachedInfo.checkChildren = true
      }

      return computed(() => cachedInfo.subject.value)
    }

    // Create monitored element info.
    const info: MonitoredElementInfo = {
      checkChildren: checkChildren,
      subject: shallowRef<FocusMonitorEvent>({ origin: null }),
      rootNode,
    }

    _elementInfo.set(nativeElement, info)
    _registerGlobalListeners(info)

    return computed(() => info.subject.value)
  }

  /**
   * Stops monitoring an element and removes all focus classes.
   *
   * @param element The element to stop monitoring.
   */
  function stopMonitoring(element: ElementType): void {
    const nativeElement = convertElement(element)
    if (!nativeElement) {
      return
    }
    const elementInfo = _elementInfo.get(nativeElement)

    if (elementInfo) {
      _setClasses(nativeElement)
      _elementInfo.delete(nativeElement)
      _removeGlobalListeners(elementInfo)
    }
  }

  /**
   * Focuses the element via the specified focus origin.
   *
   * @param element Element to focus.
   * @param origin Focus origin.
   * @param options Options that can be used to configure the focus behavior.
   */
  function focusVia(element: ElementType, origin: FocusOrigin, options?: FocusOptions): void {
    const nativeElement = convertElement(element)
    const focusedElement = _getDocument().activeElement

    // If the element is focused already, calling `focus` again won't trigger the event listener
    // which means that the focus classes won't be updated. If that's the case, update the classes
    // directly without waiting for an event.
    if (nativeElement === focusedElement) {
      _getClosestElementsInfo(nativeElement).forEach(([currentElement, info]) =>
        _originChanged(currentElement, origin, info),
      )
    } else {
      _setOrigin(origin)

      // `focus` isn't available on the server
      if (nativeElement && typeof nativeElement.focus === 'function') {
        nativeElement.focus(options)
      }
    }
  }

  /**
   * Blur the element.
   *
   * @param element Element to blur.
   */
  function blurVia(element: ElementType): void {
    const nativeElement = convertElement(element)
    if (!nativeElement) {
      return
    }

    const focusedElement = _getDocument().activeElement
    // If the element is focused already, calling `focus` again won't trigger the event listener
    // which means that the focus classes won't be updated. If that's the case, update the classes
    // directly without waiting for an event.
    if (nativeElement === focusedElement && typeof nativeElement.blur === 'function') {
      nativeElement.blur()
    }
  }

  /** Access injected document if available or fallback to global document reference */
  function _getDocument(): Document {
    return document
  }

  /** Use defaultView of injected document if available or fallback to global window reference */
  function _getWindow(): Window {
    const doc = _getDocument()
    return doc.defaultView || window
  }

  function _toggleClass(element: Element, className: string, shouldSet: boolean) {
    if (shouldSet) {
      element.classList.add(className)
    } else {
      element.classList.remove(className)
    }
  }

  function _getFocusOrigin(focusEventTarget: HTMLElement | null): FocusOrigin {
    if (_origin) {
      // If the origin was realized via a touch interaction, we need to perform additional checks
      // to determine whether the focus origin should be attributed to touch or program.
      if (_originFromTouchInteraction) {
        return _shouldBeAttributedToTouch(focusEventTarget) ? 'touch' : 'program'
      } else {
        return _origin
      }
    }

    // If the window has just regained focus, we can restore the most recent origin from before the
    // window blurred. Otherwise, we've reached the point where we can't identify the source of the
    // focus. This typically means one of two things happened:
    //
    // 1) The element was programmatically focused, or
    // 2) The element was focused via screen reader navigation (which generally doesn't fire
    //    events).
    //
    // Because we can't distinguish between these two cases, we default to setting `program`.
    return _windowFocused && _lastFocusOrigin ? _lastFocusOrigin : 'program'
  }

  /**
   * Returns whether the focus event should be attributed to touch. Recall that in IMMEDIATE mode, a
   * touch origin isn't immediately reset at the next tick (see _setOrigin). This means that when we
   * handle a focus event following a touch interaction, we need to determine whether (1) the focus
   * event was directly caused by the touch interaction or (2) the focus event was caused by a
   * subsequent programmatic focus call triggered by the touch interaction.
   *
   * @param focusEventTarget The target of the focus event under examination.
   */
  function _shouldBeAttributedToTouch(focusEventTarget: HTMLElement | null): boolean {
    // Please note that this check is not perfect. Consider the following edge case:
    //
    // <div #parent tabindex="0">
    //   <div #child tabindex="0" (click)="#parent.focus()"></div>
    // </div>
    //
    // Suppose there is a FocusMonitor in IMMEDIATE mode attached to #parent. When the user touches
    // #child, #parent is programmatically focused. This code will attribute the focus to touch
    // instead of program. This is a relatively minor edge-case that can be worked around by using
    // focusVia(parent, 'program') to focus #parent.
    return _detectionMode === 'eventual' || !!focusEventTarget?.contains(_inputModalityDetector.target.value)
  }

  /**
   * Sets the focus classes on the element based on the given focus origin.
   *
   * @param element The element to update the classes on.
   * @param origin The focus origin.
   */
  function _setClasses(element: HTMLElement, origin?: FocusOrigin): void {
    _toggleClass(element, 'cdk-focused', !!origin)
    _toggleClass(element, 'cdk-touch-focused', origin === 'touch')
    _toggleClass(element, 'cdk-keyboard-focused', origin === 'keyboard')
    _toggleClass(element, 'cdk-mouse-focused', origin === 'mouse')
    _toggleClass(element, 'cdk-program-focused', origin === 'program')
  }

  /**
   * Updates the focus origin. If we're using immediate detection mode, we schedule an async
   * function to clear the origin at the end of a timeout. The duration of the timeout depends on
   * the origin being set.
   *
   * @param origin The origin to set.
   * @param isFromInteraction Whether we are setting the origin from an interaction event.
   */
  function _setOrigin(origin: FocusOrigin, isFromInteraction = false): void {
    _origin = origin
    _originFromTouchInteraction = origin === 'touch' && isFromInteraction

    // If we're in IMMEDIATE mode, reset the origin at the next tick (or in `TOUCH_BUFFER_MS` ms
    // for a touch event). We reset the origin at the next tick because Firefox focuses one tick
    // after the interaction event. We wait `TOUCH_BUFFER_MS` ms before resetting the origin for
    // a touch event because when a touch event is fired, the associated focus event isn't yet in
    // the event queue. Before doing so, clear any pending timeouts.
    if (_detectionMode === 'immediate') {
      clearTimeout(_originTimeoutId)
      const ms = _originFromTouchInteraction ? TOUCH_BUFFER_MS : 1
      _originTimeoutId = setTimeout(() => (_origin = null), ms)
    }
  }

  /**
   * Handles focus events on a registered element.
   *
   * @param event The focus event.
   * @param element The monitored element.
   */
  function _onFocus(event: FocusEvent, element: HTMLElement) {
    // NOTE(mmalerba): We currently set the classes based on the focus origin of the most recent
    // focus event affecting the monitored element. If we want to use the origin of the first event
    // instead we should check for the cdk-focused class here and return if the element already has
    // it. (This only matters for elements that have includesChildren = true).

    // If we are not counting child-element-focus as focused, make sure that the event target is the
    // monitored element itself.
    const elementInfo = _elementInfo.get(element)
    const focusEventTarget = _getEventTarget<HTMLElement>(event)
    if (!elementInfo || (!elementInfo.checkChildren && element !== focusEventTarget)) {
      return
    }

    _originChanged(element, _getFocusOrigin(focusEventTarget), elementInfo, event)
  }

  /**
   * Handles blur events on a registered element.
   *
   * @param event The blur event.
   * @param element The monitored element.
   */
  function _onBlur(event: FocusEvent, element: HTMLElement) {
    // If we are counting child-element-focus as focused, make sure that we aren't just blurring in
    // order to focus another child of the monitored element.
    const elementInfo = _elementInfo.get(element)

    if (
      !elementInfo ||
      (elementInfo.checkChildren && event.relatedTarget instanceof Node && element.contains(event.relatedTarget))
    ) {
      return
    }

    _setClasses(element)
    _emitOrigin(elementInfo.subject, null, event)
  }

  function _emitOrigin(subject: Ref<FocusMonitorEvent>, origin: FocusOrigin, event?: FocusEvent) {
    subject.value = { origin, event }
  }

  function _registerGlobalListeners(elementInfo: MonitoredElementInfo) {
    if (!isBrowser) {
      return
    }

    const rootNode = elementInfo.rootNode
    const rootNodeFocusListeners = _rootNodeFocusListenerCount.get(rootNode) || 0

    if (!rootNodeFocusListeners) {
      rootNode.addEventListener('focus', _rootNodeFocusAndBlurListener, captureEventListenerOptions)
      rootNode.addEventListener('blur', _rootNodeFocusAndBlurListener, captureEventListenerOptions)
    }

    _rootNodeFocusListenerCount.set(rootNode, rootNodeFocusListeners + 1)

    // Register global listeners when first element is monitored.
    if (++_monitoredElementCount === 1) {
      // Note: we listen to events in the capture phase so we
      // can detect them even if the user stops propagation.

      const window = _getWindow()
      window.addEventListener('focus', _windowFocusListener)

      // The InputModalityDetector is also just a collection of global listeners.
      _stopInputModalityDetector = watchEffect(() => {
        _setOrigin(_inputModalityDetector.modalityDetected.value, true /* isFromInteraction */)
      })
    }
  }

  function _removeGlobalListeners(elementInfo: MonitoredElementInfo) {
    const rootNode = elementInfo.rootNode

    if (_rootNodeFocusListenerCount.has(rootNode)) {
      const rootNodeFocusListeners = _rootNodeFocusListenerCount.get(rootNode)!

      if (rootNodeFocusListeners > 1) {
        _rootNodeFocusListenerCount.set(rootNode, rootNodeFocusListeners - 1)
      } else {
        rootNode.removeEventListener('focus', _rootNodeFocusAndBlurListener, captureEventListenerOptions)
        rootNode.removeEventListener('blur', _rootNodeFocusAndBlurListener, captureEventListenerOptions)
        _rootNodeFocusListenerCount.delete(rootNode)
      }
    }

    // Unregister global listeners when last element is unmonitored.
    if (!--_monitoredElementCount) {
      const window = _getWindow()
      window.removeEventListener('focus', _windowFocusListener)

      // Equivalently, stop our InputModalityDetector subscription.
      if (_stopInputModalityDetector) {
        _stopInputModalityDetector()
        _stopInputModalityDetector = null
      }

      // Clear timeouts for all potentially pending timeouts to prevent the leaks.
      clearTimeout(_windowFocusTimeoutId)
      clearTimeout(_originTimeoutId)
    }
  }

  /** Updates all the state on an element once its focus origin has changed. */
  function _originChanged(
    element: HTMLElement,
    origin: FocusOrigin,
    elementInfo: MonitoredElementInfo,
    event?: FocusEvent,
  ) {
    _setClasses(element, origin)
    _emitOrigin(elementInfo.subject, origin, event)
    _lastFocusOrigin = origin
  }

  /**
   * Collects the `MonitoredElementInfo` of a particular element and
   * all of its ancestors that have enabled `checkChildren`.
   *
   * @param element Element from which to start the search.
   */
  function _getClosestElementsInfo(element: HTMLElement): [HTMLElement, MonitoredElementInfo][] {
    const results: [HTMLElement, MonitoredElementInfo][] = []

    _elementInfo.forEach((info, currentElement) => {
      if (currentElement === element || (info.checkChildren && currentElement.contains(element))) {
        results.push([currentElement, info])
      }
    })

    return results
  }

  onScopeDispose(() => _elementInfo.forEach((_info, element) => stopMonitoring(element)))

  return { monitor, stopMonitoring, focusVia, blurVia }
}

export const useSharedFocusMonitor = createSharedComposable(() => useFocusMonitor())
