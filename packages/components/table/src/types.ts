/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { TableColumnMerged, TableColumnMergedExtra } from './composables/useColumns'
import type { BreakpointKey } from '@idux/cdk/breakpoint'
import type { VirtualScrollToFn } from '@idux/cdk/scroll'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { EmptyProps } from '@idux/components/empty'
import type { HeaderProps } from '@idux/components/header'
import type { PaginationProps } from '@idux/components/pagination'
import type { SpinProps } from '@idux/components/spin'
import type { DefineComponent, HTMLAttributes, VNodeTypes } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

import { FlattedData } from './composables/useDataSource'

export const tableProps = {
  expandedRowKeys: IxPropTypes.array<Key>(),
  selectedRowKeys: IxPropTypes.array<Key>(),

  expandedAllStatus: IxPropTypes.bool,

  borderless: IxPropTypes.bool,
  childrenKey: IxPropTypes.string.def('children'),
  columns: IxPropTypes.array<TableColumn<any>>().def(() => []),
  dataSource: IxPropTypes.array().def(() => []),
  empty: IxPropTypes.oneOfType<string | EmptyProps>([String, IxPropTypes.object()]),
  header: IxPropTypes.oneOfType([String, IxPropTypes.object<HeaderProps>()]),
  headless: IxPropTypes.bool,
  pagination: IxPropTypes.oneOfType([Boolean, IxPropTypes.object<TablePagination>()]),
  rowClassName: IxPropTypes.func<(record: unknown, rowIndex: number) => string>(),
  rowKey: IxPropTypes.oneOfType([String, IxPropTypes.func<(record: unknown) => number | string>()]),
  scroll: IxPropTypes.object<TableScroll>(),
  size: IxPropTypes.oneOf<TableSize>(['lg', 'md', 'sm']),
  spin: IxPropTypes.oneOfType([Boolean, IxPropTypes.object<SpinProps>()]),
  sticky: IxPropTypes.oneOfType([Boolean, IxPropTypes.object<TableSticky>()]),
  tableLayout: IxPropTypes.oneOf(['auto', 'fixed'] as const),
  tags: IxPropTypes.object<TableTags>(),
  virtual: IxPropTypes.bool.def(false),

  // events
  'onUpdate:expandedRowKeys': IxPropTypes.emit<(keys: Key[]) => void>(),
  'onUpdate:selectedRowKeys': IxPropTypes.emit<(keys: Key[]) => void>(),
  onScroll: IxPropTypes.emit<(evt: Event) => void>(),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onScrolledChange: IxPropTypes.emit<(startIndex: number, endIndex: number, visibleData: any[]) => void>(),
  onScrolledBottom: IxPropTypes.emit<() => void>(),
}

export type TableProps = IxInnerPropTypes<typeof tableProps>
export type TablePublicProps = IxPublicPropTypes<typeof tableProps>
export interface TableBindings {
  scrollTo: VirtualScrollToFn
}
export type TableComponent = DefineComponent<
  Omit<HTMLAttributes, keyof TablePublicProps> & TablePublicProps,
  TableBindings
>
export type TableInstance = InstanceType<DefineComponent<TableProps, TableBindings>>

export type TableColumn<T = unknown, V = any> =
  | TableColumnBase<T, V>
  | TableColumnExpandable<T, V>
  | TableColumnSelectable<T>

export interface TableColumnCommon<T = unknown> {
  additional?: {
    class?: any
    style?: any
    [key: string]: unknown
  }
  align?: TableColumnAlign
  colSpan?: (record: T, rowIndex: number) => number
  rowSpan?: (record: T, rowIndex: number) => number
  fixed?: TableColumnFixed
  responsive?: BreakpointKey[]
  titleColSpan?: number
  width?: string | number
}

export interface TableColumnBase<T = unknown, V = any> extends TableColumnCommon<T> {
  dataKey?: Key | Key[]
  editable?: boolean
  ellipsis?: boolean
  key?: Key
  sortable?: TableColumnSortable<T>
  filterable?: TableColumnFilterable<T, V>
  title?: string
  children?: TableColumn<T>[]
  customRender?: string | TableColumnRenderFn<any, T>
  customTitle?: string | TableColumnTitleFn
}

export interface TableColumnRenderOption<V = any, T = unknown> {
  value: V
  record: T
  rowIndex: number
}
export type TableColumnRenderFn<V = any, T = unknown> = (options: TableColumnRenderOption<V, T>) => VNodeTypes
export type TableColumnTitleFn = (options: { title?: string }) => VNodeTypes

export interface TableColumnExpandable<T = unknown, V = any> extends TableColumnBase<T, V> {
  type: 'expandable'
  customExpand?: string | TableColumnExpandableExpandFn<T>
  customIcon?: string | TableColumnExpandableIconFn<T>

  disabled?: (record: T) => boolean
  // remove ?
  icon?: [string, string]
  indent?: number
  trigger?: 'click' | 'dblclick'

  onChange?: (expendedRowKeys: Key[]) => void
  onExpand?: (expanded: boolean, record: T) => void
}

export type TableColumnExpandableExpandFn<T = unknown> = (options: { record: T; rowIndex: number }) => VNodeTypes
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

export interface TablePagination extends PaginationProps {
  position?: TablePaginationPosition
}

export type TablePaginationPosition = 'topStart' | 'top' | 'topEnd' | 'bottomStart' | 'bottom' | 'bottomEnd'

export interface TableScroll {
  toTopOnChange?: boolean
  x?: string | number
  y?: string | number
}

export type TableSize = 'lg' | 'md' | 'sm'

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

export type TableColumnSortOrder = 'ascend' | 'descend'

export interface TableColumnSortable<T = unknown> {
  nextTooltip?: boolean
  orderBy?: TableColumnSortOrder
  orders?: TableColumnSortOrder[]
  sorter?: (curr: T, next: T) => number
  onChange?: (currOrderBy?: TableColumnSortOrder) => void
}

export interface TableColumnFilter<V = unknown> {
  text: string
  value: V
}

export interface TableColumnFilterable<T = unknown, V = any> {
  filters: TableColumnFilter<V>[]
  filterBy?: V[]
  filter: (currFilterBy: V[], record: T) => boolean
  onChange?: (currFilterBy: V[]) => void
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
  column: IxPropTypes.object<TableColumnMerged>().isRequired,
}

export type TableHeadCellProps = IxInnerPropTypes<typeof tableHeadCellProps>

export const tableBodyRowProps = {
  expanded: IxPropTypes.bool.isRequired,
  rowIndex: IxPropTypes.number.isRequired,
  level: IxPropTypes.number.isRequired,
  record: IxPropTypes.any.isRequired,
  rowData: IxPropTypes.object<FlattedData>().isRequired,
  rowKey: IxPropTypes.oneOfType([String, Number]).isRequired,
}

export type TableBodyRowProps = IxInnerPropTypes<typeof tableBodyRowProps>

export const tableBodyCellProps = {
  column: IxPropTypes.object<TableColumnMerged>().isRequired,
  colIndex: IxPropTypes.number.isRequired,
  level: IxPropTypes.number.isRequired,
  record: IxPropTypes.any.isRequired,
  rowIndex: IxPropTypes.number.isRequired,
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

export const tableFilterPanelProps = {
  filterable: IxPropTypes.object<TableColumnFilterable>().isRequired,
}

export type TableFilterPanelProps = IxInnerPropTypes<typeof tableFilterPanelProps>

export const tableHeadCellFilterableTriggerProps = tableFilterPanelProps
export type TableHeadCellFilterableTriggerProps = TableFilterPanelProps
