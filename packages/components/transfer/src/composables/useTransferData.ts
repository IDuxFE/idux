/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TransferPaginationContext } from './usePagination'
import type { TransferData, TransferDataStrategy, TransferProps } from '../types'
import type { TransferConfig } from '@idux/components/config'
import type { PaginationProps } from '@idux/components/pagination'

import { type ComputedRef, computed } from 'vue'

import { type VKey, callEmit, useControlledProp } from '@idux/cdk/utils'
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
  changeTargetKeys: (removedKeys: VKey[], appendedKeys: VKey[]) => void
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
  transferDataStrategy: ComputedRef<TransferDataStrategy<T>>,
  transferPaginationContext: TransferPaginationContext,
): TransferDataContext<T> {
  const _getKey = useGetKey(props, config, 'transfer')
  const getKey = computed(() => {
    const getKeyFn = _getKey.value
    return (data: T) => getKeyFn(data) ?? data.key
  })

  const dataSource = computed(() => props.dataSource as T[])
  const dataKeyMap = computed(() => transferDataStrategy.value.genDataKeyMap(dataSource.value, getKey.value))

  const [targetKeys, setTargetKeys] = useControlledProp(props, 'value', () => [])
  const [sourceSearchValue, setSourceSearchValue] = useControlledProp(props, 'sourceSearchValue', '')
  const [targetSearchValue, setTargetSearchValue] = useControlledProp(props, 'targetSearchValue', '')

  const targetKeySet = computed(() => new Set(targetKeys.value))

  const handleChange = (keys: VKey[]) => {
    const oldKeys = targetKeys.value
    setTargetKeys(keys)
    callEmit(props.onChange, keys, oldKeys)
  }

  const separatedData = computed(() =>
    transferDataStrategy.value.separateDataSource(dataSource.value, dataKeyMap.value, targetKeySet.value, getKey.value),
  )
  const sourceData = computed(() => separatedData.value.sourceData)
  const targetData = computed(() => separatedData.value.targetData)

  const sourceDataKeys = computed(() => transferDataStrategy.value.genDataKeys(sourceData.value, getKey.value))
  const targetDataKeys = computed(() => transferDataStrategy.value.genDataKeys(targetData.value, getKey.value))

  const filteredDataSource = computed(() =>
    transferDataStrategy.value.dataFilter(
      dataSource.value,
      sourceSearchValue.value,
      (item, searchValue) => !props.searchFn || props.searchFn(true, item, searchValue),
    ),
  )
  const filteredSourceData = computed(() =>
    transferDataStrategy.value.dataFilter(
      sourceData.value,
      sourceSearchValue.value,
      (item, searchValue) => !props.searchFn || props.searchFn(true, item, searchValue),
    ),
  )
  const filteredTargetData = computed(() =>
    transferDataStrategy.value.dataFilter(
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

  const changeTargetKeys = (removedKeys: VKey[], appendedKeys: VKey[]) => {
    let newKeys = targetKeys.value
    if (removedKeys.length > 0) {
      newKeys = transferDataStrategy.value.remove(removedKeys, newKeys, getKey.value)
    }
    if (appendedKeys.length > 0) {
      newKeys = transferDataStrategy.value.append(appendedKeys, newKeys, getKey.value)
    }

    handleChange(newKeys)
  }

  const clear = () => {
    handleChange(Array.from(disabledTargetKeys.value))
  }

  const disabledKeys = computed(() => transferDataStrategy.value.genDisabledKeys(dataSource.value, getKey.value))
  const disabledTargetKeys = computed(() => {
    const _disabledKeys = disabledKeys.value
    const keys = transferDataStrategy.value.genDisabledKeys(targetData.value, getKey.value)

    targetKeySet.value.forEach(key => {
      if (_disabledKeys.has(key)) {
        keys.add(key)
      }
    })
    return keys
  })
  const disabledSourceKeys = computed(() => transferDataStrategy.value.genDisabledKeys(sourceData.value, getKey.value))

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
    changeTargetKeys,
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
