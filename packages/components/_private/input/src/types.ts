/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ValidateStatus } from '@idux/cdk/forms'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { FormSize } from '@idux/components/form'
import type { DefineComponent, InputHTMLAttributes, PropType } from 'vue'

export const inputProps = {
  addonAfter: String,
  addonBefore: String,
  borderless: {
    type: Boolean,
    default: undefined,
  },
  clearable: {
    type: Boolean,
    default: undefined,
  },
  clearIcon: String,
  clearVisible: {
    type: Boolean,
    default: undefined,
  },
  disabled: {
    type: Boolean,
    default: undefined,
  },
  focused: {
    type: Boolean,
    default: undefined,
  },
  prefix: String,
  size: String as PropType<FormSize>,
  status: String as PropType<ValidateStatus>,
  suffix: String,
  onClear: Function as PropType<(evt: MouseEvent) => void>,
} as const

export type InputProps = ExtractInnerPropTypes<typeof inputProps>
export type InputPublicProps = ExtractPublicPropTypes<typeof inputProps>
export interface InputBindings {
  getInputElement: () => HTMLInputElement | undefined
}
export type InputComponent = DefineComponent<
  Omit<InputHTMLAttributes, keyof InputPublicProps> & InputPublicProps,
  InputBindings
>
export type InputInstance = InstanceType<DefineComponent<InputProps, InputBindings>>
