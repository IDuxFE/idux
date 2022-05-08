/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TreeNode, TreeProps } from '../types'
import type { MergedNode } from './useDataSource'
import type { GetNodeKey } from './useGetNodeKey'
import type { TreeConfig } from '@idux/components/config'
import type { ComputedRef, Ref, WritableComputedRef } from 'vue'

import { computed, ref, watch } from 'vue'

import { VKey, callEmit, useControlledProp } from '@idux/cdk/utils'

import { callChange, getParentKeys } from '../utils'
import { convertMergeNodes, convertMergedNodeMap } from './useDataSource'

export interface ExpandableContext {
  expandIcon: ComputedRef<string | string[]>
  expandedKeys: WritableComputedRef<VKey[]>
  expandAll: () => void
  collapseAll: () => void
  handleExpand: (key: VKey, rawNode: TreeNode) => void
  loadingKeys: Ref<VKey[]>
}

export function useExpandable(
  props: TreeProps,
  config: TreeConfig,
  mergedChildrenKey: ComputedRef<string>,
  mergedGetKey: ComputedRef<GetNodeKey>,
  mergedLabelKey: ComputedRef<string>,
  mergedNodeMap: ComputedRef<Map<VKey, MergedNode>>,
  searchedKeys: ComputedRef<VKey[]>,
  lastEffectiveSearchedKeys: Ref<VKey[]>,
): ExpandableContext {
  const expandIcon = computed(() => props.expandIcon ?? config.expandIcon)
  const [expandedKeys, setExpandedKeys] = useControlledProp(props, 'expandedKeys', () => [])
  const [loadedKeys, setLoadedKeys] = useControlledProp(props, 'loadedKeys', () => [])
  const loadingKeys = ref<VKey[]>([])

  watch(searchedKeys, currKeys => {
    const { searchValue } = props
    setExpandWithSearch(!searchValue ? lastEffectiveSearchedKeys.value : currKeys)
  })

  const setExpandWithSearch = (searchedKeys: VKey[]) => {
    const { onExpandedChange } = props
    const nodeMap = mergedNodeMap.value
    const keySet = new Set<VKey>()
    searchedKeys.forEach(key => {
      getParentKeys(nodeMap, nodeMap.get(key)).forEach(parentKey => keySet.add(parentKey))
    })
    const newKeys = [...keySet]
    setExpandedKeys(newKeys)
    callChange(mergedNodeMap, newKeys, onExpandedChange)
  }

  const handleExpand = async (key: VKey, rawNode: TreeNode) => {
    const { loadChildren } = props
    if (loadingKeys.value.includes(key)) {
      return
    }
    const childrenKey = mergedChildrenKey.value
    if (!(rawNode?.[childrenKey] as TreeNode[])?.length) {
      if (!loadChildren || loadingKeys.value.includes(key) || loadedKeys.value.includes(key)) {
        return
      }

      loadingKeys.value.push(key)
      const childrenNodes = await loadChildren(rawNode)
      loadingKeys.value.splice(loadingKeys.value.indexOf(key), 1)
      const nodeMap = mergedNodeMap.value
      const currNode = nodeMap.get(key)!
      if (childrenNodes.length) {
        const level = currNode.level
        const mergedChildren = convertMergeNodes(
          props,
          childrenNodes,
          childrenKey,
          mergedGetKey.value,
          mergedLabelKey.value,
          key,
          level,
        )
        convertMergedNodeMap(mergedChildren, nodeMap)
        currNode.rawNode[childrenKey] = childrenNodes
        currNode.children = mergedChildren
        const newLoadedKeys = [...loadedKeys.value, key]
        setLoadedKeys(newLoadedKeys)
        callEmit(props.onLoaded, newLoadedKeys, rawNode)
      } else {
        return
      }
    }

    const index = expandedKeys.value.indexOf(key)
    const expanded = index >= 0
    const tempKeys = [...expandedKeys.value]
    expanded ? tempKeys.splice(index, 1) : tempKeys.push(key)

    handleChange(expanded, rawNode, tempKeys)
  }

  const handleChange = (expanded: boolean, rawNode: TreeNode, newKeys: VKey[]) => {
    const { onExpand, onExpandedChange } = props
    callEmit(onExpand, !expanded, rawNode)
    setExpandedKeys(newKeys)
    callChange(mergedNodeMap, newKeys, onExpandedChange)
  }

  const expandAll = () => {
    const expandAllKeys: VKey[] = []
    const expendedAllNodes: TreeNode[] = []
    mergedNodeMap.value.forEach(node => {
      if (!node.isLeaf) {
        expandAllKeys.push(node.key)
        expendedAllNodes.push(node.rawNode)
      }
    })
    callEmit(props.onExpandedChange, expandAllKeys, expendedAllNodes)
    setExpandedKeys(expandAllKeys)
  }

  const collapseAll = () => {
    callEmit(props.onExpandedChange, [], [])
    setExpandedKeys([])
  }

  if (searchedKeys.value.length) {
    setExpandWithSearch(searchedKeys.value)
  }

  return { expandIcon, expandedKeys, expandAll, collapseAll, handleExpand, loadingKeys }
}
