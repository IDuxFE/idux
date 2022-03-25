/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TreeTransferData } from '../types'
import type { VKey } from '@idux/cdk/utils'
import type { TransferDataStrategiesConfig } from '@idux/components/transfer'

import { type ComputedRef, onUnmounted } from 'vue'

import { isNil } from 'lodash-es'

import { combineTrees, filterTree, genFlattenedTreeKeys, traverseTree } from '../utils'

export function useTreeDataStrategies<C extends VKey>(
  childrenKey: ComputedRef<C>,
  defaultTreeData: TreeTransferData<C>[] | undefined,
): {
  dataKeyMap: Map<VKey, TreeTransferData<C>>
  parentKeyMap: Map<VKey, VKey | undefined>
  dataStrategies: TransferDataStrategiesConfig<TreeTransferData<C>>
} {
  let cachedTargetData: TreeTransferData<C>[] = defaultTreeData ?? []
  const dataKeyMap: Map<VKey, TreeTransferData<C>> = new Map()
  const parentKeyMap: Map<VKey, VKey | undefined> = new Map()

  onUnmounted(() => {
    cachedTargetData = []
    dataKeyMap.clear()
    parentKeyMap.clear()
  })

  const genDisabledKeys = (
    data: TreeTransferData<C>[],
    getRowKey: (item: TreeTransferData<C>) => VKey,
    disabledKeys?: Set<VKey>,
  ): Set<VKey> => {
    let keys = disabledKeys ?? new Set()
    data.forEach(item => {
      const key = getRowKey(item)
      if (item.disabled) {
        keys.add(key)
        return
      }

      const parentKey = parentKeyMap.get(key)
      if (!isNil(parentKey) && keys.has(parentKey)) {
        keys.add(key)
        return
      }

      if (item[childrenKey.value]) {
        keys = genDisabledKeys(item[childrenKey.value], getRowKey, keys)
        if (item[childrenKey.value].every((child: TreeTransferData<C>) => keys.has(getRowKey(child)))) {
          keys.add(key)
        }
      }
    })

    return keys
  }

  return {
    dataKeyMap,
    parentKeyMap,
    dataStrategies: {
      genDataKeys: (data, getRowKey) => {
        return new Set(genFlattenedTreeKeys(data, childrenKey.value, getRowKey))
      },
      genDataKeyMap: (data, getRowKey) => {
        parentKeyMap.clear()
        dataKeyMap.clear()

        traverseTree(data, childrenKey.value, (node, parent) => {
          const key = getRowKey(node)
          dataKeyMap.set(key, node)
          parentKeyMap.set(key, parent && getRowKey(parent))
        })

        return new Map(dataKeyMap)
      },
      genDisabledKeys,
      separateDataSource: (data, _, selectedKeySet, getRowKey) => {
        const filterData = (data: TreeTransferData<C>[], isSource: boolean) =>
          filterTree(
            data,
            childrenKey.value,
            item => (isSource ? !selectedKeySet.has(getRowKey(item)) : selectedKeySet.has(getRowKey(item))),
            'or',
          )

        const newTargetData = filterData(data, false)
        const previousTargetData = filterData(cachedTargetData, false)

        const targetData = combineTrees(newTargetData, previousTargetData, childrenKey.value, getRowKey)
        cachedTargetData = targetData

        return {
          sourceData: filterData(data, true),
          targetData,
        }
      },
      remove: (keys, selectedKeySet, getRowKey, handleChange) => {
        const newKeys = new Set(selectedKeySet)

        keys.forEach(key => {
          newKeys.delete(key)

          let currentKey: VKey | undefined = key
          while (parentKeyMap.has(currentKey!)) {
            currentKey = parentKeyMap.get(currentKey!)

            if (isNil(currentKey)) {
              return
            }

            newKeys.delete(currentKey)
          }
        })

        if (newKeys.size !== selectedKeySet.size) {
          handleChange(Array.from(newKeys))
        }
      },
      dataFilter: (data, searchValue, searchFn) => {
        if (!searchValue) {
          return data
        }

        return filterTree(data, childrenKey.value, item => searchFn(item, searchValue), 'or')
      },
    },
  }
}
