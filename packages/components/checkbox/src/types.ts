import type { DefineComponent } from 'vue'

export interface CheckboxProps {
  checked?: string | number | boolean
  disabled?: boolean
  indeterminate?: boolean
  trueValue?: string | number | boolean
  falseValue?: string | number | boolean
  value?: string
}

export type CheckboxComponent = InstanceType<DefineComponent<CheckboxProps>>

export interface CheckboxGroupProps {
  value?: string[]
  disabled?: boolean
  name?: string
}

export type CheckboxGroupComponent = InstanceType<DefineComponent<CheckboxGroupProps>>
