/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TablePagination, TableProps } from '../types'
import type { ActiveFilter } from './useFilterable'
import type { ActiveSorter } from './useSortable'
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

  const startOnChangeWatch = () =>
    watch(
      [() => mergedPagination.value?.pageIndex, () => mergedPagination.value?.pageSize, activeSorters, activeFilters],
      () => scrollTo(0),
    )

  let stopOnChangeWatch: WatchStopHandle | undefined

  watch(
    mergedScrollToTopOnChange,
    scrollToTopOnChange => {
      stopOnChangeWatch?.()

      if (scrollToTopOnChange) {
        stopOnChangeWatch = startOnChangeWatch()
      }
    },
    { immediate: true },
  )
}
