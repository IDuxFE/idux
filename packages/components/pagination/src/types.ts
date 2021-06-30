import type { DefineComponent, HTMLAttributes, VNodeTypes } from 'vue'
import type { IxPublicPropTypes, IxInnerPropTypes } from '@idux/cdk/utils'
import type { PaginationLocale } from '@idux/components/i18n'

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
}

export type PaginationProps = IxPublicPropTypes<typeof paginationProps>
export type PaginationInnerProps = IxInnerPropTypes<typeof paginationProps>
export type PaginationComponent = DefineComponent<HTMLAttributes & PaginationInnerProps>
export type PaginationInstance = InstanceType<DefineComponent<PaginationProps>>

export const paginationDefaultProps = {
  disabled: IxPropTypes.bool.isRequired,
  itemRender: IxPropTypes.func<PaginationItemRenderFn>(),
  locale: IxPropTypes.object<PaginationLocale>().isRequired,
  pageIndex: IxPropTypes.number.isRequired,
  pageSize: IxPropTypes.number.isRequired,
  pageSizes: IxPropTypes.arrayOf(Number).isRequired,
  showQuickJumper: IxPropTypes.bool.isRequired,
  showSizeChanger: IxPropTypes.bool.isRequired,
  showTitle: IxPropTypes.bool.isRequired,
  size: IxPropTypes.oneOf<PaginationSize>(['medium', 'small']).isRequired,
  total: IxPropTypes.number.def(0),
}

export type PaginationDefaultInnerProps = IxInnerPropTypes<typeof paginationDefaultProps>

export const paginationSimpleProps = {
  disabled: IxPropTypes.bool.isRequired,
  itemRender: IxPropTypes.func<PaginationItemRenderFn>(),
  locale: IxPropTypes.object<PaginationLocale>().isRequired,
  pageIndex: IxPropTypes.number.isRequired,
  pageSize: IxPropTypes.number.isRequired,
  showTitle: IxPropTypes.bool.isRequired,
  size: IxPropTypes.oneOf<PaginationSize>(['medium', 'small']).isRequired,
  total: IxPropTypes.number.def(0),
}

export type PaginationSimpleInnerProps = IxInnerPropTypes<typeof paginationSimpleProps>

export const paginationItemProps = {
  active: IxPropTypes.bool.def(false),
  disabled: IxPropTypes.bool.def(false),
  index: IxPropTypes.number,
  itemRender: IxPropTypes.func<PaginationItemRenderFn>(),
  locale: IxPropTypes.object<PaginationLocale>().isRequired,
  showTitle: IxPropTypes.bool.isRequired,
  type: IxPropTypes.oneOf<PaginationItemType>(['page', 'prev', 'next', 'prev5', 'next5']).isRequired,
}

export type PaginationItemInnerProps = IxInnerPropTypes<typeof paginationItemProps>

export const paginationJumperProps = {
  disabled: IxPropTypes.bool.isRequired,
  locale: IxPropTypes.object<PaginationLocale>().isRequired,
  pageIndex: IxPropTypes.number.isRequired,
  size: IxPropTypes.oneOf<PaginationSize>(['medium', 'small']).isRequired,
}

export type PaginationJumperInnerProps = IxInnerPropTypes<typeof paginationJumperProps>

export const paginationSizesProps = {
  disabled: IxPropTypes.bool.isRequired,
  locale: IxPropTypes.object<PaginationLocale>().isRequired,
  pageSize: IxPropTypes.number.isRequired,
  pageSizes: IxPropTypes.arrayOf(Number).isRequired,
  size: IxPropTypes.oneOf<PaginationSize>(['medium', 'small']).isRequired,
}

export type PaginationSizesInnerProps = IxInnerPropTypes<typeof paginationSizesProps>

export const paginationTotalProps = {
  locale: IxPropTypes.object<PaginationLocale>().isRequired,
  pageIndex: IxPropTypes.number.isRequired,
  pageSize: IxPropTypes.number.isRequired,
  total: IxPropTypes.number.isRequired,
  totalRender: IxPropTypes.func<PaginationTotalRenderFn>(),
}

export type PaginationTotalInnerProps = IxInnerPropTypes<typeof paginationTotalProps>
