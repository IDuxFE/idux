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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const defaultCompareFn = (o1: any, o2: any) => o1 === o2

export const selectProps = {
  control: controlPropDef,
  value: { type: null, default: undefined },
  open: { type: Boolean, default: undefined },

  allowInput: { type: Boolean, default: false },
  autocomplete: { type: String, default: 'off' },
  autofocus: { type: Boolean, default: false },
  borderless: { type: Boolean, default: undefined },
  childrenKey: { type: String, default: undefined },
  clearable: { type: Boolean, default: false },
  clearIcon: { type: String, default: undefined },
  /**
   * @deprecated
   */
  compareWith: { type: Function as PropType<(o1: any, o2: any) => boolean>, default: undefined },
  compareFn: { type: Function as PropType<(o1: any, o2: any) => boolean>, default: defaultCompareFn },
  dataSource: { type: Array as PropType<SelectData[]>, default: undefined },
  disabled: { type: Boolean, default: false },
  empty: { type: [String, Object] as PropType<string | EmptyProps>, default: undefined },
  labelKey: { type: String, default: undefined },
  maxLabelCount: { type: [Number, String] as PropType<number | 'responsive'>, default: undefined },
  maxLabel: { type: [Number, String] as PropType<number | 'responsive'>, default: Number.MAX_SAFE_INTEGER },
  multiple: { type: Boolean, default: false },
  multipleLimit: { type: Number, default: Number.MAX_SAFE_INTEGER },
  /**
   * @deprecated
   */
  options: { type: Array as PropType<SelectData[]>, default: undefined },
  overlayClassName: { type: String, default: undefined },
  overlayRender: { type: Function as PropType<(children: VNode[]) => VNodeChild>, default: undefined },
  placeholder: { type: String, default: undefined },
  readonly: { type: Boolean, default: false },
  searchable: { type: [Boolean, String] as PropType<boolean | 'overlay'>, default: false },
  /**
   * @deprecated
   */
  searchFilter: { type: [Boolean, Function] as PropType<boolean | SelectSearchFn>, default: undefined },
  searchFn: { type: [Boolean, Function] as PropType<boolean | SelectSearchFn>, default: true },
  size: { type: String as PropType<FormSize>, default: undefined },
  suffix: { type: String, default: undefined },
  target: ɵPortalTargetDef,
  valueKey: { type: String, default: undefined },
  virtual: { type: Boolean, default: false },

  onCompositionStart: [Function, Array] as PropType<MaybeArray<(evt: CompositionEvent) => void>>,
  onCompositionEnd: [Function, Array] as PropType<MaybeArray<(evt: CompositionEvent) => void>>,
  onFocus: [Function, Array] as PropType<MaybeArray<(evt: FocusEvent) => void>>,
  onInput: [Function, Array] as PropType<MaybeArray<(evt: Event) => void>>,

  // events
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<(value: any) => void>>,
  'onUpdate:open': [Function, Array] as PropType<MaybeArray<(opened: boolean) => void>>,
  onChange: [Function, Array] as PropType<MaybeArray<(value: any, oldValue: any) => void>>,
  onClear: [Function, Array] as PropType<MaybeArray<(evt: Event) => void>>,
  onSearch: [Function, Array] as PropType<MaybeArray<(value: string) => void>>,
  onScroll: [Function, Array] as PropType<MaybeArray<(evt: Event) => void>>,
  onScrolledChange: [Function, Array] as PropType<
    MaybeArray<(startIndex: number, endIndex: number, visibleData: SelectData[]) => void>
  >,
  onScrolledBottom: [Function, Array] as PropType<MaybeArray<() => void>>,

  // private
  overlayHeight: {
    type: Number,
    default: 256,
  },
  overlayItemHeight: {
    type: Number,
    default: 32,
  },
} as const

export type SelectProps = ExtractInnerPropTypes<typeof selectProps>
export type SelectPublicProps = Omit<
  ExtractPublicPropTypes<typeof selectProps>,
  'compareWith' | 'options' | 'searchFilter' | 'overlayHeight' | 'overlayItemHeight'
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

export interface SelectCommonProps {
  additional?: {
    class?: any
    style?: any
    [key: string]: unknown
  }
  key?: VKey
  label?: string
  [key: string]: any
}

export interface SelectOptionProps extends SelectCommonProps {
  disabled?: boolean
  // eslint-disable-next-line @typescript-eslint/ban-types
  value?: string | number | object
  customLabel?: string | ((data: SelectOptionProps) => VNodeChild)
}
export type SelectOptionPublicProps = Omit<SelectOptionProps, 'additional'>
export type SelectOptionComponent = FunctionalComponent<
  Omit<HTMLAttributes, keyof SelectOptionPublicProps> & SelectOptionPublicProps
>

export interface SelectOptionGroupProps extends SelectCommonProps {
  children?: SelectOptionProps[]
  customLabel?: string | ((data: SelectOptionGroupProps) => VNodeChild)
}
export type SelectOptionGroupPublicProps = Omit<SelectOptionGroupProps, 'additional'>
export type SelectOptionGroupComponent = FunctionalComponent<
  Omit<HTMLAttributes, keyof SelectOptionGroupPublicProps> & SelectOptionGroupPublicProps
>

export type SelectData = SelectOptionProps | SelectOptionGroupProps

export type SelectSearchFn = (data: SelectData, searchValue: string) => boolean

// private
export const selectorProps = {
  clearable: Boolean,
  suffix: String,
}
export type SelectorProps = ExtractInnerPropTypes<typeof optionProps>

export const optionProps = {
  disabled: Boolean,
  index: { type: Number, required: true },
  label: String,
  type: String as PropType<'grouped' | 'group'>,
  rawData: { type: Object as PropType<SelectOptionProps>, required: true },
  value: null,
} as const
export type OptionProps = ExtractInnerPropTypes<typeof optionProps>

export const optionGroupProps = {
  label: String,
  rawData: { type: Object as PropType<SelectOptionGroupProps>, required: true },
} as const
export type OptionGroupProps = ExtractInnerPropTypes<typeof optionGroupProps>
