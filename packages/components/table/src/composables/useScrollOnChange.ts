/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ActiveFilter } from './useFilterable'
import type { ActiveSorter } from './useSortable'
import type { TablePagination, TableProps } from '../types'
import type { TableConfig } from '@idux/components/config'

import { type ComputedRef, type WatchStopHandle, computed, watch } from 'vue'

import { type VirtualScrollToFn } from '@idux/cdk/scroll'

export function useScrollOnChange(
  props: TableProps,
  config: TableConfig,
  mergedPagination: ComputedRef<TablePagination | null>,
  activeSorters: ComputedRef<ActiveSorter[]>,
  activeFilters: ComputedRef<ActiveFilter[]>,
  scrollTo: VirtualScrollToFn,
): void {
  const mergedScrollToTopOnChange = computed(() => props.scrollToTopOnChange ?? config.scrollToTopOnChange)

  let watchStopHandlers: WatchStopHandle[] = []
  const startOnChangeWatch = () => {
    watchStopHandlers = [
      watch([() => mergedPagination.value?.pageIndex, () => mergedPagination.value?.pageSize], () => scrollTo(0)),
      watch([activeFilters, activeSorters], ([currentFilters, currentSorters], [formerFilter, formerSorters]) => {
        if (!compareFilters(currentFilters, formerFilter) || !compareSorters(currentSorters, formerSorters)) {
          scrollTo(0)
        }
      }),
    ]
  }
  const stopOnChangeWatch = () => {
    watchStopHandlers.forEach(stop => stop())
  }

  watch(
    mergedScrollToTopOnChange,
    scrollToTopOnChange => {
      stopOnChangeWatch()

      if (scrollToTopOnChange) {
        startOnChangeWatch()
      }
    },
    { immediate: true },
  )
}

function compareFilters(currentFilters: ActiveFilter[], formerFilters: ActiveFilter[]): boolean {
  return (
    currentFilters.length === formerFilters.length &&
    currentFilters.every(filter => {
      const formerFilter = formerFilters.find(f => f.key === filter.key)
      if (!formerFilter) {
        return false
      }

      return (
        filter.filter === formerFilter.filter &&
        filter.filterBy.length === formerFilter.filterBy.length &&
        filter.filterBy.every(value => formerFilter.filterBy.includes(value))
      )
    })
  )
}

function compareSorters(currentSorters: ActiveSorter[], formerSorters: ActiveSorter[]): boolean {
  return (
    currentSorters.length === formerSorters.length &&
    currentSorters.every(sorter => {
      const formerSorter = formerSorters.find(s => s.key === sorter.key)
      if (!formerSorter) {
        return false
      }

      return (
        sorter.sorter === formerSorter.sorter &&
        sorter.orderBy === formerSorter.orderBy &&
        sorter.multiple === formerSorter.multiple
      )
    })
  )
}
