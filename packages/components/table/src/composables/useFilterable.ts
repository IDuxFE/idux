/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed, reactive, watch } from 'vue'

import { type VKey } from '@idux/cdk/utils'

import { type TableColumnMerged } from './useColumns'

export interface ActiveFilter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filter: (currFilterBy: VKey[], record: any) => boolean
  filterBy: VKey[]
}

export interface FilterableContext {
  activeFilters: ComputedRef<ActiveFilter[]>
  filterByMap: Record<VKey, VKey[]>
  setFilterBy: (key: VKey, filterBy: VKey[]) => void
}

export function useFilterable(flattedColumns: ComputedRef<TableColumnMerged[]>): FilterableContext {
  const filterByMap = reactive<Record<VKey, VKey[]>>({})
  const setFilterBy = (key: VKey, filterBy: VKey[]) => {
    filterByMap[key] = filterBy
  }

  const filterableColumns = computed(() => flattedColumns.value.filter(column => !!column.filterable))
  watch(
    filterableColumns,
    columns => {
      columns.forEach(column => {
        if (filterByMap[column.key] === undefined) {
          filterByMap[column.key] = column.filterable?.filterBy || []
        }
      })
    },
    { immediate: true },
  )

  const activeFilters = computed(
    () =>
      filterableColumns.value
        .map(column => {
          const filterable = column.filterable!
          const filter = filterable.filter
          const filterBy = filterable.filterBy || filterByMap[column.key]
          return { filter, filterBy }
        })
        .filter(item => item.filter && item.filterBy.length > 0) as ActiveFilter[],
  )

  return {
    activeFilters,
    filterByMap,
    setFilterBy,
  }
}
