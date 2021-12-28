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

import type { InjectionKey, Ref } from 'vue'

import { customRef, inject, onScopeDispose, ref } from 'vue'

import { _getEventTarget, isBrowser, normalizePassiveListenerOptions } from '@idux/cdk/platform'
import { createSharedComposable } from '@idux/cdk/utils'

import { isFakeMousedownFromScreenReader, isFakeTouchstartFromScreenReader } from './fakeEventDetection'

/**
 * The input modalities detected by this service. Null is used if the input modality is unknown.
 */
export type InputModality = 'keyboard' | 'mouse' | 'touch' | null

/** Options to configure the behavior of the InputModalityDetector. */
export interface InputModalityDetectorOptions {
  /** Codes to ignore when detecting keyboard input modality. */
  ignoreCodes?: string[]
}

/**
 * Injectable options for the InputModalityDetector. These are shallowly merged with the default
 * options.
 */
export const INPUT_MODALITY_DETECTOR_OPTIONS_TOKEN: InjectionKey<InputModalityDetectorOptions> = Symbol(
  'cdk-input-modality-detector-options',
)

/**
 * Default options for the InputModalityDetector.
 *
 * Modifier keys are ignored by default (i.e. when pressed won't cause the service to detect
 * keyboard input modality) for two reasons:
 *
 * 1. Modifier keys are commonly used with mouse to perform actions such as 'right click' or 'open
 *    in new tab', and are thus less representative of actual keyboard interaction.
 * 2. VoiceOver triggers some keyboard events when linearly navigating with Control + Option (but
 *    confusingly not with Caps Lock). Thus, to have parity with other screen readers, we ignore
 *    these keys so as to not update the input modality.
 *
 * Note that we do not by default ignore the right Meta key on Safari because it has the same key
 * code as the ContextMenu key on other browsers. When we switch to using event.key, we can
 * distinguish between the two.
 */
export const INPUT_MODALITY_DETECTOR_DEFAULT_OPTIONS: InputModalityDetectorOptions = {
  ignoreCodes: ['AltLeft', 'AltRight', 'ControlLeft', 'ControlRight', 'OSLeft', 'OSRight', 'ShiftLeft', 'ShiftRight'],
}

/**
 * The amount of time needed to pass after a touchstart event in order for a subsequent mousedown
 * event to be attributed as mouse and not touch.
 *
 * This is the value used by AngularJS Material. Through trial and error (on iPhone 6S) they found
 * that a value of around 650ms seems appropriate.
 */
export const TOUCH_BUFFER_MS = 650

/**
 * Event listener options that enable capturing and also mark the listener as passive if the browser
 * supports it.
 */
const modalityEventListenerOptions = normalizePassiveListenerOptions({
  passive: true,
  capture: true,
})

export interface InputModalityDetector {
  /** Emits when the input modality changes. */
  modality: Ref<InputModality>
  /** Emits whenever an input modality is detected. */
  modalityDetected: Ref<InputModality>
  /**
   * The most recently detected input modality event target. Is null if no input modality has been
   * detected or if the associated event target is null for some unknown reason.
   */
  target: Ref<HTMLElement | null>
}

/**
 * Service that detects the user's input modality.
 *
 * This service does not update the input modality when a user navigates with a screen reader
 * (e.g. linear navigation with VoiceOver, object navigation / browse mode with NVDA, virtual PC
 * cursor mode with JAWS). This is in part due to technical limitations (i.e. keyboard events do not
 * fire as expected in these modes) but is also arguably the correct behavior. Navigating with a
 * screen reader is akin to visually scanning a page, and should not be interpreted as actual user
 * input interaction.
 *
 * When a user is not navigating but *interacting* with a screen reader, this service attempts to
 * update the input modality to keyboard, but in general this service's behavior is largely
 * undefined.
 */
export function useInputModalityDetector(options?: InputModalityDetectorOptions): InputModalityDetector {
  const contextOptions = inject(INPUT_MODALITY_DETECTOR_OPTIONS_TOKEN, INPUT_MODALITY_DETECTOR_DEFAULT_OPTIONS)

  /** Options for this InputModalityDetector. */
  const _options = { ...contextOptions, ...options }

  /** The underlying BehaviorSubject that emits whenever an input modality is detected. */
  const _modality = ref<InputModality>(null)

  /** Emits whenever an input modality is detected. */
  const _modalityDetected = customRef<InputModality>((track, trigger) => {
    let value: InputModality = null
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        value = newValue
        trigger()
      },
    }
  })

  const changeModality = (value: InputModality) => {
    _modality.value = value
    _modalityDetected.value = value
  }

  /**
   * The most recently detected input modality event target. Is null if no input modality has been
   * detected or if the associated event target is null for some unknown reason.
   */
  const _target = ref<HTMLElement | null>(null)

  /**
   * The timestamp of the last touch input modality. Used to determine whether mousedown events
   * should be attributed to mouse or touch.
   */
  let _lastTouchMs = 0

  /**
   * Handles keydown events. Must be an arrow function in order to preserve the context when it gets
   * bound.
   */
  const _onKeydown = (event: KeyboardEvent) => {
    // If this is one of the keys we should ignore, then ignore it and don't update the input
    // modality to keyboard.
    if (_options.ignoreCodes?.some(code => code === event.code)) {
      return
    }

    changeModality('keyboard')
    _target.value = _getEventTarget<HTMLElement>(event)
  }

  /**
   * Handles mousedown events. Must be an arrow function in order to preserve the context when it
   * gets bound.
   */
  const _onMousedown = (event: MouseEvent) => {
    // Touches trigger both touch and mouse events, so we need to distinguish between mouse events
    // that were triggered via mouse vs touch. To do so, check if the mouse event occurs closely
    // after the previous touch event.
    if (Date.now() - _lastTouchMs < TOUCH_BUFFER_MS) {
      return
    }

    // Fake mousedown events are fired by some screen readers when controls are activated by the
    // screen reader. Attribute them to keyboard input modality.
    changeModality(isFakeMousedownFromScreenReader(event) ? 'keyboard' : 'mouse')
    _target.value = _getEventTarget(event)
  }

  /**
   * Handles touchstart events. Must be an arrow function in order to preserve the context when it
   * gets bound.
   */
  const _onTouchstart = (event: TouchEvent) => {
    // Same scenario as mentioned in _onMousedown, but on touch screen devices, fake touchstart
    // events are fired. Again, attribute to keyboard input modality.
    if (isFakeTouchstartFromScreenReader(event)) {
      changeModality('keyboard')
      return
    }

    // Store the timestamp of this touch event, as it's used to distinguish between mouse events
    // triggered via mouse vs touch.
    _lastTouchMs = Date.now()

    changeModality('touch')
    _target.value = _getEventTarget(event)
  }

  // If we're not in a browser, this service should do nothing, as there's no relevant input
  // modality to detect.
  if (isBrowser) {
    // Add the event listeners used to detect the user's input modality.
    document.addEventListener('keydown', _onKeydown, modalityEventListenerOptions)
    document.addEventListener('mousedown', _onMousedown, modalityEventListenerOptions)
    document.addEventListener('touchstart', _onTouchstart, modalityEventListenerOptions)
  }

  onScopeDispose(() => {
    if (isBrowser) {
      document.removeEventListener('keydown', _onKeydown, modalityEventListenerOptions)
      document.removeEventListener('mousedown', _onMousedown, modalityEventListenerOptions)
      document.removeEventListener('touchstart', _onTouchstart, modalityEventListenerOptions)
    }
  })

  return {
    modality: _modality,
    modalityDetected: _modalityDetected,
    target: _target,
  }
}

export const useSharedInputModalityDetector = createSharedComposable(() => useInputModalityDetector())
