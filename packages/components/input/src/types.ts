import type { DefineComponent, Ref } from 'vue'
import type { AbstractControl } from '@idux/cdk/forms'
import type { InputSize, TextareaSize, TextareaAutoRows, TextareaResize } from '@idux/components/config'

export interface InputProps {
  value?: string
  control?: string | AbstractControl
  disabled: boolean
  readonly: boolean
  addonAfter?: string
  addonBefore?: string
  suffix?: string
  prefix?: string
  size?: InputSize
  clearable?: boolean
  borderless?: boolean
}

export interface InputBindings {
  inputRef: Ref<HTMLInputElement>
  focus: (options?: FocusOptions) => void
  blur: () => void
}

export type InputComponent = InstanceType<DefineComponent<InputProps, InputBindings>>

export interface TextareaProps {
  value?: string
  control?: string | AbstractControl
  disabled: boolean
  readonly: boolean
  resize?: TextareaResize
  autoRows?: boolean | TextareaAutoRows
  showCount?: boolean
  maxCount?: number | string
  computeCount?: (value: string) => string
  size?: TextareaSize
  clearable?: boolean
}

export interface TextareaBindings {
  textareaRef: Ref<HTMLTextAreaElement>
  focus: (options?: FocusOptions) => void
  blur: () => void
}

export type TextareaComponent = InstanceType<DefineComponent<TextareaProps, TextareaBindings>>
