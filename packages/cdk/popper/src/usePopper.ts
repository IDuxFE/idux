/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PopperElement, PopperInstance, PopperOptions } from './types'

import { computed, ref, watch } from 'vue'

import { convertElement } from '@idux/cdk/utils'

import { useDelay } from './composables/useDelay'
import { type Instance, useInstance } from './composables/useInstance'
import { useBaseOptions, usePopperOptions } from './composables/useOptions'
import { usePlacement } from './composables/usePlacement'
import { usePopperEvents } from './composables/usePopperEvents'
import { useTimer } from './composables/useTimer'
import { useTriggerEvents } from './composables/useTriggerEvents'
import { useVisibility } from './composables/useVisibility'
import { convertOptions } from './convertOptions'

export function usePopper<TE extends PopperElement = PopperElement, PE extends PopperElement = PopperElement>(
  options: PopperOptions = {},
): PopperInstance<TE, PE> {
  let popperInstance: Instance | null

  const triggerRef = ref<TE>()
  const popperRef = ref<PE>()
  const arrowRef = ref<HTMLElement>()

  const { resolvedOptions, updateOptions } = usePopperOptions(options)
  const baseOptions = useBaseOptions(resolvedOptions)
  const convertedOptions = computed(() =>
    convertOptions(baseOptions.value, { arrowElement: convertElement(arrowRef), updatePlacement }),
  )

  const { visibility, updateVisibility } = useVisibility(resolvedOptions)
  const { placement, updatePlacement } = usePlacement(resolvedOptions)
  const delay = useDelay(resolvedOptions)

  const { setTimer, clearTimer } = useTimer()
  const triggerEvents = useTriggerEvents(resolvedOptions, { visibility, show, hide })
  const popperEvents = usePopperEvents(resolvedOptions, { show, hide })

  function toggle(visible: boolean, delay: number): void {
    clearTimer()

    const action = () => {
      updateVisibility(visible)
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

  function update(options?: Partial<PopperOptions>): void {
    if (options) {
      updateOptions(options)
      return
    }

    popperInstance?.update()
  }

  function initialize() {
    destroy()
    popperInstance = useInstance(triggerRef, popperRef, visibility, convertedOptions)
  }

  function destroy(): void {
    clearTimer()
    if (!popperInstance) {
      return
    }
    popperInstance.destroy()
    popperInstance = null
  }

  watch(visibility, value => {
    if (value) {
      clearTimer()
      popperInstance?.update()
    }
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
    destroy,
  }
}
