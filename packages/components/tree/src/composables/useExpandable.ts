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

import { callChange, getAllParentKeys, getParentKeys } from '../utils'
import { covertMergeNodes, covertMergedNodeMap } from './useDataSource'

export interface ExpandableContext {
  expandIcon: ComputedRef<string>
  expandedKeys: WritableComputedRef<VKey[]>
  handleExpand: (key: VKey, rawNode: TreeNode) => void
  setExpandAll: (isAll: boolean) => void
  loadingKeys: Ref<VKey[]>
}

export function useExpandable(
  props: TreeProps,
  config: TreeConfig,
  getNodeKey: ComputedRef<GetNodeKey>,
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
    const { childrenKey, loadChildren } = props
    if (loadingKeys.value.includes(key)) {
      return
    }
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
        const mergedChildren = covertMergeNodes(props, getNodeKey, childrenNodes, key)
        covertMergedNodeMap(mergedChildren, nodeMap)
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

  const setExpandAll = (isAll: boolean) => {
    const { onExpandedChange } = props
    const allParentKeys = isAll ? getAllParentKeys(mergedNodeMap.value) : []
    setExpandedKeys(allParentKeys)
    callChange(mergedNodeMap, allParentKeys, onExpandedChange)
  }

  if (searchedKeys.value.length) {
    setExpandWithSearch(searchedKeys.value)
  } else if (expandedKeys.value.length === 0 && props.defaultExpandAll) {
    setExpandAll(true)
  }

  return { expandIcon, expandedKeys, handleExpand, setExpandAll, loadingKeys }
}
