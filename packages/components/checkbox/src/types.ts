import type { DefineComponent, HTMLAttributes, LabelHTMLAttributes } from 'vue'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'

import { IxPropTypes } from '@idux/cdk/utils'

export type CheckValue = string | number | boolean

export const checkboxProps = {
  checked: IxPropTypes.oneOfType([String, Number, Boolean]),
  disabled: IxPropTypes.bool.def(false),
  indeterminate: IxPropTypes.bool.def(false),
  readonly: IxPropTypes.bool.def(false),
  trueValue: IxPropTypes.oneOfType([String, Number, Boolean]).def(true),
  falseValue: IxPropTypes.oneOfType([String, Number, Boolean]).def(false),
  value: IxPropTypes.string,
}

export type CheckboxProps = IxInnerPropTypes<typeof checkboxProps>
export type CheckboxPublicProps = IxPublicPropTypes<typeof checkboxProps>
export type CheckboxComponent = DefineComponent<LabelHTMLAttributes & typeof checkboxProps>
export type CheckboxInstance = InstanceType<DefineComponent<CheckboxProps>>

export const checkboxGroupProps = {
  value: IxPropTypes.arrayOf(String),
  disabled: IxPropTypes.bool.def(false),
  readonly: IxPropTypes.bool.def(false),
  name: IxPropTypes.string,
}

export type CheckboxGroupProps = IxInnerPropTypes<typeof checkboxGroupProps>
export type CheckboxGroupPublicProps = IxPublicPropTypes<typeof checkboxGroupProps>
export type CheckboxGroupComponent = DefineComponent<HTMLAttributes & typeof checkboxGroupProps>
export type CheckboxGroupInstance = InstanceType<DefineComponent<CheckboxGroupProps>>
