/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { BreakpointKey } from '@idux/cdk/breakpoint'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { HeaderProps } from '@idux/components/header'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

export const descProps = {
  col: {
    type: [Number, String, Object] as PropType<number | string | Record<BreakpointKey, number | string>>,
    default: undefined,
  },
  colonless: { type: Boolean, default: undefined },
  header: { type: [String, Object] as PropType<string | HeaderProps> },
  labelAlign: String as PropType<DescLabelAlign>,
  labelWidth: { type: [String, Number] as PropType<string | number>, default: undefined },
  layout: String as PropType<DescLayout>,
  size: String as PropType<DescSize>,
} as const

export type DescProps = ExtractInnerPropTypes<typeof descProps>
export type DescPublicProps = ExtractPublicPropTypes<typeof descProps>
export type DescComponent = DefineComponent<Omit<HTMLAttributes, keyof DescPublicProps> & DescPublicProps>
export type DescInstance = InstanceType<DefineComponent<DescProps>>

export const descItemProps = {
  col: {
    type: [Number, String, Object] as PropType<number | string | Record<BreakpointKey, number | string>>,
    default: 1,
  },
  colonless: { type: Boolean, default: undefined },
  label: { type: [String, Number] as PropType<string | number>, default: undefined },
  labelAlign: { type: String as PropType<DescLabelAlign>, default: undefined },
  labelWidth: { type: [String, Number] as PropType<string | number>, default: undefined },
} as const

export type DescItemProps = ExtractInnerPropTypes<typeof descItemProps>
export type DescItemPublicProps = ExtractPublicPropTypes<typeof descItemProps>
export type DescItemComponent = DefineComponent<Omit<HTMLAttributes, keyof DescItemPublicProps> & DescItemPublicProps>
export type DescItemInstance = InstanceType<DefineComponent<DescItemProps>>

export type DescLabelAlign = 'start' | 'end'
export type DescLayout = 'horizontal' | 'vertical'
export type DescSize = 'sm' | 'md' | 'lg'
