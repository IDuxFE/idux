/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TextProps } from '../types'

import { type ComputedRef, type Ref, type VNode, computed, nextTick, onMounted, watch } from 'vue'

import { isNaN, isNumber, toInteger } from 'lodash-es'

import { useResizeObserver } from '@idux/cdk/resize'
import { Logger, useState } from '@idux/cdk/utils'

import { getNodesLength, sliceNodes } from '../utils/nodes'

export type MeasureStatus = 'preparing' | 'measuring' | 'none'

export interface EllipsisContext {
  isEllipsis: ComputedRef<boolean>
  measureStatus: ComputedRef<MeasureStatus>
  onRender: (nodes: VNode[] | undefined) => void
  onMeasureRender: () => void
  renderClampedContent: (nodes: VNode[] | undefined, measure?: boolean) => void
}

export function useEllipsis(
  props: TextProps,
  contentRef: Ref<HTMLElement | undefined>,
  measureRef: Ref<HTMLElement | undefined>,
  rowMeasureRef: Ref<HTMLElement | undefined>,
): EllipsisContext {
  const [contentNodesLength, setContentNodesLength] = useState(0)
  const [lastRenderIndex, setLastRenderIndex] = useState(0)
  const [measureLastRenderIndex, setMeasureLastRenderIndex] = useState(0)
  const [contentWidth, setContentWidth] = useState(0)
  const [isEllipsis, setIsEllipsis] = useState(false)
  const [measureStatus, setMeasureStatus] = useState<MeasureStatus>('none')

  let currentWalk: (() => void) | undefined

  const rows = computed(() => {
    const { ellipsis, lineClamp } = props

    if (ellipsis === true) {
      return 1
    }

    if (ellipsis && isNumber(ellipsis.rows)) {
      return ellipsis.rows
    }

    if (lineClamp) {
      Logger.warn('components/text', 'The `lineClamp` prop is deprecated, use `ellipsis` instead')

      const parsedRows = toInteger(lineClamp)

      return isNaN(parsedRows) ? 0 : parsedRows
    }

    return 0
  })

  const onRender = (nodes: VNode[] | undefined) => {
    setContentNodesLength(getNodesLength(nodes))
  }

  const onMeasureRender = () => {
    if (measureStatus.value !== 'none') {
      currentWalk?.()
    }
  }

  /* eslint-disable indent */
  const renderClampedContent = (nodes: VNode[] | undefined, measure = false) =>
    !measure
      ? sliceNodes(nodes, 0, lastRenderIndex.value)
      : measureStatus.value === 'preparing'
      ? nodes
      : sliceNodes(nodes, 0, measureLastRenderIndex.value)
  /* eslint-enable indent */

  const calculate = () => {
    let maxHeight = 0
    let rowHeight = 0
    let start = 0
    let end = contentNodesLength.value

    setMeasureLastRenderIndex(end)
    currentWalk = undefined

    const next = (index?: number) => {
      index && setMeasureLastRenderIndex(index)
      currentWalk = () => {
        nextTick(walk)
      }
    }

    const walk = () => {
      const measureHeight = measureRef.value?.offsetHeight ?? 0

      if (measureStatus.value === 'preparing') {
        if (!rowMeasureRef.value) {
          return
        }

        rowHeight = rowMeasureRef.value?.offsetHeight ?? 0
        maxHeight = rows.value * rowHeight

        if (measureHeight <= maxHeight) {
          setIsEllipsis(false)
          setLastRenderIndex(contentNodesLength.value)
          currentWalk = undefined
          setMeasureStatus('none')
        } else {
          setMeasureStatus('measuring')
          next(Math.ceil(contentNodesLength.value / 2))
        }
      } else {
        if (measureHeight <= maxHeight) {
          start = measureLastRenderIndex.value
        } else {
          end = measureLastRenderIndex.value
        }

        if (start === end || start === end - 1) {
          if (measureHeight > maxHeight) {
            next(measureLastRenderIndex.value - 1)
          } else {
            currentWalk = undefined
            setIsEllipsis(true)
            setLastRenderIndex(measureLastRenderIndex.value)
            setMeasureStatus('none')
          }
        } else {
          next(Math.ceil((start + end) / 2))
        }
      }
    }

    setMeasureStatus('preparing')
    next()
  }

  const startCalculate = () => {
    if (!contentNodesLength.value || !contentWidth.value) {
      return
    }

    if (!rows.value) {
      setIsEllipsis(false)
      return
    }

    calculate()
  }

  onMounted(() => {
    watch([contentNodesLength, rows], startCalculate, {
      flush: 'post',
      immediate: true,
    })
    useResizeObserver(contentRef, () => {
      const width = contentRef.value?.offsetWidth ?? 0

      if (width !== contentWidth.value) {
        setContentWidth(width)
        startCalculate()
      }
    })
  })

  return {
    isEllipsis,
    measureStatus,
    onRender,
    onMeasureRender,
    renderClampedContent,
  }
}
