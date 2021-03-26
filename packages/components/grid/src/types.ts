import type { DefineComponent } from 'vue'
import type { BreakpointKey } from '@idux/cdk/breakpoint'

export type RowAlign = 'top' | 'middle' | 'bottom' | 'stretch'
export type RowJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between'

export type RowRecordGutter = Record<BreakpointKey, number>
export type RowRecordArrGutter = [RowRecordGutter, RowRecordGutter]
export type RowPropGutter = RowRecordGutter | number | Array<number> | RowRecordArrGutter

export interface RowProps {
  align?: RowAlign
  justify?: RowJustify
  // TODO fix any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gutter: RowPropGutter | any
  wrap?: boolean
}

export type RowComponent = InstanceType<DefineComponent<RowProps>>

type PropValue = number | string

export type FlexValue = PropValue
export interface ColBreakpointConfig {
  span?: PropValue
  order?: PropValue
  offset?: PropValue
  push?: PropValue
  pull?: PropValue
}

export interface ColProps {
  span?: PropValue
  order?: PropValue
  offset?: PropValue
  push?: PropValue
  pull?: PropValue
  xs?: PropValue | ColBreakpointConfig
  sm?: PropValue | ColBreakpointConfig
  md?: PropValue | ColBreakpointConfig
  lg?: PropValue | ColBreakpointConfig
  xl?: PropValue | ColBreakpointConfig
  flex?: FlexValue
}

export type ColComponent = InstanceType<DefineComponent<ColProps>>
