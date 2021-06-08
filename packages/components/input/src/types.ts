import type { DefineComponent } from 'vue'

import type { FormSize, TextareaAutoRows, TextareaResize } from '@idux/components/config'

import { controlProp } from '@idux/cdk/forms'
import { IxExtractPropTypes, IxPropTypes } from '@idux/cdk/utils'

const commonProps = {
  value: IxPropTypes.string,
  control: controlProp,
  disabled: IxPropTypes.bool.def(false),
  readonly: IxPropTypes.bool.def(false),
  size: IxPropTypes.oneOf<FormSize>(['large', 'medium', 'small']),
  clearable: IxPropTypes.bool,

  // events
  'onUpdate:value': IxPropTypes.emit<(value: string) => void>(),
  onAfterClear: IxPropTypes.emit<(evt: Event) => void>(),
  onCompositionStart: IxPropTypes.emit<(evt: CompositionEvent) => void>(),
  onCompositionEnd: IxPropTypes.emit<(evt: CompositionEvent) => void>(),
  onInput: IxPropTypes.emit<(evt: Event) => void>(),
  onFocus: IxPropTypes.emit<(evt: FocusEvent) => void>(),
  onBlur: IxPropTypes.emit<(evt: FocusEvent) => void>(),
}

export const inputProps = {
  ...commonProps,
  addonAfter: IxPropTypes.string,
  addonBefore: IxPropTypes.string,
  suffix: IxPropTypes.string,
  prefix: IxPropTypes.string,
  borderless: IxPropTypes.bool,
}

export type InputProps = IxExtractPropTypes<typeof inputProps>

export interface InputBindings {
  focus: (options?: FocusOptions) => void
  blur: () => void
}

export type InputInstance = InstanceType<DefineComponent<InputProps, InputBindings>>

export const textareaProps = {
  ...commonProps,
  resize: IxPropTypes.oneOf<TextareaResize>(['none', 'both', 'horizontal', 'vertical']),
  autoRows: IxPropTypes.oneOfType([Boolean, IxPropTypes.shape<TextareaAutoRows>({ minRows: Number, maxRows: Number })]),
  showCount: IxPropTypes.bool,
  maxCount: IxPropTypes.oneOfType([Number, String]),
  computeCount: IxPropTypes.func<(value: string) => string>(),
}

export type TextareaProps = IxExtractPropTypes<typeof textareaProps>

export interface TextareaBindings {
  focus: (options?: FocusOptions) => void
  blur: () => void
}

export type TextareaInstance = InstanceType<DefineComponent<TextareaProps, TextareaBindings>>
