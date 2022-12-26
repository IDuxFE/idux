/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, type Ref, computed, reactive, ref, watch } from 'vue'

import { type VKey, callEmit } from '@idux/cdk/utils'

import { type TableColumnSortOrder, type TableColumnSortable } from '../types'
import { type TableColumnMerged } from './useColumns'

export interface SortableContext {
  activeSorters: Ref<ActiveSorter[]>
  activeOrderByMap: Record<VKey, TableColumnSortOrder | undefined>
  handleSort: (key: VKey, sortable: TableColumnSortable) => void
}

export interface ActiveSorter {
  key: VKey
  multiple: number
  orderBy: TableColumnSortOrder | undefined
  sorter?: (curr: unknown, next: unknown) => number
}

export function useSortable(flattedColumns: ComputedRef<TableColumnMerged[]>): SortableContext {
  const sortableColumns = computed(() => flattedColumns.value.filter(column => column.sortable))
  const multipleEnabled = computed(() => sortableColumns.value.some(column => column.sortable!.multiple !== undefined))
  const activeOrderByMap = reactive<Record<VKey, TableColumnSortOrder | undefined>>({})
  const activeSorters = ref<ActiveSorter[]>([])

  watch(
    sortableColumns,
    (currColumns, prevColumns) => {
      currColumns.forEach(currColumn => {
        const { key, sortable } = currColumn
        const currOrderBy = sortable!.orderBy
        if (currOrderBy || activeOrderByMap[key] === undefined) {
          activeOrderByMap[key] = currOrderBy
          return
        }

        // 受控模式
        const prevColumn = prevColumns ? prevColumns.find(column => column.key === key) : undefined
        const prevOrderBy = prevColumn?.sortable!.orderBy
        if (prevOrderBy) {
          activeOrderByMap[key] = undefined
        }
      })
      activeSorters.value = getActiveSorters(currColumns, activeOrderByMap)
    },
    { immediate: true },
  )

  const handleSort = (activeKey: VKey, activeSortable: TableColumnSortable) => {
    const { orders, onChange } = activeSortable

    const currOrderBy = activeOrderByMap[activeKey]
    const nextOrderBy = currOrderBy ? getNextOrderBy(orders!, currOrderBy) : getNextOrderBy(orders!)

    if (multipleEnabled.value) {
      activeOrderByMap[activeKey] = nextOrderBy
    } else {
      Object.keys(activeOrderByMap).forEach(key => {
        if (activeKey === key) {
          activeOrderByMap[key] = nextOrderBy
        } else {
          activeOrderByMap[key] = undefined
        }
      })
    }
    activeSorters.value = getActiveSorters(sortableColumns.value, activeOrderByMap)
    callEmit(onChange, nextOrderBy, activeSorters.value)
  }

  return { activeSorters, activeOrderByMap, handleSort }
}

function getNextOrderBy(orders: TableColumnSortOrder[], currOrderBy?: TableColumnSortOrder) {
  if (!currOrderBy) {
    return orders[0]
  }

  return orders[orders.indexOf(currOrderBy) + 1]
}

function getActiveSorters(
  sortableColumns: TableColumnMerged[],
  activeOrderByMap: Record<VKey, TableColumnSortOrder | undefined>,
) {
  return sortableColumns
    .map(column => {
      const { key, sortable } = column
      const { multiple = 0, orderBy = activeOrderByMap[key], sorter } = sortable!
      return { key, multiple, orderBy, sorter } as ActiveSorter
    })
    .filter(item => item.orderBy)
    .sort((c1, c2) => c2.multiple - c1.multiple)
}
