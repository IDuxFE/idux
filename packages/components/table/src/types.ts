/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CSSProperties, DefineComponent, HTMLAttributes, VNodeTypes } from 'vue'
import type { BreakpointKey } from '@idux/cdk/breakpoint'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { EmptyProps } from '@idux/components/empty'
import type { HeaderProps } from '@idux/components/header'
import type { PaginationProps } from '@idux/components/pagination'
import type { SpinProps } from '@idux/components/spin'
import type { TableColumnMerged, TableColumnMergedExtra } from './composables/useColumns'

import { IxPropTypes } from '@idux/cdk/utils'

export const tableProps = {
  borderless: IxPropTypes.bool,
  columns: IxPropTypes.array<TableColumn<any>>().def(() => []),
  dataSource: IxPropTypes.array().def(() => []),
  empty: IxPropTypes.oneOfType<string | EmptyProps>([String, IxPropTypes.object()]),
  expandedRowKeys: IxPropTypes.array<Key>().def(() => []),
  extra: IxPropTypes.object<TableExtra>(),
  header: IxPropTypes.oneOfType([String, IxPropTypes.object<HeaderProps>()]),
  headless: IxPropTypes.bool,
  pagination: IxPropTypes.object<TablePagination | null>(),
  rowClassName: IxPropTypes.func<(record: unknown, index: number) => string>(),
  rowKey: IxPropTypes.oneOfType([String, IxPropTypes.func<(record: unknown) => number | string>()]),
  selectedRowKeys: IxPropTypes.array<Key>().def(() => []),
  scroll: IxPropTypes.object<TableScroll>(),
  size: IxPropTypes.oneOf<TableSize>(['large', 'medium', 'small']),
  spin: IxPropTypes.oneOfType([Boolean, IxPropTypes.object<SpinProps>()]),
  sticky: IxPropTypes.oneOfType([Boolean, IxPropTypes.object<TableSticky>()]),
  tableLayout: IxPropTypes.oneOf(['auto', 'fixed'] as const),
  tags: IxPropTypes.object<TableTags>(),

  // events
  'onUpdate:expandedRowKeys': IxPropTypes.emit<(keys: Key[]) => void>(),
  'onUpdate:selectedRowKeys': IxPropTypes.emit<(keys: Key[]) => void>(),
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
  rowSpan?: (record: T, index: number) => number
  fixed?: TableColumnFixed
  responsive?: BreakpointKey[]
  titleColSpan?: number
  width?: string | number
}

export interface TableColumnBase<T = unknown> extends TableColumnCommon<T> {
  dataKey?: Key | Key[]
  editable?: boolean
  ellipsis?: boolean
  key?: Key
  sortable?: TableColumnSortable<T>
  title?: string
  children?: TableColumn<T>[]
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
  childrenKey?: string
  customExpand?: string | TableColumnExpandableExpandFn<T>
  customIcon?: string | TableColumnExpandableIconFn<T>

  disabled?: (record: T, index: number) => boolean
  // remove ?
  icon?: [string, string]
  indent?: number
  trigger?: 'click' | 'dblclick'

  onChange?: (expendedRowKeys: Key[]) => void
  onExpand?: (expanded: boolean, record: T) => void
}

export type TableColumnExpandableExpandFn<T = unknown> = (options: { record: T; index: number }) => VNodeTypes
export type TableColumnExpandableIconFn<T = unknown> = (options: {
  expanded: boolean
  record: T
  onExpand: () => void
}) => VNodeTypes

export interface TableColumnSelectable<T = unknown> extends TableColumnCommon<T> {
  type: 'selectable'

  disabled?: (record: T) => boolean
  multiple?: boolean
  options?: ('all' | 'invert' | 'none' | 'pageInvert' | TableColumnSelectableOption)[]

  trigger?: 'click' | 'dblclick'

  onChange?: (selectedRowKeys: Key[], selectedRows: T[]) => void
  onSelect?: (selected: boolean, record: T) => void
  onSelectAll?: (selectedRowKeys: Key[]) => void
  onSelectInvert?: (selectedRowKeys: Key[]) => void
  onSelectNone?: () => void
  onSelectPageInvert?: (selectedRowKeys: Key[]) => void
}

export interface TableColumnSelectableOption {
  key: Key
  label: string
  onClick: (currentPageRowKeys: Key[]) => void
}

export interface TableExtra {
  dropdown?: (options: unknown) => VNodeTypes
  dropdownVisible?: boolean
  icon?: string
  options: unknown[]
  onDropDownVisibleChange: (visible: boolean) => void
}

export interface TablePagination extends PaginationProps {
  position?: TablePaginationPosition
}

export type TablePaginationPosition = 'topStart' | 'top' | 'topEnd' | 'bottomStart' | 'bottom' | 'bottomEnd'

export interface TableScroll {
  toTopOnChange?: boolean
  x?: string | number
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

export interface TableSticky {
  offsetHead?: number
  offsetFoot?: number
  offsetScroll?: number
  container?: Window | HTMLElement
}

export type Key = string | number

/** private components */
export const tableHeadRowProps = {
  columns: IxPropTypes.array<TableColumnMergedExtra>().isRequired,
}

export type TableHeadRowProps = IxInnerPropTypes<typeof tableHeadRowProps>

export const tableHeadCellProps = {
  additional: IxPropTypes.object(),
  ellipsis: IxPropTypes.bool,
  title: IxPropTypes.string,
  customTitle: IxPropTypes.oneOfType([String, IxPropTypes.func<TableColumnTitleFn>()]),
  type: IxPropTypes.oneOf(['expandable', 'selectable', 'scroll-bar'] as const),
}

export type TableHeadCellProps = IxInnerPropTypes<typeof tableHeadCellProps>

export const tableBodyRowProps = {
  columns: IxPropTypes.array<TableColumnMerged>().isRequired,
  expanded: IxPropTypes.bool.isRequired,
  index: IxPropTypes.number.isRequired,
  level: IxPropTypes.number.isRequired,
  record: IxPropTypes.any.isRequired,
  rowKey: IxPropTypes.oneOfType([String, Number]).isRequired,
}

export type TableBodyRowProps = IxInnerPropTypes<typeof tableBodyRowProps>

export const tableBodyCellProps = {
  additional: IxPropTypes.object(),
  dataKey: IxPropTypes.oneOfType([String, Number, IxPropTypes.array<Key>()]),
  ellipsis: IxPropTypes.bool,
  index: IxPropTypes.number.isRequired,
  record: IxPropTypes.any.isRequired,
  customRender: IxPropTypes.oneOfType([String, IxPropTypes.func<TableColumnRenderFn>()]),

  type: IxPropTypes.oneOf(['expandable', 'selectable'] as const),
  disabled: IxPropTypes.bool,

  expanded: IxPropTypes.bool,
  handleExpend: IxPropTypes.func<() => void>(),

  selected: IxPropTypes.bool,
  indeterminate: IxPropTypes.bool,
  handleSelect: IxPropTypes.func<() => void>(),
}

export type TableBodyCellProps = IxInnerPropTypes<typeof tableBodyCellProps>

export const tableMeasureCellProps = {
  cellKey: IxPropTypes.oneOfType([String, Number]).isRequired,
  changeColumnWidth: IxPropTypes.func<(key: Key, width: number | false) => void>().isRequired,
}

export type TableMeasureCellProps = IxInnerPropTypes<typeof tableMeasureCellProps>
