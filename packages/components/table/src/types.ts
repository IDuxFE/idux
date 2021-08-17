/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CSSProperties, DefineComponent, HTMLAttributes, VNodeTypes } from 'vue'
import type { BreakpointKey } from '@idux/cdk/breakpoint'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { EmptyProps } from '@idux/components/empty'
import type { PaginationProps } from '@idux/components/pagination'
import type { SpinProps } from '@idux/components/spin'
import type { TableColumnMerged } from './composables/useColumns'

import { IxPropTypes } from '@idux/cdk/utils'

export const tableProps = {
  borderless: IxPropTypes.bool,
  columns: IxPropTypes.array<TableColumn>().isRequired,
  dataSource: IxPropTypes.array().isRequired,
  empty: IxPropTypes.oneOfType<string | EmptyProps>([String, IxPropTypes.object()]),
  expandedRowKeys: IxPropTypes.array<string | number>(),
  extra: IxPropTypes.object<TableExtra>(),
  headless: IxPropTypes.bool,
  pagination: IxPropTypes.object<TablePagination | null>(),
  rowClassName: IxPropTypes.func<(record: unknown, index: number) => string>(),
  rowKey: IxPropTypes.oneOfType([String, IxPropTypes.func<(record: unknown) => number | string>()]),
  selectedRowKeys: IxPropTypes.array<string | number>(),
  scroll: IxPropTypes.object<TableScroll>(),
  size: IxPropTypes.oneOf<TableSize>(['large', 'medium', 'small']),
  spin: IxPropTypes.oneOfType([Boolean, IxPropTypes.object<SpinProps>()]),
  tableLayout: IxPropTypes.oneOf(['auto', 'fixed'] as const),
  tags: IxPropTypes.object<TableTags>(),

  // events
  'onUpdate:expandedRowKeys': IxPropTypes.emit<(keys: (string | number)[]) => void>(),
  'onUpdate:selectedRowKeys': IxPropTypes.emit<(keys: (string | number)[]) => void>(),
}

export type TableProps = IxInnerPropTypes<typeof tableProps>
export type TablePublicProps = IxPublicPropTypes<typeof tableProps>
export type TableComponent = DefineComponent<HTMLAttributes & typeof tableProps>
export type TableInstance = InstanceType<DefineComponent<TableProps>>

export type TableColumn<T = unknown> = TableColumnBase<T> | TableColumnExpandable<T> | TableColumnSelectable<T>

export interface TableColumnCommon<T = unknown> {
  additional?: {
    class?: any
    style?: CSSProperties
    [key: string]: unknown
  }
  align?: TableColumnAlign
  colSpan?: (record: T, index: number) => number
  fixed?: TableColumnFixed
  rowSpan?: (record: T, index: number) => number
  titleColSpan?: number
  width?: string | number
}

export interface TableColumnBase<T = unknown> extends TableColumnCommon<T> {
  dataKey?: string | number | (string | number)[]
  editable?: boolean
  ellipsis?: boolean
  key?: string | number
  responsive?: BreakpointKey[]
  sortable?: TableColumnSortable<T>
  title?: string

  children?: TableColumnBase<T>[]

  customRender?: string | TableColumnRenderFn<any, T>
  customTitle?: string | TableColumnTitleFn
}

export interface TableColumnRenderOption<V = any, T = unknown> {
  value: V
  record: T
  index: number
}
export type TableColumnRenderFn<V = any, T = unknown> = (options: TableColumnRenderOption<V, T>) => VNodeTypes
export type TableColumnTitleFn = (options: { title?: string }) => VNodeTypes

export interface TableColumnExpandable<T = unknown> extends TableColumnCommon<T> {
  type: 'expandable'

  enabled?: (record: T, index: number) => boolean
  icon?: [string, string]
  indent?: number
  responsive?: BreakpointKey[]
  trigger?: 'click' | 'dblclick'

  onChange?: (expendedRowKeys: (string | number)[]) => void
  onExpand?: (expanded: boolean, record: T) => void

  customExpand?: string | TableColumnExpandableExpandFn<T>
  customIcon?: string | TableColumnExpandableIconFn<T>
}

export type TableColumnExpandableExpandFn<T = unknown> = (options: { record: T; index: number }) => VNodeTypes
export type TableColumnExpandableIconFn<T = unknown> = (options: {
  expanded: boolean
  record: T
  onExpand: () => void
}) => VNodeTypes

export interface TableColumnSelectable<T = unknown> extends TableColumnCommon<T> {
  type: 'selectable'

  enabled?: (record: T, index: number) => boolean
  multiple?: boolean
  options?: TableColumnSelectableOption[]
  responsive?: BreakpointKey[]
  trigger?: 'click' | 'dblclick'

  onChange?: (selectedRowKeys: (string | number)[]) => void
  onSelect?: (selected: boolean, record: T) => void
  onSelectAll?: (selectedRowKeys: (string | number)[]) => void
  onSelectInvert?: (selectedRowKeys: (string | number)[]) => void
  onSelectNone?: () => void

  customTitle?: string | TableColumnTitleFn
}

export interface TableColumnSelectableOption {
  key: string | number
  text: string
  onClick: (selectedRowKeys: (string | number)[]) => void
}

export interface TableExtra {
  dropdown?: (options: unknown) => VNodeTypes
  dropdownVisible?: boolean
  icon?: string
  options: unknown[]
  onDropDownVisibleChange: (visible: boolean) => void
}

export interface TablePagination extends PaginationProps {
  position: TablePaginationPosition
}

export type TablePaginationPosition = 'topStart' | 'top' | 'topEnd' | 'bottomStart' | 'bottom' | 'bottomEnd'

export interface TableScroll {
  toTopOnChange?: boolean
  x?: string | number | boolean
  y?: string | number
}

export type TableSize = 'large' | 'medium' | 'small'

export interface TableTags {
  table?: VNodeTypes
  head?: VNodeTypes
  headRow?: VNodeTypes
  headCol?: VNodeTypes
  body?: VNodeTypes
  bodyRow?: VNodeTypes
  bodyCol?: VNodeTypes
}

export type TableColumnAlign = 'start' | 'center' | 'end'

export type TableColumnFixed = 'start' | 'end'

export type TableColumnSortOrder = 'ascend' | 'descend' | null

export interface TableColumnSortable<T = unknown> {
  directions?: TableColumnSortOrder[]
  order?: TableColumnSortOrder
  showTooltip?: boolean
  onSort: (curr: T, next: T) => number
}

/** private components */
export const tableCommonColProps = {
  additional: IxPropTypes.object(),
  align: IxPropTypes.oneOf<TableColumnAlign>(['start', 'center', 'end']),
  colSpan: IxPropTypes.number,
  rowSpan: IxPropTypes.number,
}

export const tableHeadRowProps = {
  cols: IxPropTypes.array<TableColumnMerged>().isRequired,
}

export type TableHeadRowProps = IxInnerPropTypes<typeof tableHeadRowProps>

export const tableHeadColProps = {
  ...tableCommonColProps,

  colStart: IxPropTypes.number,
  colEnd: IxPropTypes.number,
  ellipsis: IxPropTypes.bool,
  title: IxPropTypes.string,

  customTitle: IxPropTypes.oneOfType([String, IxPropTypes.func<TableColumnTitleFn>()]),
}

export type TableHeadColProps = IxInnerPropTypes<typeof tableHeadColProps>

export const tableHeadColExpandProps = {
  ...tableCommonColProps,
}

export type TableHeadColExpandProps = IxInnerPropTypes<typeof tableHeadColExpandProps>

export const tableBodyRowProps = {
  expanded: IxPropTypes.bool.isRequired,
  index: IxPropTypes.number.isRequired,
  level: IxPropTypes.number.isRequired,
  record: IxPropTypes.any.isRequired,
  rowKey: IxPropTypes.oneOfType([String, Number]).isRequired,
}

export type TableBodyRowProps = IxInnerPropTypes<typeof tableBodyRowProps>

export const tableBodyColProps = {
  ...tableCommonColProps,

  dataKey: IxPropTypes.oneOfType([String, Number, IxPropTypes.array<string | number>()]),
  ellipsis: IxPropTypes.bool,
  index: IxPropTypes.number.isRequired,
  record: IxPropTypes.any.isRequired,

  customRender: IxPropTypes.oneOfType([String, IxPropTypes.func<TableColumnRenderFn>()]),
}

export type TableBodyColProps = IxInnerPropTypes<typeof tableBodyColProps>

export const tableBodyColExpandProps = {
  ...tableCommonColProps,
  expanded: IxPropTypes.bool.isRequired,
  icon: IxPropTypes.arrayOf(String).isRequired,
  index: IxPropTypes.number.isRequired,
  handleExpend: IxPropTypes.func<() => void>().isRequired,
  record: IxPropTypes.any.isRequired,

  customIcon: IxPropTypes.oneOfType([String, IxPropTypes.func<TableColumnExpandableIconFn>()]),
}

export type TableBodyColExpandProps = IxInnerPropTypes<typeof tableBodyColExpandProps>
