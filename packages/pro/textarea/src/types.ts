/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray } from '@idux/cdk/utils'
import type { TextareaResize } from '@idux/components/textarea'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

export interface TextareaError {
  index: number
  message?: string
}

import { ɵCommonProps } from '@idux/components/input'

export const proTextareaProps = {
  ...ɵCommonProps,
  computeCount: { type: Function as PropType<(value: string) => string>, default: undefined },
  errors: Array as PropType<TextareaError[]>,
  maxCount: { type: [Number, String] as PropType<number | string>, default: undefined },
  placeholder: String,
  resize: { type: String as PropType<TextareaResize>, default: undefined },
  showCount: { type: Boolean, default: undefined },

  onKeyDown: [Function, Array] as PropType<MaybeArray<(evt: KeyboardEvent) => void>>,
} as const

export type ProTextareaProps = ExtractInnerPropTypes<typeof proTextareaProps>
export type ProTextareaPublicProps = ExtractPublicPropTypes<typeof proTextareaProps>
export type ProTextareaComponent = DefineComponent<
  Omit<HTMLAttributes, keyof ProTextareaPublicProps> & ProTextareaPublicProps
>
export type ProTextareaInstance = InstanceType<DefineComponent<ProTextareaProps>>

export const errorLineProps = {
  message: String,
  visible: Boolean,
} as const

export type ErrorLineProps = ExtractInnerPropTypes<typeof errorLineProps>

export type { TextareaResize } from '@idux/components/textarea'
