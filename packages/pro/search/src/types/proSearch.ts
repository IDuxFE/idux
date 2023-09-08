/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { SearchField } from './searchFields'
import type { SearchItemConfirmContext, SearchItemCreateContext, SearchItemError } from './searchItem'
import type { SearchValue } from './searchValue'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray } from '@idux/cdk/utils'
import type { OverlayContainerType } from '@idux/components/utils'
import type { DefineComponent, HTMLAttributes, PropType, VNode, VNodeChild } from 'vue'

export type ProSearchSize = 'sm' | 'md'

export const proSearchProps = {
  value: Array as PropType<SearchValue[]>,
  clearable: {
    type: Boolean,
    default: undefined,
  },
  clearIcon: [String, Object] as PropType<string | VNode>,
  customNameLabel: [String, Function] as PropType<string | ((searchField: SearchField) => VNodeChild)>,
  maxLabel: { type: [Number, String] as PropType<number | 'responsive'>, default: 'responsive' },
  searchIcon: [String, Object] as PropType<string | VNode>,
  disabled: {
    type: Boolean,
    default: false,
  },
  errors: Array as PropType<SearchItemError[]>,
  overlayContainer: {
    type: [String, HTMLElement, Function] as PropType<OverlayContainerType>,
    default: undefined,
  },
  placeholder: String,
  searchFields: Array as PropType<SearchField[]>,
  size: String as PropType<ProSearchSize>,
  zIndex: Number,

  //events
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<(value: SearchValue[] | undefined) => void>>,
  'onUpdate:errors': [Function, Array] as PropType<MaybeArray<(errors: SearchItemError[] | undefined) => void>>,
  onChange: [Function, Array] as PropType<
    MaybeArray<(value: SearchValue[] | undefined, oldValue: SearchValue[] | undefined) => void>
  >,
  onClear: [Function, Array] as PropType<MaybeArray<() => void>>,
  onFocus: [Function, Array] as PropType<MaybeArray<(evt: FocusEvent) => void>>,
  onBlur: [Function, Array] as PropType<MaybeArray<(evt: FocusEvent) => void>>,
  onItemRemove: [Array, Function] as PropType<MaybeArray<(item: SearchValue) => void>>,
  onSearch: [Array, Function] as PropType<MaybeArray<(value: SearchValue[] | undefined) => void>>,
  onItemConfirm: [Array, Function] as PropType<MaybeArray<(item: SearchItemConfirmContext) => void>>,
  onItemCreate: [Array, Function] as PropType<MaybeArray<(item: SearchItemCreateContext) => void>>,
} as const

export interface ProSearchBindings {
  focus: (options?: FocusOptions) => void
  blur: () => void
}

export type ProSearchProps = ExtractInnerPropTypes<typeof proSearchProps>
export type ProSearchPublicProps = ExtractPublicPropTypes<typeof proSearchProps>
export type ProSearchComponent = DefineComponent<
  Omit<HTMLAttributes, keyof ProSearchPublicProps> & ProSearchPublicProps,
  ProSearchBindings
>
export type ProSearchInstance = InstanceType<DefineComponent<ProSearchProps, ProSearchBindings>>
