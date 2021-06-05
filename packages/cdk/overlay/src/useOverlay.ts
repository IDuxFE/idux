/* eslint-disable indent */
import type { WatchStopHandle } from 'vue'
import type { Instance as PopperInstance } from '@popperjs/core'
import type { OverlayInstance, OverlayOptions, OverlayTrigger, OverlayElement } from './types'

import { computed, nextTick, reactive, ref, watch, watchEffect } from 'vue'
import { createPopper } from '@popperjs/core'
import { off, on, uniqueId } from '@idux/cdk/utils'
import { convertElement, convertPopperOptions } from './utils'

export const useOverlay = <
  TE extends OverlayElement = OverlayElement,
  OE extends OverlayElement = OverlayElement,
  AE extends OverlayElement = OverlayElement,
>(
  options: OverlayOptions,
): OverlayInstance<TE, OE, AE> => {
  const triggerRef = ref<OverlayElement | null>(null)
  const overlayRef = ref<OverlayElement | null>(null)
  const arrowRef = ref<OverlayElement | null>(null)

  const triggerElementRef = convertElement(triggerRef)
  const overlayElementRef = convertElement(overlayRef)
  const arrowElementRef = convertElement(arrowRef)

  let popperInstance: PopperInstance | null = null

  let showTimer: number | null = null
  let hideTimer: number | null = null

  const state = reactive(options)
  let refWatchStopHandle: WatchStopHandle | null = null
  const initialize = () => {
    if (refWatchStopHandle) {
      refWatchStopHandle()
    }

    refWatchStopHandle = watchEffect(() => {
      if (popperInstance) {
        off(window, 'scroll', globalScroll)
      }

      const triggerElement = triggerElementRef.value
      const overlayElement = overlayElementRef.value
      const arrowElement = arrowElementRef.value

      if (!triggerElement || !overlayElement) {
        return
      }

      const popperOptions = convertPopperOptions({ ...state, arrow: arrowElement })
      popperInstance = createPopper(triggerElement, overlayElement, popperOptions)
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
    if (refWatchStopHandle) {
      refWatchStopHandle()
    }

    if (popperInstance) {
      popperInstance.destroy()
      popperInstance = null
      off(window, 'scroll', globalScroll)
    }
  }

  const update = (options?: Partial<OverlayOptions>): void => {
    Object.assign(state, options)
    if (popperInstance) {
      if (options) {
        popperInstance.setOptions(options)
      }
      popperInstance.update()
    } else {
      nextTick(() => initialize())
    }
  }

  const globalScroll = () => {
    if (!visibility.value || !popperInstance) {
      return
    }
    if (state.scrollStrategy === 'close') {
      hide(0)
    }
  }

  const visibility = computed<boolean>(() => !state.disabled && !!state.visible)

  watch(visibility, () => update())

  const triggerEventHandler = (evt: Event): void => {
    evt.stopPropagation()

    switch (evt.type) {
      case 'click': {
        visibility.value ? hide() : show()
        break
      }
      case 'contextmenu': {
        evt.preventDefault()
        visibility.value ? hide() : show()
        break
      }
      case 'mouseenter':
      case 'focus': {
        show()
        break
      }
      case 'mouseleave':
      case 'blur': {
        hide()
        break
      }
    }
  }

  const overlayEventHandler = (evt: Event): void => {
    switch (evt.type) {
      case 'click': {
        evt.stopPropagation()
        break
      }
      case 'mouseenter': {
        if (state.allowEnter && hideTimer) {
          clearTimeout(hideTimer)
          hideTimer = null
        }
        break
      }
      case 'mouseleave': {
        if (state.allowEnter && state.trigger === 'hover') {
          hide()
        }
        break
      }
    }
  }

  const triggerToEvents: Record<OverlayTrigger, Array<keyof HTMLElementEventMap>> = {
    click: ['click'],
    focus: ['focus', 'blur'],
    hover: ['mouseenter', 'mouseleave'],
    contextmenu: ['contextmenu'],
    manual: [],
  }
  const overlayEvents: Array<keyof HTMLElementEventMap> = ['mouseenter', 'mouseleave', 'click']

  watch(
    () => state.trigger,
    (currTrigger, prevTrigger) => {
      const triggerElement = triggerElementRef.value
      const overlayElement = overlayElementRef.value
      const prevTriggerEvents = triggerToEvents[prevTrigger!] || []
      prevTriggerEvents.forEach(evtName => off(triggerElement, evtName, triggerEventHandler))
      overlayEvents.forEach(evtName => off(overlayElement, evtName, overlayEventHandler))

      if (currTrigger !== 'manual') {
        const currTriggerEvents = triggerToEvents[currTrigger]
        currTriggerEvents.forEach(evtName => on(triggerElement, evtName, triggerEventHandler))
        overlayEvents.forEach(evtName => on(overlayElement, evtName, overlayEventHandler))
      }
    },
  )

  watch(
    triggerElementRef,
    (currTriggerElement, prevTriggerElement) => {
      const currTriggerEvents = triggerToEvents[state.trigger] || []
      currTriggerEvents.forEach(evtName => {
        off(prevTriggerElement, evtName, triggerEventHandler)
        on(currTriggerElement, evtName, triggerEventHandler)
      })
    },
    { flush: 'post' },
  )

  watch(
    overlayElementRef,
    (currOverlayElement, prevOverlayElement) => {
      if (state.trigger !== 'manual') {
        overlayEvents.forEach(evtName => {
          off(prevOverlayElement, evtName, overlayEventHandler)
          on(currOverlayElement, evtName, overlayEventHandler)
        })
      }
    },
    { flush: 'post' },
  )

  return {
    triggerRef,
    overlayRef,
    arrowRef,
    initialize,
    show,
    hide,
    update,
    destroy,
    id: uniqueId('ix-overlay'),
    visibility,
    triggerEventHandler,
    overlayEventHandler,
  } as OverlayInstance<TE, OE, AE>
}
