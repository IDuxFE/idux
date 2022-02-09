/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type DefineComponent, type HTMLAttributes } from 'vue'

import { type BreakpointKey } from '@idux/cdk/breakpoint'
import { type IxInnerPropTypes, IxPropTypes, type IxPublicPropTypes } from '@idux/cdk/utils'

export type RowAlign = 'start' | 'center' | 'end' | 'baseline' | 'stretch'
export type RowJustify = 'start' | 'center' | 'end' | 'space-around' | 'space-between'

export const rowProps = {
  align: IxPropTypes.oneOf<RowAlign>(['start', 'center', 'end', 'baseline', 'stretch']),
  justify: IxPropTypes.oneOf<RowJustify>(['start', 'end', 'center', 'space-around', 'space-between']),
  gutter: IxPropTypes.oneOfType([
    Number,
    String,
    IxPropTypes.array<number | string>(),
    IxPropTypes.object<Partial<Record<BreakpointKey, number | string>>>(),
  ]).def(0),
  wrap: IxPropTypes.bool,
}

export type RowProps = IxInnerPropTypes<typeof rowProps>
export type RowPublicProps = IxPublicPropTypes<typeof rowProps>
export type RowComponent = DefineComponent<Omit<HTMLAttributes, keyof RowPublicProps> & RowPublicProps>
export type RowInstance = InstanceType<DefineComponent<RowProps>>

export interface ColBreakpointConfig {
  span?: number | string
  order?: number | string
  offset?: number | string
  push?: number | string
  pull?: number | string
}

const singleProp = IxPropTypes.oneOfType([Number, String])

const breakpointConfig = IxPropTypes.oneOfType([Number, String, IxPropTypes.object<ColBreakpointConfig>()])

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
}

export type ColProps = IxInnerPropTypes<typeof colProps>
export type ColPublicProps = IxPublicPropTypes<typeof colProps>
export type ColComponent = DefineComponent<Omit<HTMLAttributes, keyof ColPublicProps> & ColPublicProps>
export type ColInstance = InstanceType<DefineComponent<ColProps>>
