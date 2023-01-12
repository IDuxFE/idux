/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed } from 'vue'

import { NoopArray, type VKey } from '@idux/cdk/utils'

import { type MergedNode } from './useDataSource'
import { type TreeNode, type TreeProps } from '../types'

export interface SearchableContext {
  searchedKeys: ComputedRef<VKey[]>
}

export function useSearchable(
  props: TreeProps,
  mergedNodeMap: ComputedRef<Map<VKey, MergedNode>>,
  mergedLabelKey: ComputedRef<string>,
): SearchableContext {
  const mergedSearchFn = useSearchFn(props, mergedLabelKey)

  const searchedKeys = computed(() => {
    const { searchValue } = props
    if (!searchValue) {
      return NoopArray as unknown as VKey[]
    }
    const searchFn = mergedSearchFn.value
    const keys: VKey[] = []
    mergedNodeMap.value.forEach(node => {
      if (searchFn(node.rawNode, searchValue)) {
        keys.push(node.key)
      }
    })

    return keys
  })

  return { searchedKeys }
}

function useSearchFn(props: TreeProps, mergedLabelKey: ComputedRef<string>) {
  return computed(() => {
    return props.searchFn ?? getDefaultSearchFn(mergedLabelKey.value)
  })
}

function getDefaultSearchFn(labelKey: string) {
  return (data: TreeNode, searchValue: string) => {
    const label = data[labelKey] as string | undefined
    return label ? label.toLowerCase().includes(searchValue.toLowerCase()) : false
  }
}
