/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TransferProps } from '../types'
import type { PaginationConfig } from '@idux/components/config'
import type { PaginationProps } from '@idux/components/pagination'

import { type ComputedRef, computed, ref, watchEffect } from 'vue'

import { convertArray } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'

export interface TransferPaginationContext {
  sourcePagination: ComputedRef<PaginationProps | undefined>
  targetPagination: ComputedRef<PaginationProps | undefined>
}

export function usePagination(props: TransferProps): TransferPaginationContext {
  const paginationConfig = useGlobalConfig('pagination')

  return {
    sourcePagination: createPagination(props, paginationConfig, true),
    targetPagination: createPagination(props, paginationConfig, false),
  }
}

function createPagination(
  props: TransferProps,
  paginationConfig: PaginationConfig,
  isSource: boolean,
): ComputedRef<PaginationProps | undefined> {
  const pageIndex = ref<number>()
  const pageSize = ref<number>()

  const tempPagination = computed(() => {
    const pagination = props.pagination
    if (!pagination) {
      return null
    }
    if (pagination === true) {
      return {}
    }

    const idx = isSource ? 0 : 1

    const pageIndex = convertArray(pagination.pageIndex)
    const pageSize = convertArray(pagination.pageSize)
    const total = convertArray(pagination.total)

    return {
      pageIndex: pageIndex?.[idx],
      pageSize: pageSize?.[idx],
      disabled: props.disabled || pagination.disabled,
      total: total?.[idx],
      onChange: (pageIndex: number, pageSize: number) => pagination.onChange?.(isSource, pageIndex, pageSize),
    }
  })

  watchEffect(() => {
    const pagination = tempPagination.value
    pageIndex.value = pagination?.pageIndex ?? 1
    pageSize.value = pagination?.pageSize ?? paginationConfig.pageSize
  })

  const handlePageIndexChange = (index: number) => {
    pageIndex.value = index
  }

  return computed(() => {
    const pagination = tempPagination.value

    if (pagination === null) {
      return
    }
    return {
      simple: true,
      showTotal: false,
      showQuickJumper: true,
      ...pagination,
      pageIndex: pageIndex.value,
      pageSize: pageSize.value,
      'onUpdate:pageIndex': handlePageIndexChange,
    }
  })
}
