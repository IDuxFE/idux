/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { RowProps } from '@idux/components/grid'
import type { SpinProps } from '@idux/components/spin'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

export type ListSize = 'sm' | 'md' | 'lg'
export interface ListGridProps extends RowProps {
  column?: number
  gutter?: number
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
}

export const listProps = {
  header: IxPropTypes.string,
  footer: IxPropTypes.string,
  empty: IxPropTypes.string,
  borderless: IxPropTypes.bool,
  loading: IxPropTypes.bool.def(false) || IxPropTypes.object<SpinProps>(),
  size: IxPropTypes.oneOf<ListSize>(['sm', 'md', 'lg']),
  grid: IxPropTypes.object<ListGridProps>(),
}

export type ListProps = ExtractInnerPropTypes<typeof listProps>
export type ListPublicProps = ExtractPublicPropTypes<typeof listProps>
export type ListComponent = DefineComponent<Omit<HTMLAttributes, keyof ListPublicProps> & ListPublicProps>
export type ListInstance = InstanceType<DefineComponent<ListProps>>

export const listItemProps = {
  title: IxPropTypes.string,
  content: IxPropTypes.string,
  extra: IxPropTypes.string,
}

export type ListItemProps = ExtractInnerPropTypes<typeof listItemProps>
export type ListItemPublicProps = ExtractPublicPropTypes<typeof listItemProps>
export type ListItemComponent = DefineComponent<Omit<HTMLAttributes, keyof ListItemPublicProps> & ListItemPublicProps>
export type ListItemInstance = InstanceType<DefineComponent<ListItemProps>>
