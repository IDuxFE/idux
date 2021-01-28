import type { ComputedRef, DefineComponent, Ref } from 'vue'

interface CheckboxOriginalProps {
  checked?: string | number | boolean
  disabled?: boolean
  indeterminate?: boolean
  trueValue?: string | number | boolean
  falseValue?: string | number | boolean
  value?: string
}

interface CheckboxGroupOriginalProps {
  value?: string[]
  disabled?: boolean
  name?: string
}

export interface CheckboxBindings {
  isChecked: ComputedRef<boolean>
  isDisabled: ComputedRef<boolean>
  hasDefaultSlot: ComputedRef<boolean>
  handleChange: (e: Event) => void
  classes: ComputedRef<{
    'ix-checkbox-disabled': boolean
    'ix-checkbox-indeterminate': boolean
    'ix-checkbox-checked': boolean
  }>
  inputName: ComputedRef<string>
  attrs: Ref<Record<string, unknown>>
}

export type CheckboxProps = Readonly<CheckboxOriginalProps>

export type CheckboxGroupProps = Readonly<CheckboxGroupOriginalProps>

export type CheckboxComponent = InstanceType<DefineComponent<CheckboxProps, CheckboxBindings>>

export type CheckboxGroupComponent = InstanceType<DefineComponent<CheckboxGroupProps>>
