import type { Instance } from '@popperjs/core'
import type { PopperOptions, PopperInstance, PopperElement } from './types'

import { watch } from 'vue'
import { createPopper } from '@popperjs/core'
import { isEqual } from 'lodash'
import {
  useState,
  useBaseOptions,
  useExtraOptions,
  useElement,
  usePopperEvents,
  useTimer,
  useTriggerEvents,
} from './hooks'
import { convertElement, convertOptions } from './utils'

export function usePopper<TE extends PopperElement = PopperElement, PE extends PopperElement = PopperElement>(
  options: PopperOptions = {},
): PopperInstance<TE, PE> {
  let popperInstance: Instance | null = null

  const triggerRef = useElement<TE>()
  const popperRef = useElement<PE>()
  const arrowRef = useElement<HTMLElement>()

  const state = useState(options)
  const baseOptions = useBaseOptions(state)
  const { extraOptions, visibility, placement } = useExtraOptions(state, arrowRef)

  const { setTimer, clearTimer } = useTimer()
  const triggerEvents = useTriggerEvents(state, { visibility, show, hide, clearTimer })
  const popperEvents = usePopperEvents(state, { hide, clearTimer })

  function toggle(visible: boolean, delay: number): void {
    const action = () => {
      state.visible = visible
    }
    if (delay > 0) {
      setTimer(action, delay)
    } else {
      action()
    }
  }

  function show(delay = state.showDelay): void {
    toggle(true, delay)
  }

  function hide(delay = state.hideDelay): void {
    toggle(false, delay)
  }

  function update(options: Partial<PopperOptions>): void {
    Object.entries(options).forEach(([key, value]) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (value !== undefined && !isEqual(value, (state as any)[key])) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(state as any)[key] = value
      }
    })
  }

  function forceUpdate(): void {
    popperInstance?.forceUpdate()
  }

  function destroy(): void {
    clearTimer()
    if (!popperInstance) {
      return
    }
    popperInstance.destroy()
    popperInstance = null
  }

  function initialize(): void {
    watch(
      [triggerRef, popperRef],
      ([trigger, popper]) => {
        const triggerElement = convertElement(trigger)
        const popperElement = convertElement(popper)
        if (!triggerElement || !popperElement) {
          return
        }
        destroy()
        const options = convertOptions(baseOptions.value, extraOptions.value)
        popperInstance = createPopper(triggerElement, popperElement, options)
      },
      { immediate: true },
    )
  }

  watch(visibility, value => {
    if (value) {
      popperInstance?.update()
    }
  })

  watch([baseOptions, extraOptions], ([currBaseOptions, currExtraOptions]) => {
    popperInstance?.setOptions(convertOptions(currBaseOptions, currExtraOptions))
  })

  return {
    visibility,
    placement,
    triggerRef,
    triggerEvents,
    popperRef,
    popperEvents,
    arrowRef,
    initialize,
    show,
    hide,
    update,
    forceUpdate,
    destroy,
  }
}
