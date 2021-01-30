import type { Instance as PopperInstance } from '@popperjs/core'
import type { ComputedRef } from 'vue'

import type {
  OverlayInstance,
  OverlayOptions,
  OverlayPopperEvents,
  OverlayTrigger,
  OverlayTriggerEvents,
  RefElement,
  TriggerElement,
} from './types'

import { ComponentPublicInstance, computed, reactive, ref, watch } from 'vue'
import { createPopper } from '@popperjs/core'
import { isHTMLElement, uniqueId } from '@idux/cdk/utils'

import { usePopperOptions } from './usePopperOptions'

export const useOverlay = (options: OverlayOptions): OverlayInstance => {
  const arrowRef = ref<RefElement>(null)
  const triggerRef = ref<TriggerElement>(null)
  const overlayRef = ref<RefElement>(null)
  let popperInstance: Nullable<PopperInstance> = null

  let showTimer: Nullable<number> = null
  let hideTimer: Nullable<number> = null

  const state = reactive(options)
  const popperOptions = usePopperOptions(options, { arrow: arrowRef })

  const overlayVisibility = (visible: boolean): HTMLElement | null => {
    const overlayElement = overlayRef.value
    if (overlayElement) {
      overlayElement.style.display = visible ? 'block' : 'none'
    }
    return overlayElement
  }

  const initialize = (): void => {
    const overlayElement = overlayVisibility(visibility.value)
    if (!visibility.value) {
      return
    }
    const unrefTrigger = triggerRef.value
    if (!unrefTrigger) {
      return
    }
    const triggerElement = isHTMLElement(unrefTrigger) ? unrefTrigger : (unrefTrigger as ComponentPublicInstance).$el
    popperInstance = createPopper(triggerElement, overlayElement as HTMLElement, popperOptions.value)
    popperInstance.update()
    window.addEventListener('scroll', globalScroll)
  }

  const _toggle = (visible: boolean) => {
    state.visible = visible
  }

  const _clearTimer = () => {
    window.clearTimeout(showTimer as number)
    window.clearTimeout(hideTimer as number)
  }

  const show = (immediate?: boolean): void => {
    _clearTimer()
    if (immediate || state.showDelay === 0) {
      _toggle(true)
    } else {
      showTimer = window.setTimeout(() => {
        _toggle(true)
      }, state.showDelay)
    }
  }

  const hide = (immediate?: boolean): void => {
    _clearTimer()
    if (immediate || state.hideDelay === 0) {
      _toggle(false)
    } else {
      hideTimer = window.setTimeout(() => {
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
    window.removeEventListener('scroll', globalScroll)
  }

  const update = (options: Partial<OverlayOptions>): void => {
    Object.assign(state, options)
  }

  const visibility = computed<boolean>(() => !state.disabled && !!state.visible)

  const onVisibilityChange = (visible: boolean) => {
    overlayVisibility(visible)
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
        visibility.value ? hide() : show()
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
        show()
        break
      }
      case 'blur': {
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
        hover: ['onMouseEnter', 'onMouseLeave'],
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
      clearTimeout(hideTimer as number)
    }
  }

  const onOverlayMouseLeave = () => {
    if (state.trigger !== 'hover') {
      return
    }
    hide()
  }

  const overlayEvents: OverlayPopperEvents = {
    onMouseEnter: onOverlayMouseEnter,
    onMouseLeave: onOverlayMouseLeave,
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
  }
}
