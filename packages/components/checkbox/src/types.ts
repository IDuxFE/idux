/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { AbstractControl } from '@idux/cdk/forms'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray, VKey } from '@idux/cdk/utils'
import type { FormSize } from '@idux/components/form'
import type { SpaceProps } from '@idux/components/space'
import type { DefineComponent, HTMLAttributes, LabelHTMLAttributes, PropType } from 'vue'

export const checkboxProps = {
  control: { type: [String, Number, Object] as PropType<string | number | AbstractControl>, default: undefined },
  checked: { type: [String, Number, Boolean] as PropType<CheckValue>, default: undefined },

  autofocus: { type: Boolean, default: false },
  buttoned: { type: Boolean, default: undefined },
  disabled: { type: Boolean, default: undefined },
  indeterminate: { type: Boolean, default: false },
  label: { type: String, default: undefined },
  trueValue: { type: [String, Number, Boolean] as PropType<CheckValue>, default: true },
  falseValue: { type: [String, Number, Boolean] as PropType<CheckValue>, default: false },
  value: { type: null, default: undefined },
  size: { type: String as PropType<FormSize>, default: undefined },
  waveless: { type: Boolean, default: false },

  // events
  'onUpdate:checked': { type: [Function, Array] as PropType<MaybeArray<(checked: any) => void>> },
  onChange: {
    type: [Function, Array] as PropType<MaybeArray<(newChecked: any, oldChecked: any) => void>>,
  },
  onBlur: { type: [Function, Array] as PropType<MaybeArray<(evt: FocusEvent) => void>> },
  onFocus: { type: [Function, Array] as PropType<MaybeArray<(evt: FocusEvent) => void>> },
} as const

export type CheckboxProps = ExtractInnerPropTypes<typeof checkboxProps>
export type CheckboxPublicProps = ExtractPublicPropTypes<typeof checkboxProps>
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
  control: { type: [String, Number, Object] as PropType<string | number | AbstractControl>, default: undefined },
  value: { type: Array, default: undefined },

  buttoned: { type: Boolean, default: false },
  dataSource: { type: Array as PropType<CheckboxData[]> },
  disabled: { type: Boolean, default: false },
  gap: { type: [Number, String] as PropType<number | string>, default: undefined },
  name: { type: String, default: undefined },
  size: { type: String as PropType<FormSize>, default: undefined },

  // events
  'onUpdate:value': { type: [Function, Array] as PropType<MaybeArray<(value: any) => void>> },
  onChange: { type: [Function, Array] as PropType<MaybeArray<(value: any, oldValue: any) => void>> },
} as const

export type CheckboxGroupProps = ExtractInnerPropTypes<typeof checkboxGroupProps>
export type CheckboxGroupPublicProps = ExtractPublicPropTypes<typeof checkboxGroupProps> & Omit<SpaceProps, 'size'>
export type CheckboxGroupComponent = DefineComponent<
  Omit<HTMLAttributes, keyof CheckboxGroupPublicProps> & CheckboxGroupPublicProps
>
export type CheckboxGroupInstance = InstanceType<DefineComponent<CheckboxGroupProps>>

export type CheckValue = string | number | boolean
export interface CheckboxData<K = VKey> extends Omit<CheckboxPublicProps, 'value'> {
  key?: K
}
