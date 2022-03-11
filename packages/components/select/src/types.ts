/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { VirtualScrollToFn } from '@idux/cdk/scroll'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, VKey } from '@idux/cdk/utils'
import type { EmptyProps } from '@idux/components/empty'
import type { FormSize } from '@idux/components/form'
import type { DefineComponent, FunctionalComponent, HTMLAttributes, VNode, VNodeChild, VNodeTypes } from 'vue'

import { controlPropDef } from '@idux/cdk/forms'
import { ɵPortalTargetDef } from '@idux/cdk/portal'
import { IxPropTypes } from '@idux/cdk/utils'

const defaultCompareFn = (o1: any, o2: any) => o1 === o2

export const selectProps = {
  control: controlPropDef,
  value: IxPropTypes.any,
  open: IxPropTypes.bool,

  allowInput: IxPropTypes.bool.def(false),
  autofocus: IxPropTypes.bool.def(false),
  borderless: IxPropTypes.bool,
  childrenKey: IxPropTypes.string,
  clearable: IxPropTypes.bool.def(false),
  compareWith: IxPropTypes.func<(o1: any, o2: any) => boolean>(),
  compareFn: IxPropTypes.func<(o1: any, o2: any) => boolean>().def(defaultCompareFn),
  dataSource: IxPropTypes.array<SelectData>(),
  disabled: IxPropTypes.bool.def(false),
  empty: IxPropTypes.oneOfType([String, IxPropTypes.object<EmptyProps>()]),
  maxLabelCount: IxPropTypes.number.def(Number.MAX_SAFE_INTEGER),
  multiple: IxPropTypes.bool.def(false),
  multipleLimit: IxPropTypes.number.def(Number.MAX_SAFE_INTEGER),
  labelKey: IxPropTypes.string,
  options: IxPropTypes.array<SelectData>(),
  overlayClassName: IxPropTypes.string,
  overlayRender: IxPropTypes.func<(children: VNode[]) => VNodeTypes>(),
  placeholder: IxPropTypes.string,
  readonly: IxPropTypes.bool.def(false),
  searchable: IxPropTypes.oneOfType([Boolean, IxPropTypes.oneOf(['overlay'])]).def(false),
  searchFilter: IxPropTypes.oneOfType([Boolean, IxPropTypes.func<SelectSearchFn>()]),
  searchFn: IxPropTypes.oneOfType([Boolean, IxPropTypes.func<SelectSearchFn>()]).def(true),
  size: IxPropTypes.oneOf<FormSize>(['sm', 'md', 'lg']),
  suffix: IxPropTypes.string,
  target: ɵPortalTargetDef,
  valueKey: IxPropTypes.string,
  virtual: IxPropTypes.bool.def(false),

  // events
  // eslint-disable-next-line @typescript-eslint/ban-types
  'onUpdate:value': IxPropTypes.emit<(value: any) => void>(),
  'onUpdate:open': IxPropTypes.emit<(open: boolean) => void>(),
  // eslint-disable-next-line @typescript-eslint/ban-types
  onChange: IxPropTypes.emit<(value: any, oldValue: any) => void>(),
  onClear: IxPropTypes.emit<(evt: Event) => void>(),
  onCompositionStart: IxPropTypes.emit<(evt: CompositionEvent) => void>(),
  onCompositionEnd: IxPropTypes.emit<(evt: CompositionEvent) => void>(),
  onBlur: IxPropTypes.emit<(evt: FocusEvent) => void>(),
  onFocus: IxPropTypes.emit<(evt: FocusEvent) => void>(),
  onInput: IxPropTypes.emit<(evt: Event) => void>(),
  onSearch: IxPropTypes.emit<(searchValue: string) => void>(),
  onScroll: IxPropTypes.emit<(evt: Event) => void>(),
  onScrolledChange: IxPropTypes.emit<(startIndex: number, endIndex: number, visibleData: SelectData[]) => void>(),
  onScrolledBottom: IxPropTypes.emit<() => void>(),

  // private
  overlayHeight: IxPropTypes.number.def(256),
  overlayItemHeight: IxPropTypes.number.def(32),
}

export type SelectProps = ExtractInnerPropTypes<typeof selectProps>
export type SelectPublicProps = Omit<ExtractPublicPropTypes<typeof selectProps>, 'overlayHeight' | 'overlayItemHeight'>
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
  clearable: IxPropTypes.bool,
  suffix: IxPropTypes.string,
}
export type SelectorProps = ExtractInnerPropTypes<typeof optionProps>

export const optionProps = {
  disabled: IxPropTypes.bool,
  index: IxPropTypes.number.isRequired,
  label: IxPropTypes.string,
  type: IxPropTypes.oneOf(['grouped', 'group']),
  rawOption: IxPropTypes.object<SelectOptionProps>().isRequired,
  value: IxPropTypes.oneOfType([String, Number, Object]),
}
export type OptionProps = ExtractInnerPropTypes<typeof optionProps>

export const optionGroupProps = {
  label: IxPropTypes.string,
  rawOption: IxPropTypes.object<SelectOptionGroupProps>().isRequired,
}
export type OptionGroupProps = ExtractInnerPropTypes<typeof optionGroupProps>
