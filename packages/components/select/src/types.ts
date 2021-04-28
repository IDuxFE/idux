/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DefineComponent } from 'vue'
import { AbstractControl, ControlPropType } from '@idux/cdk/forms'

import { PropTypes } from '@idux/cdk/utils'

export interface SelectOption {
  label?: string
  value?: any
  disabled?: boolean
  groupLabel?: string
  [key: string]: any
}

export interface SelectProps {
  value?: any
  control?: string | AbstractControl
  open: boolean
  autofocus: boolean
  borderless?: boolean
  clearable?: boolean
  compareWith: (o1: any, o2: any) => boolean
  disabled: boolean
  empty?: string
  filterOption: boolean | SelectFilterFn
  inputable?: boolean
  labelKey?: string
  maxLabelCount: number
  multiple: boolean
  multipleLimit: number
  overlayClass?: string
  options: SelectOption[]
  placeholder?: string
  searchable?: boolean
  size?: 'large' | 'medium' | 'small'
  suffix: string
  valueKey?: string
}

const defaultCompareWith = (o1: any, o2: any) => o1 === o2

export const selectPropsDef = {
  value: PropTypes.any,
  open: PropTypes.bool.def(false),
  autofocus: PropTypes.bool.def(false),
  borderless: PropTypes.bool,
  clearable: PropTypes.bool,
  compareWith: PropTypes.func.def(defaultCompareWith),
  control: ControlPropType,
  disabled: PropTypes.bool.def(false),
  overlayClass: PropTypes.string,
  empty: PropTypes.string,
  filterOption: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]).def(true),
  inputable: PropTypes.bool,
  maxLabelCount: PropTypes.number.def(Number.MAX_SAFE_INTEGER),
  multiple: PropTypes.bool.def(false),
  multipleLimit: PropTypes.number.def(Number.MAX_SAFE_INTEGER),
  labelKey: PropTypes.string,
  options: PropTypes.array as any,
  placeholder: PropTypes.string,
  searchable: PropTypes.bool,
  size: PropTypes.oneOf(['large', 'medium', 'small'] as const),
  suffix: PropTypes.string,
  valueKey: PropTypes.string,
}

export interface SelectBindings {
  blur: () => void
  focus: (options?: FocusOptions) => void
}

export type SelectComponent = InstanceType<DefineComponent<SelectProps, SelectBindings>>

export interface OptionProps {
  disabled: boolean
  label: string
  value: any
}

export const optionPropsDef = {
  disabled: PropTypes.bool.def(false),
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
}

export type OptionComponent = InstanceType<DefineComponent<OptionProps>>

export interface OptionGroupProps {
  disabled: boolean
  label: string
}

export const optionGroupPropsDef = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.def([]),
}

export type OptionGroupComponent = InstanceType<DefineComponent<OptionGroupProps>>

export type SelectFilterFn = (searchValue: string, option: OptionProps) => boolean
