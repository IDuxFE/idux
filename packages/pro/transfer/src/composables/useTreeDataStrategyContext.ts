/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProTransferProps, TreeTransferData } from '../types'
import type { VKey } from '@idux/cdk/utils'
import type { TransferDataStrategyProp } from '@idux/components/transfer'

import { type ComputedRef, type Ref, onUnmounted, ref } from 'vue'

import { filterTree, genFlattenedTreeKeys, traverseTree } from '../utils'

export function useTreeDataStrategyContext<C extends VKey>(
  props: ProTransferProps,
  childrenKey: ComputedRef<C>,
): {
  dataKeyMap: Map<VKey, TreeTransferData<C>>
  parentKeyMap: Map<VKey, VKey | undefined>
  cachedTargetData: Ref<TreeTransferData<C>[]>
  dataStrategy: TransferDataStrategyProp<TreeTransferData<C>>
} {
  const cachedTargetData = ref(props.defaultTargetData ?? []) as Ref<TreeTransferData<C>[]>
  const dataKeyMap: Map<VKey, TreeTransferData<C>> = new Map()
  const parentKeyMap: Map<VKey, VKey | undefined> = new Map()

  onUnmounted(() => {
    cachedTargetData.value = []
    dataKeyMap.clear()
    parentKeyMap.clear()
  })

  return {
    dataKeyMap,
    parentKeyMap,
    cachedTargetData,
    dataStrategy: {
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
      dataFilter: (data, searchValue, searchFn) => {
        if (!searchValue) {
          return data
        }

        return filterTree(data, childrenKey.value, item => searchFn(item, searchValue), 'or')
      },
    },
  }
}
