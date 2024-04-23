/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TableColumnMerged } from './useColumns'
import type { VKey } from '@idux/cdk/utils'

import { type ComputedRef, type Ref, ref, watch } from 'vue'

export interface ColumnWidthMeasureContext {
  measuredColumnWidthMap: Ref<Record<VKey, number>>
  changeColumnWidth: (key: VKey, width: number | false) => void
}

export function useColumnWidthMeasure(flattedColumns: ComputedRef<TableColumnMerged[]>): ColumnWidthMeasureContext {
  const measuredColumnWidthMap = ref<Record<VKey, number>>({})

  const changeColumnWidth = (key: VKey, width: number | false) => {
    if (width === false) {
      delete measuredColumnWidthMap.value[key]
    } else {
      measuredColumnWidthMap.value[key] = width
    }
  }

  watch(flattedColumns, columns => {
    const columnKeySet = new Set(columns.map(column => column.key))
    Object.keys(measuredColumnWidthMap).forEach(key => {
      if (!columnKeySet.has(key)) {
        delete measuredColumnWidthMap.value[key]
      }
    })
  })

  return {
    measuredColumnWidthMap,
    changeColumnWidth,
  }
}
