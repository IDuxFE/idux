/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed, reactive, ref, watch } from 'vue'

import { type VKey, callEmit } from '@idux/cdk/utils'

import { type TableColumnSortOrder, type TableColumnSortable } from '../types'
import { type TableColumnMerged } from './useColumns'

export function useSortable(flattedColumns: ComputedRef<TableColumnMerged[]>): SortableContext {
  const activeSortColumn = computed(() => flattedColumns.value.find(column => column.sortable?.orderBy))

  const orderByRef = ref<'descend' | 'ascend' | undefined>(activeSortColumn.value?.sortable?.orderBy)

  const tempOrderByRef = ref<'descend' | 'ascend' | undefined>()
  const activeSortable = reactive<ActiveSortable>({
    orderBy: orderByRef.value,
  })

  watch(activeSortColumn, () => {
    const sortColumn = activeSortColumn.value
    if (sortColumn) {
      activeSortable.key = sortColumn.key
      orderByRef.value = sortColumn.sortable!.orderBy!
      activeSortable.sorter = sortColumn.sortable!.sorter
    } else {
      activeSortable.key = undefined
      orderByRef.value = undefined
      tempOrderByRef.value = undefined
      activeSortable.sorter = undefined
    }
  })

  watch([orderByRef, tempOrderByRef], () => {
    activeSortable.orderBy = orderByRef.value ?? tempOrderByRef.value
  })

  const handleSort = (key: VKey, sortable: TableColumnSortable) => {
    const { orders, sorter, onChange } = sortable

    const isSameKey = key === activeSortable.key
    const orderBy = isSameKey ? getCurrOrderBy(orders!, activeSortable.orderBy) : getCurrOrderBy(orders!)

    if (!isSameKey) {
      activeSortable.key = key
      activeSortable.sorter = sorter
    }

    tempOrderByRef.value = orderBy
    callEmit(onChange, orderBy)
  }

  return { activeSortable, handleSort }
}

export interface SortableContext {
  activeSortable: ActiveSortable
  handleSort: (key: VKey, sortable: TableColumnSortable) => void
}

export interface ActiveSortable {
  key?: VKey
  orderBy?: 'descend' | 'ascend'
  sorter?: (curr: unknown, next: unknown) => number
}

function getCurrOrderBy(orders: TableColumnSortOrder[], currOrderBy?: TableColumnSortOrder) {
  if (!currOrderBy) {
    return orders[0]
  }

  return orders[orders.indexOf(currOrderBy) + 1]
}
