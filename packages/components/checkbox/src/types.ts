import type { DefineComponent, HTMLAttributes, LabelHTMLAttributes } from 'vue'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'

import { controlPropDef } from '@idux/cdk/forms'
import { IxPropTypes } from '@idux/cdk/utils'

export type CheckValue = string | number | boolean
export type CheckboxOptions = Omit<CheckboxPublicProps, 'checked' | 'onUpdate:checked' | 'onChange' | 'indeterminate'>

export const checkboxProps = {
  control: controlPropDef,
  autofocus: IxPropTypes.bool.def(false),
  checked: IxPropTypes.oneOfType([String, Number, Boolean]).def(false),
  disabled: IxPropTypes.bool,
  indeterminate: IxPropTypes.bool.def(false),
  label: IxPropTypes.string,
  trueValue: IxPropTypes.oneOfType([String, Number, Boolean]).def(true),
  falseValue: IxPropTypes.oneOfType([String, Number, Boolean]).def(false),
  value: IxPropTypes.string,

  // events
  'onUpdate:checked': IxPropTypes.emit<(checked: CheckValue) => void>(),
  onChange: IxPropTypes.emit<(checked: CheckValue) => void>(),
  onBlur: IxPropTypes.emit<(evt: FocusEvent) => void>(),
  onFocus: IxPropTypes.emit<(evt: FocusEvent) => void>(),
}

export type CheckboxProps = IxInnerPropTypes<typeof checkboxProps>
export type CheckboxPublicProps = IxPublicPropTypes<typeof checkboxProps>
export interface CheckboxBindings {
  blur: () => void
  focus: (options?: FocusOptions) => void
}
export type CheckboxComponent = DefineComponent<
  Omit<LabelHTMLAttributes, keyof CheckboxPublicProps> & CheckboxPublicProps,
  CheckboxBindings
>
export type CheckboxInstance = InstanceType<DefineComponent<CheckboxProps, CheckboxBindings>>

export const checkboxGroupProps = {
  control: controlPropDef,
  value: IxPropTypes.arrayOf(IxPropTypes.oneOfType([String, Number])).def(() => []),
  disabled: IxPropTypes.bool.def(false),
  name: IxPropTypes.string,
  options: IxPropTypes.array<CheckboxOptions>(),

  // events
  'onUpdate:value': IxPropTypes.emit<(value: Array<string | number>) => void>(),
  onChange: IxPropTypes.emit<(value: Array<string | number>) => void>(),
}

export type CheckboxGroupProps = IxInnerPropTypes<typeof checkboxGroupProps>
export type CheckboxGroupPublicProps = IxPublicPropTypes<typeof checkboxGroupProps>
export type CheckboxGroupComponent = DefineComponent<
  Omit<HTMLAttributes, keyof CheckboxGroupPublicProps> & CheckboxGroupPublicProps
>
export type CheckboxGroupInstance = InstanceType<DefineComponent<CheckboxGroupProps>>
