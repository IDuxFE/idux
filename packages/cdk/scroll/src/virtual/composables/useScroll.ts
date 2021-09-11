import type { ComputedRef, Ref } from 'vue'
import type { VirtualScrollProps } from '../types'

import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { isFunction, throttle } from 'lodash-es'
import { GetKey } from './useGetKey'

export interface ScrollBarState {
  scrollHeight: number
  start: number
  end: number
  offset?: number
}

export type OriginScroll = (deltaY: number, smoothOffset?: boolean) => boolean
export type SyncScrollTop = (newTop: number | ((prev: number) => number)) => void

export interface ScrollContext {
  scrollTop: Ref<number>
  scrollMoving: Ref<boolean>
  scrollState: ComputedRef<ScrollBarState>
  originScroll: OriginScroll
  syncScrollTop: SyncScrollTop
  setScrollMoving: (value: boolean) => void
  scrollBarVisible: ComputedRef<boolean>
  hideScrollBar: () => void
}

const useScrollState = (
  props: VirtualScrollProps,
  fillerRef: Ref<HTMLElement | undefined>,
  useVirtual: ComputedRef<boolean>,
  getKey: ComputedRef<GetKey>,
  heights: Record<string, number>,
  scrollTop: Ref<number>,
): ComputedRef<ScrollBarState> => {
  return computed(() => {
    const { data, itemHeight, height } = props
    const dataLength = data.length

    // Always use virtual scroll bar in avoid shaking
    if (!useVirtual.value || dataLength === 0 || itemHeight * data.length <= height) {
      return {
        scrollHeight: useVirtual.value ? fillerRef.value?.offsetHeight ?? 0 : 0,
        start: 0,
        end: dataLength - 1,
        offset: undefined,
      }
    }

    let itemTop = 0
    let startIndex: number | undefined
    let startOffset: number | undefined
    let endIndex: number | undefined

    const getKeyFn = getKey.value
    for (let index = 0; index < dataLength; index += 1) {
      const item = data[index]
      const key = getKeyFn(item)
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
  let lockTimeout: NodeJS.Timeout
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

export function useScroll(
  props: VirtualScrollProps,
  holderRef: Ref<HTMLElement | undefined>,
  fillerRef: Ref<HTMLElement | undefined>,
  useVirtual: ComputedRef<boolean>,
  getKey: ComputedRef<GetKey>,
  heights: Record<string, number>,
): ScrollContext {
  const scrollTop = ref(0)
  const scrollMoving = ref(false)
  const scrollState = useScrollState(props, fillerRef, useVirtual, getKey, heights, scrollTop)
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
    const holderElement = holderRef.value
    if (holderElement) {
      holderElement.scrollTop = alignedTop
    }
    scrollTop.value = alignedTop
  }

  const setScrollMoving = (value: boolean) => {
    scrollMoving.value = value
  }

  const { scrollBarVisible, hideScrollBar } = useVisible(props, scrollState, scrollTop)

  return {
    scrollTop,
    scrollMoving,
    scrollState,
    originScroll,
    syncScrollTop,
    setScrollMoving,
    scrollBarVisible,
    hideScrollBar,
  }
}

function useVisible(props: VirtualScrollProps, scrollState: ComputedRef<ScrollBarState>, scrollTop: Ref<number>) {
  const _visible = ref(false)
  let visibleTimeout: NodeJS.Timeout

  const hideScrollBar = throttle(() => {
    clearTimeout(visibleTimeout)
    _visible.value = true
    visibleTimeout = setTimeout(() => (_visible.value = false), 1200)
  }, 300)

  watch(scrollTop, hideScrollBar, { flush: 'post' })

  const scrollBarVisible = computed(() => {
    const { scrollHeight = 0 } = scrollState.value
    if (props.height >= scrollHeight) {
      return false
    }
    return _visible.value
  })

  onBeforeUnmount(() => clearTimeout(visibleTimeout))

  return { scrollBarVisible, hideScrollBar }
}
