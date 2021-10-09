/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { BreakpointKey } from '@idux/cdk/breakpoint'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

export type RowAlign = 'top' | 'middle' | 'bottom'
export type RowJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between'
export type RowGutterRecord = Record<BreakpointKey, number>
export type RowGutter = number | string | Array<number> | RowGutterRecord | [RowGutterRecord, RowGutterRecord]

export const rowProps = {
  align: IxPropTypes.oneOf<RowAlign>(['top', 'middle', 'bottom']),
  justify: IxPropTypes.oneOf<RowJustify>(['start', 'end', 'center', 'space-around', 'space-between']),
  gutter: IxPropTypes.oneOfType<RowGutter>([
    Number,
    String,
    IxPropTypes.array<number>(),
    IxPropTypes.object<RowGutterRecord>(),
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

const breakpointConfig = IxPropTypes.oneOfType([
  Number,
  String,
  IxPropTypes.shape<ColBreakpointConfig>({
    span: Number,
    offset: Number,
    order: Number,
    push: Number,
    pull: Number,
  }).loose,
])

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
