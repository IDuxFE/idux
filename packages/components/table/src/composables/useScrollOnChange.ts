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

import { type ComputedRef, type Ref, type WatchStopHandle, computed, watch } from 'vue'

import { type VirtualScrollInstance, scrollToTop } from '@idux/cdk/scroll'

export function useScrollOnChange(
  props: TableProps,
  config: TableConfig,
  scrollBodyRef: Ref<HTMLElement | VirtualScrollInstance | undefined>,
  mergedPagination: ComputedRef<TablePagination | null>,
  activeSorters: ComputedRef<ActiveSorter[]>,
  activeFilters: ComputedRef<ActiveFilter[]>,
): void {
  const mergedScrollToTopOnChange = computed(() => props.scrollToTopOnChange ?? config.scrollToTopOnChange)

  let stopOnChangeWatch: WatchStopHandle | undefined
  const startOnChangeWatch = () => {
    stopOnChangeWatch = watch(
      [() => mergedPagination.value?.pageIndex, () => mergedPagination.value?.pageSize, activeSorters, activeFilters],
      () => {
        if (!scrollBodyRef.value) {
          return
        }

        if (props.virtual) {
          ;(scrollBodyRef.value as VirtualScrollInstance).scrollTo(0)
        } else {
          scrollToTop({
            target: scrollBodyRef.value as HTMLElement,
            top: 0,
          })
        }
      },
    )
  }

  watch(
    mergedScrollToTopOnChange,
    scrollToTopOnChange => {
      stopOnChangeWatch?.()

      if (scrollToTopOnChange) {
        startOnChangeWatch()
      }
    },
    { immediate: true },
  )
}
