/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, TextareaHTMLAttributes } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'
import { ɵCommonProps } from '@idux/components/input'

export const textareaProps = {
  ...ɵCommonProps,
  autoRows: IxPropTypes.oneOfType([Boolean, IxPropTypes.shape<TextareaAutoRows>({ minRows: Number, maxRows: Number })]),
  computeCount: IxPropTypes.func<(value: string) => string>(),
  maxCount: IxPropTypes.oneOfType([Number, String]),
  resize: IxPropTypes.oneOf<TextareaResize>(['none', 'both', 'horizontal', 'vertical']),
  showCount: IxPropTypes.bool,
}

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
export type TextareaAutoRows = { minRows: number; maxRows: number }
