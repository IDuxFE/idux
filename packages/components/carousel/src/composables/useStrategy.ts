/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CarouselProps } from '../types'

import { type ComputedRef, onMounted, ref, watch } from 'vue'

import { useResizeObserver } from '@idux/cdk/resize'
import { callEmit, convertElement, useState } from '@idux/cdk/utils'

export interface StrategyContext {
  activeIndex: Ref<number>
  runningIndex: Ref<number>
  nextIndex: Ref<number>
  unitHeight: ComputedRef<number>
  unitWidth: ComputedRef<number>
  goTo(slideIndex: number): void
  next(): void
  prev(): void
}

export function useStrategy(
  props: CarouselProps,
  carouselRef: Ref<HTMLElement | undefined>,
  sliderTrackRef: Ref<HTMLElement | undefined>,
  sliderRefs: Ref<HTMLElement[]>,
  mergedVertical: ComputedRef<boolean>,
  mergedLength: ComputedRef<number>,
): StrategyContext {
  const activeIndex = ref(0)
  watch(activeIndex, (newVal: number, oldVal: number) => {
    callEmit(props.onChange, newVal, oldVal)
  })

  const runningIndex = ref(-1)
  const nextIndex = ref(-1)
  const [unitWidth, setUnitWidth] = useState(0)
  const [unitHeight, setUnitHeight] = useState(0)

  const layout = () => {
    const carouselElement = carouselRef.value
    if (!carouselElement) {
      return
    }
    const { width, height } = carouselElement.getBoundingClientRect()

    setUnitWidth(width)
    setUnitHeight(height)
  }

  useResizeObserver(carouselRef, layout)

  // [Vue warn]: Slot "default" invoked outside of the render function:
  //             this will not track dependencies used in the slot.
  //             Invoke the slot function inside the render function instead.
  onMounted(() => {
    watch(
      mergedLength,
      () => {
        layout()
        runningIndex.value = -1
        goTo(0)
      },
      { flush: 'post' },
    )
  })

  const goTo = (index: number) => {
    const length = mergedLength.value
    const sliderTrackElement = sliderTrackRef.value
    const firstSliderElement = convertElement(sliderRefs.value[0])
    const lastSliderElement = convertElement(sliderRefs.value[length - 1])

    if (
      length <= 1 ||
      runningIndex.value !== -1 ||
      index === activeIndex.value ||
      !sliderTrackElement ||
      !firstSliderElement ||
      !lastSliderElement
    ) {
      return
    }

    const { from, to } = getBoundary(activeIndex.value, index, length)
    nextIndex.value = index
    runningIndex.value = to

    sliderTrackElement.style.transition = `transform 0.5s ease`
    const needToAdjust = index !== to

    if (needToAdjust) {
      const stylePropertyName = mergedVertical.value ? 'top' : 'left'
      const unit = mergedVertical.value ? unitHeight.value : unitWidth.value
      if (to < from) {
        firstSliderElement.style[stylePropertyName] = `${length * unit}px`
        lastSliderElement.style[stylePropertyName] = ''
      } else {
        firstSliderElement.style[stylePropertyName] = ''
        lastSliderElement.style[stylePropertyName] = `${-length * unit}px`
      }
    }
  }

  const next = () => {
    goTo(activeIndex.value + 1)
  }
  const prev = () => {
    goTo(activeIndex.value - 1)
  }

  return {
    activeIndex,
    runningIndex,
    nextIndex,
    unitHeight,
    unitWidth,
    goTo,
    next,
    prev,
  }
}

function getBoundary(f: number, t: number, length: number): { from: number; to: number } {
  return { from: (f + length) % length, to: (t + length) % length }
}
