/* eslint-disable indent */
import type { Instance as PopperInstance } from '@popperjs/core'
import type { ComputedRef, WatchStopHandle } from 'vue'

import type {
  OverlayInstance,
  OverlayOptions,
  OverlayPopperEvents,
  OverlayTrigger,
  OverlayTriggerEvents,
  OverlayElement,
} from './types'

import { computed, reactive, ref, watch, watchEffect } from 'vue'
import { createPopper } from '@popperjs/core'
import { isHTMLElement, off, on, uniqueId } from '@idux/cdk/utils'

import { usePopperOptions } from './usePopperOptions'

export const useOverlay = <
  TE extends OverlayElement = OverlayElement,
  OE extends OverlayElement = OverlayElement,
  AE extends OverlayElement = OverlayElement
>(
  options: OverlayOptions,
): OverlayInstance<TE, OE, AE> => {
  const triggerRef = ref<OverlayElement | null>(null)
  const overlayRef = ref<OverlayElement | null>(null)
  const arrowRef = ref<OverlayElement | null>(null)
  let popperInstance: PopperInstance | null = null

  let showTimer: number | null = null
  let hideTimer: number | null = null

  let triggerFocus = false

  const state = reactive(options)
  const popperOptions = usePopperOptions(options, { arrow: arrowRef })
  let refWatchStopHandle: WatchStopHandle | null = null

  const initialize = () => {
    if (refWatchStopHandle) {
      refWatchStopHandle()
    }

    refWatchStopHandle = watchEffect(() => {
      const trigger = triggerRef.value
      const overlay = overlayRef.value

      if (!trigger || !overlay) {
        return
      }

      if (popperInstance) {
        popperInstance.destroy()
        off(window, 'scroll', globalScroll)
      }

      const triggerElement = isHTMLElement(trigger) ? trigger : trigger.$el
      const overlayElement = isHTMLElement(overlay) ? overlay : overlay.$el
      popperInstance = createPopper(triggerElement, overlayElement, popperOptions.value)
      popperInstance.update()

      on(window, 'scroll', globalScroll)
    })
  }

  const _toggle = (visible: boolean) => {
    state.visible = visible
  }

  const _clearTimer = () => {
    if (showTimer) {
      clearTimeout(showTimer)
      showTimer = null
    }
    if (hideTimer) {
      clearTimeout(hideTimer)
      hideTimer = null
    }
  }

  const show = (showDelay?: number): void => {
    _clearTimer()
    const delay = showDelay ?? state.showDelay
    if (delay > 0) {
      showTimer = setTimeout(() => {
        _toggle(true)
      }, delay)
    } else {
      _toggle(true)
    }
  }

  const hide = (hideDelay?: number): void => {
    _clearTimer()
    const delay = hideDelay ?? state.hideDelay
    if (delay > 0) {
      hideTimer = setTimeout(() => {
        _toggle(false)
      }, delay)
    } else {
      _toggle(false)
    }
  }

  const destroy = (): void => {
    if (!popperInstance) {
      return
    }
    if (refWatchStopHandle) {
      refWatchStopHandle()
    }
    popperInstance.destroy()
    popperInstance = null
    off(window, 'scroll', globalScroll)
  }

  const update = (options?: Partial<OverlayOptions>): void => {
    Object.assign(state, options)
    if (popperInstance) {
      popperInstance.update()
    } else {
      initialize()
    }
  }

  const visibility = computed<boolean>(() => !state.disabled && !!state.visible)

  watch(visibility, () => update())

  const overlayEventHandler = (e: Event): void => {
    e.stopPropagation()
    switch (e.type) {
      case 'click': {
        if (triggerFocus) {
          triggerFocus = false
        } else {
          visibility.value && state.trigger === 'click' ? hide() : show()
        }
        break
      }
      case 'mouseenter': {
        show()
        break
      }
      case 'mouseleave': {
        hide()
        break
      }
      case 'focus': {
        triggerFocus = true
        show()
        break
      }
      case 'blur': {
        triggerFocus = false
        hide()
        break
      }
    }
  }

  const mapTriggerEvents = (state: OverlayOptions): ComputedRef<OverlayTriggerEvents> => {
    return computed<OverlayTriggerEvents>(() => {
      const triggerToEvents: Record<OverlayTrigger, Array<keyof OverlayTriggerEvents>> = {
        click: ['onClick'],
        focus: ['onFocus', 'onBlur'],
        hover: ['onMouseenter', 'onMouseleave'],
      }
      return triggerToEvents[state.trigger].reduce((obj, key) => {
        obj[key] = overlayEventHandler
        return obj
      }, {} as OverlayTriggerEvents)
    })
  }

  const triggerEvents: ComputedRef<OverlayTriggerEvents> = mapTriggerEvents(state)

  const onOverlayMouseEnter = () => {
    if (state.allowEnter && state.trigger !== 'click') {
      if (hideTimer) {
        clearTimeout(hideTimer)
        hideTimer = null
      }
    }
  }

  const onOverlayMouseLeave = () => {
    if (state.trigger !== 'hover') {
      return
    }
    hide()
  }

  const overlayEvents: OverlayPopperEvents = {
    onMouseenter: onOverlayMouseEnter,
    onMouseleave: onOverlayMouseLeave,
    onClick: event => event.stopPropagation(),
  }

  const globalScroll = () => {
    if (!visibility.value || !popperInstance) {
      return
    }
    if (state.scrollStrategy === 'close') {
      hide(0)
    }
  }

  return {
    arrowRef,
    triggerRef,
    overlayRef,
    initialize,
    show,
    hide,
    destroy,
    id: uniqueId('ix-overlay'),
    update,
    visibility,
    triggerEvents,
    overlayEvents,
  } as OverlayInstance<TE, OE, AE>
}
