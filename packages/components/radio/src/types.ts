/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { AbstractControl } from '@idux/cdk/forms'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray, VKey } from '@idux/cdk/utils'
import type { FormSize } from '@idux/components/form'
import type { SpaceProps } from '@idux/components/space'
import type { DefineComponent, HTMLAttributes, LabelHTMLAttributes, PropType } from 'vue'

export const radioProps = {
  control: { type: [String, Number, Object] as PropType<string | number | AbstractControl>, default: undefined },
  checked: { type: Boolean, default: undefined },

  autofocus: { type: Boolean, default: false },
  buttoned: { type: Boolean, default: undefined },
  disabled: { type: Boolean, default: undefined },
  label: { type: String, default: undefined },
  mode: { type: String as PropType<RadioMode>, default: undefined },
  size: { type: String as PropType<FormSize>, default: undefined },
  value: { type: null, default: undefined },
  waveless: { type: Boolean, default: false },

  // events
  'onUpdate:checked': { type: [Function, Array] as PropType<MaybeArray<(checked: boolean) => void>> },
  onChange: { type: [Function, Array] as PropType<MaybeArray<(checked: boolean, oldChecked: boolean) => void>> },
  onBlur: { type: [Function, Array] as PropType<MaybeArray<(evt: FocusEvent) => void>> },
  onFocus: { type: [Function, Array] as PropType<MaybeArray<(evt: FocusEvent) => void>> },
} as const

export type RadioProps = ExtractInnerPropTypes<typeof radioProps>
export type RadioPublicProps = ExtractPublicPropTypes<typeof radioProps>
export interface RadioBindings {
  blur: () => void
  focus: (options?: FocusOptions) => void
}
export type RadioComponent = DefineComponent<
  Omit<LabelHTMLAttributes, keyof RadioPublicProps> & RadioPublicProps,
  RadioBindings
>
export type RadioInstance = InstanceType<DefineComponent<RadioProps, RadioBindings>>

export const radioGroupProps = {
  control: { type: [String, Number, Object] as PropType<string | number | AbstractControl>, default: undefined },
  value: { type: null, default: undefined },

  buttoned: { type: Boolean, default: false },
  dataSource: { type: Array as PropType<RadioData[]> },
  disabled: { type: Boolean, default: false },
  gap: { type: [Number, String] as PropType<number | string>, default: undefined },
  name: { type: String, default: undefined },
  mode: { type: String as PropType<RadioMode>, default: undefined },
  size: { type: String as PropType<FormSize>, default: 'md' },

  // events
  'onUpdate:value': { type: [Function, Array] as PropType<MaybeArray<(value: any) => void>> },
  onChange: { type: [Function, Array] as PropType<MaybeArray<(value: any, oldValue: any) => void>> },
} as const

export type RadioGroupProps = ExtractInnerPropTypes<typeof radioGroupProps>
export type RadioGroupPublicProps = ExtractPublicPropTypes<typeof radioGroupProps> & Omit<SpaceProps, 'size'>
export type RadioGroupComponent = DefineComponent<
  Omit<HTMLAttributes, keyof RadioGroupPublicProps> & RadioGroupPublicProps
>
export type RadioGroupInstance = InstanceType<DefineComponent<RadioGroupProps>>

export type RadioMode = 'default' | 'primary'
export interface RadioData<K = VKey> extends Omit<RadioPublicProps, 'value'> {
  key?: K
}
