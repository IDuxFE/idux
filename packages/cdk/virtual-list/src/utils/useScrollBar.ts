import type { ComputedRef, Ref } from 'vue'
import type { VirtualFillerInstance, VirtualListProps, VirtualScrollBarInstance } from '../types'

import { computed, ref } from 'vue'
import { isFunction } from '@idux/cdk/utils'
import { useItemKey } from './useItem'

export interface ScrollBarState {
  scrollHeight?: number
  start: number
  end: number
  offset?: number
}

export type OriginScroll = (deltaY: number, smoothOffset?: boolean) => boolean
export type SyncScrollTop = (newTop: number | ((prev: number) => number)) => void

export interface UseScrollBar {
  scrollBarRef: Ref<VirtualScrollBarInstance | undefined>
  scrollTop: Ref<number>
  scrollMoving: Ref<boolean>
  scrollState: ComputedRef<ScrollBarState>
  originScroll: OriginScroll
  syncScrollTop: SyncScrollTop
  setScrollMoving: (value: boolean) => void
}

const useScrollState = (
  props: VirtualListProps,
  useVirtual: ComputedRef<boolean>,
  fillerRef: Ref<VirtualFillerInstance | undefined>,
  heights: Record<string, number>,
  scrollTop: Ref<number>,
): ComputedRef<ScrollBarState> => {
  return computed(() => {
    const { data, itemHeight, height } = props
    const dataLength = data.length

    // Always use virtual scroll bar in avoid shaking
    if (!useVirtual.value || dataLength === 0 || itemHeight * data.length <= height) {
      const scrollHeight = !useVirtual.value ? undefined : fillerRef.value?.offsetHeight || 0
      return {
        scrollHeight,
        start: 0,
        end: dataLength - 1,
        offset: undefined,
      }
    }

    let itemTop = 0
    let startIndex: number | undefined
    let startOffset: number | undefined
    let endIndex: number | undefined

    for (let index = 0; index < dataLength; index += 1) {
      const item = data[index]
      const key = useItemKey(props, item)
      const cacheHeight = heights[key]
      const currentItemBottom = itemTop + (cacheHeight === undefined ? itemHeight! : cacheHeight)

      if (currentItemBottom >= scrollTop.value && startIndex === undefined) {
        startIndex = index
        startOffset = itemTop
      }

      // Check item bottom in the range. We will render additional one item for motion usage
      if (currentItemBottom > scrollTop.value + height! && endIndex === undefined) {
        endIndex = index
      }

      itemTop = currentItemBottom
    }

    // Fallback to normal if not match. This code should never reach
    /* istanbul ignore next */
    if (startIndex === undefined) {
      startIndex = 0
      startOffset = 0
    }
    if (endIndex === undefined) {
      endIndex = dataLength - 1
    }

    // Give cache to improve scroll experience
    endIndex = Math.min(endIndex + 1, dataLength)

    return {
      scrollHeight: itemTop,
      start: startIndex,
      end: endIndex,
      offset: startOffset,
    }
  })
}

const useOriginScroll = (isScrollAtTop: Ref<boolean>, isScrollAtBottom: Ref<boolean>): OriginScroll => {
  // Do lock for a wheel when scrolling
  let lock = false
  let lockTimeout: number
  const lockScroll = () => {
    clearTimeout(lockTimeout)
    lock = true
    lockTimeout = setTimeout(() => (lock = false), 50)
  }

  return (deltaY: number, smoothOffset = false) => {
    const originScroll =
      // Pass origin wheel when on the top
      (deltaY < 0 && isScrollAtTop.value) ||
      // Pass origin wheel when on the bottom
      (deltaY > 0 && isScrollAtBottom.value)

    if (smoothOffset && originScroll) {
      // No need lock anymore when it's smooth offset from touchMove interval
      clearTimeout(lockTimeout)
      lock = false
    } else if (!originScroll || lock) {
      lockScroll()
    }

    return !lock && originScroll
  }
}

const keepInRange = (maxScrollHeight: number, newScrollTop: number) => {
  let newTop = Math.max(newScrollTop, 0)
  if (!Number.isNaN(maxScrollHeight)) {
    newTop = Math.min(newTop, maxScrollHeight)
  }
  return newTop
}

export const useScrollBar = (
  props: VirtualListProps,
  scrollBarRef: Ref<VirtualScrollBarInstance | undefined>,
  componentElement: ComputedRef<HTMLElement | undefined>,
  fillerRef: Ref<VirtualFillerInstance | undefined>,
  useVirtual: ComputedRef<boolean>,
  heights: Record<string, number>,
): UseScrollBar => {
  const scrollTop = ref(0)
  const scrollMoving = ref(false)
  const scrollState = useScrollState(props, useVirtual, fillerRef, heights, scrollTop)
  const maxScrollHeight = computed(() => {
    const scrollHeight = scrollState.value.scrollHeight
    return scrollHeight ? scrollHeight - props.height : NaN
  })

  const isScrollAtTop = computed(() => scrollTop.value <= 0)
  const isScrollAtBottom = computed(() => scrollTop.value >= maxScrollHeight.value)
  const originScroll = useOriginScroll(isScrollAtTop, isScrollAtBottom)

  const syncScrollTop = (newTop: number | ((prev: number) => number)) => {
    const value = isFunction(newTop) ? newTop(scrollTop.value) : newTop
    const alignedTop = keepInRange(maxScrollHeight.value, value)
    if (componentElement.value) {
      componentElement.value.scrollTop = alignedTop
    }
    scrollTop.value = alignedTop
  }

  const setScrollMoving = (value: boolean) => {
    scrollMoving.value = value
  }

  return {
    scrollBarRef,
    scrollTop,
    scrollMoving,
    scrollState,
    originScroll,
    syncScrollTop,
    setScrollMoving,
  }
}
