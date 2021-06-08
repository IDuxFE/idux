import type { DefineComponent } from 'vue'
import type {
  PaginationItemRenderFn,
  PaginationItemType,
  PaginationSize,
  PaginationTotalRenderFn,
} from '@idux/components/config'
import type { PaginationLocale } from '@idux/components/i18n'

import { IxExtractPropTypes, IxPropTypes } from '@idux/cdk/utils'

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

export type PaginationProps = IxExtractPropTypes<typeof paginationProps>

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

export type PaginationDefaultProps = IxExtractPropTypes<typeof paginationDefaultProps>

export type PaginationDefaultInstance = InstanceType<DefineComponent<PaginationDefaultProps>>

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

export type PaginationSimpleProps = IxExtractPropTypes<typeof paginationSimpleProps>

export type PaginationSimpleInstance = InstanceType<DefineComponent<PaginationSimpleProps>>

export const paginationItemProps = {
  active: IxPropTypes.bool.def(false),
  disabled: IxPropTypes.bool.def(false),
  index: IxPropTypes.number,
  itemRender: IxPropTypes.func<PaginationItemRenderFn>(),
  locale: IxPropTypes.object<PaginationLocale>().isRequired,
  showTitle: IxPropTypes.bool.isRequired,
  type: IxPropTypes.oneOf<PaginationItemType>(['page', 'prev', 'next', 'prev5', 'next5']).isRequired,
}

export type PaginationItemProps = IxExtractPropTypes<typeof paginationItemProps>

export type PaginationItemInstance = InstanceType<DefineComponent<PaginationItemProps>>

export const paginationJumperProps = {
  disabled: IxPropTypes.bool.isRequired,
  locale: IxPropTypes.object<PaginationLocale>().isRequired,
  pageIndex: IxPropTypes.number.isRequired,
  size: IxPropTypes.oneOf<PaginationSize>(['medium', 'small']).isRequired,
}

export type PaginationJumperProps = IxExtractPropTypes<typeof paginationJumperProps>

export type PaginationJumperInstance = InstanceType<DefineComponent<PaginationJumperProps>>

export const paginationSizesProps = {
  disabled: IxPropTypes.bool.isRequired,
  locale: IxPropTypes.object<PaginationLocale>().isRequired,
  pageSize: IxPropTypes.number.isRequired,
  pageSizes: IxPropTypes.arrayOf(Number).isRequired,
  size: IxPropTypes.oneOf<PaginationSize>(['medium', 'small']).isRequired,
}

export type PaginationSizesProps = IxExtractPropTypes<typeof paginationSizesProps>

export type PaginationSizesInstance = InstanceType<DefineComponent<PaginationSizesProps>>

export const paginationTotalProps = {
  locale: IxPropTypes.object<PaginationLocale>().isRequired,
  pageIndex: IxPropTypes.number.isRequired,
  pageSize: IxPropTypes.number.isRequired,
  total: IxPropTypes.number.isRequired,
  totalRender: IxPropTypes.func<PaginationTotalRenderFn>(),
}

export type PaginationTotalProps = IxExtractPropTypes<typeof paginationTotalProps>

export type PaginationTotalInstance = InstanceType<DefineComponent<PaginationTotalProps>>
