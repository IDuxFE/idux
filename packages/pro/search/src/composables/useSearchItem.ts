/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { SearchState } from './useSearchStates'
import type { ResolvedSearchField, SearchItem, SearchItemError } from '../types'

import { type ComputedRef, type Ref, computed } from 'vue'

export function useSearchItems(
  resolvedSearchFields: ComputedRef<ResolvedSearchField[]>,
  searchStates: Ref<SearchState[]>,
  searchItemErrors: ComputedRef<SearchItemError[] | undefined>,
): ComputedRef<SearchItem[]> {
  return computed<SearchItem[]>(() =>
    searchStates.value?.map(searchState => {
      const searchField = resolvedSearchFields.value?.find(field => field.key === searchState.fieldKey)

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
