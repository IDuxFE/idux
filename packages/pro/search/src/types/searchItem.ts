/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ResolvedSearchField } from './searchFields'
import type { SearchValue } from './searchValue'
import type { ExtractInnerPropTypes, VKey } from '@idux/cdk/utils'
import type { PropType } from 'vue'

export interface SearchItemError {
  index: number
  message?: string
}

export interface SearchItemCreateContext<V = unknown> extends Partial<SearchValue<V>> {
  nameInput?: string
}

export interface SearchItemConfirmContext<V = unknown> extends Partial<SearchValue<V>> {
  nameInput?: string
  operatorInput?: string
  valueInput?: string
  removed: boolean
}

export interface SearchItem {
  key: VKey
  name: string
  optionKey?: VKey
  error?: SearchItemError
  resolvedSearchField: ResolvedSearchField
}

export const searchItemProps = {
  searchItem: {
    type: Object as PropType<SearchItem>,
    required: true,
  },
}
export type SearchItemProps = ExtractInnerPropTypes<typeof searchItemProps>

export const searchItemTagProps = {
  itemKey: { type: [String, Number, Symbol] as PropType<VKey>, required: true },
  segments: { type: Array as PropType<{ input: string; name: string }[]>, required: true },
  error: Object as PropType<SearchItemError>,
}
export type SearchItemTagProps = ExtractInnerPropTypes<typeof searchItemTagProps>
