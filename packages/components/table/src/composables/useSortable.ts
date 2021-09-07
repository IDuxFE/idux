import type { ComputedRef } from 'vue'
import type { TableColumnMerged } from './useColumns'
import type { Key, TableColumnSortable, TableColumnSortOrder } from '../types'

import { computed, reactive, watchEffect } from 'vue'
import { callEmit } from '@idux/cdk/utils'

export function useSortable(flattedColumns: ComputedRef<TableColumnMerged[]>): SortableContext {
  const activeSortable = reactive<ActiveSortable>({})
  const activeSortColumn = computed(() => flattedColumns.value.find(column => column.sortable?.orderBy))

  watchEffect(() => {
    const sortColumn = activeSortColumn.value
    if (sortColumn) {
      activeSortable.key = sortColumn.key
      activeSortable.orderBy = sortColumn.sortable!.orderBy!
      activeSortable.sorter = sortColumn.sortable!.sorter
    } else {
      activeSortable.key = undefined
      activeSortable.orderBy = undefined
      activeSortable.sorter = undefined
    }
  })

  const handleSort = (key: Key, sortable: TableColumnSortable) => {
    const { orders, sorter, onChange } = sortable

    const isSameKey = key === activeSortable.key
    const orderBy = isSameKey ? getCurrOrderBy(orders!, activeSortable.orderBy) : getCurrOrderBy(orders!)

    if (!isSameKey) {
      activeSortable.key = key
      activeSortable.sorter = sorter
    }
    activeSortable.orderBy = orderBy

    callEmit(onChange, activeSortable.orderBy)
  }

  return { activeSortable, handleSort }
}

export interface SortableContext {
  activeSortable: ActiveSortable
  handleSort: (key: Key, sortable: TableColumnSortable) => void
}

export interface ActiveSortable {
  key?: Key
  orderBy?: 'descend' | 'ascend'
  sorter?: (curr: unknown, next: unknown) => number
}

function getCurrOrderBy(orders: TableColumnSortOrder[], currOrderBy?: TableColumnSortOrder) {
  if (!currOrderBy) {
    return orders[0]
  }

  return orders[orders.indexOf(currOrderBy) + 1]
}
