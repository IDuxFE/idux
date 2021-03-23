/* eslint-disable indent */
import type { Instance as PopperInstance } from '@popperjs/core'
import type { ComputedRef } from 'vue'

import type {
  OverlayInstance,
  OverlayOptions,
  OverlayPopperEvents,
  OverlayTrigger,
  OverlayTriggerEvents,
  OverlayElement,
} from './types'

import { computed, nextTick, reactive, ref, watch } from 'vue'
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
  let popperInstance: Nullable<PopperInstance> = null

  let showTimer: Nullable<number> = null
  let hideTimer: Nullable<number> = null

  let triggerFocus = false

  const state = reactive(options)
  const popperOptions = usePopperOptions(options, { arrow: arrowRef })

  const initialize = () => {
    if (!visibility.value) {
      return
    }
    const unrefTrigger = triggerRef.value
    const unrefOverlay = overlayRef.value
    if (!unrefTrigger || !unrefOverlay) {
      return
    }
    nextTick(() => {
      const triggerElement = isHTMLElement(unrefTrigger) ? unrefTrigger : unrefTrigger.$el
      const overlayElement = isHTMLElement(unrefOverlay) ? unrefOverlay : unrefOverlay.$el
      popperInstance = createPopper(triggerElement, overlayElement as HTMLElement, popperOptions.value)
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

  const show = (immediate = false): void => {
    _clearTimer()
    if (immediate || state.showDelay === 0) {
      _toggle(true)
    } else {
      showTimer = setTimeout(() => {
        _toggle(true)
      }, state.showDelay)
    }
  }

  const hide = (immediate = false): void => {
    _clearTimer()
    if (immediate || state.hideDelay === 0) {
      _toggle(false)
    } else {
      hideTimer = setTimeout(() => {
        _toggle(false)
      }, state.hideDelay)
    }
  }

  const destroy = (): void => {
    if (!popperInstance) {
      return
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

  const onVisibilityChange = (visible: boolean) => {
    if (!visible) {
      // improve performance
      destroy()
    }
    initialize()
  }

  watch(visibility, onVisibilityChange)

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
      hide(true)
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
