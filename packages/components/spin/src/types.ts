/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

export type SpinTipAlignType = 'horizontal' | 'vertical'
export type SpinSize = 'lg' | 'md' | 'sm'

export const spinProps = {
  strokeWidth: Number,
  radius: Number,
  duration: Number,
  spinning: {
    type: Boolean,
    default: true,
  },
  rotate: {
    type: Boolean,
    default: true,
  },
  icon: String,
  tip: String,
  tipAlign: String as PropType<'horizontal' | 'vertical'>,
  size: String as PropType<'lg' | 'md' | 'sm'>,
} as const

export type SpinProps = ExtractInnerPropTypes<typeof spinProps>
export type SpinPublicProps = ExtractPublicPropTypes<typeof spinProps>
export type SpinComponent = DefineComponent<Omit<HTMLAttributes, keyof SpinPublicProps> & SpinPublicProps>
export type SpinInstance = InstanceType<DefineComponent<SpinProps>>
