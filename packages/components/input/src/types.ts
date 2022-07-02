/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { AbstractControl } from '@idux/cdk/forms'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray } from '@idux/cdk/utils'
import type { FormSize } from '@idux/components/form'
import type { DefineComponent, InputHTMLAttributes, PropType } from 'vue'

export type TextareaResize = 'none' | 'both' | 'horizontal' | 'vertical'
export type TextareaAutoRows = { minRows: number; maxRows: number }

export const commonProps = {
  control: { type: [String, Number, Object] as PropType<string | number | AbstractControl>, default: undefined },
  value: { type: String, default: undefined },

  clearable: { type: Boolean, default: undefined },
  clearIcon: { type: String, default: undefined },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  size: { type: String as PropType<FormSize>, default: undefined },
  trim: { type: Boolean, default: false },

  // events
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<(value: string) => void>>,
  onChange: [Function, Array] as PropType<MaybeArray<(value: string, oldValue: string) => void>>,
  onClear: [Function, Array] as PropType<MaybeArray<(evt: Event) => void>>,
  onCompositionStart: [Function, Array] as PropType<MaybeArray<(evt: CompositionEvent) => void>>,
  onCompositionEnd: [Function, Array] as PropType<MaybeArray<(evt: CompositionEvent) => void>>,
  onInput: [Function, Array] as PropType<MaybeArray<(evt: Event) => void>>,
  onFocus: [Function, Array] as PropType<MaybeArray<(evt: FocusEvent) => void>>,
  onBlur: [Function, Array] as PropType<MaybeArray<(evt: FocusEvent) => void>>,
} as const

export type CommonProps = ExtractInnerPropTypes<typeof commonProps>

export const inputProps = {
  ...commonProps,
  addonAfter: { type: String, default: undefined },
  addonBefore: { type: String, default: undefined },
  borderless: { type: Boolean, default: undefined },
  prefix: { type: String, default: undefined },
  suffix: { type: String, default: undefined },
} as const

export type InputProps = ExtractInnerPropTypes<typeof inputProps>
export type InputPublicProps = ExtractPublicPropTypes<typeof inputProps>
export interface InputBindings {
  focus: (options?: FocusOptions) => void
  blur: () => void
}
export type InputComponent = DefineComponent<
  Omit<InputHTMLAttributes, keyof InputPublicProps> & InputPublicProps,
  InputBindings
>
export type InputInstance = InstanceType<DefineComponent<InputProps, InputBindings>>
