/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ColorType } from './color'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

export const colorPickerIndicatorProps = {
  color: [String, Object] as PropType<ColorType>,
  checked: Boolean,
  disabled: { type: Boolean, default: false },
  focused: { type: Boolean, default: undefined },
  hoverable: { type: Boolean, default: true },
  showBoxShadow: { type: Boolean, default: true },
} as const

export type ColorPickerIndicatorProps = ExtractInnerPropTypes<typeof colorPickerIndicatorProps>
export type ColorPickerIndicatorPublicProps = ExtractPublicPropTypes<typeof colorPickerIndicatorProps>
export type ColorPickerIndicatorComponent = DefineComponent<
  Omit<HTMLAttributes, keyof ColorPickerIndicatorPublicProps> & ColorPickerIndicatorPublicProps
>
export type ColorPickerIndicatorInstance = InstanceType<DefineComponent<ColorPickerIndicatorProps>>
