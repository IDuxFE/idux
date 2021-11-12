/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { FormSize } from '@idux/components/form'
import type { DefineComponent, HTMLAttributes, LabelHTMLAttributes } from 'vue'

import { controlPropDef } from '@idux/cdk/forms'
import { IxPropTypes } from '@idux/cdk/utils'

export type RadioMode = 'default' | 'primary'
export type RadioOption = Omit<RadioPublicProps, 'checked' | 'onUpdate:checked' | 'onChange'>

export const radioProps = {
  checked: IxPropTypes.bool,

  autofocus: IxPropTypes.bool.def(false),
  buttoned: IxPropTypes.bool,
  control: controlPropDef,
  disabled: IxPropTypes.bool,
  label: IxPropTypes.string,
  mode: IxPropTypes.oneOf<RadioMode>(['default', 'primary']),
  size: IxPropTypes.oneOf<FormSize>(['sm', 'md', 'lg']),
  value: IxPropTypes.any,

  // events
  'onUpdate:checked': IxPropTypes.emit<(checked: boolean) => void>(),
  onChange: IxPropTypes.emit<(checked: boolean) => void>(),
  onBlur: IxPropTypes.emit<(evt: FocusEvent) => void>(),
  onFocus: IxPropTypes.emit<(evt: FocusEvent) => void>(),
}

export type RadioProps = IxInnerPropTypes<typeof radioProps>
export type RadioPublicProps = IxPublicPropTypes<typeof radioProps>
export interface RadioBindings {
  blur: () => void
  focus: (options?: FocusOptions) => void
}
export type RadioComponent = DefineComponent<
  Omit<LabelHTMLAttributes, keyof RadioPublicProps> & RadioPublicProps,
  RadioBindings
>
export type RadioInstance = InstanceType<DefineComponent<RadioProps, RadioBindings>>

export const radioGroupProps = {
  value: IxPropTypes.any,
  control: controlPropDef,
  buttoned: IxPropTypes.bool.def(false),
  disabled: IxPropTypes.bool.def(false),
  gap: IxPropTypes.oneOfType([Number, String]),
  name: IxPropTypes.string,
  mode: IxPropTypes.oneOf<RadioMode>(['default', 'primary']),
  options: IxPropTypes.array<RadioOption>(),
  size: IxPropTypes.oneOf<FormSize>(['sm', 'md', 'lg']).def('md'),

  // events
  'onUpdate:value': IxPropTypes.emit<(value: any) => void>(),
  onChange: IxPropTypes.emit<(value: any) => void>(),
}

export type RadioGroupProps = IxInnerPropTypes<typeof radioGroupProps>
export type RadioGroupPublicProps = IxPublicPropTypes<typeof radioGroupProps>
export type RadioGroupComponent = DefineComponent<
  Omit<HTMLAttributes, keyof RadioGroupPublicProps> & RadioGroupPublicProps
>
export type RadioGroupInstance = InstanceType<DefineComponent<RadioGroupProps>>
