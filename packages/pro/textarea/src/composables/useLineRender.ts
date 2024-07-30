/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProTextareaProps, TextareaError } from '../types'

import { type ComputedRef, type Ref, onMounted, watch } from 'vue'

import { useResizeObserver } from '@idux/cdk/resize'
import { cancelRAF, rAF, useEventListener, useState } from '@idux/cdk/utils'

export interface LineRenderContext {
  renderedErrors: ComputedRef<TextareaError[]>
  renderedLinesIndex: ComputedRef<{ start: number; end: number }>
  renderedTopOffset: ComputedRef<number>
}

export function useErrorLineRender(
  props: ProTextareaProps,
  rowHeights: ComputedRef<number[]>,
  scrollHolderRef: Ref<HTMLElement | undefined>,
): LineRenderContext {
  const [renderedErrors, setRenderedErrors] = useState<TextareaError[]>([])
  const [renderedLinesIndex, setRenderedLinesIndex] = useState<{ start: number; end: number }>({ start: 0, end: 0 })
  const [renderedTopOffset, setRenderedTopOffset] = useState<number>(0)

  let scrollHolderHeight = 0

  const calcErrorRenderState = () => {
    if (!scrollHolderRef.value) {
      setRenderedErrors([])
      setRenderedLinesIndex({ start: 0, end: 0 })
      setRenderedTopOffset(0)
      return
    }

    const errors = [...(props.errors ?? [])].sort((err1, err2) => err2.index - err1.index)
    const heights = rowHeights.value

    const { scrollTop, clientHeight } = scrollHolderRef.value

    const top = scrollTop
    const bottom = top + clientHeight

    let currentBottom = 0
    let currentTop = 0
    let currentErr = errors.pop()

    const newErrors: TextareaError[] = []
    let lineTopIndex: number = -1
    let lineBottomIndex: number = 0
    let offsetTop: number = 0

    for (let index = 0; index < heights.length; index++) {
      const height = heights[index]
      const isCurrentErrIdx = currentErr && currentErr.index === index

      currentBottom += height

      if (currentBottom < top) {
        if (isCurrentErrIdx) {
          currentErr = errors.pop()
        }

        currentTop += height
        continue
      }

      if (lineTopIndex === -1) {
        lineTopIndex = index
        offsetTop = currentTop
      }

      if (isCurrentErrIdx) {
        newErrors.push(currentErr!)
        currentErr = errors.pop()
      }

      lineBottomIndex = index

      if (currentTop > bottom) {
        break
      }

      currentTop += height
    }

    setRenderedErrors(newErrors)
    setRenderedLinesIndex({ start: lineTopIndex, end: lineBottomIndex })
    setRenderedTopOffset(offsetTop)
  }

  onMounted(() => {
    watch([() => props.errors, rowHeights, scrollHolderRef], calcErrorRenderState, { immediate: true })
  })

  let rafId: number | null
  useEventListener(scrollHolderRef, 'scroll', () => {
    rafId && cancelRAF(rafId)

    rafId = rAF(() => {
      calcErrorRenderState()
      rafId = null
    })
  })
  useResizeObserver(scrollHolderRef, ({ contentRect: { height } }) => {
    if (scrollHolderHeight && scrollHolderHeight !== height) {
      calcErrorRenderState()
    }

    scrollHolderHeight = height
  })

  return {
    renderedErrors,
    renderedLinesIndex,
    renderedTopOffset,
  }
}
