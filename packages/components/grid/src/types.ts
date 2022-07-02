/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type DefineComponent, type HTMLAttributes, PropType } from 'vue'

import { type BreakpointKey } from '@idux/cdk/breakpoint'
import { type ExtractInnerPropTypes, type ExtractPublicPropTypes } from '@idux/cdk/utils'

export type RowAlign = 'start' | 'center' | 'end' | 'baseline' | 'stretch'
export type RowJustify = 'start' | 'center' | 'end' | 'space-around' | 'space-between'
export type RowGutter = number | string | Array<number | string> | Partial<Record<BreakpointKey, number | string>>

export const rowProps = {
  align: String as PropType<RowAlign>,
  justify: String as PropType<RowJustify>,
  gutter: [Number, String, Array, Object] as PropType<RowGutter>,
  wrap: {
    type: Boolean,
    default: undefined,
  },
} as const

export type RowProps = ExtractInnerPropTypes<typeof rowProps>
export type RowPublicProps = ExtractPublicPropTypes<typeof rowProps>
export type RowComponent = DefineComponent<Omit<HTMLAttributes, keyof RowPublicProps> & RowPublicProps>
export type RowInstance = InstanceType<DefineComponent<RowProps>>

export interface ColBreakpointConfig {
  span?: number | string
  order?: number | string
  offset?: number | string
  push?: number | string
  pull?: number | string
}

const singleProp = [Number, String] as PropType<number | string>

const breakpointConfig = [Number, String, Object] as PropType<number | string | ColBreakpointConfig>

export const colProps = {
  flex: singleProp,
  span: singleProp,
  order: singleProp,
  offset: singleProp,
  push: singleProp,
  pull: singleProp,
  xs: breakpointConfig,
  sm: breakpointConfig,
  md: breakpointConfig,
  lg: breakpointConfig,
  xl: breakpointConfig,
} as const

export type ColProps = ExtractInnerPropTypes<typeof colProps>
export type ColPublicProps = ExtractPublicPropTypes<typeof colProps>
export type ColComponent = DefineComponent<Omit<HTMLAttributes, keyof ColPublicProps> & ColPublicProps>
export type ColInstance = InstanceType<DefineComponent<ColProps>>
