import type { ComputedRef } from 'vue'
import type { TableConfig } from '@idux/components/config'
import type { TablePagination, TableProps } from '../types'

import { computed, ref, watchEffect } from 'vue'
import { callEmit } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'

export interface PaginationContext {
  mergedPagination: ComputedRef<TablePagination | null>
}

export function usePagination(props: TableProps, config: TableConfig): PaginationContext {
  const paginationConfig = useGlobalConfig('pagination')
  const pageIndex = ref<number>()
  const pageSize = ref<number>()

  watchEffect(() => {
    pageIndex.value = props.pagination?.pageIndex ?? 1
    pageSize.value = props.pagination?.pageSize ?? config.pagination.pageSize ?? paginationConfig.pageSize
  })

  const handlePageIndexChange = (index: number) => {
    pageIndex.value = index
    callEmit(props.pagination?.['onUpdate:pageIndex'], index)
  }

  const handlePageSizeChange = (size: number) => {
    pageSize.value = size
    callEmit(props.pagination?.['onUpdate:pageSize'], size)
  }

  const mergedPagination = computed(() => {
    if (props.pagination === null) {
      return null
    }
    return {
      ...config.pagination,
      ...props.pagination,
      pageIndex: pageIndex.value,
      pageSize: pageSize.value,
      'onUpdate:pageIndex': handlePageIndexChange,
      'onUpdate:pageSize': handlePageSizeChange,
    }
  })

  return { mergedPagination }
}
