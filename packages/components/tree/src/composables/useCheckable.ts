/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TreeNode, TreeProps } from '../types'
import type { MergedNode } from './useDataSource'
import type { VKey } from '@idux/cdk/utils'
import type { ComputedRef, WritableComputedRef } from 'vue'

import { computed } from 'vue'

import { callEmit } from '@idux/cdk/utils'
import { useMergedProp } from '@idux/components/utils'

import { callChange, getChildrenKeys, getParentKeys } from '../utils'

export interface CheckableContext {
  checkedKeys: WritableComputedRef<VKey[]>
  checkDisabledKeys: ComputedRef<VKey[]>
  indeterminateKeys: ComputedRef<VKey[]>
  handleCheck: (node: MergedNode) => void
}

export function useCheckable(props: TreeProps, mergedNodeMap: ComputedRef<Map<VKey, MergedNode>>): CheckableContext {
  const checkedKeys = useMergedProp(props, 'checkedKeys')

  const checkDisabledKeys = computed(() => {
    const disabledKeys: VKey[] = []
    if (props.checkable) {
      mergedNodeMap.value.forEach((node, key) => {
        if (node.checkDisabled) {
          disabledKeys.push(key)
        }
      })
    }
    return disabledKeys
  })

  const indeterminateKeys = computed(() => {
    const _checkedKeys = checkedKeys.value
    if (_checkedKeys.length === 0) {
      return []
    }

    const indeterminateKeySet = new Set<VKey>()
    const disabledKeys = checkDisabledKeys.value
    const nodeMap = mergedNodeMap.value
    _checkedKeys.forEach(key => {
      const { parentKey } = nodeMap.get(key) || {}
      if (parentKey) {
        let parent = nodeMap.get(parentKey)
        if (parent && !_checkedKeys.includes(parent.key)) {
          if (!disabledKeys.includes(parentKey)) {
            indeterminateKeySet.add(parentKey)
          }
          while (parent?.parentKey) {
            if (!disabledKeys.includes(parent.parentKey)) {
              indeterminateKeySet.add(parent.parentKey)
            }
            parent = nodeMap.get(parent.parentKey)
          }
        }
      }
    })
    return [...indeterminateKeySet]
  })

  const handleCheck = (node: MergedNode) => {
    const currKey = node.key
    const nodeMap = mergedNodeMap.value

    const disabledKeys = checkDisabledKeys.value
    const childrenKeys = getChildrenKeys(node, disabledKeys)
    const index = checkedKeys.value.indexOf(currKey)
    const checked = index > -1
    const tempKeys = [...checkedKeys.value]
    if (checked) {
      const parentKeys = getParentKeys(nodeMap, node, disabledKeys)
      tempKeys.splice(index, 1)
      handleChange(
        checked,
        node.rawNode,
        tempKeys.filter(key => !parentKeys.includes(key) && !childrenKeys.includes(key)),
      )
    } else {
      tempKeys.push(currKey)
      setParentChecked(nodeMap, node, tempKeys, disabledKeys)
      tempKeys.push(...childrenKeys)
      handleChange(checked, node.rawNode, tempKeys)
    }
  }

  const handleChange = (checked: boolean, rawNode: TreeNode, newKeys: VKey[]) => {
    checkedKeys.value = newKeys
    const { onCheck, onCheckedChange } = props
    callEmit(onCheck, checked, rawNode)
    callChange(mergedNodeMap, newKeys, onCheckedChange)
  }

  return {
    checkedKeys,
    checkDisabledKeys,
    indeterminateKeys,
    handleCheck,
  }
}

function setParentChecked(
  dataMap: Map<VKey, MergedNode>,
  currNode: MergedNode | undefined,
  tempKeys: VKey[],
  disabledKeys: VKey[],
) {
  let parentSelected = true
  while (parentSelected && currNode?.parentKey) {
    const parent = dataMap.get(currNode.parentKey)
    if (parent && !disabledKeys.includes(currNode.parentKey)) {
      parentSelected = parent.children!.every(item => disabledKeys.includes(item.key) || tempKeys.includes(item.key))
      if (parentSelected) {
        tempKeys.push(currNode.parentKey)
      }
    }
    currNode = parent
  }
}
