/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { VirtualScrollToFn } from '@idux/cdk/scroll'
import type { IxInnerPropTypes, IxPublicPropTypes, VKey } from '@idux/cdk/utils'
import type { EmptyProps } from '@idux/components/empty'
import type { FormSize } from '@idux/components/form'
import type { DefineComponent, HTMLAttributes, Slots, VNode, VNodeTypes } from 'vue'

import { controlPropDef } from '@idux/cdk/forms'
import { ɵPortalTargetDef } from '@idux/cdk/portal'
import { IxPropTypes } from '@idux/cdk/utils'

export interface SelectOption {
  additional?: {
    class?: any
    style?: any
    [key: string]: unknown
  }
  disabled?: boolean
  key?: VKey
  label?: string
  children?: SelectOption[]
  slots?: Slots | Record<string, (...args: any[]) => VNode>
  // eslint-disable-next-line @typescript-eslint/ban-types
  value?: string | number | object

  [key: string]: any
}
export type SelectFilterFn = (searchValue: string, option: SelectOption) => boolean

const defaultCompareWith = (o1: any, o2: any) => o1 === o2

export const selectProps = {
  value: IxPropTypes.oneOfType([String, Number, Object]),
  control: controlPropDef,
  open: IxPropTypes.bool,

  allowInput: IxPropTypes.bool.def(false),
  autofocus: IxPropTypes.bool.def(false),
  borderless: IxPropTypes.bool,
  childrenKey: IxPropTypes.string,
  clearable: IxPropTypes.bool.def(false),
  compareWith: IxPropTypes.func<(o1: any, o2: any) => boolean>().def(defaultCompareWith),
  disabled: IxPropTypes.bool.def(false),
  empty: IxPropTypes.oneOfType([String, IxPropTypes.object<EmptyProps>()]),
  maxLabelCount: IxPropTypes.number.def(Number.MAX_SAFE_INTEGER),
  multiple: IxPropTypes.bool.def(false),
  multipleLimit: IxPropTypes.number.def(Number.MAX_SAFE_INTEGER),
  labelKey: IxPropTypes.string,
  options: IxPropTypes.array<SelectOption>(),
  overlayClassName: IxPropTypes.string,
  overlayRender: IxPropTypes.func<(children: VNode[]) => VNodeTypes>(),
  placeholder: IxPropTypes.string,
  readonly: IxPropTypes.bool.def(false),
  searchable: IxPropTypes.bool.def(false),
  searchFilter: IxPropTypes.oneOfType([Boolean, IxPropTypes.func<SelectFilterFn>()]).def(true),
  size: IxPropTypes.oneOf<FormSize>(['sm', 'md', 'lg']),
  suffix: IxPropTypes.string,
  target: ɵPortalTargetDef,
  valueKey: IxPropTypes.string,
  virtual: IxPropTypes.bool.def(false),

  // events
  // eslint-disable-next-line @typescript-eslint/ban-types
  'onUpdate:value': IxPropTypes.emit<(value: string | number | Object) => void>(),
  'onUpdate:open': IxPropTypes.emit<(open: boolean) => void>(),
  // eslint-disable-next-line @typescript-eslint/ban-types
  onChange: IxPropTypes.emit<(value: string | number | Object, oldValue: string | number | Object) => void>(),
  onClear: IxPropTypes.emit<(evt: Event) => void>(),
  onCompositionStart: IxPropTypes.emit<(evt: CompositionEvent) => void>(),
  onCompositionEnd: IxPropTypes.emit<(evt: CompositionEvent) => void>(),
  onBlur: IxPropTypes.emit<(evt: FocusEvent) => void>(),
  onFocus: IxPropTypes.emit<(evt: FocusEvent) => void>(),
  onInput: IxPropTypes.emit<(evt: Event) => void>(),
  onSearch: IxPropTypes.emit<(searchValue: string) => void>(),
  onScroll: IxPropTypes.emit<(evt: Event) => void>(),
  onScrolledChange: IxPropTypes.emit<(startIndex: number, endIndex: number, visibleOptions: SelectOption[]) => void>(),
  onScrolledBottom: IxPropTypes.emit<() => void>(),

  // private
  overlayHeight: IxPropTypes.number.def(256),
  overlayItemHeight: IxPropTypes.number.def(32),
}

export type SelectProps = IxInnerPropTypes<typeof selectProps>
export type SelectPublicProps = Omit<IxPublicPropTypes<typeof selectProps>, 'overlayHeight' | 'overlayItemHeight'>
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

export const selectOptionProps = {
  disabled: IxPropTypes.bool.def(false),
  label: IxPropTypes.string,
  value: IxPropTypes.oneOfType([String, Number, Object]).isRequired,
}

export type SelectOptionProps = IxInnerPropTypes<typeof selectOptionProps>
export type SelectOptionPublicProps = IxPublicPropTypes<typeof selectOptionProps>

export const selectOptionGroupProps = {
  label: IxPropTypes.string,
}

export type SelectOptionGroupProps = IxInnerPropTypes<typeof selectOptionGroupProps>
export type SelectOptionGroupPublicProps = IxPublicPropTypes<typeof selectOptionGroupProps>

// private
export const selectorProps = {
  clearable: IxPropTypes.bool,
  suffix: IxPropTypes.string,
}
export type SelectorProps = IxInnerPropTypes<typeof optionProps>

export const optionProps = {
  disabled: IxPropTypes.bool,
  index: IxPropTypes.number.isRequired,
  label: IxPropTypes.string,
  type: IxPropTypes.oneOf(['grouped', 'group']),
  rawOption: IxPropTypes.object<SelectOption>().isRequired,
  value: IxPropTypes.oneOfType([String, Number, Object]),
}
export type OptionProps = IxInnerPropTypes<typeof optionProps>

export const optionGroupProps = {
  label: IxPropTypes.string,
  rawOption: IxPropTypes.object<SelectOption>().isRequired,
}
export type OptionGroupProps = IxInnerPropTypes<typeof optionGroupProps>
