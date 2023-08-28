/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { SearchState } from './useSearchStates'
import type { ResolvedSearchField, SearchItem, SearchItemError } from '../types'
import type { VKey } from '@idux/cdk/utils'

import { type ComputedRef, type Ref, computed } from 'vue'

export function useSearchItems(
  fieldKeyMap: ComputedRef<Map<VKey, ResolvedSearchField>>,
  searchStates: Ref<SearchState[]>,
  searchItemErrors: ComputedRef<SearchItemError[] | undefined>,
): ComputedRef<SearchItem[]> {
  return computed<SearchItem[]>(
    () =>
      searchStates.value?.map(searchState => {
        const searchField = fieldKeyMap.value.get(searchState.fieldKey)

        return {
          key: searchState.key,
          name: searchField?.label,
          optionKey: searchState.fieldKey,
          error: searchItemErrors.value?.find(error => error.index === searchState.index),
          resolvedSearchField: searchField,
        } as SearchItem
      }),
  )
}
