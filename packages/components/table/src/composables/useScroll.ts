/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, type Ref, computed, onBeforeUnmount, ref } from 'vue'

import { useResizeObserver } from '@idux/cdk/resize'
import { type VirtualScrollInstance, type VirtualScrollToFn, getScrollBarSize } from '@idux/cdk/scroll'
import { Logger, convertCssPixel, convertElement } from '@idux/cdk/utils'

import { type TableProps } from '../types'
import { type StickyContext } from './useSticky'

export function useScroll(
  props: TableProps,
  mergedAutoHeight: ComputedRef<boolean>,
  { setStickyScrollLeft }: StickyContext,
): ScrollContext {
  const { scrollHeadRef, scrollBodyRef, scrollFootRef, handleScroll, pingedStart, pingedEnd } =
    useScrollRef(setStickyScrollLeft)

  __DEV__ &&
    props.scroll?.x &&
    Logger.warn('components/table', '`scroll.x` was deprecated, please use `scroll.width` instead')

  __DEV__ &&
    props.scroll?.y &&
    Logger.warn('components/table', '`scroll.y` was deprecated, please use `scroll.height` instead')

  const scrollWithAutoHeight = ref(mergedAutoHeight.value)
  useResizeObserver(scrollBodyRef, entry => {
    if (!mergedAutoHeight.value) {
      scrollWithAutoHeight.value = false
    } else {
      scrollWithAutoHeight.value = entry.target.scrollHeight > entry.target.clientHeight
    }
  })

  const scrollWidth = computed(() => convertCssPixel(props.scroll?.width || props.scroll?.x))
  const scrollHeight = computed(
    () => convertCssPixel(props.scroll?.height || props.scroll?.y) || (scrollWithAutoHeight.value ? 'auto' : ''),
  )

  const scrollBarSize = computed(() => getScrollBarSize(convertElement(scrollBodyRef)))
  const scrollBarSizeOnFixedHolder = computed(() => (scrollHeight.value ? scrollBarSize.value : 0))

  const scrollTo: VirtualScrollToFn = options => {
    if (props.virtual) {
      return (scrollBodyRef.value as unknown as VirtualScrollInstance)?.scrollTo(options)
    }
  }

  return {
    scrollHeadRef,
    scrollBodyRef,
    scrollFootRef,
    handleScroll,
    scrollTo,
    pingedStart,
    pingedEnd,
    scrollWidth,
    scrollHeight,
    scrollBarSize,
    scrollBarSizeOnFixedHolder,
  }
}

export interface ScrollContext {
  scrollHeadRef: Ref<HTMLDivElement | undefined>
  scrollBodyRef: Ref<HTMLDivElement | undefined>
  scrollFootRef: Ref<HTMLDivElement | undefined>
  handleScroll: (evt?: Event, scrollLeft?: number) => void
  scrollTo: VirtualScrollToFn
  pingedStart: Ref<boolean>
  pingedEnd: Ref<boolean>
  scrollWidth: ComputedRef<string>
  scrollHeight: ComputedRef<string>
  scrollBarSize: ComputedRef<number>
  scrollBarSizeOnFixedHolder: ComputedRef<number>
}

export interface ScrollOptions {
  currentTarget?: HTMLDivElement
  scrollLeft?: number
}

function useScrollRef(setStickyScrollLeft: (value: number) => void) {
  const scrollHeadRef = ref<HTMLDivElement>()
  const scrollBodyRef = ref<HTMLDivElement>()
  const scrollFootRef = ref<HTMLDivElement>()

  const changeStickyScrollLeft = (scrollLeft: number) => {
    const scrollBodyElement = convertElement(scrollBodyRef)
    if (!scrollBodyElement) {
      return
    }
    const { clientWidth, scrollWidth } = scrollBodyElement
    setStickyScrollLeft((scrollLeft / scrollWidth) * clientWidth || 0)
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
