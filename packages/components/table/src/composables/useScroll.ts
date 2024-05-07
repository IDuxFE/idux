/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, type Ref, computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

import { useResizeObserver } from '@idux/cdk/resize'
import { type VirtualScrollInstance, type VirtualScrollToFn, getScrollBarSize, scrollToTop } from '@idux/cdk/scroll'
import { Logger, callEmit, convertCssPixel, convertElement } from '@idux/cdk/utils'

import { type StickyContext } from './useSticky'
import { type TableProps } from '../types'

export function useScroll(props: TableProps, { setStickyScrollLeft }: StickyContext): ScrollContext {
  const virtualScrollRef = ref<VirtualScrollInstance | undefined>()
  const headerVirtualScrollRef = ref<VirtualScrollInstance | undefined>()
  const scrollHeadRef = ref<HTMLDivElement>()
  const scrollBodyRef = ref<HTMLDivElement>()
  const scrollContentRef = ref<HTMLDivElement>()
  const scrollFootRef = ref<HTMLDivElement>()

  watch(
    virtualScrollRef,
    instance => {
      if (instance) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        scrollBodyRef.value = (instance as any).getHolderElement()
      }
    },
    {
      immediate: true,
    },
  )
  watch(
    headerVirtualScrollRef,
    instance => {
      if (instance) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        scrollHeadRef.value = (instance as any).getHolderElement()
        scrollHeadRef.value!.style.overflow = 'hidden'
      }
    },
    {
      immediate: true,
    },
  )

  const resizeMark = useTableResized(scrollBodyRef, scrollContentRef)

  const { handleScroll, pingedStart, pingedEnd } = useScrollRef(
    props,
    virtualScrollRef,
    headerVirtualScrollRef,
    scrollHeadRef,
    scrollBodyRef,
    scrollFootRef,
    resizeMark,
    setStickyScrollLeft,
  )

  const { scrollHorizontalOverflowed, scrollVerticalOverflowed } = useScrollOverflowed(scrollBodyRef, resizeMark)
  const scrollWidth = computed(() => convertCssPixel(props.scroll?.width))
  const scrollHeight = computed(() => convertCssPixel(props.scroll?.height))

  const scrollBarSize = computed(() => getScrollBarSize(convertElement(scrollBodyRef)))
  const scrollBarSizeOnFixedHolder = computed(() => (scrollVerticalOverflowed.value ? scrollBarSize.value : 0))

  const mergedPingedStart = computed(() => pingedStart.value && scrollHorizontalOverflowed.value)
  const mergedPingedEnd = computed(() => pingedEnd.value && scrollHorizontalOverflowed.value)

  const scrollTo: VirtualScrollToFn = options => {
    if (props.virtual) {
      virtualScrollRef.value?.scrollTo(options)
    } else {
      if (typeof options === 'number') {
        scrollToTop({ target: convertElement(scrollBodyRef), top: options, duration: 200 })
      } else {
        __DEV__ &&
          Logger.warn('components/table', 'the scrollTo argument must be a number, when virtual is not enabled.')
      }
    }
  }

  return {
    virtualScrollRef,
    headerVirtualScrollRef,
    scrollHeadRef,
    scrollBodyRef,
    scrollContentRef,
    scrollFootRef,
    handleScroll,
    scrollTo,
    pingedStart: mergedPingedStart,
    pingedEnd: mergedPingedEnd,
    scrollWidth,
    scrollHeight,
    scrollBarSize,
    scrollBarSizeOnFixedHolder,
    scrollHorizontalOverflowed,
    scrollVerticalOverflowed,
  }
}

export interface ScrollContext {
  virtualScrollRef: Ref<VirtualScrollInstance | undefined>
  headerVirtualScrollRef: Ref<VirtualScrollInstance | undefined>
  scrollHeadRef: Ref<HTMLDivElement | undefined>
  scrollBodyRef: Ref<HTMLDivElement | undefined>
  scrollContentRef: Ref<HTMLDivElement | undefined>
  scrollFootRef: Ref<HTMLDivElement | undefined>
  handleScroll: (evt?: Event, scrollLeft?: number) => void
  scrollTo: VirtualScrollToFn
  pingedStart: Ref<boolean>
  pingedEnd: Ref<boolean>
  scrollWidth: ComputedRef<string>
  scrollHeight: ComputedRef<string>
  scrollBarSize: ComputedRef<number>
  scrollBarSizeOnFixedHolder: ComputedRef<number>
  scrollHorizontalOverflowed: Ref<boolean>
  scrollVerticalOverflowed: Ref<boolean>
}

export interface ScrollOptions {
  currentTarget?: HTMLDivElement
  scrollLeft?: number
}

function useScrollRef(
  props: TableProps,
  virtualScrollRef: Ref<VirtualScrollInstance | undefined>,
  headerVirtualScrollRef: Ref<VirtualScrollInstance | undefined>,
  scrollHeadRef: Ref<HTMLDivElement | undefined>,
  scrollBodyRef: Ref<HTMLDivElement | undefined>,
  scrollFootRef: Ref<HTMLDivElement | undefined>,
  resizeMark: Ref<boolean>,
  setStickyScrollLeft: (value: number) => void,
) {
  const pingedStart = ref(false)
  const pingedEnd = ref(false)

  let timeout: number | undefined

  const clearTimer = () => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = undefined
    }
  }

  onBeforeUnmount(() => clearTimer())

  const lockedScrollTargetRef = ref<HTMLElement>()

  const lockScrollTarget = (target: HTMLElement | undefined) => {
    lockedScrollTargetRef.value = target
    clearTimer()

    timeout = setTimeout(() => {
      lockedScrollTargetRef.value = undefined
      timeout = undefined
    }, 100)
  }

  const forceScroll = (scrollLeft: number, target: HTMLElement | undefined) => {
    if (!target) {
      return
    }

    if (target.scrollLeft !== scrollLeft) {
      target.scrollLeft = scrollLeft
    }
  }
  const forceVirtualScroll = (scrollLeft: number, target: VirtualScrollInstance | undefined) => {
    if (!target) {
      return
    }

    target.scrollTo({ left: scrollLeft })
  }

  const changeStickyScrollLeft = (scrollLeft: number) => {
    const scrollBodyElement = convertElement(scrollBodyRef)
    if (!scrollBodyElement) {
      return
    }
    const { clientWidth, scrollWidth } = scrollBodyElement
    setStickyScrollLeft((scrollLeft / scrollWidth) * clientWidth || 0)
  }

  const handleScroll = (evt?: Event, scrollLeft?: number) => {
    const currentTarget = evt?.currentTarget as HTMLElement | undefined
    const mergedScrollLeft = scrollLeft ?? currentTarget!.scrollLeft

    const lockedTarget = lockedScrollTargetRef.value
    if (!lockedTarget || lockedTarget === currentTarget) {
      lockScrollTarget(currentTarget)
      headerVirtualScrollRef.value
        ? forceVirtualScroll(mergedScrollLeft, headerVirtualScrollRef.value)
        : forceScroll(mergedScrollLeft, scrollHeadRef.value)
      virtualScrollRef.value
        ? forceVirtualScroll(mergedScrollLeft, virtualScrollRef.value)
        : forceScroll(mergedScrollLeft, convertElement(scrollBodyRef))
      forceScroll(mergedScrollLeft, scrollFootRef.value)
      changeStickyScrollLeft(mergedScrollLeft)
    }

    if (currentTarget) {
      const { scrollWidth, clientWidth } = currentTarget
      pingedStart.value = mergedScrollLeft > 1
      pingedEnd.value = scrollWidth - clientWidth - mergedScrollLeft > 1
    }

    if (evt?.type === 'scroll') {
      callEmit(props.onScroll, evt)
    }
  }

  watch(resizeMark, () => {
    const currentTarget = convertElement(scrollBodyRef)
    if (currentTarget) {
      handleScroll({ currentTarget } as unknown as Event)
    }
  })

  return { handleScroll, pingedStart, pingedEnd }
}

function useScrollOverflowed(scrollBodyRef: Ref<HTMLDivElement | undefined>, resizeMark: Ref<boolean>) {
  const scrollHorizontalOverflowed = ref(false)
  const scrollVerticalOverflowed = ref(false)

  const calcScrollOverflowed = () => {
    const bodyEl = convertElement(scrollBodyRef.value)
    if (!bodyEl) {
      scrollHorizontalOverflowed.value = false
      scrollVerticalOverflowed.value = false
    } else {
      scrollHorizontalOverflowed.value = bodyEl.scrollWidth > bodyEl.clientWidth
      scrollVerticalOverflowed.value = bodyEl.scrollHeight > bodyEl.clientHeight
    }
  }

  watch(resizeMark, calcScrollOverflowed)

  return {
    scrollHorizontalOverflowed,
    scrollVerticalOverflowed,
  }
}

function useTableResized(
  scrollBodyRef: Ref<HTMLDivElement | undefined>,
  scrollContentRef: Ref<HTMLDivElement | undefined>,
) {
  const resizeMark = ref(false)
  const handleResize = () => {
    resizeMark.value = !resizeMark.value
  }

  let stopResizeObservers: Array<() => void> = []
  const stopHandler = () => stopResizeObservers.forEach(stop => stop())

  onMounted(() => {
    stopResizeObservers = [
      useResizeObserver(scrollBodyRef, handleResize),
      useResizeObserver(scrollContentRef, handleResize),
    ]
  })

  onBeforeUnmount(() => stopHandler())

  return resizeMark
}
