/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProTransferProps, TransferData, TreeTransferData } from '../types'
import type { TreeNode } from '@idux/components/tree'
import type { GetKeyFn } from '@idux/components/utils'

import { type ComputedRef, computed, reactive } from 'vue'

import { type VKey, callEmit, traverseTree } from '@idux/cdk/utils'

export type TransferTreeLoadChildren = ComputedRef<((node: TreeNode<VKey>) => Promise<TreeNode<VKey>[]>) | undefined>

export interface TransferDataContext {
  dataSource: ComputedRef<TransferData[]>
  loadSourceChildren: TransferTreeLoadChildren
  loadTargetChildren: TransferTreeLoadChildren
}

export function useTransferData<V extends TreeTransferData<V, C>, C extends string>(
  props: ProTransferProps,
  getKey: ComputedRef<GetKeyFn>,
  childrenKey: ComputedRef<C>,
  targetKeySet: ComputedRef<Set<VKey>>,
  setTargetKeys: (keys: VKey[]) => void,
  sourceExpandedKeys?: ComputedRef<VKey[]>,
  targetExpandedKeys?: ComputedRef<VKey[]>,
  handleSourceExpandedChange?: (keys: VKey[]) => void,
  handleTargetExpandedChange?: (keys: VKey[]) => void,
): TransferDataContext {
  const loadedChildrenMap = reactive(new Map<VKey, TreeTransferData<V, C>[]>())

  const setExpanded = (key: VKey, isSource: boolean) => {
    const expandedKeys = isSource ? sourceExpandedKeys?.value : targetExpandedKeys?.value
    const handleExpandedChange = isSource ? handleSourceExpandedChange : handleTargetExpandedChange
    if (!expandedKeys || !handleExpandedChange) {
      return
    }

    const idx = expandedKeys.findIndex(_key => key === _key)
    if (idx < 0) {
      handleExpandedChange([...expandedKeys.slice(), key])
    }
  }

  const mergeData = (data: TreeTransferData<V, C>[]): TreeTransferData<V, C>[] => {
    const _childrenKey = childrenKey.value

    return data.map(item => {
      const mappedItem = { ...item }
      const loadedChildren = loadedChildrenMap.get(getKey.value(item))

      if (loadedChildren) {
        mappedItem[_childrenKey] = loadedChildren as TreeTransferData<V, C>[C]
      }

      if (mappedItem[_childrenKey] && mappedItem[_childrenKey]!.length > 0) {
        mappedItem[_childrenKey] = mergeData(mappedItem[_childrenKey]!) as TreeTransferData<V, C>[C]
      }

      return mappedItem
    })
  }

  const dataSource = computed(() => {
    if (props.type !== 'tree' || loadedChildrenMap.size <= 0) {
      return props.dataSource
    }

    const data = mergeData(props.dataSource as TreeTransferData<V, C>[])
    return data
  })

  const loadChildren = computed(() => {
    if (props.type !== 'tree') {
      return
    }

    const _loadChildren = props.treeProps?.loadChildren

    if (!_loadChildren) {
      return
    }

    return async (node: TreeNode<VKey>, isSource: boolean) => {
      const loadedData = (await _loadChildren(node as TreeTransferData<V, C>)) as TreeTransferData<V, C>[]
      const key = getKey.value(node)

      if (!loadedData || loadedData.length <= 0) {
        return [] as TreeNode<VKey>[]
      }

      loadedChildrenMap.set(key, loadedData)
      setExpanded(key, isSource)

      if (targetKeySet.value.has(key)) {
        const orignalKeys = Array.from(targetKeySet.value)
        const keySet = new Set(targetKeySet.value)
        traverseTree(loadedData, childrenKey.value, item => {
          keySet.add(getKey.value(item))
        })

        const targetKeys = Array.from(keySet)
        setTargetKeys(targetKeys)
        callEmit(props.onChange, targetKeys, orignalKeys)
      }

      return [] as TreeNode<VKey>[]
    }
  })
  const loadSourceChildren = computed(
    () => loadChildren.value && ((node: TreeNode<VKey>) => loadChildren.value!(node, true)),
  )
  const loadTargetChildren = computed(
    () => loadChildren.value && ((node: TreeNode<VKey>) => loadChildren.value!(node, false)),
  )

  return {
    dataSource,
    loadSourceChildren,
    loadTargetChildren,
  }
}
