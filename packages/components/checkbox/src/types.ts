import type { DefineComponent, Ref } from 'vue'

export interface CheckboxProps {
  checked?: string | number | boolean
  disabled?: boolean
  indeterminate?: boolean
  readonly?: boolean
  trueValue?: string | number | boolean
  falseValue?: string | number | boolean
  value?: string
}

export interface CheckboxBindings {
  inputRef: Ref<HTMLInputElement>
  focus: () => void
  blur: () => void
}

export type CheckboxComponent = InstanceType<DefineComponent<CheckboxProps, CheckboxBindings>>

export interface CheckboxGroupProps {
  value?: string[]
  disabled?: boolean
  readonly?: boolean
  name?: string
}

export type CheckboxGroupComponent = InstanceType<DefineComponent<CheckboxGroupProps>>
