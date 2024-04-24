/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { VKey } from '@idux/cdk/utils'

import { type ComputedRef, type Ref, computed } from 'vue'

import { TableColumnMerged, TableColumnScrollBar } from './useColumns'

export interface ColumnOffsetsContext {
  columnOffsets: ComputedRef<{
    starts: Record<VKey, { index: number; offset: number }>
    ends: Record<VKey, { index: number; offset: number }>
  }>
  columnOffsetsWithScrollBar: ComputedRef<{
    starts: Record<VKey, { index: number; offset: number }>
    ends: Record<VKey, { index: number; offset: number }>
  }>
}

export function useColumnOffsets(
  fixedColumns: ComputedRef<{
    fixedStartColumns: (TableColumnMerged | TableColumnScrollBar)[]
    fixedEndColumns: (TableColumnMerged | TableColumnScrollBar)[]
    fixedColumnIndexMap: Record<VKey, number>
  }>,
  columnWidthsMap: Ref<Record<VKey, number>>,
  columnCount: Ref<number>,
): ColumnOffsetsContext {
  const columnOffsets = computed(() => {
    const { fixedStartColumns, fixedEndColumns, fixedColumnIndexMap } = fixedColumns.value
    return calculateOffsets(
      fixedStartColumns,
      fixedEndColumns.filter(column => column.type !== 'scroll-bar'),
      fixedColumnIndexMap,
      columnWidthsMap.value,
      columnCount.value - 1,
    )
  })
  const columnOffsetsWithScrollBar = computed(() => {
    const { fixedStartColumns, fixedEndColumns, fixedColumnIndexMap } = fixedColumns.value
    return calculateOffsets(
      fixedStartColumns,
      fixedEndColumns,
      fixedColumnIndexMap,
      columnWidthsMap.value,
      columnCount.value,
    )
  })
  return { columnOffsets, columnOffsetsWithScrollBar }
}

function calculateOffsets(
  startColumns: (TableColumnMerged | TableColumnScrollBar)[],
  endColumns: (TableColumnMerged | TableColumnScrollBar)[],
  columnIndexMap: Record<VKey, number>,
  columnWidthsMap: Record<VKey, number>,
  columnCount: number,
) {
  const startOffsets: Record<VKey, { index: number; offset: number }> = {}
  const endOffsets: Record<VKey, { index: number; offset: number }> = {}

  let startOffset = 0
  let endOffset = 0

  for (let index = 0; index < startColumns.length; index++) {
    const column = startColumns[index]
    const width = columnWidthsMap[column.key] ?? column.width ?? 0

    startOffsets[column.key] = { index: columnIndexMap[column.key] ?? index, offset: startOffset }
    startOffset += width
  }

  for (let index = 0; index < endColumns.length; index++) {
    const column = endColumns[endColumns.length - index - 1]
    const width = columnWidthsMap[column.key] ?? column.width ?? 0

    endOffsets[column.key] = { index: columnIndexMap[column.key] ?? columnCount - index - 1, offset: endOffset }
    endOffset += width
  }

  return {
    starts: startOffsets,
    ends: endOffsets,
  }
}
