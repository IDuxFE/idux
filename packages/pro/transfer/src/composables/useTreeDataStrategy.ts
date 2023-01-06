/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProTransferProps, TreeTransferData } from '../types'
import type { VKey } from '@idux/cdk/utils'
import type { TransferDataStrategyProp } from '@idux/components/transfer'
import type { GetKeyFn } from '@idux/components/utils'

import { type ComputedRef, type Ref, ref, watch } from 'vue'

import { type CascaderStrategy } from '@idux/components/cascader'

import { combineTrees, filterTree, flattenTree, genFlattenedTreeKeys, traverseTree } from '../utils'
import { type TreeDataStrategyContext, useTreeDataStrategyContext } from './useTreeDataStrategyContext'

export function useTreeDataStrategies<C extends VKey>(
  props: ProTransferProps,
  childrenKey: ComputedRef<C>,
  cascadeStrategy: ComputedRef<CascaderStrategy>,
): {
  context: TreeDataStrategyContext<C>
  mergedDataStrategy: Ref<TransferDataStrategyProp<TreeTransferData<C>>>
} {
  const context = useTreeDataStrategyContext(props, childrenKey)
  const getMergedDataStrategy = () => ({
    ...context.baseDataStrategy,
    ...createStrategy(context, childrenKey, cascadeStrategy.value, props.flatTargetData),
  })
  const mergedDataStrategy = ref<TransferDataStrategyProp<TreeTransferData<C>>>(getMergedDataStrategy())
  watch([cascadeStrategy, childrenKey], () => {
    mergedDataStrategy.value = getMergedDataStrategy()
  })

  return {
    context,
    mergedDataStrategy,
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

const getAllSelectedKeys = <C extends VKey>(
  selected: boolean,
  data: TreeTransferData<C>[],
  selectedKeySet: Set<VKey>,
  disabledkeySet: Set<VKey>,
  getKey: GetKeyFn,
  childrenKey: C,
) => {
  let tempKeys: Set<VKey>
  if (!selected) {
    tempKeys = new Set()
    disabledkeySet.forEach(key => {
      selectedKeySet.has(key) && tempKeys.add(key)
    })
  } else {
    tempKeys = new Set(genFlattenedTreeKeys(data, childrenKey, getKey))
    disabledkeySet.forEach(key => {
      !selectedKeySet.has(key) && tempKeys.delete(key)
    })
  }

  return Array.from(tempKeys)
}

const genDisabledKeys = <C extends VKey>(
  data: TreeTransferData<C>[],
  getKey: (item: TreeTransferData<C>) => VKey,
  childrenKey: C,
  cascade: boolean,
): Set<VKey> => {
  const keys = new Set<VKey>()

  traverseTree(
    data,
    childrenKey,
    (item, parents) => {
      const key = getKey(item)
      const cihldren = item[childrenKey]
      if (
        item.disabled ||
        (cascade &&
          (parents.some(parent => parent.disabled) ||
            (cihldren?.length && cihldren.every(child => keys.has(getKey(child))))))
      ) {
        keys.add(key)
      }
    },
    'post',
  )

  return keys
}

function createSeparateDataSourceFn<C extends VKey>(
  childrenKey: ComputedRef<C>,
  cachedTargetData: Ref<TreeTransferData<C>[]>,
  cascaderStrategy: CascaderStrategy,
  targetDataCount: Ref<number>,
): Exclude<TransferDataStrategyProp<TreeTransferData<C>>['separateDataSource'], undefined> {
  const targetDataKeySet = new Set<VKey>()

  const getFilterFn = (
    selectedKeySet: Set<VKey>,
    getKey: GetKeyFn,
  ): ((data: TreeTransferData<C>[], isSource: boolean) => TreeTransferData<C>[]) => {
    // under cascaderStrategy `parent`, selected child nodes are not in selectedKeys
    // so we consider the item is selected when its parent exists in selectedKeys
    const filterFn: (item: TreeTransferData<C>, parent: TreeTransferData<C>[], isSource: boolean) => boolean = (() => {
      switch (cascaderStrategy) {
        case 'all':
        case 'off':
          return (item, _, isSource) => selectedKeySet.has(getKey(item)) !== isSource
        case 'child':
          return (item, _, isSource) =>
            selectedKeySet.has(getKey(item)) !== isSource && !item[childrenKey.value]?.length
        case 'parent':
          return (item, parent, isSource) =>
            [item, ...parent].map(getKey).some(key => selectedKeySet.has(key)) !== isSource
      }
    })()

    return (data, isSource) => {
      if (isSource || cascaderStrategy !== 'off') {
        return filterTree(
          data,
          childrenKey.value,
          (item, parent) => {
            const filterRes = filterFn(item, parent, isSource)

            // set targetDataKeySet to collect targetData count later
            // we collect this during filter process to avoid unecessary traveral
            if (!isSource && filterRes) {
              targetDataKeySet.add(getKey(item))
            }

            return filterRes
          },
          'or',
        )
      }

      const res: TreeTransferData<C>[] = []
      traverseTree(data, childrenKey.value, (item, parent) => {
        const key = getKey(item)
        if (filterFn(item, parent, isSource) && !targetDataKeySet.has(key)) {
          targetDataKeySet.add(key)
          res.push({ ...item, [childrenKey.value]: undefined })
        }
      })
      return res
    }
  }

  return (data, _, selectedKeySet, getKey) => {
    const filterData = getFilterFn(selectedKeySet, getKey)

    const newTargetData = filterData(data, false)
    const previousTargetData = filterData(cachedTargetData.value, false)

    targetDataCount.value = targetDataKeySet.size
    targetDataKeySet.clear()

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

function createSeparateDataSourceFnWithFlatten<C extends VKey>(
  childrenKey: ComputedRef<C>,
  cachedTargetData: Ref<TreeTransferData<C>[]>,
  cascaderStrategy: CascaderStrategy,
  targetDataCount: Ref<number>,
  flatTargetData: boolean | 'all' = false,
): Exclude<TransferDataStrategyProp<TreeTransferData<C>>['separateDataSource'], undefined> {
  const fn = createSeparateDataSourceFn(childrenKey, cachedTargetData, cascaderStrategy, targetDataCount)

  return (...args) => {
    const { sourceData, targetData } = fn(...args)

    return {
      sourceData,
      targetData:
        cascaderStrategy === 'off' ? targetData : flattenTargetTree(targetData, childrenKey.value, flatTargetData),
    }
  }
}

function flattenTargetTree<C extends VKey>(
  data: TreeTransferData<C>[],
  childrenKey: C,
  flatTargetData: boolean | 'all',
) {
  if (!flatTargetData) {
    return data
  }

  return flattenTree(data, childrenKey, item => ({ ...item, children: undefined }), flatTargetData !== 'all')
}

function createStrategy<C extends VKey>(
  context: TreeDataStrategyContext<C>,
  childrenKey: ComputedRef<C>,
  cascaderStrategy: CascaderStrategy,
  flatTargetData: boolean | 'all',
) {
  switch (cascaderStrategy) {
    case 'parent':
      return createParentStrategy(context, childrenKey, flatTargetData)
    case 'child':
      return createChildStrategy(context, childrenKey, flatTargetData)
    case 'off':
      return createOffStrategy(context, childrenKey, flatTargetData)
    case 'all':
    default:
      return createAllStrategy(context, childrenKey, flatTargetData)
  }
}

function createAllStrategy<C extends VKey>(
  context: TreeDataStrategyContext<C>,
  childrenKey: ComputedRef<C>,
  flatTargetData: boolean | 'all',
): TransferDataStrategyProp<TreeTransferData<C>> {
  const { cachedTargetData, parentKeyMap, targetDataCount } = context
  return {
    genDisabledKeys: (data, getKey) => genDisabledKeys(data, getKey, childrenKey.value, true),
    separateDataSource: createSeparateDataSourceFnWithFlatten(
      childrenKey,
      cachedTargetData,
      'all',
      targetDataCount,
      flatTargetData,
    ),
    getAllSelectedKeys: (selected, data, selectedKeySet, disabledKeySet, getKey) =>
      getAllSelectedKeys(selected, data, selectedKeySet, disabledKeySet, getKey, childrenKey.value),
    remove: (keys, selectedKeySet) => commonRemoveFn(keys, selectedKeySet, parentKeyMap),
  }
}

function createChildStrategy<C extends VKey>(
  context: TreeDataStrategyContext<C>,
  childrenKey: ComputedRef<C>,
  flatTargetData: boolean | 'all',
): TransferDataStrategyProp<TreeTransferData<C>> {
  const { cachedTargetData, parentKeyMap, targetDataCount } = context

  return {
    genDisabledKeys: (data, getKey) => genDisabledKeys(data, getKey, childrenKey.value, true),
    getAllSelectedKeys(selected, data, selectedKeySet, disabledKeySet, getKey) {
      if (!selected) {
        return Array.from(selectedKeySet).filter(key => disabledKeySet.has(key))
      }

      const keys: VKey[] = []
      flattenTree(data, childrenKey.value, undefined, true).forEach(node => {
        const key = getKey(node)
        if (selectedKeySet.has(key)) {
          keys.push(key)
        } else if (!disabledKeySet.has(key)) {
          keys.push(key)
        }
      })

      return keys
    },
    separateDataSource: createSeparateDataSourceFnWithFlatten(
      childrenKey,
      cachedTargetData,
      'child',
      targetDataCount,
      flatTargetData,
    ),
    remove: (keys, selectedKeySet) => commonRemoveFn(keys, selectedKeySet, parentKeyMap),
  }
}

function createParentStrategy<C extends VKey>(
  context: TreeDataStrategyContext<C>,
  childrenKey: ComputedRef<C>,
  flatTargetData: boolean | 'all',
): TransferDataStrategyProp<TreeTransferData<C>> {
  const { cachedTargetData, dataKeyMap, targetDataCount } = context
  const separateDataSource = createSeparateDataSourceFn(childrenKey, cachedTargetData, 'parent', targetDataCount)

  return {
    genDisabledKeys: (data, getKey) => genDisabledKeys(data, getKey, childrenKey.value, true),
    getAllSelectedKeys: (selected, data, selectedKeySet, disabledKeySet, getKey) => {
      const keys: VKey[] = []

      if (selected) {
        traverseTree(data, childrenKey.value, (item, parents) => {
          const key = getKey(item)
          if (disabledKeySet.has(key)) {
            ;[...parents, item].some(node => selectedKeySet.has(getKey(node))) && keys.push(key)
            return
          }

          if (!item[childrenKey.value]?.length) {
            keys.push(key)
          } else if (item[childrenKey.value]!.every(child => !disabledKeySet.has(getKey(child)))) {
            keys.push(key)
          }
        })
      } else {
        traverseTree(data, childrenKey.value, (item, parents) => {
          const key = getKey(item)
          if (!disabledKeySet.has(key)) {
            return
          }

          if ([...parents, item].some(node => selectedKeySet.has(getKey(node)))) {
            keys.push(key)
            return
          }
        })
      }

      return keys
    },
    separateDataSource(data, _, selectedKeySet, getKey) {
      const { sourceData, targetData } = separateDataSource(data, _, selectedKeySet, getKey)
      return {
        sourceData,
        targetData: flattenTargetTree(targetData, childrenKey.value, flatTargetData),
      }
    },
    append(keys, selectedKey, getKey) {
      const newKeySet = new Set([...selectedKey, ...keys])

      keys.forEach(key => {
        const children = dataKeyMap.get(key)?.[childrenKey.value]
        if (children) {
          traverseTree(children, childrenKey.value, item => {
            newKeySet.delete(getKey(item))
          })
        }
      })

      return Array.from(newKeySet)
    },
    remove(keys: VKey[], selectedKey: VKey[], getKey: GetKeyFn) {
      const keySet = new Set(keys)
      const newKeySet = new Set(selectedKey)
      const deletedKeys = new Set()

      // store already deleted keys
      const deleteKey = (key: VKey) => {
        deletedKeys.add(key)
        newKeySet.delete(key)
      }

      // it is not possible to get the correct selected keys from bottom to top
      traverseTree(cachedTargetData.value, childrenKey.value, (item, parents) => {
        if (keySet.has(getKey(item))) {
          const keysInChain = [item, ...parents].map(getKey)
          const selectedKeyIdx = keysInChain.findIndex(key => newKeySet.has(key))

          // if one of the ancestors was selected
          // replace parent node with child nodes
          if (selectedKeyIdx > -1) {
            // only travers chain from selected node to the bottom
            parents.slice(0, selectedKeyIdx).forEach(parent => {
              parent[childrenKey.value]?.forEach(child => {
                const childKey = getKey(child)
                // add only if the child node hasn't been deleted before
                if (!deletedKeys.has(childKey)) {
                  newKeySet.add(childKey)
                }
              })
            })
            // not one of the ancestors should be selected
            keysInChain.slice(0, selectedKeyIdx + 1).forEach(key => deleteKey(key))
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

function createOffStrategy<C extends VKey>(
  context: TreeDataStrategyContext<C>,
  childrenKey: ComputedRef<C>,
  flatTargetData: boolean | 'all',
): TransferDataStrategyProp<TreeTransferData<C>> {
  const { cachedTargetData, targetDataCount } = context

  return {
    genDisabledKeys: (data, getKey) => genDisabledKeys(data, getKey, childrenKey.value, false),
    separateDataSource: createSeparateDataSourceFnWithFlatten(
      childrenKey,
      cachedTargetData,
      'off',
      targetDataCount,
      flatTargetData,
    ),
    getAllSelectedKeys: (selected, data, selectedKeySet, disabledKeySet, getKey) =>
      getAllSelectedKeys(selected, data, selectedKeySet, disabledKeySet, getKey, childrenKey.value),
  }
}
