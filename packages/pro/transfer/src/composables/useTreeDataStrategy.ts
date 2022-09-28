/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, type Ref, onUnmounted, ref } from 'vue'

import { isNil } from 'lodash-es'

import { type VKey } from '@idux/cdk/utils'
import { type CascaderStrategy } from '@idux/components/cascader'
import { type TransferDataStrategiesConfig } from '@idux/components/transfer'
import { type GetKeyFn } from '@idux/components/utils'

import { type TreeTransferData } from '../types'
import { combineTrees, filterTree, genFlattenedTreeKeys, traverseTree } from '../utils'

export function useTreeDataStrategies<C extends VKey>(
  childrenKey: ComputedRef<C>,
  defaultTreeData: TreeTransferData<C>[] | undefined,
  cascaderStrategy: CascaderStrategy = 'all',
): {
  dataKeyMap: Map<VKey, TreeTransferData<C>>
  parentKeyMap: Map<VKey, VKey | undefined>
  dataStrategies: TransferDataStrategiesConfig<TreeTransferData<C>>
} {
  const cachedTargetData = ref(defaultTreeData ?? []) as Ref<TreeTransferData<C>[]>
  const dataKeyMap: Map<VKey, TreeTransferData<C>> = new Map()
  const parentKeyMap: Map<VKey, VKey | undefined> = new Map()

  onUnmounted(() => {
    cachedTargetData.value = []
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
        keys = genDisabledKeys(item[childrenKey.value]!, getRowKey, keys)
        if (
          item[childrenKey.value]!.length > 0 &&
          item[childrenKey.value]!.every((child: TreeTransferData<C>) => keys.has(getRowKey(child)))
        ) {
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
      genDataKeys: (data, getKey) => {
        return new Set(genFlattenedTreeKeys(data, childrenKey.value, getKey))
      },
      genDataKeyMap: (data, getKey) => {
        parentKeyMap.clear()
        dataKeyMap.clear()

        traverseTree(data, childrenKey.value, (node, parents) => {
          const key = getKey(node)
          dataKeyMap.set(key, node)

          const parent = parents[0]
          parentKeyMap.set(key, parent && getKey(parent))
        })

        return new Map(dataKeyMap)
      },
      genDisabledKeys,
      dataFilter: (data, searchValue, searchFn) => {
        if (!searchValue) {
          return data
        }

        return filterTree(data, childrenKey.value, item => searchFn(item, searchValue), 'or')
      },
      ...createStrategy(childrenKey, cachedTargetData, parentKeyMap, dataKeyMap, cascaderStrategy),
    },
  }
}

const commonRemoveFn = (keys: VKey[], selectedKeySet: VKey[], parentKeyMap: Map<VKey, VKey | undefined>) => {
  const newKeys = new Set(selectedKeySet)

  keys.forEach(key => {
    let currentKey: VKey | undefined = key
    while (currentKey) {
      newKeys.delete(currentKey)
      currentKey = parentKeyMap.get(currentKey!)
    }
  })

  return Array.from(newKeys)
}

function createStrategy<C extends VKey>(
  childrenKey: ComputedRef<C>,
  cachedTargetData: Ref<TreeTransferData<C>[]>,
  parentKeyMap: Map<VKey, VKey | undefined>,
  dataKeyMap: Map<VKey, TreeTransferData<C>>,
  cascaderStrategy: CascaderStrategy,
) {
  switch (cascaderStrategy) {
    case 'parent':
      return createParentStrategy(childrenKey, cachedTargetData, dataKeyMap)
    case 'child':
      return createChildStrategy(childrenKey, cachedTargetData, parentKeyMap)
    // TODO: support 'off'
    case 'all':
    default:
      return createAllStrategy(childrenKey, cachedTargetData, parentKeyMap)
  }
}

function createAllStrategy<C extends VKey>(
  childrenKey: ComputedRef<C>,
  cachedTargetData: Ref<TreeTransferData<C>[]>,
  parentKeyMap: Map<VKey, VKey | undefined>,
): TransferDataStrategiesConfig<TreeTransferData<C>> {
  return {
    separateDataSource: createSeparateDataSourceFn(childrenKey, cachedTargetData, 'all'),
    remove: (keys, selectedKeySet) => commonRemoveFn(keys, selectedKeySet, parentKeyMap),
  }
}

function createChildStrategy<C extends VKey>(
  childrenKey: ComputedRef<C>,
  cachedTargetData: Ref<TreeTransferData<C>[]>,
  parentKeyMap: Map<VKey, VKey | undefined>,
): TransferDataStrategiesConfig<TreeTransferData<C>> {
  return {
    separateDataSource: createSeparateDataSourceFn(childrenKey, cachedTargetData, 'child'),
    remove: (keys, selectedKeySet) => commonRemoveFn(keys, selectedKeySet, parentKeyMap),
  }
}

function createParentStrategy<C extends VKey>(
  childrenKey: ComputedRef<C>,
  cachedTargetData: Ref<TreeTransferData<C>[]>,
  dataKeyMap: Map<VKey, TreeTransferData<C>>,
): TransferDataStrategiesConfig<TreeTransferData<C>> {
  const separateDataSource = createSeparateDataSourceFn(childrenKey, cachedTargetData, 'parent')
  let targetData: TreeTransferData<C>[] = []

  return {
    separateDataSource(data, _, selectedKeySet, getKey) {
      const separatedData = separateDataSource(data, _, selectedKeySet, getKey)
      targetData = separatedData.targetData
      return separatedData
    },
    append(keys, selectedKey, getKey) {
      const newKeySet = new Set(selectedKey)

      keys.forEach(key => {
        newKeySet.add(key)

        const children = dataKeyMap.get(key)?.[childrenKey.value]
        if (children) {
          traverseTree(children, childrenKey.value, item => {
            newKeySet.delete(getKey(item))
          })
        }
      })

      return Array.from(newKeySet)
    },
    remove(keys, selectedKey, getKey) {
      const keySet = new Set(keys)
      const newKeySet = new Set(selectedKey)
      const deletedKeys = new Set()

      // store already deleted keys
      const deleteKey = (key: VKey) => {
        deletedKeys.add(key)
        newKeySet.delete(key)
      }

      // it is not possible to get the correct selected keys from bottom to top
      traverseTree(targetData, childrenKey.value, (item, parents) => {
        if (keySet.has(getKey(item))) {
          const keysInChain = [item, ...parents].map(getKey)
          // if some of the ancestors was selected
          // replace parent node with child nodes
          if (keysInChain.some(key => newKeySet.has(key))) {
            parents.forEach(parent => {
              parent[childrenKey.value]?.forEach(child => {
                const childKey = getKey(child)
                // add only if the child node hasn't been deleted before
                if (!deletedKeys.has(childKey)) {
                  newKeySet.add(childKey)
                }
              })
            })
            // not one of the ancestors should be selected
            keysInChain.forEach(key => deleteKey(key))
          }
        } else if (parents.some(parent => keySet.has(getKey(parent)))) {
          // if some of the ancestors was removed
          // remove the node itself
          deleteKey(getKey(item))
        }
      })

      return Array.from(newKeySet)
    },
  }
}

function createSeparateDataSourceFn<C extends VKey>(
  childrenKey: ComputedRef<C>,
  cachedTargetData: Ref<TreeTransferData<C>[]>,
  cascaderStrategy: CascaderStrategy,
): Exclude<TransferDataStrategiesConfig<TreeTransferData<C>>['separateDataSource'], undefined> {
  const getFilterFn = (
    selectedKeySet: Set<VKey>,
    getKey: GetKeyFn,
  ): ((data: TreeTransferData<C>[], isSource: boolean) => TreeTransferData<C>[]) => {
    // under cascaderStrategy `parent`, selected child nodes are not in selectedKeys
    // so we consider the item is selected when its parent exists in selectedKeys
    const filterFn: (item: TreeTransferData<C>, parent: TreeTransferData<C>[], isSource: boolean) => boolean =
      cascaderStrategy === 'all' || cascaderStrategy === 'child'
        ? (item, _, isSource) => selectedKeySet.has(getKey(item)) !== isSource
        : (item, parent, isSource) => [item, ...parent].map(getKey).some(key => selectedKeySet.has(key)) !== isSource

    return (data, isSource) =>
      filterTree(data, childrenKey.value, (item, parent) => filterFn(item, parent, isSource), 'or')
  }

  return (data, _, selectedKeySet, getKey) => {
    const filterData = getFilterFn(selectedKeySet, getKey)

    const newTargetData = filterData(data, false)
    const previousTargetData = filterData(cachedTargetData.value, false)

    // combine new data with previous data
    // beacause we intend to cache selected data after dataSource changes
    const targetData = combineTrees(newTargetData, previousTargetData, childrenKey.value, getKey)
    cachedTargetData.value = targetData

    return {
      sourceData: filterData(data, true),
      targetData,
    }
  }
}
