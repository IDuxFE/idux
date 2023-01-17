/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProTransferProps, TreeTransferData } from '../types'
import type { TransferDataStrategyProp } from '@idux/components/transfer'
import type { GetKeyFn, TreeCheckStateResolver } from '@idux/components/utils'

import { type ComputedRef, type Ref, ref, watch } from 'vue'

import { type VKey, filterTree, flattenTree, mergeTree, traverseTree } from '@idux/cdk/utils'
import { type CascaderStrategy } from '@idux/components/cascader'

import { type TreeDataStrategyContext, useTreeDataStrategyContext } from './useTreeDataStrategyContext'

export function useTreeDataStrategies<V extends TreeTransferData<V, C>, C extends string>(
  props: ProTransferProps,
  childrenKey: ComputedRef<C>,
  getKey: ComputedRef<GetKeyFn>,
  cascadeStrategy: ComputedRef<CascaderStrategy>,
): {
  context: TreeDataStrategyContext<V, C>
  mergedDataStrategy: Ref<TransferDataStrategyProp<V>>
} {
  const context = useTreeDataStrategyContext<V, C>(props, childrenKey, getKey, cascadeStrategy)
  const getMergedDataStrategy = (): TransferDataStrategyProp<V> => ({
    ...context.baseDataStrategy,
    ...createStrategy(context, cascadeStrategy.value, props.flatTargetData),
  })
  const mergedDataStrategy = ref<TransferDataStrategyProp<V>>(getMergedDataStrategy())
  watch([cascadeStrategy, childrenKey], () => {
    mergedDataStrategy.value = getMergedDataStrategy()
  })

  return {
    context,
    mergedDataStrategy,
  }
}

const getAllSelectedKeys = <V extends TreeTransferData<V, C>, C extends string>(
  selected: boolean,
  checkStateResolver: TreeCheckStateResolver<V, C>,
  data: V[],
  selectedKeySet: Set<VKey>,
  disabledkeySet: Set<VKey>,
) => {
  const defaultKeys: VKey[] = []
  disabledkeySet.forEach(key => {
    if (selected) {
      !selectedKeySet.has(key) && defaultKeys.push(key)
    } else {
      selectedKeySet.has(key) && defaultKeys.push(key)
    }
  })

  return checkStateResolver[selected ? 'getAllCheckedKeys' : 'getAllUncheckedKeys'](data, defaultKeys)
}

const genDisabledKeys = <V extends TreeTransferData<V, C>, C extends string>(
  data: V[],
  getKey: (item: V) => VKey,
  disableData: ((item: V) => boolean) | undefined,
  childrenKey: C,
  cascade: boolean,
): Set<VKey> => {
  const keys = new Set<VKey>()
  const checkDisabled = (item: V) => item.disabled || !!disableData?.(item)

  traverseTree(
    data,
    childrenKey,
    (item, parents) => {
      const key = getKey(item)
      const children = item[childrenKey]
      if (
        checkDisabled(item) ||
        (cascade &&
          (parents.some(parent => checkDisabled(parent)) ||
            (children?.length && children.every(child => keys.has(getKey(child))))))
      ) {
        keys.add(key)
      }
    },
    'post',
  )

  return keys
}

function createSeparateDataSourceFn<V extends TreeTransferData<V, C>, C extends string>(
  childrenKey: ComputedRef<C>,
  cachedTargetData: Ref<V[]>,
  cascaderStrategy: CascaderStrategy,
  targetDataCount: Ref<number>,
  flatTargetData: boolean | 'all' = false,
): Exclude<TransferDataStrategyProp<V>['separateDataSource'], undefined> {
  const targetDataKeySet = new Set<VKey>()

  const getFilterFn = (selectedKeySet: Set<VKey>, getKey: GetKeyFn): ((data: V[], isSource: boolean) => V[]) => {
    // under cascaderStrategy `parent`, selected child nodes are not in selectedKeys
    // so we consider the item is selected when its parent exists in selectedKeys
    const filterFn: (item: V, parent: V[], isSource: boolean) => boolean = (() => {
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

      const res: V[] = []
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

    // merge new data with previous data
    // beacause we intend to cache selected data after dataSource changes
    const targetData = mergeTree(previousTargetData, newTargetData, childrenKey.value, getKey)
    cachedTargetData.value = targetData

    return {
      sourceData: filterData(data, true),
      targetData:
        cascaderStrategy === 'off' ? targetData : flattenTargetTree(targetData, childrenKey.value, flatTargetData),
    }
  }
}

function flattenTargetTree<V extends TreeTransferData<V, C>, C extends string>(
  data: V[],
  childrenKey: C,
  flatTargetData: boolean | 'all',
) {
  if (!flatTargetData) {
    return data
  }

  return flattenTree(data, childrenKey, item => ({ ...item, children: undefined }), flatTargetData !== 'all')
}

function createStrategy<V extends TreeTransferData<V, C>, C extends string>(
  context: TreeDataStrategyContext<V, C>,
  cascaderStrategy: CascaderStrategy,
  flatTargetData: boolean | 'all',
): TransferDataStrategyProp<V> {
  const { cachedTargetData, checkStateResolver, childrenKey, dataMap, targetDataCount } = context

  return {
    genDisabledKeys: (data, getKey, disableData) =>
      genDisabledKeys(data, getKey, disableData, childrenKey.value, cascaderStrategy !== 'off'),
    getAllSelectedKeys: (selected, data, selectedKeySet, disabledKeySet) =>
      getAllSelectedKeys(selected, checkStateResolver, data, selectedKeySet, disabledKeySet),
    separateDataSource: createSeparateDataSourceFn(
      childrenKey,
      cachedTargetData,
      cascaderStrategy,
      targetDataCount,
      flatTargetData,
    ),
    append: (keys, selectedKey) => checkStateResolver.appendKeys(selectedKey, keys),
    remove: (keys, selectedkey) =>
      checkStateResolver.removeKeys(
        selectedkey,
        cascaderStrategy === 'all' || cascaderStrategy === 'child'
          ? keys.filter(key => !dataMap.get(key)?.[childrenKey.value]?.length)
          : keys,
      ),
  }
}
