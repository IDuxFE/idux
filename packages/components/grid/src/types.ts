import type { DefineComponent } from 'vue'
import type { BreakpointKey } from '@idux/cdk/breakpoint'

import { IxExtractPropTypes, IxPropTypes } from '@idux/cdk/utils'

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

export type RowProps = IxExtractPropTypes<typeof rowProps>

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

export type ColProps = IxExtractPropTypes<typeof colProps>

export type ColInstance = InstanceType<DefineComponent<ColProps>>
