import type { DefineComponent } from 'vue'
import type { VueTypeValidableDef } from 'vue-types'
import type { BreakpointKey } from '@idux/cdk/breakpoint'

import { PropTypes } from '@idux/cdk/utils'

export type RowAlign = 'top' | 'middle' | 'bottom'
export type RowJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between'
export type RowGutterRecord = Record<BreakpointKey, number>
export type RowGutter = number | string | Array<number> | RowGutterRecord | [RowGutterRecord, RowGutterRecord]

export interface RowProps {
  align?: RowAlign
  justify?: RowJustify
  gutter: RowGutter
  wrap?: boolean
}

export const rowPropsDef = {
  align: PropTypes.oneOf(['top', 'middle', 'bottom'] as const),
  justify: PropTypes.oneOf(['start', 'end', 'center', 'space-around', 'space-between'] as const),
  gutter: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array, PropTypes.object]).def(
    0,
  ) as VueTypeValidableDef<RowGutter> & { default: 0 },
  wrap: PropTypes.bool,
}

export type RowInstance = InstanceType<DefineComponent<RowProps>>

export interface ColBreakpointConfig {
  span?: number | string
  order?: number | string
  offset?: number | string
  push?: number | string
  pull?: number | string
}

export interface ColProps {
  flex?: number | string
  span?: number | string
  offset?: number | string
  order?: number | string
  push?: number | string
  pull?: number | string
  xs?: number | string | ColBreakpointConfig
  sm?: number | string | ColBreakpointConfig
  md?: number | string | ColBreakpointConfig
  lg?: number | string | ColBreakpointConfig
  xl?: number | string | ColBreakpointConfig
}

const breakpointConfig = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string,
  PropTypes.shape({
    span: PropTypes.number,
    offset: PropTypes.number,
    order: PropTypes.number,
    push: PropTypes.number,
    pull: PropTypes.number,
  }).loose,
])

const singleProp = PropTypes.oneOfType([PropTypes.string, PropTypes.number])

export const colPropsDef = {
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

export type ColInstance = InstanceType<DefineComponent<ColProps>>
