/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TransferData, TransferDataStrategies } from '../types'

import { inject, onUnmounted } from 'vue'

import { VKey } from '@idux/cdk/utils'

import { TRANSFER_DATA_STRATEGIES } from '../token'

function createDefaultStrategies<T extends TransferData = TransferData>(): TransferDataStrategies<T> {
  const cachedDataKeyMap: Map<VKey, T> = new Map()
  onUnmounted(() => {
    cachedDataKeyMap.clear()
  })

  return {
    genDataKeys: (data, getRowKey) => {
      return new Set(data.map(data => getRowKey(data)))
    },
    genDataKeyMap: (dataSource, getRowKey) => {
      const dataKeyMap = new Map()

      dataSource.forEach(item => {
        dataKeyMap.set(getRowKey(item), item)
      })

      return dataKeyMap
    },
    genDisabledKeys: (data, getRowKey) => {
      const keys = new Set<VKey>()
      data.forEach(item => {
        if (item.disabled) {
          keys.add(getRowKey(item))
        }
      })
      return keys
    },
    separateDataSource: (dataSource, dataKeyMap, selectedKeySet, getRowKey) => {
      const sourceData = dataSource.filter(data => !selectedKeySet.has(getRowKey(data)))
      const targetData: T[] = []

      selectedKeySet.forEach(key => {
        const data = dataKeyMap.get(key) ?? cachedDataKeyMap.get(key)
        if (data && !cachedDataKeyMap.has(key)) {
          cachedDataKeyMap.set(key, data)
        }

        targetData.push(data ?? ({ key } as unknown as T))
      })

      for (const cachedKey of cachedDataKeyMap.keys()) {
        if (!selectedKeySet.has(cachedKey)) {
          cachedDataKeyMap.delete(cachedKey)
        }
      }
      return {
        sourceData,
        targetData,
      }
    },
    dataFilter: (data, searchValue, searchFn) => {
      if (!searchValue) {
        return data
      }

      return data.filter(item => searchFn(item, searchValue))
    },
    append: (keys, selectedKeySet, _, handleChange) => {
      const newKeys = new Set(selectedKeySet)

      keys.forEach(key => {
        newKeys.add(key)
      })

      if (newKeys.size !== selectedKeySet.size) {
        handleChange(Array.from(newKeys))
      }
    },
    remove: (keys, selectedKeySet, _, handleChange) => {
      const newKeys = new Set(selectedKeySet)

      keys.forEach(key => {
        newKeys.delete(key)
      })

      if (newKeys.size !== selectedKeySet.size) {
        handleChange(Array.from(newKeys))
      }
    },
  }
}

export function useTransferDataStrategies<T extends TransferData = TransferData>(): TransferDataStrategies<T> {
  const strategies = inject<TransferDataStrategies<T> | null>(TRANSFER_DATA_STRATEGIES, null)
  const defaultStrategies = createDefaultStrategies<T>()

  return strategies
    ? { ...(defaultStrategies as TransferDataStrategies<T>), ...strategies }
    : (defaultStrategies as TransferDataStrategies<T>)
}
