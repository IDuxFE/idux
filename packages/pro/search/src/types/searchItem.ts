/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { SearchField } from './searchFields'
import type { SearchValue } from './searchValue'
import type { Segment } from './segment'
import type { ExtractInnerPropTypes, VKey } from '@idux/cdk/utils'
import type { PropType } from 'vue'

export interface SearchItemError {
  index: number
  message?: string
}

export interface SearchItemConfirmContext<V = unknown> extends Partial<SearchValue<V>> {
  nameInput?: string
  operatorInput?: string
  valueInput?: string
  removed: boolean
}

export interface SearchItem {
  key: VKey
  optionKey?: VKey
  error?: SearchItemError
  searchField: SearchField
  segments: Segment[]
}

export const searchItemProps = {
  searchItem: {
    type: Object as PropType<SearchItem>,
    required: true,
  },
  error: Object as PropType<SearchItemError>,
}
export type SearchItemProps = ExtractInnerPropTypes<typeof searchItemProps>

export const searchItemTagProps = {
  itemKey: { type: [String, Number, Symbol] as PropType<VKey>, required: true },
  segments: { type: Array as PropType<{ input: string; name: string }[]>, required: true },
  error: Object as PropType<SearchItemError>,
}
export type SearchItemTagProps = ExtractInnerPropTypes<typeof searchItemTagProps>
