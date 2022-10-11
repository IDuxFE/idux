/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PopperElement } from '../types'

import { type Ref, watch } from 'vue'

import { type ComputePositionConfig, type ComputePositionReturn, autoUpdate, computePosition } from '@floating-ui/dom'

import { convertElement } from '@idux/cdk/utils'

export interface Instance {
  update: () => Promise<void>
  destroy: () => void
}

export function useInstance(
  triggerRef: Ref<PopperElement | undefined>,
  popperRef: Ref<PopperElement | undefined>,
  options: Ref<ComputePositionConfig>,
): Instance {
  const updatePopperPosition = (state: ComputePositionReturn) => {
    const popperEl = convertElement(popperRef.value)
    const { x, y, strategy } = state

    if (popperEl) {
      Object.assign(popperEl.style, {
        position: strategy,
        left: `${x}px`,
        top: `${y}px`,
      })
    }
  }

  const update = async () => {
    const triggerEl = convertElement(triggerRef.value)
    const popperEl = convertElement(popperRef.value)

    if (!triggerEl || !popperEl) {
      return
    }

    const state = await computePosition(triggerEl, popperEl, options.value)
    state && updatePopperPosition(state)
  }

  let cleanUpHandler: (() => void) | null = null
  const initialize = () => {
    const triggerEl = convertElement(triggerRef.value)
    const popperEl = convertElement(popperRef.value)
    if (!triggerEl || !popperEl) {
      return
    }

    cleanUpHandler?.()

    Object.assign(popperEl.style, {
      position: 'absolute',
      left: 0,
      top: 0,
    })

    cleanUpHandler = autoUpdate(triggerEl, popperEl, () => {
      update()
    })
  }

  const watchStopHandlers = [
    watch([triggerRef, popperRef], initialize, { immediate: true }),
    watch(options, update, { immediate: true }),
  ]
  const destroy = () => {
    watchStopHandlers.forEach(handler => handler())
    cleanUpHandler?.()
  }

  return {
    update,
    destroy,
  }
}
