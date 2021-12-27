/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { Key, TableColumnFilterable } from '../types'
import type { TableColumnMerged } from './useColumns'
import type { ComputedRef } from 'vue'

import { computed, reactive } from 'vue'

import { callEmit } from '@idux/cdk/utils'

export function useFilterables(flattedColumns: ComputedRef<TableColumnMerged[]>): FilterableContext {
  const tempFilterByMap = reactive(new Map())

  const filterables = computed<Filterable[]>(() =>
    flattedColumns.value
      .filter(column => !!column.filterable)
      .map(column => {
        const { filterable, key } = column

        const onChange = (value: unknown[]) => {
          tempFilterByMap.set(key, value)
          callEmit(filterable!.onChange, value)
        }

        return {
          key: column.key,
          filters: filterable!.filters,
          filterBy: filterable!.filterBy ?? tempFilterByMap.get(key),
          filter: filterable!.filter,
          onChange,
        }
      }),
  )

  const activeFilterables = computed(() => filterables.value.filter(f => f.filterBy && f.filterBy.length > 0))

  return {
    filterables,
    activeFilterables,
  }
}

export interface Filterable<T = unknown> extends TableColumnFilterable<T> {
  key: Key
}

export interface FilterableContext<T = unknown> {
  filterables: ComputedRef<Filterable<T>[]>
  activeFilterables: ComputedRef<Filterable<T>[]>
}
