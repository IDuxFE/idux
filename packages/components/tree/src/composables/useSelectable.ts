/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TreeNode, TreeProps } from '../types'
import type { MergedNode } from './useDataSource'
import type { VKey } from '@idux/cdk/utils'
import type { ComputedRef, Ref } from 'vue'

import { computed, ref, watchEffect } from 'vue'

import { callEmit, useControlledProp } from '@idux/cdk/utils'

import { callChange } from '../utils'

export interface SelectableContext {
  activeKey: Ref<VKey | undefined>
  activeNode: ComputedRef<MergedNode | undefined>
  selectedKeys: ComputedRef<VKey[]>
  handleSelect: (key: VKey) => void
}

export function useSelectable(props: TreeProps, mergedNodeMap: ComputedRef<Map<VKey, MergedNode>>): SelectableContext {
  const [selectedKeys, setSelectedKeys] = useControlledProp(props, 'selectedKeys', () => [])
  const isMultiple = computed(() => props.selectable === 'multiple')

  const activeKey = ref<VKey>()
  watchEffect(() => {
    const currKeys = selectedKeys.value
    const keySize = currKeys.length
    activeKey.value = keySize > 0 ? currKeys[keySize - 1] : undefined
  })
  const activeNode = computed(() => {
    const currKey = activeKey.value
    return currKey !== undefined ? mergedNodeMap.value.get(currKey) : undefined
  })

  const handleSelect = (key: VKey) => {
    const nodeMap = mergedNodeMap.value
    const currNode = nodeMap.get(key)
    if (!currNode) {
      return
    }

    const index = selectedKeys.value.indexOf(key)
    const selected = index > -1

    let tempKeys = [...selectedKeys.value]
    if (isMultiple.value) {
      selected ? tempKeys.splice(index, 1) : tempKeys.push(key)
    } else {
      tempKeys = selected && props.selectedClearable ? [] : [key]
    }

    handleChange(selected, currNode.rawNode, tempKeys)
  }

  const handleChange = (selected: boolean, rawNode: TreeNode, newKeys: VKey[]) => {
    const { onSelect, onSelectedChange } = props
    const realSelected = newKeys.includes(rawNode.key ?? '') ? true : !selected
    callEmit(onSelect, realSelected, rawNode)
    setSelectedKeys(newKeys)
    callChange(mergedNodeMap, newKeys, onSelectedChange)
  }

  return { activeKey, activeNode, selectedKeys, handleSelect }
}
