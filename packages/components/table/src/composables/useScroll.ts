/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TableProps } from '../types'
import type { StickyContext } from './useSticky'
import type { ComputedRef, Ref } from 'vue'

import { computed, onBeforeUnmount, ref } from 'vue'

import { getScrollBarSize } from '@idux/cdk/scroll'
import { convertCssPixel, convertElement } from '@idux/cdk/utils'

export function useScroll(props: TableProps, { isSticky, stickyScrollLeft }: StickyContext): ScrollContext {
  const { scrollHeadRef, scrollBodyRef, scrollFootRef, handleScroll, pingedStart, pingedEnd } =
    useScrollRef(stickyScrollLeft)

  const scrollX = computed(() => convertCssPixel(props.scroll?.x))
  const scrollY = computed(() => convertCssPixel(props.scroll?.y))
  const scrollHorizontal = computed(() => !!scrollX.value)
  const scrollVertical = computed(() => !!scrollY.value)
  const scrollBarSize = computed(() => (props.useVirtual ? 0 : getScrollBarSize(convertElement(scrollBodyRef))))
  const scrollBarSizeOnFixedHolder = computed(() =>
    isSticky.value ? 0 : scrollVertical.value ? scrollBarSize.value : 0,
  )

  return {
    scrollHeadRef,
    scrollBodyRef,
    scrollFootRef,
    handleScroll,
    pingedStart,
    pingedEnd,
    scrollX,
    scrollY,
    scrollHorizontal,
    scrollVertical,
    scrollBarSize,
    scrollBarSizeOnFixedHolder,
  }
}

export interface ScrollContext {
  scrollHeadRef: Ref<HTMLDivElement | undefined>
  scrollBodyRef: Ref<HTMLDivElement | undefined>
  scrollFootRef: Ref<HTMLDivElement | undefined>
  handleScroll: (evt?: Event, scrollLeft?: number) => void
  pingedStart: Ref<boolean>
  pingedEnd: Ref<boolean>
  scrollX: ComputedRef<string>
  scrollY: ComputedRef<string>
  scrollHorizontal: ComputedRef<boolean>
  scrollVertical: ComputedRef<boolean>
  scrollBarSize: ComputedRef<number>
  scrollBarSizeOnFixedHolder: ComputedRef<number>
}

export interface ScrollOptions {
  currentTarget?: HTMLDivElement
  scrollLeft?: number
}

function useScrollRef(stickyScrollLeft: Ref<number>) {
  const scrollHeadRef = ref<HTMLDivElement>()
  const scrollBodyRef = ref<HTMLDivElement>()
  const scrollFootRef = ref<HTMLDivElement>()

  const changeStickyScrollLeft = (scrollLeft: number) => {
    const scrollBodyElement = convertElement(scrollBodyRef)
    if (!scrollBodyElement) {
      return
    }
    const { clientWidth, scrollWidth } = scrollBodyElement
    stickyScrollLeft.value = (scrollLeft / scrollWidth) * clientWidth || 0
  }

  const pingedStart = ref(false)
  const pingedEnd = ref(false)

  const lockedScrollTargetRef = ref<HTMLElement>()

  let timeout: number | undefined

  const clearTimer = () => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = undefined
    }
  }

  const lockScrollTarget = (target: HTMLElement | undefined) => {
    lockedScrollTargetRef.value = target
    clearTimer()

    timeout = setTimeout(() => {
      lockedScrollTargetRef.value = undefined
      timeout = undefined
    }, 100)
  }

  onBeforeUnmount(() => clearTimer())

  const forceScroll = (scrollLeft: number, target: HTMLElement | undefined) => {
    if (!target) {
      return
    }
    if (target.scrollLeft !== scrollLeft) {
      target.scrollLeft = scrollLeft
    }
  }

  const handleScroll = (evt?: Event, scrollLeft?: number) => {
    const currentTarget = evt?.currentTarget as HTMLElement | undefined
    const mergedScrollLeft = scrollLeft ?? currentTarget!.scrollLeft

    const lockedTarget = lockedScrollTargetRef.value
    if (!lockedTarget || lockedTarget === currentTarget) {
      lockScrollTarget(currentTarget)
      forceScroll(mergedScrollLeft, scrollHeadRef.value)
      forceScroll(mergedScrollLeft, convertElement(scrollBodyRef))
      forceScroll(mergedScrollLeft, scrollFootRef.value)
      changeStickyScrollLeft(mergedScrollLeft)
    }

    if (currentTarget) {
      const { scrollWidth, clientWidth } = currentTarget
      pingedStart.value = mergedScrollLeft > 0
      pingedEnd.value = mergedScrollLeft < scrollWidth - clientWidth
    }
  }

  return {
    scrollHeadRef,
    scrollBodyRef,
    scrollFootRef,
    handleScroll,
    pingedStart,
    pingedEnd,
  }
}
