import type { ComputedRef, Ref, WatchStopHandle } from 'vue'
import type {
  OverlayElement,
  OverlayInstance,
  OverlayOptions,
  OverlayPopperEvents,
  OverlayTrigger,
  OverlayTriggerEvents,
} from './types'

import { computed, getCurrentInstance, onUnmounted, reactive, ref, watch } from 'vue'
import domAlign from 'dom-align'
import throttle from 'lodash/throttle'
import { off, on } from '@idux/cdk/utils'

import { convertElement, useDefaultOptions, useDomAlignConfig, usePlacement } from './utils'

export const useOverlay = <TE extends OverlayElement = OverlayElement, OE extends OverlayElement = OverlayElement>(
  options: OverlayOptions = {},
): OverlayInstance<TE, OE> => {
  /** @private */
  const state = reactive<Required<OverlayOptions>>(useDefaultOptions(options))
  let triggerFocus = false
  let visibleTimer: number | null = null
  let visibilityWatchHandler: WatchStopHandle
  let placementWatchHandler: WatchStopHandle
  let skipEvent = true

  const triggerRef: Ref = ref<TE | null>(null)
  const overlayRef: Ref = ref<OE | null>(null)

  const visibility = computed(() => {
    return !state.disabled && state.visible
  })

  const placement = computed(() => state.placement)

  const triggerEvents: ComputedRef<OverlayTriggerEvents> = onTriggerEvents()

  const overlayEvents: OverlayPopperEvents = onOverlayEvents()

  function initialize(): void {
    const triggerElement = convertElement(triggerRef).value
    const overlayElement = convertElement(overlayRef).value
    if (!triggerElement || !overlayElement) {
      return
    }

    initOverlay(overlayElement, triggerElement)
  }

  function show(showDelay = state.showDelay): void {
    console.log(showDelay)
    toggle(true, showDelay)
  }

  function hide(hideDelay = state.hideDelay): void {
    toggle(false, hideDelay)
  }

  function update(options: Partial<OverlayOptions> = {}): void {
    for (const [key, value] of Object.entries(options)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state[key] = value
    }
  }

  function destroy(): void {
    visibilityWatchHandler()
    placementWatchHandler()
    off(document, 'scroll', globalScroll, true)
  }

  /**
   * @private
   * @param visible
   * @param delay
   */
  function toggle(visible: boolean, delay: number): void {
    const action = () => (state.visible = visible)
    if (!delay) {
      action()
    } else {
      visibleTimer = setTimeout(action, delay)
    }
  }

  /**
   * @private
   */
  function onOverlayEvents(): OverlayPopperEvents {
    const onMouseenter = () => {
      if (state.trigger === 'hover' && state.allowEnter) {
        if (visibleTimer) {
          clearTimeout(visibleTimer)
          visibleTimer = null
        }
      }
    }

    const onMouseleave = () => {
      if (state.trigger !== 'hover') {
        return
      }
      hide()
    }

    return { onMouseenter, onMouseleave }
  }

  /**
   * @private
   */
  function onTriggerEvents(): ComputedRef<OverlayTriggerEvents> {
    return computed(() => {
      const triggerEventsMap: Record<OverlayTrigger, Array<keyof OverlayTriggerEvents>> = {
        click: ['onClick'],
        focus: ['onFocus', 'onBlur'],
        hover: ['onMouseenter', 'onMouseleave'],
        contextmenu: ['onContextmenu'],
        manual: [],
      }

      return triggerEventsMap[state.trigger].reduce((obj, evt) => {
        obj[evt] = triggerEventsHandler
        return obj
      }, {} as OverlayTriggerEvents)
    })
  }

  /**
   * @private
   * @param event
   */
  function triggerEventsHandler(event: Event) {
    event.stopPropagation()
    switch (event.type) {
      case 'mouseenter':
        if (visibleTimer) {
          clearTimeout(visibleTimer)
          visibleTimer = null
        }
        show()
        break
      case 'mouseleave':
        hide()
        break
      case 'focus':
        triggerFocus = true
        show()
        break
      case 'blur':
        triggerFocus = false
        hide()
        break
      case 'click':
        if (triggerFocus) {
          triggerFocus = false
        } else {
          visibility.value && state.trigger === 'click' ? hide() : show()
        }
        break
      case 'contextmenu':
        event.preventDefault()
        show()
        break
    }
  }

  /**
   * @private
   * @param source
   * @param target
   */
  function initOverlay(source: HTMLElement, target: HTMLElement): void {
    domAlign(source, target, useDomAlignConfig(state))
  }

  /**
   * @private
   */
  function watchVisibility(): void {
    visibilityWatchHandler = watch(visibility, initialize, { flush: 'post' })
  }

  /**
   * @private
   */
  function watchScroll(): void {
    on(document, 'scroll', globalScroll, true)
  }

  /**
   * @private
   */
  const globalScroll = throttle((event: Event) => {
    if (skipEvent) {
      skipEvent = false
      return
    }
    if (!visibility.value) {
      return
    }
    if (!state.autoAdjust) {
      return
    }
    if (state.scrollStrategy === 'none') {
      return
    } else if (state.scrollStrategy === 'close') {
      // todo prevent first event
      hide(0)
    } else {
      const triggerElement = convertElement(triggerRef).value
      const overlayElement = convertElement(overlayRef).value
      const placement = usePlacement(
        overlayElement,
        triggerElement,
        event.target === document ? (event.target as Document).scrollingElement : (event.target as HTMLElement),
        state.placement,
      )
      if (placement === state.placement) {
        return
      }
      state.placement = placement
    }
  }, 100)

  /**
   * @private
   */
  function watchPlacement() {
    placementWatchHandler = watch(() => state.placement, initialize, { flush: 'pre' })
  }

  watchVisibility()
  watchScroll()
  watchPlacement()

  getCurrentInstance() && onUnmounted(destroy)

  return {
    initialize,
    show,
    hide,
    update,
    destroy,
    visibility,
    placement,
    triggerRef,
    triggerEvents,
    overlayRef,
    overlayEvents,
  }
}
