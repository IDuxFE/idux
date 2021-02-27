import type { DefineComponent } from 'vue'
import type { BreakpointKey } from '@idux/cdk/breakpoint'

type RowAlign = 'top' | 'middle' | 'bottom' | 'stretch'
type RowJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between'

export type RowRecordGutter = Record<BreakpointKey, number>
export type RowRecordArrGutter = [RowRecordGutter, RowRecordGutter]
export type RowPropGutter = RowRecordGutter | number | Array<number> | RowRecordArrGutter

interface RowOriginalProps {
  align: RowAlign
  justify: RowJustify
  gutter: RowPropGutter
  wrap: boolean
}

export type RowProps = Readonly<RowOriginalProps>

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

interface ColOriginalProps {
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

export type ColProps = Readonly<ColOriginalProps>

export type ColComponent = InstanceType<DefineComponent<ColProps>>
