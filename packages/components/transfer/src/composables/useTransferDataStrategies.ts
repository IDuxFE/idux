/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TransferData, TransferDataStrategy, TransferProps } from '../types'
import type { VKey } from '@idux/cdk/utils'
import type { GetKeyFn } from '@idux/components/utils'

import { type ComputedRef, computed, onUnmounted } from 'vue'

function createDefaultStrategies<T extends TransferData = TransferData>(
  defaultTargetData: T[] | undefined,
): TransferDataStrategy<T> {
  const cachedDataKeyMap: Map<VKey, T> = new Map()
  onUnmounted(() => {
    cachedDataKeyMap.clear()
  })

  const genDataKeys = (data: T[], getKey: GetKeyFn): Set<VKey> => {
    return new Set(data.map(data => getKey(data)))
  }

  return {
    genDataKeys,
    genDataKeyMap: (dataSource, getKey) => {
      const dataKeyMap = new Map()

      dataSource.forEach(item => {
        dataKeyMap.set(getKey(item), item)
      })

      return dataKeyMap
    },
    genDisabledKeys: (data, getKey, disableData) => {
      const keys = new Set<VKey>()
      data.forEach(item => {
        if (item.disabled || disableData?.(item)) {
          keys.add(getKey(item))
        }
      })
      return keys
    },
    getAllSelectedKeys: (selected, data, selectedKeySet, disabledkeySet, getKey) => {
      let tempKeys: Set<VKey>
      if (!selected) {
        tempKeys = new Set()
        disabledkeySet.forEach(key => {
          selectedKeySet.has(key) && tempKeys.add(key)
        })
      } else {
        tempKeys = genDataKeys(data, getKey)
        disabledkeySet.forEach(key => {
          !selectedKeySet.has(key) && tempKeys.delete(key)
        })
      }

      return Array.from(tempKeys)
    },
    separateDataSource: (dataSource, dataKeyMap, selectedKeySet, getKey) => {
      const sourceData = dataSource.filter(data => !selectedKeySet.has(getKey(data)))
      const targetData: T[] = []

      selectedKeySet.forEach(key => {
        const data =
          dataKeyMap.get(key) ?? cachedDataKeyMap.get(key) ?? defaultTargetData?.find(data => getKey(data) === key)
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
    append: (keys, selectedKeySet) => {
      const newKeys = new Set(selectedKeySet)

      keys.forEach(key => {
        newKeys.add(key)
      })

      return Array.from(newKeys)
    },
    remove: (keys, selectedKeySet) => {
      const newKeys = new Set(selectedKeySet)

      keys.forEach(key => {
        newKeys.delete(key)
      })

      return Array.from(newKeys)
    },
  }
}

export function useTransferDataStrategies<T extends TransferData = TransferData>(
  props: TransferProps,
): ComputedRef<TransferDataStrategy<T, VKey>> {
  const defaultStrategy = createDefaultStrategies<T>((props.defaultTargetData ?? []) as T[])
  const strategy = computed(() => {
    return props.dataStrategy
      ? ({ ...defaultStrategy, ...props.dataStrategy } as TransferDataStrategy<T, VKey>)
      : defaultStrategy
  })

  return strategy
}
