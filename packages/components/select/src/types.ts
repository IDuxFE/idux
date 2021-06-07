/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DefineComponent } from 'vue'

import { controlProp } from '@idux/cdk/forms'
import { IxExtractPropTypes, IxPropTypes } from '@idux/cdk/utils'
import { FormSize } from '@idux/components/config'

const defaultCompareWith = (o1: any, o2: any) => o1 === o2

export const selectProps = {
  value: IxPropTypes.any,
  open: IxPropTypes.bool.def(false),
  autofocus: IxPropTypes.bool.def(false),
  borderless: IxPropTypes.bool,
  clearable: IxPropTypes.bool,
  compareWith: IxPropTypes.func<(o1: any, o2: any) => boolean>().def(defaultCompareWith),
  control: controlProp,
  disabled: IxPropTypes.bool.def(false),
  overlayClass: IxPropTypes.string,
  empty: IxPropTypes.string,
  filterOption: IxPropTypes.oneOfType([IxPropTypes.func<SelectFilterFn>(), Boolean]).def(true),
  inputable: IxPropTypes.bool,
  maxLabelCount: IxPropTypes.number.def(Number.MAX_SAFE_INTEGER),
  multiple: IxPropTypes.bool.def(false),
  multipleLimit: IxPropTypes.number.def(Number.MAX_SAFE_INTEGER),
  labelKey: IxPropTypes.string,
  options: IxPropTypes.array<SelectOption[]>(),
  placeholder: IxPropTypes.string,
  searchable: IxPropTypes.bool,
  size: IxPropTypes.oneOf<FormSize>(['large', 'medium', 'small']),
  suffix: IxPropTypes.string,
  valueKey: IxPropTypes.string,
}

export type SelectProps = IxExtractPropTypes<typeof selectProps>

export interface SelectBindings {
  blur: () => void
  focus: (options?: FocusOptions) => void
}

export type SelectInstance = InstanceType<DefineComponent<SelectProps, SelectBindings>>

export const optionProps = {
  disabled: IxPropTypes.bool.def(false),
  label: IxPropTypes.string.isRequired,
  value: IxPropTypes.any.isRequired,
}

export type OptionProps = IxExtractPropTypes<typeof optionProps>

export type OptionInstance = InstanceType<DefineComponent<OptionProps>>

export const optionGroupProps = {
  label: IxPropTypes.string.isRequired,
  options: IxPropTypes.array<SelectOption>().def(() => []),
}

export type OptionGroupProps = IxExtractPropTypes<typeof optionGroupProps>

export type OptionGroupInstance = InstanceType<DefineComponent<OptionGroupProps>>

export interface SelectOption {
  label?: string
  value?: any
  disabled?: boolean
  groupLabel?: string
  [key: string]: any
}

export type SelectFilterFn = (searchValue: string, option: OptionProps) => boolean
