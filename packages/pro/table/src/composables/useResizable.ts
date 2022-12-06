/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed } from 'vue'

import { type VKey } from '@idux/cdk/utils'

import { type ColumnsContext } from './useColumns'

export interface ResizableContext {
  hasResizable: ComputedRef<boolean>
  onResizeEnd: (key: VKey, width: number) => void
}

export function useResizable({ mergedColumns, setMergedColumns, mergedColumnMap }: ColumnsContext): ResizableContext {
  const hasResizable = computed(() => mergedColumns.value.some(column => column.resizable))

  const onResizeEnd = (key: VKey, width: number) => {
    const targetColumn = mergedColumnMap.value.get(key)
    if (targetColumn) {
      targetColumn.width = width
    }
    setMergedColumns([...mergedColumns.value])
  }

  return { hasResizable, onResizeEnd }
}
