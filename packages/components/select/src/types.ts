/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { VirtualScrollToFn } from '@idux/cdk/scroll'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray, VKey } from '@idux/cdk/utils'
import type { EmptyProps } from '@idux/components/empty'
import type { FormSize } from '@idux/components/form'
import type { DefineComponent, FunctionalComponent, HTMLAttributes, PropType, VNode, VNodeChild } from 'vue'

import { controlPropDef } from '@idux/cdk/forms'
import { ɵPortalTargetDef } from '@idux/cdk/portal'

export const selectPanelProps = {
  activeValue: { type: [String, Number, Symbol] as PropType<VKey>, default: undefined },
  selectedKeys: { type: Array as PropType<VKey[]>, default: undefined },
  childrenKey: { type: String, default: undefined },

  customAdditional: { type: Object as PropType<SelectCustomAdditional>, default: undefined },
  dataSource: { type: Array as PropType<SelectData[]>, default: undefined },
  empty: { type: [String, Object] as PropType<string | EmptyProps>, default: undefined },
  getKey: { type: [String, Function] as PropType<string | ((data: SelectData) => VKey)>, default: undefined },
  labelKey: { type: String, default: undefined },
  multiple: { type: Boolean, default: false },
  multipleLimit: { type: Number, default: Number.MAX_SAFE_INTEGER },
  virtual: { type: Boolean, default: false },

  // events
  'onUpdate:activeValue': [Function, Array] as PropType<MaybeArray<(value: VKey) => void>>,
  onOptionClick: [Function, Array] as PropType<MaybeArray<(option: SelectData, evt: MouseEvent) => void>>,
  onScroll: [Function, Array] as PropType<MaybeArray<(evt: Event) => void>>,
  onScrolledChange: [Function, Array] as PropType<
    MaybeArray<(startIndex: number, endIndex: number, visibleData: SelectData[]) => void>
  >,
  onScrolledBottom: [Function, Array] as PropType<MaybeArray<() => void>>,

  // private
  _virtualScrollHeight: { type: Number, default: 256 },
  _virtualScrollItemHeight: { type: Number, default: 32 },
} as const

export const selectProps = {
  control: controlPropDef,
  value: { type: [String, Number, Symbol, Array] as PropType<MaybeArray<VKey>>, default: undefined },
  open: { type: Boolean, default: undefined },

  allowInput: { type: Boolean, default: false },
  autocomplete: { type: String, default: 'off' },
  autofocus: { type: Boolean, default: false },
  borderless: { type: Boolean, default: undefined },
  childrenKey: { type: String, default: undefined },
  clearable: { type: Boolean, default: false },
  clearIcon: { type: String, default: undefined },
  customAdditional: { type: Object as PropType<SelectCustomAdditional>, default: undefined },
  dataSource: { type: Array as PropType<SelectData[]>, default: undefined },
  disabled: { type: Boolean, default: false },
  empty: { type: [String, Object] as PropType<string | EmptyProps>, default: undefined },
  getKey: { type: [String, Function] as PropType<string | ((data: SelectData) => VKey)>, default: undefined },
  labelKey: { type: String, default: undefined },
  /**
   * @deprecated please use `maxLabel` instead'
   */
  maxLabelCount: { type: [Number, String] as PropType<number | 'responsive'>, default: undefined },
  maxLabel: { type: [Number, String] as PropType<number | 'responsive'>, default: Number.MAX_SAFE_INTEGER },
  multiple: { type: Boolean, default: false },
  multipleLimit: { type: Number, default: Number.MAX_SAFE_INTEGER },
  /**
   * @deprecated please use `dataSource` instead'
   */
  options: { type: Array as PropType<SelectData[]>, default: undefined },
  overlayClassName: { type: String, default: undefined },
  overlayContainer: ɵPortalTargetDef,
  overlayMatchWidth: { type: Boolean, default: undefined },
  overlayRender: { type: Function as PropType<(children: VNode[]) => VNodeChild>, default: undefined },
  placeholder: { type: String, default: undefined },
  readonly: { type: Boolean, default: false },
  searchable: { type: [Boolean, String] as PropType<boolean | 'overlay'>, default: false },
  /**
   * @deprecated please use `searchFn` instead'
   */
  searchFilter: { type: [Boolean, Function] as PropType<boolean | SelectSearchFn>, default: undefined },
  searchFn: { type: [Boolean, Function] as PropType<boolean | SelectSearchFn>, default: true },
  size: { type: String as PropType<FormSize>, default: undefined },
  suffix: { type: String, default: undefined },
  /**
   * @deprecated please use `overlayContainer` instead'
   */
  target: ɵPortalTargetDef,
  /**
   * @deprecated please use `getKey` instead'
   */
  valueKey: { type: String, default: undefined },
  virtual: { type: Boolean, default: false },

  // events
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<(value: VKey | VKey[] | undefined) => void>>,
  'onUpdate:open': [Function, Array] as PropType<MaybeArray<(opened: boolean) => void>>,
  onChange: [Function, Array] as PropType<
    MaybeArray<(value: VKey | VKey[] | undefined, oldValue: VKey | VKey[] | undefined) => void>
  >,
  onClear: [Function, Array] as PropType<MaybeArray<(evt: Event) => void>>,
  onSearch: [Function, Array] as PropType<MaybeArray<(searchText: string) => void>>,
  onScroll: [Function, Array] as PropType<MaybeArray<(evt: Event) => void>>,
  onScrolledChange: [Function, Array] as PropType<
    MaybeArray<(startIndex: number, endIndex: number, visibleData: SelectData[]) => void>
  >,
  onScrolledBottom: [Function, Array] as PropType<MaybeArray<() => void>>,

  // private
  overlayHeight: { type: Number, default: 256 },
  overlayItemHeight: { type: Number, default: 32 },
} as const

export type SelectPanelProps = ExtractInnerPropTypes<typeof selectPanelProps>
export type SelectPanelPublicProps = Omit<
  ExtractPublicPropTypes<typeof selectPanelProps>,
  '_virtualScrollHeight' | '_virtualScrollItemHeight'
>
export interface SelectPanelBindings {
  scrollTo: VirtualScrollToFn
  changeActiveIndex: (offset: number) => void
}
export type SelectPanelComponent = DefineComponent<
  Omit<HTMLAttributes, keyof SelectPanelPublicProps> & SelectPanelPublicProps,
  SelectPanelBindings
>
export type SelectPanelInstance = InstanceType<DefineComponent<SelectPanelProps, SelectPanelBindings>>

export type SelectProps = ExtractInnerPropTypes<typeof selectProps>
export type SelectPublicProps = Omit<
  ExtractPublicPropTypes<typeof selectProps>,
  'maxLabelCount' | 'options' | 'searchFilter' | 'overlayHeight' | 'overlayItemHeight' | 'target' | 'valueKey'
>
export interface SelectBindings {
  blur: () => void
  focus: (options?: FocusOptions) => void
  scrollTo: VirtualScrollToFn
}
export type SelectComponent = DefineComponent<
  Omit<HTMLAttributes, keyof SelectPublicProps> & SelectPublicProps,
  SelectBindings
>
export type SelectInstance = InstanceType<DefineComponent<SelectProps, SelectBindings>>

export type SelectCustomAdditional = (options: { data: SelectData; index: number }) => Record<string, any> | undefined

export interface SelectOptionProps {
  /**
   * @deprecated please use `customAdditional` instead'
   */
  additional?: {
    class?: any
    style?: any
    [key: string]: unknown
  }

  disabled?: boolean
  key?: VKey
  label?: string | number

  customLabel?: string | ((data: SelectOptionProps) => VNodeChild)

  [key: string]: any
}
export type SelectOptionPublicProps = Omit<SelectOptionProps, 'additional'>
export type SelectOptionComponent = FunctionalComponent<
  Omit<HTMLAttributes, keyof SelectOptionPublicProps> & SelectOptionPublicProps
>

export interface SelectOptionGroupProps {
  /**
   * @deprecated please use `customAdditional` instead'
   */
  additional?: {
    class?: any
    style?: any
    [key: string]: unknown
  }

  children?: SelectOptionProps[]
  key?: VKey
  label?: string | number

  customLabel?: string | ((data: SelectOptionGroupProps) => VNodeChild)

  [key: string]: any
}
export type SelectOptionGroupPublicProps = Omit<SelectOptionGroupProps, 'additional'>
export type SelectOptionGroupComponent = FunctionalComponent<
  Omit<HTMLAttributes, keyof SelectOptionGroupPublicProps> & SelectOptionGroupPublicProps
>

export type SelectData = SelectOptionProps | SelectOptionGroupProps

export type SelectSearchFn = (data: SelectData, searchText: string) => boolean

export const optionProps = {
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  index: { type: Number as PropType<number>, required: true },
  label: { type: [String, Number] as PropType<string | number>, required: true },
  rawData: { type: Object as PropType<SelectOptionProps>, required: true },
  parentKey: { type: [String, Number, Symbol] as PropType<VKey>, default: undefined },
} as const
export type OptionProps = ExtractInnerPropTypes<typeof optionProps>

export const optionGroupProps = {
  label: { type: [String, Number] as PropType<string | number>, required: true },
  index: { type: Number as PropType<number>, required: true },
  rawData: { type: Object as PropType<SelectOptionGroupProps>, required: true },
} as const
export type OptionGroupProps = ExtractInnerPropTypes<typeof optionGroupProps>
