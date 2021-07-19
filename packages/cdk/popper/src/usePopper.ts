import type { Instance } from '@popperjs/core'
import type { PopperOptions, PopperInstance, PopperElement } from './types'

import { watch } from 'vue'
import { useElement, usePlacement, usePopperEvents, useState, useTimer, useTriggerEvents, useVisibility } from './hooks'
import { convertElement, convertPopperOptions, initPopper, toggle } from './utils'

export function usePopper<TE extends PopperElement = PopperElement, PE extends PopperElement = PopperElement>(
  options: PopperOptions = {},
): PopperInstance<TE, PE> {
  let popperInstance: Instance | null = null
  let isInitialized = false

  const state = useState(options)

  const triggerRef = useElement<TE>()
  const popperRef = useElement<PE>()

  const [visibility, visibilityWatcher] = useVisibility(state, forceUpdate)
  const [placement, placementWatcher] = usePlacement(state, forceUpdate)
  const [timer, setTimer] = useTimer()

  const triggerEvents = useTriggerEvents(state, visibility, timer, { show, hide })
  const popperEvents = usePopperEvents(state, timer, hide)

  watch(
    popperRef,
    value => {
      if (!isInitialized || !popperInstance || value) {
        return
      }
      popperInstance.destroy()
      popperInstance = null
      isInitialized = false
    },
    { flush: 'post' },
  )

  function initialize(): void {
    isInitialized = true
    const triggerElement = convertElement(triggerRef)
    const popperElement = convertElement(popperRef)

    if (!triggerElement || !popperElement) {
      return
    }
    if (!visibility.value) {
      return
    }
    popperInstance = initPopper(state, triggerElement, popperElement, { visibility, hide })
    popperInstance.update()
  }

  function show(delay = state.showDelay): void {
    toggle(true, delay, state, setTimer)
  }

  function hide(delay = state.hideDelay): void {
    toggle(false, delay, state, setTimer)
  }

  function update(options: Partial<PopperOptions> = {}): () => void {
    Object.assign(state, options)

    return forceUpdate
  }

  function destroy(): void {
    visibilityWatcher()
    placementWatcher()
    isInitialized = false
    if (!popperInstance) {
      return
    }
    popperInstance.destroy()
    popperInstance = null
  }

  function forceUpdate(): void {
    if (!popperInstance) {
      initialize()
    } else {
      popperInstance.setOptions(convertPopperOptions(state, { visibility, hide }))
    }
  }

  return {
    isInitialized,
    visibility,
    placement,
    triggerRef,
    popperRef,
    triggerEvents,
    popperEvents,
    initialize,
    show,
    hide,
    update,
    destroy,
  }
}
