/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, type Ref, onMounted, ref, watch } from 'vue'

import { useResizeObserver } from '@idux/cdk/resize'
import { callEmit, convertElement, useState } from '@idux/cdk/utils'

import { type CarouselProps } from '../types'

export interface StrategyContext {
  activeIndex: Ref<number>
  runningIndex: Ref<number>
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

    const sliderTrackElement = sliderTrackRef.value
    if (!sliderTrackElement) {
      return
    }
    sliderTrackElement.style.transform = mergedVertical.value
      ? `translate3d(0, ${-activeIndex.value * height}px, 0)`
      : `translate3d(${-activeIndex.value * width}px, 0, 0)`
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

  const goTo = (nextIndex: number) => {
    const length = mergedLength.value
    const sliderTrackElement = sliderTrackRef.value
    const firstSliderElement = convertElement(sliderRefs.value[0])
    const lastSliderElement = convertElement(sliderRefs.value[length - 1])

    if (
      length <= 1 ||
      runningIndex.value !== -1 ||
      nextIndex === activeIndex.value ||
      !sliderTrackElement ||
      !firstSliderElement ||
      !lastSliderElement
    ) {
      return
    }

    const { from, to } = getBoundary(activeIndex.value, nextIndex, length)
    runningIndex.value = to
    sliderTrackElement.style.transition = `transform 0.5s ease`

    const needToAdjust = length > 2 && nextIndex !== to
    if (mergedVertical.value) {
      if (needToAdjust) {
        if (to < from) {
          firstSliderElement.style.top = `${length * unitHeight.value}px`
          lastSliderElement.style.top = ''
        } else {
          firstSliderElement.style.top = ''
          lastSliderElement.style.top = `${-length * unitHeight.value}px`
        }
        sliderTrackElement.style.transform = `translate3d(0, ${-nextIndex * unitHeight.value}px, 0)`
      } else {
        sliderTrackElement.style.transform = `translate3d(0, ${-to * unitHeight.value}px, 0)`
      }
    } else {
      if (needToAdjust) {
        if (to < from) {
          firstSliderElement.style.left = `${length * unitWidth.value}px`
          lastSliderElement.style.left = ''
        } else {
          firstSliderElement.style.left = ''
          lastSliderElement.style.left = `${-length * unitWidth.value}px`
        }
        sliderTrackElement.style.transform = `translate3d(${-nextIndex * unitWidth.value}px, 0, 0)`
      } else {
        sliderTrackElement.style.transform = `translate3d(${-to * unitWidth.value}px, 0, 0)`
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
    unitHeight,
    unitWidth,
    goTo,
    next,
    prev,
  }
}

function getBoundary(f: number, t: number, length: number) {
  return { from: (f + length) % length, to: (t + length) % length }
}
