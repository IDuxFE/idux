/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { MergedTourProps } from './useMergedProps'
import type { ResolvedTourStep } from '../types'

import { type ComputedRef, onUnmounted, watch } from 'vue'

import { useState } from '@idux/cdk/utils'

export interface StepChangeContext {
  isStepChanging: ComputedRef<boolean>
  onStepChange: (cb: () => void) => void
}

const transitionDuration = 200

export function useStepChange(
  mergedProps: ComputedRef<MergedTourProps>,
  activeIndex: ComputedRef<number>,
  activeStep: ComputedRef<ResolvedTourStep | undefined>,
  visible: ComputedRef<boolean>,
  onAnimateEnd: (cb: () => void) => void,
): StepChangeContext {
  const stepChangeCbs = new Set<() => void>()
  const [isStepChanging, _setIsStepChanging] = useState<boolean>(false)

  const setIsStepChanging = (changing: boolean) => {
    if (isStepChanging.value === changing) {
      return
    }

    _setIsStepChanging(changing)

    if (!changing) {
      stepChangeCbs.forEach(cb => cb())
    }
  }

  const onStepChange = (cb: () => void) => {
    stepChangeCbs.add(cb)
  }

  let transitionTmr: number

  onAnimateEnd(() => {
    if (mergedProps.value.animatable && activeStep.value?.mask) {
      transitionTmr && clearTimeout(transitionTmr)
      setIsStepChanging(false)
    }
  })

  watch(
    activeIndex,
    (current, pre) => {
      if (current !== pre) {
        transitionTmr && clearTimeout(transitionTmr)
        setIsStepChanging(true)
      }
    },
    {
      flush: 'pre',
    },
  )
  watch(
    activeStep,
    step => {
      if (!mergedProps.value.animatable || !step?.mask || !visible.value) {
        transitionTmr && clearTimeout(transitionTmr)
        transitionTmr = setTimeout(
          () => {
            setIsStepChanging(false)
          },
          mergedProps.value.animatable ? transitionDuration : 0,
        )
      }
    },
    {
      flush: 'post',
    },
  )

  onUnmounted(() => {
    stepChangeCbs.clear()
  })

  return {
    isStepChanging,
    onStepChange,
  }
}
