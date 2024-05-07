/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, type WritableComputedRef, computed, ref, watch } from 'vue'

import { type VKey, callEmit, useControlledProp } from '@idux/cdk/utils'
import { type TreeCheckStateResolverContext } from '@idux/components/utils'
import { useTreeCheckState } from '@idux/components/utils'

import { type MergedNode } from './useDataSource'
import { type TreeNode, type TreeProps } from '../types'
import { callChange } from '../utils'

export interface CheckableContext {
  checkedKeys: WritableComputedRef<VKey[]>
  isChecked: (key: VKey) => boolean
  isIndeterminate: (key: VKey) => boolean
  handleCheck: (node: MergedNode) => void
}

export function useCheckable(
  props: TreeProps,
  mergedNodes: ComputedRef<MergedNode[]>,
  mergedNodeMap: ComputedRef<Map<VKey, MergedNode>>,
  parentKeyMap: ComputedRef<Map<VKey, VKey | undefined>>,
  depthMap: ComputedRef<Map<VKey, number>>,
): CheckableContext {
  const [checkedKeys, setCheckedKeys] = useControlledProp(props, 'checkedKeys', () => [])

  const resolverContext = computed<TreeCheckStateResolverContext<MergedNode, 'children'>>(() => {
    return {
      data: mergedNodes.value,
      dataMap: mergedNodeMap.value,
      parentKeyMap: parentKeyMap.value,
      depthMap: depthMap.value,
    }
  })
  const childrenKey = ref('children' as const)
  const getKey = ref((item: MergedNode) => item.key)
  const cascaderStrategy = computed(() => props.cascaderStrategy)
  const isDisabled = ref((data: MergedNode) => !!data.checkDisabled)

  const { checkStateResolver, isChecked, isIndeterminate, toggle } = useTreeCheckState(
    checkedKeys,
    resolverContext,
    childrenKey,
    getKey,
    cascaderStrategy,
    isDisabled,
  )

  const handleCheck = (node: MergedNode) => {
    const { checked, checkedKeys: newCheckedKeys } = toggle(node)

    if (node.checkDisabled) {
      return
    }

    handleChange(checked, node.rawNode, newCheckedKeys)
  }

  const handleChange = (checked: boolean, rawNode: TreeNode, newKeys: VKey[]) => {
    const { onCheck, onCheckedChange } = props
    callEmit(onCheck, checked, rawNode)
    setCheckedKeys(newKeys)
    callChange(mergedNodeMap, newKeys, onCheckedChange)
  }

  watch(cascaderStrategy, () => {
    const newCheckedKeys = checkStateResolver.appendKeys([], checkedKeys.value)
    setCheckedKeys(newCheckedKeys)
    callChange(mergedNodeMap, newCheckedKeys, props.onCheckedChange)
  })

  return {
    checkedKeys,
    isChecked,
    isIndeterminate,
    handleCheck,
  }
}
