import { ComputedRef, DefineComponent } from 'vue'

import { IxExtractPropTypes, IxPropTypes } from '@idux/cdk/utils'

export const radioProps = {
  value: IxPropTypes.oneOfType([String, Number, Boolean]),
  disabled: IxPropTypes.bool.def(false),
  name: IxPropTypes.string.def(''),
  checked: IxPropTypes.bool.def(false),
}

export type RadioProps = IxExtractPropTypes<typeof radioProps>

export type RadioInstance = InstanceType<DefineComponent<RadioProps>>

export const radioButtonProps = {
  value: IxPropTypes.oneOfType([String, Number, Boolean]),
  disabled: IxPropTypes.bool.def(false),
  name: IxPropTypes.string.def(''),
  checked: IxPropTypes.bool.def(false),
}

export type RadioButtonProps = IxExtractPropTypes<typeof radioButtonProps>

export type RadioButtonInstance = InstanceType<DefineComponent<RadioButtonProps>>

export const radioGroupProps = {
  value: IxPropTypes.oneOfType([String, Number, Boolean]),
  size: IxPropTypes.oneOf(['large', 'medium', 'small']).def('medium'),
  mode: IxPropTypes.oneOf(['fill', 'border']).def('border'),
  disabled: IxPropTypes.bool.def(false),
  color: IxPropTypes.string.def('#00b27a'),
}

export type RadioGroupProps = IxExtractPropTypes<typeof radioGroupProps>

export type RadioGroupInstance = InstanceType<DefineComponent<RadioGroupProps>>

export interface radioModeConfig {
  isGroup: ComputedRef
  radioGroup: RadioGroupConfig
}

export interface RadioGroupConfig extends RadioGroupProps {
  change: (value: string | number | boolean) => void
  radioGroupSize: string
}
