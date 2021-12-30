/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, VNode } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

export type PaginationSize = 'sm' | 'md'
export type PaginationItemType = 'page' | 'prev' | 'next' | 'prev5' | 'next5'
export interface PaginationItemRenderOptions {
  index?: number
  type: PaginationItemType
  active: boolean
  disabled: boolean
  original: VNode
}

export const paginationProps = {
  pageIndex: IxPropTypes.number,
  pageSize: IxPropTypes.number,
  disabled: IxPropTypes.bool.def(false),
  pageSizes: IxPropTypes.arrayOf(Number),
  showQuickJumper: IxPropTypes.bool,
  showSizeChanger: IxPropTypes.bool,
  showTitle: IxPropTypes.bool,
  showTotal: IxPropTypes.bool,
  simple: IxPropTypes.bool,
  size: IxPropTypes.oneOf<PaginationSize>(['sm', 'md']),
  total: IxPropTypes.number.def(0),

  // events
  'onUpdate:pageIndex': IxPropTypes.emit<(pageIndex: number) => void>(),
  'onUpdate:pageSize': IxPropTypes.emit<(pageSize: number) => void>(),
  onChange: IxPropTypes.emit<(pageIndex: number, pageSize: number) => void>(),
}

export type PaginationProps = IxInnerPropTypes<typeof paginationProps>
export type PaginationPublicProps = IxPublicPropTypes<typeof paginationProps>
export type PaginationComponent = DefineComponent<
  Omit<HTMLAttributes, keyof PaginationPublicProps> & PaginationPublicProps
>
export type PaginationInstance = InstanceType<DefineComponent<PaginationProps>>

export const paginationItemProps = {
  disabled: IxPropTypes.bool,
  index: IxPropTypes.number,
  type: IxPropTypes.oneOf<PaginationItemType>(['page', 'prev', 'next', 'prev5', 'next5']).isRequired,
}

export type PaginationItemProps = IxInnerPropTypes<typeof paginationItemProps>
