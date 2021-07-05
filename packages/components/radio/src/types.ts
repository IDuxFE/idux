import type { ComputedRef, DefineComponent, HTMLAttributes } from 'vue'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'

import { IxPropTypes } from '@idux/cdk/utils'

export type RadioMode = 'border' | 'fill'

export const radioProps = {
  value: IxPropTypes.oneOfType([String, Number, Boolean]),
  disabled: IxPropTypes.bool.def(false),
  name: IxPropTypes.string.def(''),
  checked: IxPropTypes.bool.def(false),
}

export type RadioProps = IxInnerPropTypes<typeof radioProps>
export type RadioPublicProps = IxPublicPropTypes<typeof radioProps>
export type RadioComponent = DefineComponent<HTMLAttributes & typeof radioProps>
export type RadioInstance = InstanceType<DefineComponent<RadioProps>>

export const radioButtonProps = {
  value: IxPropTypes.oneOfType([String, Number, Boolean]),
  disabled: IxPropTypes.bool.def(false),
  name: IxPropTypes.string.def(''),
  checked: IxPropTypes.bool.def(false),
}

export type RadioButtonProps = IxInnerPropTypes<typeof radioButtonProps>
export type RadioButtonPublicProps = IxPublicPropTypes<typeof radioButtonProps>
export type RadioButtonComponent = DefineComponent<HTMLAttributes & typeof radioButtonProps>
export type RadioButtonInstance = InstanceType<DefineComponent<RadioButtonProps>>

export const radioGroupProps = {
  value: IxPropTypes.oneOfType([String, Number, Boolean]),
  size: IxPropTypes.oneOf(['large', 'medium', 'small']).def('medium'),
  mode: IxPropTypes.oneOf(['fill', 'border']).def('border'),
  disabled: IxPropTypes.bool.def(false),
  color: IxPropTypes.string.def('#00b27a'),
}

export type RadioGroupProps = IxInnerPropTypes<typeof radioGroupProps>
export type RadioGroupPublicProps = IxPublicPropTypes<typeof radioGroupProps>
export type RadioGroupComponent = DefineComponent<HTMLAttributes & typeof radioGroupProps>
export type RadioGroupInstance = InstanceType<DefineComponent<RadioGroupProps>>

export interface radioModeConfig {
  isGroup: ComputedRef
  radioGroup: RadioGroupConfig
}

export interface RadioGroupConfig extends RadioGroupProps {
  change: (value: string | number | boolean) => void
  radioGroupSize: string
}
