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
  let transitionTmr: number

  const locks = {
    stepChange: false,
    animate: false,
  }

  const lock = () => {
    Object.keys(locks).forEach(key => (locks[key as keyof typeof locks] = true))

    setIsStepChanging(true)
  }
  const unlock = (lock: keyof typeof locks) => {
    locks[lock] = false

    if (Object.keys(locks).every(key => !locks[key as keyof typeof locks])) {
      setIsStepChanging(false)
    }
  }

  const setIsStepChanging = (changing: boolean) => {
    if (isStepChanging.value === changing) {
      return
    }

    _setIsStepChanging(changing)

    if (!changing) {
      runStepChangeCbs()
    }
  }

  const onStepChange = (cb: () => void) => {
    stepChangeCbs.add(cb)
  }
  const runStepChangeCbs = () => {
    stepChangeCbs.forEach(cb => cb())
  }

  onAnimateEnd(() => {
    if (mergedProps.value.animatable && activeStep.value?.mask) {
      unlock('animate')
    }
  })

  watch(
    activeIndex,
    (current, pre) => {
      if (current !== pre) {
        transitionTmr && clearTimeout(transitionTmr)
        lock()
      }
    },
    {
      flush: 'pre',
    },
  )
  watch(
    activeStep,
    (step, preStep) => {
      if (step && !preStep) {
        runStepChangeCbs()
        return
      }

      if (!mergedProps.value.animatable || !step?.mask || !visible.value) {
        unlock('animate')
      }

      transitionTmr && clearTimeout(transitionTmr)
      transitionTmr = setTimeout(
        () => {
          unlock('stepChange')
        },
        mergedProps.value.animatable ? transitionDuration : 0,
      )
    },
    {
      immediate: true,
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
