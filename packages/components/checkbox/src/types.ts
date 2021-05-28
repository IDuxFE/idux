import type { DefineComponent } from 'vue'

export type CheckValue = string | number | boolean

export interface CheckboxProps {
  checked?: CheckValue
  disabled: boolean
  indeterminate: boolean
  readonly: boolean
  trueValue: CheckValue
  falseValue: CheckValue
  value?: string
}

export type CheckboxInstance = InstanceType<DefineComponent<CheckboxProps>>

export interface CheckboxGroupProps {
  value?: string[]
  disabled?: boolean
  readonly?: boolean
  name?: string
}

export type CheckboxGroupInstance = InstanceType<DefineComponent<CheckboxGroupProps>>
