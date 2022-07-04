/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { ColProps, RowProps } from '@idux/components/grid'
import type { SpinProps } from '@idux/components/spin'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

export type ListSize = 'sm' | 'md' | 'lg'
export type ColPropsType = Partial<Pick<ColProps, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>>
export interface ListGridProps extends RowProps, ColPropsType {
  column?: number
}

export const listProps = {
  header: String,
  footer: String,
  empty: String,
  borderless: {
    type: Boolean,
    default: undefined,
  },
  loading: {
    type: [Boolean, Object] as PropType<boolean | SpinProps>,
    default: false,
  },
  size: String as PropType<ListSize>,
  grid: Object as PropType<ListGridProps>,
} as const

export type ListProps = ExtractInnerPropTypes<typeof listProps>
export type ListPublicProps = ExtractPublicPropTypes<typeof listProps>
export type ListComponent = DefineComponent<Omit<HTMLAttributes, keyof ListPublicProps> & ListPublicProps>
export type ListInstance = InstanceType<DefineComponent<ListProps>>

export const listItemProps = {
  title: String,
  content: String,
  extra: String,
}

export type ListItemProps = ExtractInnerPropTypes<typeof listItemProps>
export type ListItemPublicProps = ExtractPublicPropTypes<typeof listItemProps>
export type ListItemComponent = DefineComponent<Omit<HTMLAttributes, keyof ListItemPublicProps> & ListItemPublicProps>
export type ListItemInstance = InstanceType<DefineComponent<ListItemProps>>
