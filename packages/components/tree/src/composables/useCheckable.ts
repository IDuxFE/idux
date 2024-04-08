/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, type WritableComputedRef, computed, ref, watch } from 'vue'

import { isNil } from 'lodash-es'

import { type VKey, callEmit, useControlledProp } from '@idux/cdk/utils'
import { type TreeCheckStateResolverContext, useTreeCheckStateResolver } from '@idux/components/utils'

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

  const checkedStateResolver = useTreeCheckStateResolver(resolverContext, childrenKey, getKey, cascaderStrategy)
  const allCheckedStateResolver = useTreeCheckStateResolver(
    resolverContext,
    childrenKey,
    getKey,
    computed(() => (cascaderStrategy.value === 'off' ? 'off' : 'all')),
  )

  const checkDisabledKeySet = computed(() => {
    const disabledKeys = new Set<VKey>()
    if (props.checkable) {
      mergedNodeMap.value.forEach((node, key) => {
        if (node.checkDisabled) {
          disabledKeys.add(key)
        }
      })
    }
    return disabledKeys
  })

  // allCheckedKeys控制勾选框的勾选状态，checkedKeys控制回调的返回值
  const allCheckedKeySet = computed(() => {
    const keys = allCheckedStateResolver.appendKeys([], checkedKeys.value)

    return new Set(keys)
  })

  const indeterminateKeySet = computed(() => {
    const _checkedKeySet = allCheckedKeySet.value
    if (_checkedKeySet.size === 0 || props.cascaderStrategy === 'off') {
      return new Set<VKey>()
    }

    const keySet = new Set<VKey>()
    const nodeMap = mergedNodeMap.value
    _checkedKeySet.forEach(key => {
      const { parentKey } = nodeMap.get(key) || {}
      if (!isNil(parentKey)) {
        let parent = nodeMap.get(parentKey)
        if (parent && !_checkedKeySet.has(parent.key)) {
          keySet.add(parentKey)
          while (parent && !isNil(parent.parentKey)) {
            keySet.add(parent.parentKey)
            parent = nodeMap.get(parent.parentKey)
          }
        }
      }
    })
    return keySet
  })

  const isCheckDisabled = (key: VKey) => {
    return checkDisabledKeySet.value.has(key)
  }

  const isChecked = (key: VKey) => {
    return allCheckedKeySet.value.has(key)
  }

  const isIndeterminate = (key: VKey) => {
    return indeterminateKeySet.value.has(key)
  }

  const handleCheck = (node: MergedNode) => {
    const currKey = node.key

    if (node.checkDisabled) {
      return
    }

    const children = cascaderStrategy.value !== 'off' ? node.children ?? [] : []
    const checked =
      isChecked(currKey) ||
      (!!children.length &&
        children.every(child => isChecked(child.key) || isIndeterminate(child.key) || isCheckDisabled(child.key)))

    const _checkedKeys = checkedStateResolver.appendKeys([], checkedKeys.value)
    const newCheckedKeys = checkedStateResolver[checked ? 'removeKeys' : 'appendKeys'](_checkedKeys, [currKey])

    const disabledKeys = checked
      ? [...allCheckedKeySet.value].filter(key => isCheckDisabled(key))
      : (cascaderStrategy.value === 'parent'
          ? allCheckedStateResolver.appendKeys([], newCheckedKeys)
          : newCheckedKeys
        ).filter(key => isCheckDisabled(key) && !allCheckedKeySet.value.has(key))

    const resolvedCheckedKeys = checkedStateResolver[checked ? 'appendKeys' : 'removeKeys'](
      newCheckedKeys,
      disabledKeys,
    )

    handleChange(checked, node.rawNode, resolvedCheckedKeys)
  }

  const handleChange = (checked: boolean, rawNode: TreeNode, newKeys: VKey[]) => {
    const { onCheck, onCheckedChange } = props
    callEmit(onCheck, !checked, rawNode)
    setCheckedKeys(newKeys)
    callChange(mergedNodeMap, newKeys, onCheckedChange)
  }

  watch(cascaderStrategy, () => {
    const newCheckedKeys = checkedStateResolver.appendKeys([], checkedKeys.value)
    setCheckedKeys(newCheckedKeys)
  })

  return {
    checkedKeys,
    isChecked,
    isIndeterminate,
    handleCheck,
  }
}
