/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ScrollbarProps } from '../types'

import { type ComputedRef, type Ref, computed, onBeforeUnmount, onMounted } from 'vue'

import { useResizeObserver } from '@idux/cdk/resize'
import { callEmit, cancelRAF, rAF, useEventListener, useState } from '@idux/cdk/utils'

export interface ScrollbarStateContext {
  canScroll: ComputedRef<boolean>
  offset: ComputedRef<number>
  thumbSize: ComputedRef<number>
  isDragging: ComputedRef<boolean>
}

export function useScrollbarState(
  props: ScrollbarProps,
  scrollbarRef: Ref<HTMLElement | undefined>,
  thumbRef: Ref<HTMLElement | undefined>,
): ScrollbarStateContext {
  const [scrollbarSize, setScrollbarSize] = useState(0)
  useResizeObserver(scrollbarRef, ({ contentRect }) => {
    setScrollbarSize(props.horizontal ? contentRect.width : contentRect.height)
  })

  const thumbSize = computed(() =>
    getThumbSize(props.thumbMinSize, scrollbarSize.value, props.containerSize, props.scrollRange),
  )

  const enabledScrollRange = computed(() => Math.max(props.scrollRange - props.containerSize, 0))
  const enabledOffsetRange = computed(() => Math.max(scrollbarSize.value - thumbSize.value, 0))
  const offset = computed(() => {
    if (props.scrollOffset === 0 || enabledOffsetRange.value === 0) {
      return 0
    }

    return (props.scrollOffset / enabledScrollRange.value) * enabledOffsetRange.value
  })
  const canScroll = computed(() => enabledScrollRange.value > 0)

  const [isDragging, setIsDragging] = useState(false)
  const [startOffset, setStartOffset] = useState(0)
  const [pageXY, setPageXY] = useState(0)
  let rafId: number

  const onThumbMouseDown = (evt: MouseEvent | TouchEvent) => {
    setIsDragging(true)
    setPageXY(getPageXY(evt, props.horizontal))
    setStartOffset(offset.value)

    callEmit(props.onMoveStart)
    evt.stopPropagation()
    evt.preventDefault()
  }

  const onMouseMove = (evt: MouseEvent | TouchEvent) => {
    cancelRAF(rafId)
    if (!isDragging.value) {
      return
    }

    const _enabledScrollRange = enabledScrollRange.value
    const movedOffset = getPageXY(evt, props.horizontal) - pageXY.value
    const newOffset = startOffset.value + movedOffset

    const ptg = _enabledScrollRange ? newOffset / enabledOffsetRange.value : 0

    let newScrollOffset = Math.ceil(ptg * _enabledScrollRange)
    newScrollOffset = Math.max(newScrollOffset, 0)
    newScrollOffset = Math.min(newScrollOffset, _enabledScrollRange)

    rafId = rAF(() => {
      callEmit(props.onScroll, newScrollOffset)
    })
  }
  const onMouseUp = () => {
    setIsDragging(false)
    callEmit(props.onMoveEnd)
  }

  const onScrollbarTouchStart = (evt: TouchEvent) => {
    evt.preventDefault()
  }

  let listenerStops: (() => void)[] = []
  const clearListeners = () => {
    listenerStops.forEach(stop => stop())
  }

  onMounted(() => {
    listenerStops = [
      useEventListener(scrollbarRef, 'touchstart', onScrollbarTouchStart),
      useEventListener(thumbRef, 'touchstart', onThumbMouseDown),
      useEventListener(thumbRef, 'mousedown', onThumbMouseDown),
      useEventListener(window, 'mousemove', onMouseMove),
      useEventListener(window, 'touchmove', onMouseMove),
      useEventListener(window, 'mouseup', onMouseUp),
      useEventListener(window, 'touchend', onMouseUp),
    ]
  })
  onBeforeUnmount(() => {
    clearListeners()
    cancelRAF(rafId)
  })

  return {
    canScroll,
    offset,
    thumbSize,
    isDragging,
  }
}

function getPageXY(evt: MouseEvent | TouchEvent, horizontal: boolean) {
  const pageData = 'touches' in evt ? evt.touches[0] : evt
  return pageData[horizontal ? 'pageX' : 'pageY']
}

function getThumbSize(thumbMinSize: number, scrollbarSize: number, containerSize = 0, scrollRange = 0) {
  let baseSize = (containerSize / scrollRange) * scrollbarSize
  if (isNaN(baseSize)) {
    baseSize = 0
  }
  baseSize = Math.max(baseSize, thumbMinSize)
  baseSize = Math.min(baseSize, scrollbarSize)
  return Math.floor(baseSize)
}
