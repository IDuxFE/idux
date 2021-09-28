import type { DefineComponent, HTMLAttributes, VNodeTypes } from 'vue'
import type { IxPublicPropTypes, IxInnerPropTypes } from '@idux/cdk/utils'

import { IxPropTypes } from '@idux/cdk/utils'

export type PaginationSize = 'small' | 'medium'
export type PaginationItemType = 'page' | 'prev' | 'next' | 'prev5' | 'next5'
export interface PaginationItemRenderOptions {
  index?: number
  type: PaginationItemType
  active: boolean
  disabled: boolean
  original: VNodeTypes
}
export type PaginationItemRenderFn = (options: PaginationItemRenderOptions) => VNodeTypes
export type PaginationTotalRenderFn = (options: { total: number; range: [number, number] }) => VNodeTypes

export const paginationProps = {
  pageIndex: IxPropTypes.number.def(1),
  pageSize: IxPropTypes.number,
  disabled: IxPropTypes.bool.def(false),
  itemRender: IxPropTypes.func<PaginationItemRenderFn>(),
  pageSizes: IxPropTypes.arrayOf(Number),
  showQuickJumper: IxPropTypes.bool,
  showSizeChanger: IxPropTypes.bool,
  showTitle: IxPropTypes.bool,
  showTotal: IxPropTypes.bool,
  simple: IxPropTypes.bool,
  size: IxPropTypes.oneOf<PaginationSize>(['medium', 'small']),
  total: IxPropTypes.number.def(0),
  totalRender: IxPropTypes.func<PaginationTotalRenderFn>(),

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
