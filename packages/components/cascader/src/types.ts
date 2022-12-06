/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { AbstractControl, ValidateStatus } from '@idux/cdk/forms'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray, VKey } from '@idux/cdk/utils'
import type { EmptyProps } from '@idux/components/empty'
import type { FormSize } from '@idux/components/form'
import type { OverlayContainerType } from '@idux/components/utils'
import type { DefineComponent, HTMLAttributes, PropType, VNode, VNodeChild } from 'vue'

export const cascaderProps = {
  control: { type: [String, Number, Object] as PropType<string | number | AbstractControl>, default: undefined },
  value: { type: null, default: undefined },
  expandedKeys: { type: Array as PropType<VKey[]>, default: undefined },
  loadedKeys: { type: Array as PropType<VKey[]>, default: undefined },
  open: { type: Boolean, default: undefined },

  autocomplete: { type: String, default: 'off' },
  autofocus: { type: Boolean, default: false },
  borderless: { type: Boolean, default: undefined },
  childrenKey: { type: String, default: undefined },
  clearable: { type: Boolean, default: false },
  clearIcon: { type: String, default: undefined },
  customAdditional: { type: Function as PropType<CascaderCustomAdditional>, default: undefined },
  dataSource: { type: Array as PropType<CascaderData[]>, default: () => [] },
  disabled: { type: Boolean, default: false },
  empty: { type: [String, Object] as PropType<'default' | 'simple' | EmptyProps>, default: 'simple' },
  expandIcon: { type: String, default: undefined },
  expandTrigger: { type: String as PropType<CascaderExpandTrigger>, default: 'click' },
  fullPath: { type: Boolean, default: undefined },
  getKey: { type: [String, Function] as PropType<string | ((data: CascaderData<any>) => any)>, default: undefined },
  labelKey: { type: String, default: undefined },
  loadChildren: {
    type: Function as PropType<(data: CascaderData<any>) => Promise<CascaderData<any>[]>>,
    default: undefined,
  },
  maxLabel: { type: [Number, String] as PropType<number | 'responsive'>, default: Number.MAX_SAFE_INTEGER },
  multiple: { type: Boolean, default: false },
  multipleLimit: { type: Number, default: Number.MAX_SAFE_INTEGER },
  overlayClassName: { type: String, default: undefined },
  overlayContainer: {
    type: [String, HTMLElement, Function] as PropType<OverlayContainerType>,
    default: undefined,
  },
  overlayMatchWidth: { type: Boolean, default: undefined },
  overlayRender: { type: Function as PropType<(children: VNode[]) => VNodeChild>, default: undefined },
  placeholder: { type: String, default: undefined },
  readonly: { type: Boolean, default: false },
  searchable: { type: [Boolean, String] as PropType<boolean | 'overlay'>, default: false },
  searchFn: { type: [Boolean, Function] as PropType<boolean | CascaderSearchFn>, default: true },
  size: { type: String as PropType<FormSize>, default: undefined },
  status: String as PropType<ValidateStatus>,
  strategy: { type: String as PropType<CascaderStrategy>, default: 'all' },
  suffix: { type: String, default: undefined },
  virtual: { type: Boolean, default: false },

  // events
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<(value: any) => void>>,
  'onUpdate:expandedKeys': [Function, Array] as PropType<MaybeArray<(keys: any[]) => void>>,
  'onUpdate:loadedKeys': [Function, Array] as PropType<MaybeArray<(keys: any[]) => void>>,
  'onUpdate:open': [Function, Array] as PropType<MaybeArray<(opened: boolean) => void>>,
  onChange: [Function, Array] as PropType<MaybeArray<(value: any, oldValue: any) => void>>,
  onClear: [Function, Array] as PropType<MaybeArray<(evt: Event) => void>>,
  onExpand: [Function, Array] as PropType<MaybeArray<(expanded: boolean, data: CascaderData) => void>>,
  onExpandedChange: [Function, Array] as PropType<MaybeArray<(expendedKeys: any[], data: CascaderData[]) => void>>,
  onLoaded: [Function, Array] as PropType<MaybeArray<(loadedKeys: any[], data: CascaderData) => void>>,
  onSearch: [Function, Array] as PropType<MaybeArray<(value: string) => void>>,

  // private
  overlayHeight: { type: Number, default: 256 },
  overlayItemHeight: { type: Number, default: 32 },
} as const

export type CascaderProps = ExtractInnerPropTypes<typeof cascaderProps>
export type CascaderPublicProps = Omit<
  ExtractPublicPropTypes<typeof cascaderProps>,
  'overlayHeight' | 'overlayItemHeight'
>
export interface CascaderBindings {
  blur: () => void
  focus: (options?: FocusOptions) => void
}
export type CascaderComponent = DefineComponent<
  Omit<HTMLAttributes, keyof CascaderPublicProps> & CascaderPublicProps,
  CascaderBindings
>
export type CascaderInstance = InstanceType<DefineComponent<CascaderProps, CascaderBindings>>

export type CascaderStrategy = 'all' | 'parent' | 'child' | 'off'

export type CascaderCustomAdditional = (options: {
  data: CascaderData<any>
  index: number
}) => Record<string, any> | undefined

export interface CascaderData<K = VKey> {
  children?: CascaderData<K>[]
  disabled?: boolean
  isLeaf?: boolean
  key?: K
  label?: string
  [key: string]: unknown
}

export type CascaderExpandTrigger = 'click' | 'hover'

export type CascaderSearchFn = (data: CascaderData<any>, searchValue: string) => boolean
