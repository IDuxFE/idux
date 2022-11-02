/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed, ref } from 'vue'

import { callEmit } from '@idux/cdk/utils'
import { type TableConfig, useGlobalConfig } from '@idux/components/config'

import { type TablePagination, type TableProps, type TableSize } from '../types'

export interface PaginationContext {
  mergedPagination: ComputedRef<TablePagination | null>
}

export function usePagination(
  props: TableProps,
  config: TableConfig,
  mergedSize: ComputedRef<TableSize>,
): PaginationContext {
  const paginationConfig = useGlobalConfig('pagination')

  const tempPagination = computed(() => {
    const { pagination } = props
    if (pagination === false) {
      return null
    }
    return pagination === true ? {} : pagination
  })

  const tempIndex = ref<number>(tempPagination.value?.pageIndex ?? 1)
  const tempSize = ref<number>(
    tempPagination.value?.pageSize ?? config.pagination.pageSize ?? paginationConfig.pageSize,
  )

  const handlePageChange = (pageIndex: number, pageSize: number) => {
    tempIndex.value = pageIndex
    tempSize.value = pageSize
    callEmit(tempPagination.value?.onChange, pageIndex, pageSize)
  }

  const mergedPagination = computed<TablePagination | null>(() => {
    const pagination = tempPagination.value
    if (pagination === null) {
      return null
    }
    return {
      ...config.pagination,
      ...pagination,
      pageIndex: pagination.pageIndex ?? tempIndex.value,
      pageSize: pagination.pageSize ?? tempSize.value,
      size: mergedSize.value,
      onChange: handlePageChange,
    }
  })

  return { mergedPagination }
}
