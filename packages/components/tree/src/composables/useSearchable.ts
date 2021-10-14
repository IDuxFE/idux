/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TreeNode, TreeProps } from '../types'
import type { MergedNode } from './useDataSource'
import type { VKey } from '@idux/cdk/utils'
import type { ComputedRef } from 'vue'

import { computed, watch } from 'vue'

import { callChange } from '../utils'

const defaultSearchedKeys: VKey[] = []

export function useSearchable(
  props: TreeProps,
  mergedNodeMap: ComputedRef<Map<VKey, MergedNode>>,
): ComputedRef<VKey[]> {
  const searchedKeys = computed(() => {
    const { searchValue, searchFn } = props
    if (!searchValue && !searchFn) {
      return defaultSearchedKeys
    }
    const keys: VKey[] = []
    mergedNodeMap.value.forEach(node => {
      if (checkNodeIsMatched(node.rawNode, searchValue, searchFn)) {
        keys.push(node.key)
      }
    })
    return keys
  })

  watch(searchedKeys, currKeys => callChange(mergedNodeMap, currKeys, props.onSearchedChange))

  return searchedKeys
}

function checkNodeIsMatched(
  node: TreeNode,
  searchValue: string | undefined,
  searchFn: ((node: TreeNode, searchValue?: string) => boolean) | undefined,
): boolean {
  if (searchFn) {
    return searchFn(node, searchValue)
  }

  if (!searchValue || !node.label) {
    return false
  }

  return node.label.toLowerCase().includes(searchValue.toLowerCase())
}
