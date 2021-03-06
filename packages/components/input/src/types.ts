import type { DefineComponent, Ref } from 'vue'
import type { AbstractControl } from '@idux/cdk/forms'
import type { InputSize, TextareaSize, TextareaAutoRows, TextareaResize } from '@idux/components/core/config'

export type { InputSize, TextareaSize, TextareaAutoRows, TextareaResize }

interface InputOriginalProps {
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

export type InputProps = Readonly<InputOriginalProps>

export interface InputBindings {
  inputRef: Ref<HTMLInputElement>
}

export type InputComponent = InstanceType<DefineComponent<InputProps, InputBindings>>

interface TextareaOriginalProps {
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

export type TextareaProps = Readonly<TextareaOriginalProps>

export interface TextareaBindings {
  textareaRef: Ref<HTMLTextAreaElement>
}

export type TextareaComponent = InstanceType<DefineComponent<TextareaProps, TextareaBindings>>
