/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProTextareaProps } from '../types'
import type { ɵBoxSizingData } from '@idux/components/textarea'
import type { ComputedRef, Ref } from 'vue'

import { useState } from '@idux/cdk/utils'

export interface ErrorLinesContext {
  visibleErrIndex: ComputedRef<number>
  setvisibleErrIndex: (errIndex: number) => void
  handleTextareaMouseMove: (evt: MouseEvent) => void
  handleTextareaMouseLeave: (evt: MouseEvent) => void
}

export function useErrorLines(
  props: ProTextareaProps,
  lineHeight: Ref<number>,
  rowsCount: Ref<number[]>,
  sizingData: ComputedRef<ɵBoxSizingData>,
): ErrorLinesContext {
  const [visibleErrIndex, setvisibleErrIndex] = useState<number>(-1)

  let currentRowTopLineIdx = -1
  let currentRowBottomLineIdx = -1

  const handleTextareaMouseMove = (evt: MouseEvent) => {
    const currentHoverlineIdx = Math.floor((evt.offsetY - sizingData.value.paddingTop) / lineHeight.value)

    if (
      currentRowTopLineIdx !== -1 &&
      currentRowBottomLineIdx !== -1 &&
      currentHoverlineIdx >= currentRowTopLineIdx &&
      currentHoverlineIdx < currentRowBottomLineIdx
    ) {
      return
    }

    const _rowCounts = rowsCount.value
    const rowLength = _rowCounts.length

    let rowIdx = 0
    let currentTop = 0
    let currentBottom = _rowCounts[0] ?? 0

    while (currentBottom <= currentHoverlineIdx && rowIdx < rowLength) {
      currentTop += _rowCounts[rowIdx] ?? 0
      rowIdx++
      currentBottom += _rowCounts[rowIdx] ?? 0
    }

    const currentHoverErrIdx = props.errors?.find(error => error.index === rowIdx)?.index

    setvisibleErrIndex(currentHoverErrIdx ?? -1)
    currentRowTopLineIdx = currentTop
    currentRowBottomLineIdx = currentBottom
  }

  const handleTextareaMouseLeave = (_: MouseEvent) => {
    setvisibleErrIndex(-1)
    currentRowTopLineIdx = -1
    currentRowBottomLineIdx = -1
  }

  return {
    visibleErrIndex,
    setvisibleErrIndex,
    handleTextareaMouseMove,
    handleTextareaMouseLeave,
  }
}
