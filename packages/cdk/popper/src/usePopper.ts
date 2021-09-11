import type { Instance } from '@popperjs/core'
import type { PopperOptions, PopperInstance, PopperElement } from './types'

import { watch, WatchStopHandle } from 'vue'
import { createPopper } from '@popperjs/core'
import { isEqual } from 'lodash-es'
import { convertElement } from '@idux/cdk/utils'
import {
  useState,
  useBaseOptions,
  useElement,
  usePlacement,
  usePopperEvents,
  useTimer,
  useTriggerEvents,
  useVisibility,
  useDelay,
} from './hooks'
import { convertOptions } from './utils'

export function usePopper<TE extends PopperElement = PopperElement, PE extends PopperElement = PopperElement>(
  options: PopperOptions = {},
): PopperInstance<TE, PE> {
  let popperInstance: Instance | null = null

  const triggerRef = useElement<TE>()
  const popperRef = useElement<PE>()
  const arrowRef = useElement<HTMLElement>()

  const state = useState(options)
  const baseOptions = useBaseOptions(state)
  const visibility = useVisibility(state)
  const { placement, updatePlacement } = usePlacement(state)
  const delay = useDelay(state)

  const { setTimer, clearTimer } = useTimer()
  const triggerEvents = useTriggerEvents(state, { visibility, show, hide })
  const popperEvents = usePopperEvents(state, { show, hide })

  function toggle(visible: boolean, delay: number): void {
    clearTimer()

    const action = () => {
      state.visible = visible
    }
    if (delay > 0) {
      setTimer(action, delay)
    } else {
      action()
    }
  }

  function show(showDelay = delay.value.show): void {
    toggle(true, showDelay)
  }

  function hide(hideDelay = delay.value.hide): void {
    toggle(false, hideDelay)
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

  let initWatchStop: WatchStopHandle | null = null

  function initialize(): void {
    if (initWatchStop) {
      initWatchStop()
    }

    initWatchStop = watch(
      [triggerRef, popperRef],
      ([trigger, popper]) => {
        const triggerElement = convertElement(trigger)
        const popperElement = convertElement(popper)
        if (!triggerElement || !popperElement) {
          return
        }
        destroy()
        const options = convertOptions(baseOptions.value, { arrowElement: convertElement(arrowRef), updatePlacement })
        popperInstance = createPopper(triggerElement, popperElement, options)
      },
      { immediate: true },
    )
  }

  watch(visibility, value => {
    if (value) {
      clearTimer()
      popperInstance?.update()
    }
  })

  watch([baseOptions, arrowRef], ([currBaseOptions, arrowElement]) => {
    popperInstance?.setOptions(
      convertOptions(currBaseOptions, { arrowElement: convertElement(arrowElement), updatePlacement }),
    )
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
