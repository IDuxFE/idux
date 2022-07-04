/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { AbstractControl } from '@idux/cdk/forms'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray } from '@idux/cdk/utils'
import type { FormSize } from '@idux/components/form'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

export type InputNumberButtonPosition = 'inner' | 'outer'

export const inputNumberProps = {
  value: [Number, null] as PropType<number | null>,
  control: { type: [String, Number, Object] as PropType<string | number | AbstractControl>, default: undefined },
  disabled: {
    type: Boolean,
    default: false,
  },
  keyboard: {
    type: Boolean,
    default: undefined,
  },
  max: {
    type: Number,
    default: Infinity,
  },
  min: {
    type: Number,
    default: -Infinity,
  },
  placeholder: String,
  precision: Number,
  readonly: {
    type: Boolean,
    default: false,
  },
  size: String as PropType<FormSize>,
  step: {
    type: Number,
    default: 1,
  },

  // events
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<(value: number | null) => void>>,
  onChange: [Function, Array] as PropType<
    MaybeArray<(value: number | null, oldValue: number | null | undefined) => void>
  >,
  onFocus: [Function, Array] as PropType<MaybeArray<(evt: FocusEvent) => void>>,
  onBlur: [Function, Array] as PropType<MaybeArray<(evt: FocusEvent) => void>>,
} as const

export type InputNumberProps = ExtractInnerPropTypes<typeof inputNumberProps>
export type InputNumberPublicProps = ExtractPublicPropTypes<typeof inputNumberProps>
export interface InputNumberBindings {
  focus: (options?: FocusOptions) => void
  blur: () => void
}
export type InputNumberComponent = DefineComponent<
  Omit<HTMLAttributes, keyof InputNumberPublicProps> & InputNumberPublicProps,
  InputNumberBindings
>
export type InputNumberInstance = InstanceType<DefineComponent<InputNumberProps, InputNumberBindings>>
