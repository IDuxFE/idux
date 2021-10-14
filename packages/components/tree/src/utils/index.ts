/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { MergedNode } from '../composables/useDataSource'
import type { TreeNode } from '../types'
import type { VKey } from '@idux/cdk/utils'
import type { ComputedRef } from 'vue'

import { callEmit } from '@idux/cdk/utils'

export function callChange(
  mergedNodeMap: ComputedRef<Map<VKey, MergedNode>>,
  newKeys: VKey[],
  onChange?: ((keys: VKey[], nodes: TreeNode[]) => void) | Array<(keys: VKey[], nodes: TreeNode[]) => void>,
): void {
  if (onChange) {
    const selectedNodes: TreeNode[] = []
    const nodeMap = mergedNodeMap.value
    newKeys.forEach(key => {
      const currNode = nodeMap.get(key)
      currNode && selectedNodes.push(currNode.rawNode)
    })
    callEmit(onChange, newKeys, selectedNodes)
  }
}

export function getChildrenKeys(currNode: MergedNode | undefined, disabledKeys?: VKey[]): VKey[] {
  const keys: VKey[] = []
  const { children } = currNode || {}
  children &&
    children.forEach(item => {
      const { key } = item
      if (!disabledKeys?.includes(key)) {
        keys.push(item.key)
      }
      keys.push(...getChildrenKeys(item, disabledKeys))
    })
  return keys
}

export function getParentKeys(
  nodeMap: Map<VKey, MergedNode>,
  currNode: MergedNode | undefined,
  disabledKeys?: VKey[],
): VKey[] {
  const keys: VKey[] = []
  while (currNode?.parentKey) {
    const { parentKey } = currNode
    if (!disabledKeys?.includes(currNode.parentKey)) {
      keys.push(parentKey)
    }
    currNode = nodeMap.get(parentKey)
  }
  return keys
}
