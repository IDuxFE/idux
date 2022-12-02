/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed, watch } from 'vue'

import { type VKey, callEmit, useState } from '@idux/cdk/utils'
import { ɵGetColumnKey } from '@idux/components/table'
import { type ProTableConfig } from '@idux/pro/config'

import { type ProTableColumn, type ProTableProps } from '../types'
import { loopColumns } from '../utils'

export interface ColumnsContext {
  mergedColumns: ComputedRef<ProTableColumn[]>
  setMergedColumns: (columns: ProTableColumn[]) => void
  mergedColumnMap: ComputedRef<Map<VKey, ProTableColumn>>
  displayColumns: ComputedRef<ProTableColumn[]>
  resetColumns: () => void
}

export function useColumns(props: ProTableProps, config: ProTableConfig): ColumnsContext {
  const originalColumns = computed(() => props.columns)
  const [mergedColumns, setMergedColumns] = useState(mergeColumns(originalColumns.value, config))
  const mergedColumnMap = computed(() => {
    const map = new Map<VKey, ProTableColumn>()
    loopColumns(mergedColumns.value, column => map.set(column.key!, column))
    return map
  })
  const displayColumns = computed(() => getDisplayColumns(mergedColumns.value))

  watch(originalColumns, columns => setMergedColumns(mergeColumns(columns, config)))
  watch(mergedColumns, newColumns => callEmit(props.onColumnsChange, newColumns))

  const resetColumns = () => setMergedColumns(mergeColumns(originalColumns.value, config))

  return { mergedColumns, setMergedColumns, mergedColumnMap, displayColumns, resetColumns }
}

function mergeColumns(columns: ProTableColumn[], config: ProTableConfig, parentKey?: VKey) {
  return columns.map(column => convertMergeColumn(column, config, parentKey))
}

function convertMergeColumn(column: ProTableColumn, config: ProTableConfig, parentKey?: VKey) {
  const key = ɵGetColumnKey(column)
  const defaultColumn = column.type === 'indexable' ? config.columnIndexable : undefined
  const mergeColumn = { ...defaultColumn, ...column, key, parentKey } as ProTableColumn
  if (column.children?.length) {
    mergeColumn.children = mergeColumns(column.children, config, key)
  }
  return mergeColumn
}

function getDisplayColumns(columns: ProTableColumn[]): ProTableColumn[] {
  const result: ProTableColumn[] = []
  columns.forEach(column => {
    if (column.visible === false) {
      return
    }
    if ('children' in column && column.children) {
      const newChildren = getDisplayColumns(column.children)
      if (newChildren.length === 0) {
        return
      }
      result.push({ ...column, children: newChildren })
    } else {
      result.push(column)
    }
  })
  return result
}
