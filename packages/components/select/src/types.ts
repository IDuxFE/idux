/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { FormSize } from '@idux/components/form'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { controlPropDef } from '@idux/cdk/forms'
import { IxPropTypes } from '@idux/cdk/utils'

export interface SelectOption {
  label?: string
  value?: any
  disabled?: boolean
  groupLabel?: string
  [key: string]: any
}
export type SelectFilterFn = (searchValue: string, selectOption: SelectOptionProps) => boolean

const defaultCompareWith = (o1: any, o2: any) => o1 === o2

export const selectProps = {
  value: IxPropTypes.any,
  open: IxPropTypes.bool.def(false),
  autofocus: IxPropTypes.bool.def(false),
  borderless: IxPropTypes.bool,
  clearable: IxPropTypes.bool,
  compareWith: IxPropTypes.func<(o1: any, o2: any) => boolean>().def(defaultCompareWith),
  control: controlPropDef,
  disabled: IxPropTypes.bool.def(false),
  overlayClass: IxPropTypes.string,
  empty: IxPropTypes.string,
  filterOption: IxPropTypes.oneOfType([IxPropTypes.func<SelectFilterFn>(), Boolean]).def(true),
  inputable: IxPropTypes.bool,
  maxLabelCount: IxPropTypes.number.def(Number.MAX_SAFE_INTEGER),
  multiple: IxPropTypes.bool.def(false),
  multipleLimit: IxPropTypes.number.def(Number.MAX_SAFE_INTEGER),
  labelKey: IxPropTypes.string,
  options: IxPropTypes.array<SelectOption>(),
  placeholder: IxPropTypes.string,
  searchable: IxPropTypes.bool,
  size: IxPropTypes.oneOf<FormSize>(['large', 'medium', 'small']),
  suffix: IxPropTypes.string,
  valueKey: IxPropTypes.string,
}

export type SelectProps = IxInnerPropTypes<typeof selectProps>
export type SelectPublicProps = IxPublicPropTypes<typeof selectProps>
export interface SelectBindings {
  blur: () => void
  focus: (options?: FocusOptions) => void
}

export type SelectComponent = DefineComponent<
  Omit<HTMLAttributes, keyof SelectPublicProps> & SelectPublicProps,
  SelectBindings
>
export type SelectInstance = InstanceType<DefineComponent<SelectProps, SelectBindings>>

export const selectOptionProps = {
  disabled: IxPropTypes.bool.def(false),
  label: IxPropTypes.string.isRequired,
  value: IxPropTypes.any.isRequired,
}

export type SelectOptionProps = IxInnerPropTypes<typeof selectOptionProps>
export type SelectOptionPublicProps = IxPublicPropTypes<typeof selectOptionProps>
export type SelectOptionComponent = DefineComponent<
  Omit<HTMLAttributes, keyof SelectOptionPublicProps> & SelectOptionPublicProps
>
export type SelectOptionInstance = InstanceType<DefineComponent<SelectOptionProps>>

export const selectOptionGroupProps = {
  label: IxPropTypes.string.isRequired,
  options: IxPropTypes.array<SelectOption>().def(() => []),
}

export type SelectOptionGroupProps = IxInnerPropTypes<typeof selectOptionGroupProps>
export type SelectOptionGroupPublicProps = IxPublicPropTypes<typeof selectOptionGroupProps>
export type SelectOptionGroupComponent = DefineComponent<
  Omit<HTMLAttributes, keyof SelectOptionGroupPublicProps> & SelectOptionGroupPublicProps
>
export type SelectOptionGroupInstance = InstanceType<DefineComponent<SelectOptionGroupProps>>
