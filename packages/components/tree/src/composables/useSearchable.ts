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

import { computed, ref } from 'vue'

const defaultSearchedKeys: VKey[] = []

export interface SearchableContext {
  searchedKeys: ComputedRef<VKey[]>
  lastEffectiveSearchedKeys: Ref<VKey[]>
}

export function useSearchable(props: TreeProps, mergedNodeMap: ComputedRef<Map<VKey, MergedNode>>): SearchableContext {
  const lastEffectiveSearchedKeys = ref<VKey[]>([])

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

    if (keys.length) {
      lastEffectiveSearchedKeys.value = keys
    }

    return keys
  })

  return { searchedKeys, lastEffectiveSearchedKeys }
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
