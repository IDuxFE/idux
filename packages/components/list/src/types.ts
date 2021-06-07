import type { DefineComponent } from 'vue'
import type { ListSize } from '@idux/components/config'
import type { RowProps, RowGutter } from '@idux/components/grid'

import { IxExtractPropTypes, IxPropTypes } from '@idux/cdk/utils'

export const listProps = {
  header: IxPropTypes.string,
  footer: IxPropTypes.string,
  loadMore: IxPropTypes.string,
  empty: IxPropTypes.string,
  borderless: IxPropTypes.bool,
  split: IxPropTypes.bool.def(true),
  loading: IxPropTypes.bool.def(false),
  size: IxPropTypes.oneOf<ListSize>(['large', 'medium', 'small']),
  grid: IxPropTypes.object<ListGridProps>(),
}

export type ListProps = IxExtractPropTypes<typeof listProps>

export type ListInstance = InstanceType<DefineComponent<ListProps>>

export const listItemProps = {
  title: IxPropTypes.string,
  content: IxPropTypes.string,
  extra: IxPropTypes.string,
}

export type ListItemProps = IxExtractPropTypes<typeof listItemProps>

export type ListItemInstance = InstanceType<DefineComponent<ListItemProps>>

export const listWrapProps = {
  gutter: IxPropTypes.object<RowGutter>(),
  isUseGrid: IxPropTypes.bool,
}

export type ListWrapProps = IxExtractPropTypes<typeof listWrapProps>

export type ListWarpInstance = InstanceType<DefineComponent<ListWrapProps>>

export const listItemWrapProps = {
  grid: IxPropTypes.object<ListGridProps>(),
}

export type ListItemWrapProps = IxExtractPropTypes<typeof listItemWrapProps>

export type ListItemWrapInstance = InstanceType<DefineComponent<ListItemWrapProps>>

export type ListLayout = 'horizontal' | 'vertical'

export interface ListGridProps extends RowProps {
  column?: number
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
}
