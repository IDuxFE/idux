/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type Ref, ref } from 'vue'

import { isNil } from 'lodash-es'

import { isFirefox } from '@idux/cdk/platform'
import { useResizeObserver } from '@idux/cdk/resize'
import { useEventListener } from '@idux/cdk/utils'

import { useTouchMove } from './useTouchMove'
import { useWheel } from './useWheel'
import { type ScrollOptions, setScroll } from '../utils'

export interface ScrollContext {
  scrolledTop: Ref<boolean>
  scrolledBottom: Ref<boolean>
  scrolledLeft: Ref<boolean>
  scrolledRight: Ref<boolean>
  scrollTop: Ref<number>
  scrollLeft: Ref<number>
  scrollHeight: Ref<number>
  scrollWidth: Ref<number>

  syncScroll: (option: { top?: number; left?: number }, setContainerScroll?: boolean) => { top: number; left: number }
  init: () => void
  update: () => void
  destroy: () => void
}

export interface UseScrollOption {
  updateOnResize?: boolean
  setContainerScroll?: boolean
  simulatedScroll?: boolean
  onScroll?: (top: number, left: number) => void
  onScrolledBottom?: () => void
  onScrolledTop?: () => void
  onScrolledLeft?: () => void
  onScrolledRight?: () => void
}

export function useScroll(elementRef: Ref<HTMLElement | undefined>, option?: UseScrollOption): ScrollContext {
  const {
    updateOnResize = true,
    setContainerScroll = true,
    simulatedScroll = false,
    onScroll,
    onScrolledBottom,
    onScrolledTop,
    onScrolledLeft,
    onScrolledRight,
  } = option ?? {}
  const scrolledTop = ref(false)
  const scrolledBottom = ref(false)
  const scrolledLeft = ref(false)
  const scrolledRight = ref(false)
  const scrollTop = ref(0)
  const scrollLeft = ref(0)
  const scrollHeight = ref(0)
  const scrollWidth = ref(0)

  let maxScrollHeight = 0
  let maxScrollWidth = 0
  let containerWidth = 0
  let containerHeight = 0

  const calcScrollEdge = () => {
    scrolledTop.value = scrollTop.value <= 0
    scrolledBottom.value = scrollTop.value + containerHeight >= scrollHeight.value
    scrolledLeft.value = scrollLeft.value <= 0
    scrolledRight.value = scrollLeft.value + containerWidth >= scrollWidth.value

    if (scrolledTop.value) {
      onScrolledTop?.()
    }
    if (scrolledBottom.value) {
      onScrolledBottom?.()
    }
    if (scrolledLeft.value) {
      onScrolledLeft?.()
    }
    if (scrolledRight.value) {
      onScrolledRight?.()
    }
  }

  const syncScroll = ({ top, left }: { top?: number; left?: number }, _setContainerScroll = false) => {
    const scrollOptions: ScrollOptions = {}
    let updated = false

    update()

    if (!isNil(top)) {
      scrollTop.value = keepInRange(maxScrollHeight, top)
      scrollOptions.scrollTop = scrollTop.value
      updated = true
    }

    if (!isNil(left)) {
      scrollLeft.value = keepInRange(maxScrollWidth, left)
      scrollOptions.scrollLeft = scrollLeft.value
      updated = true
    }

    if (updated) {
      _setContainerScroll && setScroll(scrollOptions, elementRef.value)
      calcScrollEdge()
    }

    return {
      top: scrollTop.value,
      left: scrollLeft.value,
    }
  }

  const onScrollChange = (offset: number, isHorizontal: boolean) => {
    if (!elementRef.value) {
      return
    }

    let scrollOption: { top?: number; left?: number } = {}
    if (isHorizontal) {
      scrollOption = { left: scrollLeft.value + offset }
    } else {
      scrollOption = { top: scrollTop.value + offset }
    }

    syncScroll(scrollOption, setContainerScroll)
    onScroll?.(scrollTop.value, scrollLeft.value)
  }

  const { init: initWheel, destroy: destroyWheel } = useWheel(
    elementRef,
    scrolledTop,
    scrolledBottom,
    scrolledLeft,
    scrolledRight,
    onScrollChange,
  )
  const { init: initTouchMove, destroy: destroyTouchMove } = useTouchMove(
    elementRef,
    scrolledTop,
    scrolledBottom,
    scrolledLeft,
    scrolledRight,
    onScrollChange,
  )

  let pixelScrollListenerStop: (() => void) | null = null
  let resizeObserverStop: (() => void) | null = null

  const update = () => {
    const target = elementRef.value
    if (!target) {
      return
    }

    const { scrollHeight: _scrollHeight, scrollWidth: _scrollWidth, clientHeight, clientWidth } = target
    containerHeight = clientHeight
    containerWidth = clientWidth
    scrollHeight.value = _scrollHeight
    scrollWidth.value = _scrollWidth
    maxScrollHeight = _scrollHeight > 0 ? Math.max(_scrollHeight - clientHeight, 0) : 0
    maxScrollWidth = _scrollWidth > 0 ? Math.max(_scrollWidth - clientWidth, 0) : 0

    calcScrollEdge()

    if (isFirefox && !pixelScrollListenerStop && (_scrollHeight > clientHeight || _scrollWidth > clientWidth)) {
      pixelScrollListenerStop = useEventListener(elementRef, 'MozMousePixelScroll', evt => evt.preventDefault())
    } else {
      pixelScrollListenerStop?.()
      pixelScrollListenerStop = null
    }
  }

  const stop = () => {
    pixelScrollListenerStop?.()
    resizeObserverStop?.()
    pixelScrollListenerStop = null
    resizeObserverStop = null
  }

  const init = () => {
    destroy()
    update()

    if (updateOnResize) {
      resizeObserverStop = useResizeObserver(elementRef, () => update())
    }

    if (simulatedScroll) {
      initWheel()
      initTouchMove()
    }
  }

  const destroy = () => {
    stop()
    destroyWheel()
    destroyTouchMove()
  }

  return {
    scrolledTop,
    scrolledBottom,
    scrolledLeft,
    scrolledRight,
    scrollTop,
    scrollLeft,
    scrollHeight,
    scrollWidth,
    syncScroll,
    init,
    update,
    destroy,
  }
}

function keepInRange(maxScrollSize: number, newScrollSize: number) {
  let newSize = Math.max(newScrollSize, 0)
  if (!Number.isNaN(maxScrollSize)) {
    newSize = Math.min(newSize, maxScrollSize)
  }
  return newSize
}
