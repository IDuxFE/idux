import type { DefineComponent } from 'vue'

import type { FormSize, TextareaAutoRows, TextareaResize } from '@idux/components/config'

import { controlProp } from '@idux/cdk/forms'
import { IxExtractPropTypes, IxPropTypes } from '@idux/cdk/utils'

export const inputProps = {
  value: IxPropTypes.string,
  control: controlProp,
  disabled: IxPropTypes.bool.def(false),
  readonly: IxPropTypes.bool.def(false),
  addonAfter: IxPropTypes.string,
  addonBefore: IxPropTypes.string,
  suffix: IxPropTypes.string,
  prefix: IxPropTypes.string,
  size: IxPropTypes.oneOf<FormSize>(['large', 'medium', 'small']),
  clearable: IxPropTypes.bool,
  borderless: IxPropTypes.bool,
}

export type InputProps = IxExtractPropTypes<typeof inputProps>

export interface InputBindings {
  focus: (options?: FocusOptions) => void
  blur: () => void
}

export type InputInstance = InstanceType<DefineComponent<InputProps, InputBindings>>

export const textareaProps = {
  value: IxPropTypes.string,
  control: controlProp,
  disabled: IxPropTypes.bool.def(false),
  readonly: IxPropTypes.bool.def(false),
  resize: IxPropTypes.oneOf<TextareaResize>(['none', 'both', 'horizontal', 'vertical']),
  autoRows: IxPropTypes.oneOfType([Boolean, IxPropTypes.shape<TextareaAutoRows>({ minRows: Number, maxRows: Number })]),
  showCount: IxPropTypes.bool,
  maxCount: IxPropTypes.oneOfType([Number, String]),
  computeCount: IxPropTypes.func<(value: string) => string>(),
  size: IxPropTypes.oneOf<FormSize>(['large', 'medium', 'small']),
  clearable: IxPropTypes.bool,
}

export type TextareaProps = IxExtractPropTypes<typeof textareaProps>

export interface TextareaBindings {
  focus: (options?: FocusOptions) => void
  blur: () => void
}

export type TextareaInstance = InstanceType<DefineComponent<TextareaProps, TextareaBindings>>
