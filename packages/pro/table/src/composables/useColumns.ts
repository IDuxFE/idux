/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed, watch } from 'vue'

import { type VKey, callEmit, filterTree, useState } from '@idux/cdk/utils'
import { ɵGetColumnKey } from '@idux/components/table'
import { type ProTableConfig } from '@idux/pro/config'

import { type ProTableColumn, type ProTableProps } from '../types'

export interface ColumnsContext {
  checkedColumnKeys: ComputedRef<{
    start: VKey[]
    center: VKey[]
    end: VKey[]
  }>
  mergedColumns: ComputedRef<ProTableColumn[]>
  setMergedColumns: (columns: ProTableColumn[]) => void
  mergedColumnMap: ComputedRef<Map<VKey, ProTableColumn>>
  displayColumns: ComputedRef<ProTableColumn[]>
  resetColumns: () => void
}

export function useColumns(props: ProTableProps, config: ProTableConfig): ColumnsContext {
  const originalColumns = computed(() => props.columns)
  const [mergedColumns, setMergedColumns] = useState(mergeColumns(originalColumns.value, config))

  const mergedContext = computed(() => {
    const map = new Map<VKey, ProTableColumn>()
    const checkedKeys = {
      start: [] as VKey[],
      center: [] as VKey[],
      end: [] as VKey[],
    }

    const displayColumns = filterTree(
      mergedColumns.value as (ProTableColumn & { children?: ProTableColumn[] })[],
      'children',
      (column, parents) => {
        const key = column.key!
        map.set(key, column)

        if (column.visible === false || parents.some(parent => parent.visible === false)) {
          return false
        }

        if (
          !column.children?.length &&
          column.layoutable !== false &&
          parents.every(parent => parent.layoutable !== false)
        ) {
          if (isFixed('start', column, parents)) {
            checkedKeys.start.push(key)
          } else if (isFixed('end', column, parents)) {
            checkedKeys.end.push(key)
          } else {
            checkedKeys.center.push(key)
          }
        }

        return true
      },
      'and',
    ) as ProTableColumn[]

    return { map, checkedKeys, displayColumns }
  })

  const mergedColumnMap = computed(() => mergedContext.value.map)
  const checkedColumnKeys = computed(() => mergedContext.value.checkedKeys)
  const displayColumns = computed(() => mergedContext.value.displayColumns)

  watch(originalColumns, columns => setMergedColumns(mergeColumns(columns, config)))
  watch(mergedColumns, newColumns => callEmit(props.onColumnsChange, newColumns))

  const resetColumns = () => setMergedColumns(mergeColumns(originalColumns.value, config))

  return { checkedColumnKeys, mergedColumns, setMergedColumns, mergedColumnMap, displayColumns, resetColumns }
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

function isFixed(fixed: 'start' | 'end', column: ProTableColumn, parents: ProTableColumn[]) {
  return column.fixed === fixed || parents.some(parent => parent.fixed === fixed)
}
