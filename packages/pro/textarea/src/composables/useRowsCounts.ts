/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, type Ref, watch } from 'vue'

import { useResizeObserver } from '@idux/cdk/resize'
import { useState } from '@idux/cdk/utils'
import { type ɵBoxSizingData, ɵMeasureTextarea } from '@idux/components/textarea'

export function useRowCounts(
  textareaRef: Ref<HTMLTextAreaElement | undefined>,
  valueRef: Ref<string | undefined>,
  lineHeight: ComputedRef<number>,
  sizingData: ComputedRef<ɵBoxSizingData>,
): ComputedRef<number[]> {
  const [rowCounts, setRowCounts] = useState<number[]>([])
  const calcRowCounts = () => {
    const textarea = textareaRef.value!
    const lines = valueRef.value?.split('\n') ?? []

    const { paddingSize } = sizingData.value
    setRowCounts(
      lines.map(line =>
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
      ),
    )
  }

  watch(valueRef, calcRowCounts)
  useResizeObserver(textareaRef, calcRowCounts)

  return rowCounts
}
