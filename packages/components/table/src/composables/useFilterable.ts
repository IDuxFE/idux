/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed, reactive, watch } from 'vue'

import { type VKey, callEmit } from '@idux/cdk/utils'

import { type TableColumnFilterable } from '../types'
import { type TableColumnMerged } from './useColumns'

export interface FilterableContext {
  activeFilters: ComputedRef<ActiveFilter[]>
  activeFilterByMap: Record<VKey, VKey[]>
  handleFilter: (key: VKey, filterable: TableColumnFilterable, filterBy: VKey[]) => void
}

export interface ActiveFilter {
  key: VKey
  filter?: (currFilterBy: VKey[], record: unknown) => boolean
  filterBy: VKey[]
}

export function useFilterable(flattedColumns: ComputedRef<TableColumnMerged[]>): FilterableContext {
  const filterableColumns = computed(() => flattedColumns.value.filter(column => column.filterable))
  const activeFilterByMap = reactive<Record<VKey, VKey[]>>({})

  watch(
    filterableColumns,
    (currColumns, prevColumns) => {
      currColumns.forEach(currColumn => {
        const { key, filterable } = currColumn
        const currFilterBy = filterable!.filterBy
        if (currFilterBy || activeFilterByMap[key] === undefined) {
          activeFilterByMap[key] = currFilterBy || []
          return
        }

        // 受控模式
        const prevColumn = prevColumns ? prevColumns.find(column => column.key === key) : undefined
        const prevFilterBy = prevColumn?.filterable!.filterBy
        if (prevFilterBy) {
          activeFilterByMap[key] = []
        }
      })
    },
    { immediate: true },
  )

  const activeFilters = computed(
    () =>
      filterableColumns.value
        .map(column => {
          const { key, filterable } = column
          const { filter, filterBy = activeFilterByMap[key] } = filterable!
          return { key, filter, filterBy }
        })
        .filter(item => item.filter && item.filterBy.length > 0) as ActiveFilter[],
  )

  const handleFilter = (activeKey: VKey, activeFilterable: TableColumnFilterable, filterBy: VKey[]) => {
    const { onChange } = activeFilterable

    activeFilterByMap[activeKey] = filterBy

    callEmit(onChange, filterBy, activeFilters.value)
  }

  return {
    activeFilters,
    activeFilterByMap,
    handleFilter,
  }
}
