/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type Ref, computed, isRef, ref } from 'vue'

import { isNil } from 'lodash-es'

import { useResizeObserver } from '@idux/cdk/resize'
import { useEventListener } from '@idux/cdk/utils'

import { useTouchMove } from './useTouchMove'
import { useWheel } from './useWheel'
import { type ScrollToOptions, scrollTo } from '../utils'

export interface ScrollContext {
  scrolledTop: Ref<boolean>
  scrolledBottom: Ref<boolean>
  scrolledLeft: Ref<boolean>
  scrolledRight: Ref<boolean>
  scrollTop: Ref<number>
  scrollLeft: Ref<number>
  scrollHeight: Ref<number>
  scrollWidth: Ref<number>
  containerHeight: Ref<number>
  containerWidth: Ref<number>
  horizontalOverflowed: Ref<boolean>
  verticalOverflowed: Ref<boolean>

  syncScroll: (option: { top?: number; left?: number }, setContainerScroll?: boolean) => { top: number; left: number }
  init: () => void
  update: () => void
  destroy: () => void
}

export interface SimulatedScrollOptions {
  scrollbarWidth: number
  scrollbarHeight: number
}

const defaultSimulatedScrollOptions: SimulatedScrollOptions = {
  scrollbarWidth: 0,
  scrollbarHeight: 0,
}

export interface UseScrollOption {
  animationDuration?: number
  updateOnResize?: boolean
  syncOnScroll?: boolean
  setContainerScroll?: boolean
  simulatedScroll?: boolean | SimulatedScrollOptions | Ref<boolean> | Ref<SimulatedScrollOptions>

  onScroll?: (top: number, left: number) => void
  onScrolledBottom?: () => void
  onScrolledTop?: () => void
  onScrolledLeft?: () => void
  onScrolledRight?: () => void
}

export function useScroll(elementRef: Ref<HTMLElement | undefined>, option?: UseScrollOption): ScrollContext {
  const {
    animationDuration = 0,
    updateOnResize = true,
    syncOnScroll = true,
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
  const containerWidth = ref(0)
  const containerHeight = ref(0)
  const horizontalOverflowed = ref(false)
  const verticalOverflowed = ref(false)

  let maxScrollHeight = 0
  let maxScrollWidth = 0

  const mergedSimulatedScroll = computed(() => {
    const resolvedSimulatedScroll = isRef(simulatedScroll) ? simulatedScroll.value : simulatedScroll

    if (!resolvedSimulatedScroll) {
      return false
    }

    if (resolvedSimulatedScroll === true) {
      return defaultSimulatedScrollOptions
    }

    return resolvedSimulatedScroll
  })

  const calcScrollEdge = (emit: boolean) => {
    scrolledTop.value = scrollTop.value <= 0
    scrolledBottom.value = scrollTop.value + containerHeight.value >= scrollHeight.value
    scrolledLeft.value = scrollLeft.value <= 0
    scrolledRight.value = scrollLeft.value + containerWidth.value >= scrollWidth.value

    if (!emit) {
      return
    }

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

  const calcScrollOverflowed = () => {
    let _containerHeight = Math.ceil(containerHeight.value)
    let _containerWidth = Math.ceil(containerWidth.value)

    if (!mergedSimulatedScroll.value) {
      verticalOverflowed.value = scrollHeight.value > _containerHeight
      horizontalOverflowed.value = scrollWidth.value > _containerWidth
      return
    }

    const { scrollbarWidth, scrollbarHeight } = mergedSimulatedScroll.value

    let _verticalOverflowed = false
    let _horizontalOverflowed = false
    const _scrollWidth = scrollWidth.value
    const _scrollHeight = scrollHeight.value
    const lastVerticalOverflowed = verticalOverflowed.value
    const lastHorizontalOverflowed = horizontalOverflowed.value

    const calc = () => {
      let currentContainerWidth = _containerWidth
      let currentContainerHeight = _containerHeight
      const currentVerticalOverflowed = _verticalOverflowed || _scrollHeight > currentContainerHeight

      if (currentVerticalOverflowed && !_verticalOverflowed && !lastVerticalOverflowed) {
        currentContainerWidth -= scrollbarWidth
      }

      const currentHorizontalOverflowed = _horizontalOverflowed || _scrollWidth > currentContainerWidth

      if (currentHorizontalOverflowed && !_horizontalOverflowed && !lastHorizontalOverflowed) {
        currentContainerHeight -= scrollbarHeight
      }

      _verticalOverflowed = currentVerticalOverflowed
      _horizontalOverflowed = currentHorizontalOverflowed

      if (currentContainerWidth !== _containerWidth || currentContainerHeight !== _containerHeight) {
        _containerWidth = currentContainerWidth
        _containerHeight = currentContainerHeight
        calc()
      }
    }

    calc()

    verticalOverflowed.value = _verticalOverflowed
    horizontalOverflowed.value = _horizontalOverflowed
  }

  const syncScroll = ({ top, left }: { top?: number; left?: number }, _setContainerScroll = false) => {
    const scrollOptions: ScrollToOptions = {
      target: elementRef.value,
      duration: animationDuration,
    }
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
      _setContainerScroll && scrollTo(scrollOptions)
      calcScrollEdge(true)
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

  let resizeObserverStop: (() => void) | null = null
  let onScrollStop: (() => void) | null = null

  const update = () => {
    const target = elementRef.value
    if (!target) {
      return
    }

    const { scrollHeight: _scrollHeight, scrollWidth: _scrollWidth, clientHeight, clientWidth } = target
    containerHeight.value = clientHeight
    containerWidth.value = clientWidth
    scrollHeight.value = _scrollHeight
    scrollWidth.value = _scrollWidth
    maxScrollHeight = _scrollHeight > 0 ? Math.max(_scrollHeight - clientHeight, 0) : 0
    maxScrollWidth = _scrollWidth > 0 ? Math.max(_scrollWidth - clientWidth, 0) : 0
  }

  const updateAndCalculate = () => {
    update()
    calcScrollEdge(false)
    calcScrollOverflowed()
  }

  const stop = () => {
    resizeObserverStop?.()
    onScrollStop?.()
    resizeObserverStop = null
    onScrollStop = null
  }

  const init = () => {
    destroy()

    if (updateOnResize) {
      resizeObserverStop = useResizeObserver(elementRef, () => updateAndCalculate())
    } else {
      updateAndCalculate()
    }

    if (syncOnScroll) {
      onScrollStop = useEventListener(elementRef, 'scroll', () => {
        if (!elementRef.value) {
          return
        }

        const { scrollLeft, scrollTop } = elementRef.value
        syncScroll({ left: scrollLeft, top: scrollTop })
      })
    }

    if (mergedSimulatedScroll.value) {
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
    containerHeight,
    containerWidth,
    horizontalOverflowed,
    verticalOverflowed,
    syncScroll,
    init,
    update: updateAndCalculate,
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
