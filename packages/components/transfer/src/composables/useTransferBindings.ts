/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TransferBindings, TransferData, TransferProps } from '../types'
import type { TransferPaginationContext } from './usePagination'
import type { TransferDataContext } from './useTransferData'
import type { TransferOperationsContext } from './useTransferOperations'
import type { TransferSelectStateContext } from './useTransferSelectState'
import type { ComputedRef } from 'vue'

import { callEmit } from '@idux/cdk/utils'

export function useTransferBindings<T extends TransferData = TransferData>(
  props: TransferProps,
  transferDataContext: TransferDataContext<T>,
  transferOperationsContext: TransferOperationsContext,
  transferSelectStateContext: TransferSelectStateContext,
  transferPaginationContext: TransferPaginationContext,
  showSelectAll: ComputedRef<boolean>,
  sourceSearchable: ComputedRef<boolean>,
  sourceSearchPlaceholder: ComputedRef<string>,
  targetSearchable: ComputedRef<boolean>,
  targetSearchPlaceholder: ComputedRef<string>,
): {
  sourceBindings: TransferBindings<T>
  targetBindings: TransferBindings<T>
} {
  const {
    dataSource,
    sourceData,
    targetData,
    targetKeySet,
    dataKeyMap,
    disabledKeys,
    disabledSourceKeys,
    disabledTargetKeys,
    filteredDataSource,
    filteredSourceData,
    filteredTargetData,
    paginatedDataSource,
    paginatedSourceData,
    paginatedTargetData,
    sourceSearchValue,
    setSourceSearchValue,
    targetSearchValue,
    setTargetSearchValue,
    getKey,
  } = transferDataContext
  const {
    sourceSelectedKeys,
    targetSelectedKeys,
    sourceSelectedKeySet,
    targetSelectedKeySet,
    sourceSelectAllStatus,
    targetSelectAllStatus,
    sourceSelectAllDisabled,
    targetSelectAllDisabled,
    handleSourceSelectChange,
    handleTargetSelectChange,
    handleSourceSelectAll,
    handleTargetSelectAll,
  } = transferSelectStateContext
  const { triggerAppend, triggerRemove } = transferOperationsContext

  const commonBindings = {
    dataSource,
    dataKeyMap,
    disabledDataSourceKeys: disabledKeys,
    filteredDataSource,
    paginatedDataSource,
    targetKeySet,
    showSelectAll,
    triggerAppend,
    triggerRemove,
    getKey,
  }

  return {
    sourceBindings: {
      data: sourceData,
      filteredData: filteredSourceData,
      paginatedData: paginatedSourceData,
      pagination: transferPaginationContext.sourcePagination,
      disabledKeys: disabledSourceKeys,
      selectedKeys: sourceSelectedKeys,
      selectedKeySet: sourceSelectedKeySet,
      selectAllDisabled: sourceSelectAllDisabled,
      selectAllStatus: sourceSelectAllStatus,
      searchable: sourceSearchable,
      searchPlaceholder: sourceSearchPlaceholder,
      selectAll: handleSourceSelectAll,
      handleSelectChange: handleSourceSelectChange,
      searchValue: sourceSearchValue,
      handleSearchChange: (searchValue: string) => {
        setSourceSearchValue(searchValue)
        callEmit(props.onSearch, true, searchValue)
      },
      ...commonBindings,
    },
    targetBindings: {
      data: targetData,
      filteredData: filteredTargetData,
      paginatedData: paginatedTargetData,
      pagination: transferPaginationContext.targetPagination,
      disabledKeys: disabledTargetKeys,
      selectedKeys: targetSelectedKeys,
      selectedKeySet: targetSelectedKeySet,
      selectAllDisabled: targetSelectAllDisabled,
      selectAllStatus: targetSelectAllStatus,
      searchable: targetSearchable,
      searchPlaceholder: targetSearchPlaceholder,
      selectAll: handleTargetSelectAll,
      handleSelectChange: handleTargetSelectChange,
      searchValue: targetSearchValue,
      handleSearchChange: (searchValue: string) => {
        setTargetSearchValue(searchValue)
        callEmit(props.onSearch, false, searchValue)
      },
      ...commonBindings,
    },
  }
}
