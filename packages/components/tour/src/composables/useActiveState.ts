/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { VisibleContext } from './useVisible'
import type { TourProps } from '../types'

import { type ComputedRef, computed, watch } from 'vue'

import { callEmit, useControlledProp } from '@idux/cdk/utils'

export interface ActiveStateContext {
  isCurrentMax: ComputedRef<boolean>
  activeIndex: ComputedRef<number>
  setActiveIndex: (index: number) => void
  goTo: (step: number) => void
  finish: () => void
}

export function useActiveState(props: TourProps, visibleContext: VisibleContext): ActiveStateContext {
  const { visible, setVisible } = visibleContext
  const [activeIndex, _setActiveIndex] = useControlledProp(props, 'activeIndex', 0)

  const maxIndex = computed(() => {
    if (!props.steps?.length) {
      return 0
    }

    return props.steps.length - 1
  })
  const isCurrentMax = computed(() => activeIndex.value >= maxIndex.value)

  const setActiveIndex = (index: number) => {
    if (index === activeIndex.value) {
      return
    }

    const prevCurrent = activeIndex.value
    _setActiveIndex(index)

    callEmit(props.onChange, index, prevCurrent)
  }

  const goTo = (step: number) => {
    const resolvedStep = Math.min(Math.max(step, 0), maxIndex.value)

    setActiveIndex(resolvedStep)
  }
  const finish = () => {
    setVisible(false)
    callEmit(props.onFinish)
  }

  watch(
    visible,
    v => {
      if (!v) {
        setActiveIndex(0)
      }
    },
    {
      flush: 'post',
    },
  )

  return {
    isCurrentMax,
    activeIndex,
    setActiveIndex,
    goTo,
    finish,
  }
}
