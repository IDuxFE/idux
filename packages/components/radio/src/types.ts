import { ComputedRef, DefineComponent } from 'vue'

export interface RadioProps {
  value?: boolean | string | number
  disabled?: boolean
  name?: string
  checked?: boolean
}
export interface RadioButtonProps {
  checked?: boolean
  disabled?: boolean
  value?: boolean | string | number
  name?: string
}
export interface RadioGroupProps {
  value?: boolean | string | number
  disabled?: boolean
  size?: string
  mode?: string
}
export type modelValueType = boolean | string | number
export interface RadioGroupConfig extends RadioGroupProps {
  change: (value: modelValueType) => void
  radioGroupSize: string
}

export type IxRadioComponent = InstanceType<DefineComponent<RadioProps>>
export type IxRadioButtonComponent = InstanceType<DefineComponent<RadioButtonProps>>
export type IxRadioGroupComponent = InstanceType<DefineComponent<RadioGroupProps>>

export interface radioModeConfig {
  isGroup: ComputedRef
  radioGroup: RadioGroupConfig
}
