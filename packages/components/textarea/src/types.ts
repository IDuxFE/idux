/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, PropType, TextareaHTMLAttributes } from 'vue'

import { ɵInputCommonProps } from '@idux/components/input'

export const textareaProps = {
  ...ɵInputCommonProps,
  autoRows: { type: [Boolean, Object] as PropType<boolean | TextareaAutoRows>, default: undefined },
  computeCount: { type: Function as PropType<(value: string) => string>, default: undefined },
  maxCount: { type: [Number, String] as PropType<number | string>, default: undefined },
  resize: { type: String as PropType<TextareaResize>, default: undefined },
  showCount: { type: Boolean, default: undefined },
} as const

export type TextareaProps = ExtractInnerPropTypes<typeof textareaProps>
export type TextareaPublicProps = ExtractPublicPropTypes<typeof textareaProps>
export interface TextareaBindings {
  focus: (options?: FocusOptions) => void
  blur: () => void
}
export type TextareaComponent = DefineComponent<
  Omit<TextareaHTMLAttributes, keyof TextareaPublicProps> & TextareaPublicProps,
  TextareaBindings
>
export type TextareaInstance = InstanceType<DefineComponent<TextareaProps, TextareaBindings>>

export type TextareaResize = 'none' | 'both' | 'horizontal' | 'vertical'
export type TextareaAutoRows = { minRows?: number; maxRows?: number }
