/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, type Ref, computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

import { useResizeObserver } from '@idux/cdk/resize'
import { type VirtualScrollInstance, type VirtualScrollToFn, getScrollBarSize, scrollToTop } from '@idux/cdk/scroll'
import { Logger, convertCssPixel, convertElement } from '@idux/cdk/utils'

import { type TableProps } from '../types'
import { type StickyContext } from './useSticky'

export function useScroll(
  props: TableProps,
  mergedAutoHeight: ComputedRef<boolean>,
  { setStickyScrollLeft }: StickyContext,
): ScrollContext {
  const virtualScrollRef = ref<VirtualScrollInstance | undefined>()
  const scrollHeadRef = ref<HTMLDivElement>()
  const scrollBodyRef = ref<HTMLDivElement>()
  const scrollContentRef = ref<HTMLDivElement>()
  const scrollFootRef = ref<HTMLDivElement>()

  watch(
    virtualScrollRef,
    instance => {
      if (instance) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        scrollBodyRef.value = (instance as any).holderRef
      }
    },
    { immediate: true },
  )

  const { handleScroll, pingedStart, pingedEnd } = useScrollRef(
    scrollHeadRef,
    scrollBodyRef,
    scrollFootRef,
    setStickyScrollLeft,
  )

  const scrollWidth = computed(() => convertCssPixel(props.scroll?.width))
  const scrollHeight = computed(() => {
    let height = convertCssPixel(props.scroll?.height)
    if (!height && mergedAutoHeight.value) {
      height = 'auto'
    }
    return height
  })
  const { hasVerticalScrollbar, hasHorizontalScrollbar } = useScrollbarDetect(
    scrollHeight,
    scrollBodyRef,
    scrollContentRef,
  )

  const scrollBarSize = computed(() => getScrollBarSize(convertElement(scrollBodyRef)))
  const scrollBarSizeOnFixedHolder = computed(() => (hasVerticalScrollbar.value ? scrollBarSize.value : 0))

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
    scrollHeadRef,
    scrollBodyRef,
    scrollContentRef,
    scrollFootRef,
    handleScroll,
    scrollTo,
    hasVerticalScrollbar,
    hasHorizontalScrollbar,
    pingedStart,
    pingedEnd,
    scrollHeight,
    scrollWidth,
    scrollBarSize,
    scrollBarSizeOnFixedHolder,
  }
}

export interface ScrollContext {
  virtualScrollRef: Ref<VirtualScrollInstance | undefined>
  scrollHeadRef: Ref<HTMLDivElement | undefined>
  scrollBodyRef: Ref<HTMLDivElement | undefined>
  scrollContentRef: Ref<HTMLDivElement | undefined>
  scrollFootRef: Ref<HTMLDivElement | undefined>
  handleScroll: (evt?: Event, scrollLeft?: number) => void
  scrollTo: VirtualScrollToFn
  hasVerticalScrollbar: Ref<boolean>
  hasHorizontalScrollbar: Ref<boolean>
  pingedStart: Ref<boolean>
  pingedEnd: Ref<boolean>
  scrollHeight: ComputedRef<string>
  scrollWidth: ComputedRef<string>
  scrollBarSize: ComputedRef<number>
  scrollBarSizeOnFixedHolder: ComputedRef<number>
}

export interface ScrollOptions {
  currentTarget?: HTMLDivElement
  scrollLeft?: number
}

function useScrollRef(
  scrollHeadRef: Ref<HTMLDivElement | undefined>,
  scrollBodyRef: Ref<HTMLDivElement | undefined>,
  scrollFootRef: Ref<HTMLDivElement | undefined>,
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

  return { handleScroll, pingedStart, pingedEnd }
}

// 检测是否有竖向滚动条
function useScrollbarDetect(
  scrollHeight: ComputedRef<string>,
  scrollBodyRef: Ref<HTMLDivElement | undefined>,
  scrollContentRef: Ref<HTMLDivElement | undefined>,
): {
  hasVerticalScrollbar: Ref<boolean>
  hasHorizontalScrollbar: Ref<boolean>
} {
  const hasVerticalScrollbar = ref(false)
  const hasHorizontalScrollbar = ref(false)

  const checkVerticalScrollBarExistance = () => {
    const bodyEl = convertElement(scrollBodyRef.value)
    const contentEl = convertElement(scrollContentRef.value)
    if (!bodyEl || !contentEl) {
      hasVerticalScrollbar.value = false
      hasHorizontalScrollbar.value = false
    } else {
      hasVerticalScrollbar.value = bodyEl.clientHeight < contentEl.clientHeight
      hasHorizontalScrollbar.value = bodyEl.clientWidth < contentEl.clientWidth
    }
  }

  let stopResizeObservers: Array<() => void> = []
  let stopElWatch: (() => void) | undefined
  const stopHandler = () => {
    stopResizeObservers.forEach(stop => stop())
    stopElWatch?.()

    stopResizeObservers = []
    stopElWatch = undefined
  }

  onMounted(() => {
    watch(
      scrollHeight,
      height => {
        stopHandler()
        if (height === 'auto') {
          stopResizeObservers = [
            useResizeObserver(scrollBodyRef, checkVerticalScrollBarExistance),
            useResizeObserver(scrollContentRef, checkVerticalScrollBarExistance),
          ]
        } else {
          stopElWatch = watch([scrollBodyRef, scrollContentRef], checkVerticalScrollBarExistance, { immediate: true })
        }
      },
      { immediate: true },
    )
  })

  onBeforeUnmount(() => stopHandler())

  return {
    hasVerticalScrollbar,
    hasHorizontalScrollbar,
  }
}
