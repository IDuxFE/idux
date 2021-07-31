import type { DefineComponent, HTMLAttributes, LabelHTMLAttributes } from 'vue'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { FormSize } from '@idux/components/form'

import { IxPropTypes } from '@idux/cdk/utils'
import { controlPropDef } from '@idux/cdk/forms'

export type RadioMode = 'default' | 'primary'
export type RadioOptions = Omit<RadioPublicProps, 'checked' | 'onUpdate:checked' | 'onChange'>

export const radioProps = {
  autofocus: IxPropTypes.bool.def(false),
  buttoned: IxPropTypes.bool,
  checked: IxPropTypes.bool.def(false),
  control: controlPropDef,
  disabled: IxPropTypes.bool,
  label: IxPropTypes.string,
  mode: IxPropTypes.oneOf<RadioMode>(['default', 'primary']),
  size: IxPropTypes.oneOf<FormSize>(['large', 'medium', 'small']),
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
export type RadioComponent = DefineComponent<LabelHTMLAttributes & typeof radioProps, RadioBindings>
export type RadioInstance = InstanceType<DefineComponent<RadioProps, RadioBindings>>

export const radioGroupProps = {
  buttoned: IxPropTypes.bool,
  disabled: IxPropTypes.bool.def(false),
  control: controlPropDef,
  name: IxPropTypes.string,
  mode: IxPropTypes.oneOf<RadioMode>(['default', 'primary']),
  options: IxPropTypes.array<RadioOptions>(),
  size: IxPropTypes.oneOf<FormSize>(['large', 'medium', 'small']).def('medium'),
  value: IxPropTypes.any,

  // events
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  'onUpdate:value': IxPropTypes.emit<(value: any) => void>(),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: IxPropTypes.emit<(value: any) => void>(),
}

export type RadioGroupProps = IxInnerPropTypes<typeof radioGroupProps>
export type RadioGroupPublicProps = IxPublicPropTypes<typeof radioGroupProps>
export type RadioGroupComponent = DefineComponent<HTMLAttributes & typeof radioGroupProps>
export type RadioGroupInstance = InstanceType<DefineComponent<RadioGroupProps>>
