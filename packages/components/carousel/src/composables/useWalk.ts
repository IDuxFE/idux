/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CarouselProps } from '../types'

import { ComputedRef, nextTick, watch } from 'vue'

import { callEmit, useState } from '@idux/cdk/utils'

interface WalkContext {
  goTo(slideIndex: number): void
  next(): void
  prev(): void
  onTransitionend(e: TransitionEvent): void
  activeIndex: ComputedRef<number>
}

export const useWalk = (length: ComputedRef<number>, props: CarouselProps): WalkContext => {
  const [activeIndex, setActiveIndex] = useState(1)
  let running = false

  watch(activeIndex, (newVal: number, oldVal: number) => {
    if (newVal >= 1 && newVal <= length.value) {
      callEmit(props.onChange, newVal, oldVal)
    }
  })

  const goTo = (slideIndex: number) => {
    running = true
    if (activeIndex.value === 1 && slideIndex === length.value - 1) {
      setActiveIndex(0)
    } else if (activeIndex.value === length.value && slideIndex === 0) {
      setActiveIndex(length.value + 1)
    } else {
      setActiveIndex(slideIndex + 1)
    }
  }

  const next = () => {
    if (length.value <= 1 || running) {
      return
    }
    running = true
    setActiveIndex(activeIndex.value + 1)
  }
  const prev = () => {
    if (length.value <= 1 || running) {
      return
    }
    running = true
    setActiveIndex(activeIndex.value - 1)
  }

  const onTransitionend = (e: TransitionEvent) => {
    running = false
    if (activeIndex.value > 0 && activeIndex.value <= length.value) {
      return
    }
    if (activeIndex.value === 0) {
      setActiveIndex(length.value)
    } else if (activeIndex.value === length.value + 1) {
      setActiveIndex(1)
    }
    nextTick(() => {
      const target = e.target as HTMLElement
      target.style.transition = 'none'
      void target.clientWidth
      target.style.transition = ''
    })
  }

  return {
    goTo,
    next,
    prev,
    onTransitionend,
    activeIndex,
  }
}
