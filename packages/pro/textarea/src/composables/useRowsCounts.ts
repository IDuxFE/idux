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

export function useRowCounts(
  props: ProTextareaProps,
  textareaRef: Ref<HTMLTextAreaElement | undefined>,
  valueRef: Ref<string | undefined>,
  lineHeight: Ref<number>,
  sizingData: ComputedRef<ɵBoxSizingData>,
): ComputedRef<number[]> {
  const [rowCounts, setRowCounts] = useState<number[]>([])
  const calcRowCounts = () => {
    const textarea = textareaRef.value!
    const lines = valueRef.value?.split('\n') ?? []
    const { paddingSize } = sizingData.value
    const { rows } = props

    const res = lines.map(line =>
      ɵMeasureTextarea(
        textarea,
        el => {
          el.value = line || 'x'

          // trigger reflow to ensure scrollHeight is calculated when referenced
          void el.scrollHeight
          return Math.round((el.scrollHeight - paddingSize) / lineHeight.value)
        },
        true,
      ),
    )

    if (rows && res.length < rows) {
      res.push(...new Array(rows - res.length).fill(1))
    }

    setRowCounts(res)
  }

  watch([valueRef, () => props.rows], calcRowCounts)
  useResizeObserver(textareaRef, calcRowCounts)

  return rowCounts
}
