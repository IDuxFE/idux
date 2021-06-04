import type { DefineComponent } from 'vue'
import type {
  PaginationItemRenderFn,
  PaginationItemType,
  PaginationSize,
  PaginationTotalRenderFn,
} from '@idux/components/config'
import type { PaginationLocale } from '@idux/components/i18n'

import { object } from 'vue-types'
import { PropTypes } from '@idux/cdk/utils'

export interface PaginationProps {
  pageIndex: number
  pageSize?: number
  disabled: boolean
  itemRender?: PaginationItemRenderFn
  pageSizes?: number[]
  showQuickJumper?: boolean
  showSizeChanger?: boolean
  showTitle?: boolean
  showTotal?: boolean
  simple?: boolean
  size?: PaginationSize
  total: number
  totalRender?: PaginationTotalRenderFn
}

export const paginationPropsDef = {
  pageIndex: PropTypes.number.def(1),
  pageSize: PropTypes.number,
  disabled: PropTypes.bool.def(false),
  itemRender: PropTypes.func,
  pageSizes: PropTypes.arrayOf(PropTypes.number),
  showQuickJumper: PropTypes.bool,
  showSizeChanger: PropTypes.bool,
  showTitle: PropTypes.bool,
  showTotal: PropTypes.bool,
  simple: PropTypes.bool,
  size: PropTypes.oneOf(['medium', 'small'] as const),
  total: PropTypes.number.def(0),
  totalRender: PropTypes.func,
}

export type PaginationInstance = InstanceType<DefineComponent<PaginationProps>>

export interface PaginationDefaultProps {
  disabled: boolean
  itemRender?: PaginationItemRenderFn
  locale: PaginationLocale
  pageIndex: number
  pageSize: number
  pageSizes: number[]
  showQuickJumper: boolean
  showSizeChanger?: boolean
  showTitle: boolean
  size: PaginationSize
  total: number
}

export const paginationDefaultPropsDef = {
  disabled: PropTypes.bool.isRequired,
  itemRender: PropTypes.func,
  locale: object<PaginationLocale>().isRequired,
  pageIndex: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
  showQuickJumper: PropTypes.bool.isRequired,
  showSizeChanger: PropTypes.bool.isRequired,
  showTitle: PropTypes.bool.isRequired,
  size: PropTypes.oneOf(['medium', 'small'] as const).isRequired,
  total: PropTypes.number.def(0),
}

export interface PaginationSimpleProps {
  disabled: boolean
  itemRender?: PaginationItemRenderFn
  locale: PaginationLocale
  pageIndex: number
  pageSize: number
  showTitle: boolean
  size: PaginationSize
  total: number
}

export const paginationSimplePropsDef = {
  disabled: PropTypes.bool.isRequired,
  itemRender: PropTypes.func,
  locale: object<PaginationLocale>().isRequired,
  pageIndex: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  showTitle: PropTypes.bool.isRequired,
  size: PropTypes.oneOf(['medium', 'small'] as const).isRequired,
  total: PropTypes.number.def(0),
}

export interface PaginationItemProps {
  active: boolean
  disabled: boolean
  index?: number
  itemRender?: PaginationItemRenderFn
  locale: PaginationLocale
  showTitle: boolean
  type: PaginationItemType
}

export const paginationItemPropsDef = {
  active: PropTypes.bool.def(false),
  disabled: PropTypes.bool.def(false),
  index: PropTypes.number,
  itemRender: PropTypes.func,
  locale: object<PaginationLocale>().isRequired,
  showTitle: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(['page', 'prev', 'next', 'prev5', 'next5'] as const).isRequired,
}

export interface PaginationJumperProps {
  disabled: boolean
  locale: PaginationLocale
  pageIndex: number
  size: PaginationSize
}

export const paginationJumperPropsDef = {
  disabled: PropTypes.bool.isRequired,
  locale: object<PaginationLocale>().isRequired,
  pageIndex: PropTypes.number.isRequired,
  size: PropTypes.oneOf(['medium', 'small'] as const).isRequired,
}

export interface PaginationSizesProps {
  disabled: boolean
  locale: PaginationLocale
  pageSize: number
  pageSizes: number[]
  size: PaginationSize
}

export const paginationSizesDef = {
  disabled: PropTypes.bool.isRequired,
  locale: object<PaginationLocale>().isRequired,
  pageSize: PropTypes.number.isRequired,
  pageSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
  size: PropTypes.oneOf(['medium', 'small'] as const).isRequired,
}

export interface PaginationTotalProps {
  locale: PaginationLocale
  pageIndex: number
  pageSize: number
  total: number
  totalRender?: PaginationTotalRenderFn
}

export const paginationTotalDef = {
  locale: object<PaginationLocale>().isRequired,
  pageIndex: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  totalRender: PropTypes.func,
}
