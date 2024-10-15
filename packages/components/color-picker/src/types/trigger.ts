/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ColorFormat, ColorType } from './color'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { FormSize } from '@idux/components/form'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

export const colorPickerTriggerProps = {
  value: [String, Object] as PropType<ColorType>,
  disabled: {
    type: Boolean,
    default: false,
  },
  format: {
    type: String as PropType<ColorFormat>,
    default: 'hex',
  },
  focused: { type: Boolean, default: undefined },
  size: { type: String as PropType<FormSize>, default: 'md' },
  showText: { type: Boolean, default: false },
} as const

export type ColorPickerTriggerProps = ExtractInnerPropTypes<typeof colorPickerTriggerProps>
export type ColorPickerTriggerPublicProps = ExtractPublicPropTypes<typeof colorPickerTriggerProps>
export type ColorPickerTriggerComponent = DefineComponent<
  Omit<HTMLAttributes, keyof ColorPickerTriggerPublicProps> & ColorPickerTriggerPublicProps
>
export type ColorPickerTriggerInstance = InstanceType<DefineComponent<ColorPickerTriggerProps>>
