import type { DefineComponent } from 'vue'
import { IxExtractPropTypes, IxPropTypes } from '@idux/cdk/utils'

export const checkboxProps = {
  checked: IxPropTypes.oneOfType([String, Number, Boolean]),
  disabled: IxPropTypes.bool.def(false),
  indeterminate: IxPropTypes.bool.def(false),
  readonly: IxPropTypes.bool.def(false),
  trueValue: IxPropTypes.oneOfType([String, Number, Boolean]).def(true),
  falseValue: IxPropTypes.oneOfType([String, Number, Boolean]).def(false),
  value: IxPropTypes.string,
}

export type CheckboxProps = IxExtractPropTypes<typeof checkboxProps>

export type CheckboxInstance = InstanceType<DefineComponent<CheckboxProps>>

export const checkboxGroupProps = {
  value: IxPropTypes.arrayOf(String),
  disabled: IxPropTypes.bool.def(false),
  readonly: IxPropTypes.bool.def(false),
  name: IxPropTypes.string,
}

export type CheckboxGroupProps = IxExtractPropTypes<typeof checkboxGroupProps>

export type CheckboxGroupInstance = InstanceType<DefineComponent<CheckboxGroupProps>>

export type CheckValue = string | number | boolean
