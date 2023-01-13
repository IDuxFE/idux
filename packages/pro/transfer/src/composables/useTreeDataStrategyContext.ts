/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProTransferProps, TreeTransferData } from '../types'
import type { TransferDataStrategyProp } from '@idux/components/transfer'

import { type ComputedRef, type Ref, computed, onUnmounted, ref } from 'vue'

import { type VKey, filterTree, getTreeKeys, mergeTree, traverseTree } from '@idux/cdk/utils'
import {
  type GetKeyFn,
  type TreeCascadeStrategy,
  type TreeCheckStateResolver,
  type TreeCheckStateResolverContext,
  useTreeCheckStateResolver,
} from '@idux/components/utils'

export interface TreeDataStrategyContext<
  V extends TreeTransferData<V, C> = TreeTransferData,
  C extends string = 'children',
> {
  baseDataStrategy: TransferDataStrategyProp<V>
  checkStateResolver: TreeCheckStateResolver<V, C>
  dataMap: Map<VKey, V>
  parentKeyMap: Map<VKey, VKey>
  getKey: ComputedRef<GetKeyFn>
  childrenKey: ComputedRef<C>
  cachedTargetData: Ref<V[]>
  targetDataCount: Ref<number>
}

export function useTreeDataStrategyContext<V extends TreeTransferData<V, C>, C extends string>(
  props: ProTransferProps,
  childrenKey: ComputedRef<C>,
  getKey: ComputedRef<GetKeyFn>,
  cascadeStrategy: ComputedRef<TreeCascadeStrategy>,
): TreeDataStrategyContext<V, C> {
  const cachedTargetData = ref(props.defaultTargetData ?? []) as Ref<V[]>
  const targetDataCount = ref(0)
  const dataMap: Map<VKey, V> = new Map()
  const parentKeyMap: Map<VKey, VKey> = new Map()
  const depthMap: Map<VKey, number> = new Map()

  const dataRef: Ref<V[]> = ref([])
  const checkStateResolverContext = computed<TreeCheckStateResolverContext<V, C>>(() => ({
    data: dataRef.value,
    dataMap,
    parentKeyMap,
    depthMap,
  }))

  const checkStateResolver = useTreeCheckStateResolver(checkStateResolverContext, childrenKey, getKey, cascadeStrategy)

  onUnmounted(() => {
    cachedTargetData.value = []
    dataMap.clear()
    parentKeyMap.clear()
    depthMap.clear()
  })

  return {
    cachedTargetData,
    checkStateResolver,
    targetDataCount,
    dataMap,
    parentKeyMap,
    getKey,
    childrenKey,
    baseDataStrategy: {
      genDataKeys: data => {
        return new Set(getTreeKeys(data, childrenKey.value, getKey.value))
      },
      genDataKeyMap: data => {
        parentKeyMap.clear()
        dataMap.clear()
        depthMap.clear()
        dataRef.value = data

        traverseTree(
          mergeTree(cachedTargetData.value, data, childrenKey.value, getKey.value),
          childrenKey.value,
          (node, parents) => {
            const key = getKey.value(node)
            dataMap.set(key, node)
            depthMap.set(key, parents.length)

            const parent = parents[0]
            parent && parentKeyMap.set(key, getKey.value(parent))
          },
        )

        return new Map(dataMap)
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
