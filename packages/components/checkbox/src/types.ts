/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { IxInnerPropTypes, IxPublicPropTypes, VKey } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, LabelHTMLAttributes } from 'vue'

import { controlPropDef } from '@idux/cdk/forms'
import { IxPropTypes } from '@idux/cdk/utils'
import { FormSize } from '@idux/components/form'

export const checkboxProps = {
  control: controlPropDef,
  checked: IxPropTypes.oneOfType([String, Number, Boolean]),

  autofocus: IxPropTypes.bool.def(false),
  buttoned: IxPropTypes.bool,
  disabled: IxPropTypes.bool,
  indeterminate: IxPropTypes.bool.def(false),
  label: IxPropTypes.string,
  trueValue: IxPropTypes.oneOfType([String, Number, Boolean]).def(true),
  falseValue: IxPropTypes.oneOfType([String, Number, Boolean]).def(false),
  value: IxPropTypes.any,
  size: IxPropTypes.oneOf<FormSize>(['sm', 'md', 'lg']),

  // events
  'onUpdate:checked': IxPropTypes.emit<(checked: CheckValue) => void>(),
  onChange: IxPropTypes.emit<(newChecked: CheckValue, oldChecked: CheckValue) => void>(),
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
  value: IxPropTypes.array(),

  buttoned: IxPropTypes.bool.def(false),
  dataSource: IxPropTypes.array<CheckboxData>(),
  disabled: IxPropTypes.bool.def(false),
  gap: IxPropTypes.oneOfType([Number, String]),
  name: IxPropTypes.string,
  options: IxPropTypes.array<CheckboxData>(),
  size: IxPropTypes.oneOf(['sm', 'md', 'lg']).def('md'),

  // events
  'onUpdate:value': IxPropTypes.emit<(value: any[]) => void>(),
  onChange: IxPropTypes.emit<(newValue: any[], oldValue: any[]) => void>(),
}

export type CheckboxGroupProps = IxInnerPropTypes<typeof checkboxGroupProps>
export type CheckboxGroupPublicProps = IxPublicPropTypes<typeof checkboxGroupProps>
export type CheckboxGroupComponent = DefineComponent<
  Omit<HTMLAttributes, keyof CheckboxGroupPublicProps> & CheckboxGroupPublicProps
>
export type CheckboxGroupInstance = InstanceType<DefineComponent<CheckboxGroupProps>>

export type CheckValue = string | number | boolean
export interface CheckboxData extends CheckboxPublicProps {
  key?: VKey
}
