/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TransferData, TransferDataStrategies, TransferProps } from '../types'
import type { TransferPaginationContext } from './usePagination'
import type { TransferConfig } from '@idux/components/config'
import type { PaginationProps } from '@idux/components/pagination'

import { type ComputedRef, computed } from 'vue'

import { type VKey, callEmit, useControlledProp, useState } from '@idux/cdk/utils'
import { type GetKeyFn, useGetKey } from '@idux/components/utils'

export interface TransferDataContext<T extends TransferData = TransferData> {
  dataSource: ComputedRef<T[]>
  dataKeyMap: ComputedRef<Map<VKey, T>>
  sourceData: ComputedRef<T[]>
  targetData: ComputedRef<T[]>
  sourceDataKeys: ComputedRef<Set<VKey>>
  targetDataKeys: ComputedRef<Set<VKey>>
  filteredDataSource: ComputedRef<T[]>
  filteredSourceData: ComputedRef<T[]>
  filteredTargetData: ComputedRef<T[]>
  paginatedDataSource: ComputedRef<T[]>
  paginatedSourceData: ComputedRef<T[]>
  paginatedTargetData: ComputedRef<T[]>
  targetKeys: ComputedRef<VKey[]>
  targetKeySet: ComputedRef<Set<VKey>>
  append: (keys: VKey[]) => void
  remove: (keys: VKey[]) => void
  clear: () => void

  getKey: ComputedRef<GetKeyFn>

  disabledKeys: ComputedRef<Set<VKey>>
  disabledSourceKeys: ComputedRef<Set<VKey>>
  disabledTargetKeys: ComputedRef<Set<VKey>>

  sourceSearchValue: ComputedRef<string>
  setSourceSearchValue: (value: string) => void

  targetSearchValue: ComputedRef<string>
  setTargetSearchValue: (value: string) => void
}

export function useTransferData<T extends TransferData = TransferData>(
  props: TransferProps,
  config: TransferConfig,
  transferDataStrategies: TransferDataStrategies<T>,
  transferPaginationContext: TransferPaginationContext,
): TransferDataContext<T> {
  const _getKey = useGetKey(props, config, 'transfer')
  const getKey = computed(() => (data: T) => _getKey.value(data) ?? data.key)

  const {
    genDataKeys,
    genDataKeyMap,
    genDisabledKeys,
    separateDataSource,
    dataFilter,
    append: _append,
    remove: _remove,
  } = transferDataStrategies

  const dataSource = computed(() => props.dataSource as T[])
  const dataKeyMap = computed(() => genDataKeyMap(dataSource.value, getKey.value))

  const [targetKeys, setTargetKeys] = useControlledProp(props, 'value', () => [])
  const [sourceSearchValue, setSourceSearchValue] = useState('')
  const [targetSearchValue, setTargetSearchValue] = useState('')

  const targetKeySet = computed(() => new Set(targetKeys.value))

  const handleChange = (keys: VKey[]) => {
    callEmit(props.onChange, keys, targetKeys.value)
    setTargetKeys(keys)
  }

  const separatedData = computed(() =>
    separateDataSource(dataSource.value, dataKeyMap.value, targetKeySet.value, getKey.value),
  )
  const sourceData = computed(() => separatedData.value.sourceData)
  const targetData = computed(() => separatedData.value.targetData)

  const sourceDataKeys = computed(() => genDataKeys(sourceData.value, getKey.value))
  const targetDataKeys = computed(() => genDataKeys(targetData.value, getKey.value))

  const filteredDataSource = computed(() =>
    dataFilter(
      dataSource.value,
      sourceSearchValue.value,
      (item, searchValue) => !props.searchFn || props.searchFn(true, item, searchValue),
    ),
  )
  const filteredSourceData = computed(() =>
    dataFilter(
      sourceData.value,
      sourceSearchValue.value,
      (item, searchValue) => !props.searchFn || props.searchFn(true, item, searchValue),
    ),
  )
  const filteredTargetData = computed(() =>
    dataFilter(
      targetData.value,
      targetSearchValue.value,
      (item, searchValue) => !props.searchFn || props.searchFn(false, item, searchValue),
    ),
  )

  const paginatedDataSource = computed(() =>
    getPaginatedData(filteredDataSource.value, transferPaginationContext.sourcePagination.value),
  )
  const paginatedSourceData = computed(() =>
    getPaginatedData(filteredSourceData.value, transferPaginationContext.sourcePagination.value),
  )
  const paginatedTargetData = computed(() =>
    getPaginatedData(filteredTargetData.value, transferPaginationContext.targetPagination.value),
  )

  const append = (keys: VKey[]) => {
    _append(keys, targetKeySet.value, getKey.value, handleChange)
  }
  const remove = (keys: VKey[]) => {
    _remove(keys, targetKeySet.value, getKey.value, handleChange)
  }

  const clear = () => {
    handleChange(Array.from(disabledTargetKeys.value))
  }

  const disabledKeys = computed(() => genDisabledKeys(dataSource.value, getKey.value))
  const disabledTargetKeys = computed(() => {
    const keys = genDisabledKeys(targetData.value, getKey.value)

    targetKeySet.value.forEach(key => {
      if (disabledKeys.value.has(key)) {
        keys.add(key)
      }
    })
    return keys
  })
  const disabledSourceKeys = computed(() => genDisabledKeys(sourceData.value, getKey.value))

  return {
    dataSource,
    dataKeyMap,
    sourceData,
    targetData,
    sourceDataKeys,
    targetDataKeys,
    filteredDataSource,
    filteredSourceData,
    filteredTargetData,
    paginatedDataSource,
    paginatedSourceData,
    paginatedTargetData,
    targetKeys,
    targetKeySet,
    append,
    remove,
    clear,

    getKey,

    disabledKeys,
    disabledSourceKeys,
    disabledTargetKeys,

    sourceSearchValue,
    setSourceSearchValue,
    targetSearchValue,
    setTargetSearchValue,
  }
}

function getPaginatedData<T = unknown>(data: T[], pagination: PaginationProps | undefined) {
  if (!pagination || !pagination.pageSize) {
    return data
  }

  const { total } = pagination
  if (total && data.length < total) {
    return data
  }

  const pageSize = pagination.pageSize!
  const startIndex = (pagination.pageIndex! - 1) * pageSize
  return data.slice(startIndex, startIndex + pageSize)
}
