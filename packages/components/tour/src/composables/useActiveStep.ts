/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { MergedTourProps } from './useMergedProps'
import type { ResolvedTourStep } from '../types'
import type { ButtonMode, ButtonSize } from '@idux/components/button'
import type { TourLocale } from '@idux/components/locales'

import { type ComputedRef, watch } from 'vue'

import { isFunction, isNumber, isString } from 'lodash-es'

import { convertElement, useState } from '@idux/cdk/utils'

export function useActiveStep(
  mergedProps: ComputedRef<MergedTourProps>,
  activeIndex: ComputedRef<number>,
  isCurrentMax: ComputedRef<boolean>,
  locale: TourLocale,
): ComputedRef<ResolvedTourStep | undefined> {
  const [activeStep, setActiveStep] = useState<ResolvedTourStep | undefined>(undefined)

  let destructions: (() => Promise<void>)[] = []

  const destroySteps = () => {
    destructions.forEach(destory => destory())
    destructions = []
  }

  const getActiveStep = async (index: number) => {
    const props = mergedProps.value
    const step = props.steps?.[index]
    if (!step) {
      return
    }

    if (step.beforeEnter) {
      await step.beforeEnter()
    }

    const gap = step.gap ?? props.gap
    const mergedGap = isNumber(gap) ? { offset: gap } : gap

    const target = async () => {
      if (!step.target) {
        return null
      }

      if (isString(step.target)) {
        return document.querySelector(step.target) as HTMLElement
      }

      if (isFunction(step.target)) {
        return convertElement(await step.target()) ?? null
      }

      return convertElement(step.target) ?? null
    }

    /* eslint-disable indent */
    const nextButton =
      step.nextButton === false
        ? null
        : {
            size: 'xs' as ButtonSize,
            mode: 'primary' as ButtonMode,
            ...(step.nextButton === true ? {} : step.nextButton),
          }
    const prevButton =
      step.prevButton === false
        ? null
        : {
            size: 'xs' as ButtonSize,
            ...(step.prevButton === true ? {} : step.prevButton),
          }
    /* eslint-enable indent */

    return {
      ...step,
      index,
      target,
      gap: mergedGap,
      mask: step.mask ?? props.mask,
      placement: step.placement ?? props.placement,
      showArrow: step.showArrow ?? props.showArrow,
      nextButton,
      prevButton,
      nextButtonText: step.nextButtonText ?? (isCurrentMax.value ? locale.finishText : locale.nextText),
      prevButtonText: step.prevButtonText ?? locale.prevText,
      scrollIntoViewOptions: step.scrollIntoViewOptions ?? props.scrollIntoViewOptions,
    }
  }

  const pushCurrentUpdate = async (index: number) => {
    if (index < 0) {
      setActiveStep(undefined)
      return
    }

    const promise = getActiveStep(index)

    destructions.push(async () => {
      const step = await promise
      step?.afterLeave?.()
    })

    const step = await promise

    if (activeIndex.value === index) {
      setActiveStep(step)
    }
  }

  watch(
    [activeIndex, () => mergedProps.value.steps],
    ([current, steps], [, preSteps]) => {
      if (current === activeStep.value?.index && steps === preSteps) {
        return
      }

      destroySteps()
      pushCurrentUpdate(current)
    },
    { immediate: true, flush: 'post' },
  )

  return activeStep
}
