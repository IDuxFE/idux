/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { RowGutter, RowProps } from '@idux/components/grid'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

export type ListSize = 'small' | 'medium' | 'large'
export type ListLayout = 'horizontal' | 'vertical'
export interface ListGridProps extends RowProps {
  column?: number
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
}

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

export type ListProps = IxInnerPropTypes<typeof listProps>
export type ListPublicProps = IxPublicPropTypes<typeof listProps>
export type ListComponent = DefineComponent<Omit<HTMLAttributes, keyof ListPublicProps> & ListPublicProps>
export type ListInstance = InstanceType<DefineComponent<ListProps>>

export const listItemProps = {
  title: IxPropTypes.string,
  content: IxPropTypes.string,
  extra: IxPropTypes.string,
}

export type ListItemProps = IxInnerPropTypes<typeof listItemProps>
export type ListItemPublicProps = IxPublicPropTypes<typeof listItemProps>
export type ListItemComponent = DefineComponent<Omit<HTMLAttributes, keyof ListItemPublicProps> & ListItemPublicProps>
export type ListItemInstance = InstanceType<DefineComponent<ListItemProps>>

export const listWrapProps = {
  gutter: IxPropTypes.object<RowGutter>(),
  isUseGrid: IxPropTypes.bool,
}

export type ListWrapProps = IxInnerPropTypes<typeof listWrapProps>
export type ListWarpInstance = InstanceType<DefineComponent<ListWrapProps>>

export const listItemWrapProps = {
  grid: IxPropTypes.object<ListGridProps>(),
}

export type ListItemWrapProps = IxInnerPropTypes<typeof listItemWrapProps>
export type ListItemWrapInstance = InstanceType<DefineComponent<ListItemWrapProps>>
