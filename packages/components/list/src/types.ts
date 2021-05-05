import type { DefineComponent } from 'vue'
import type { RowProps } from '@idux/components/grid'
import type { ListSize } from '@idux/components/config'

import { PropTypes } from '@idux/cdk/utils'
import { object } from 'vue-types'
import { SpinProps } from '@idux/components/spin'
import { RowPropGutter } from '@idux/components/grid/src/types'

export type ListLayout = 'horizontal' | 'vertical'

export interface ListGridProps extends RowProps {
  column?: number
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
}

export interface ListProps {
  header?: string
  footer?: string
  loadMore?: string
  empty?: string
  borderless?: boolean
  split?: boolean
  loading?: boolean | SpinProps
  size?: ListSize
  grid?: ListGridProps
}

export const ListPropTypes = {
  header: PropTypes.string,
  footer: PropTypes.string,
  loadMore: PropTypes.string,
  empty: PropTypes.string,
  borderless: PropTypes.bool,
  split: PropTypes.bool.def(true),
  loading: PropTypes.bool.def(false),
  size: PropTypes.oneOf(['large', 'medium', 'small'] as const),
  grid: object<ListGridProps>(),
}

export type ListComponent = InstanceType<DefineComponent<ListProps>>

export interface ListItemProps {
  title?: string
  content?: string
  extra?: string
}

export const ListItemPropTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  extra: PropTypes.string,
}

export type ListItemComponent = InstanceType<DefineComponent<ListItemProps>>

export interface ListWrap {
  gutter?: RowPropGutter
  isUseGrid: boolean
}

export const ListWrapPropTypes = {
  // TODO fix any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gutter: object<RowPropGutter | any>(),
  isUseGrid: PropTypes.bool,
}

export interface ListItemWrap {
  grid?: ListGridProps
}

export const ListItemWrapPropTypes = {
  grid: object<ListGridProps>(),
}
