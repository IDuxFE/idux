/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProTextareaProps } from '../types'

import { type ComputedRef, type Ref, watch } from 'vue'

import { useResizeObserver } from '@idux/cdk/resize'
import { useState } from '@idux/cdk/utils'
import { type ɵBoxSizingData, ɵMeasureTextarea } from '@idux/components/textarea'

export interface RowCountsContext {
  rowCounts: ComputedRef<number[]>
  rowHeights: ComputedRef<number[]>
}

export function useRowCounts(
  props: ProTextareaProps,
  textareaRef: Ref<HTMLTextAreaElement | undefined>,
  valueRef: Ref<string | undefined>,
  lineHeight: Ref<number>,
  sizingData: ComputedRef<ɵBoxSizingData>,
): RowCountsContext {
  const [rowCounts, setRowCounts] = useState<number[]>([])
  const [rowHeights, setRowHeights] = useState<number[]>([])

  let cachedRowCharLength: number[] = []
  let textareaWidth = 0

  const calcRowCounts = () => {
    const textarea = textareaRef.value!
    const lines = valueRef.value?.split('\n') ?? []
    const { paddingSize } = sizingData.value
    const { rows } = props
    const currentRowCounts = rowCounts.value
    const currentRowHeights = rowHeights.value

    const counts: number[] = []
    const heights: number[] = []

    lines.forEach((line, index) => {
      const charLength = line.length
      if (cachedRowCharLength.length && cachedRowCharLength[index] === charLength) {
        counts[index] = currentRowCounts[index]
        heights[index] = currentRowHeights[index]
        return
      }

      cachedRowCharLength[index] = charLength

      const height = ɵMeasureTextarea(
        textarea,
        el => {
          el.value = line || 'x'

          // trigger reflow to ensure scrollHeight is calculated when referenced
          void el.scrollHeight
          return el.scrollHeight - paddingSize
        },
        true,
      )

      counts[index] = Math.round(height / lineHeight.value)
      heights[index] = height
    })

    if (rows && lines.length < rows) {
      counts.push(...new Array(rows - lines.length).fill(1))
      heights.push(...new Array(rows - lines.length).fill(lineHeight.value))
    }

    setRowCounts(counts)
    setRowHeights(heights)
  }

  watch([valueRef, () => props.rows], calcRowCounts)
  useResizeObserver(textareaRef, ({ contentRect: { width } }) => {
    if (textareaWidth && textareaWidth !== width) {
      cachedRowCharLength = []
      calcRowCounts()
    }

    textareaWidth = width
  })

  return {
    rowCounts,
    rowHeights,
  }
}
