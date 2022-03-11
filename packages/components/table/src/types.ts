/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { type DefineComponent, FunctionalComponent, type HTMLAttributes, type VNodeChild, type VNodeTypes } from 'vue'

import { type BreakpointKey } from '@idux/cdk/breakpoint'
import { type VirtualScrollToFn } from '@idux/cdk/scroll'
import { type ExtractInnerPropTypes, type ExtractPublicPropTypes, IxPropTypes, type VKey } from '@idux/cdk/utils'
import { type EmptyProps } from '@idux/components/empty'
import { type HeaderProps } from '@idux/components/header'
import { type MenuClickOptions, type MenuData } from '@idux/components/menu'
import { type PaginationProps } from '@idux/components/pagination'
import { type SpinProps } from '@idux/components/spin'

import { type TableColumnMerged, type TableColumnMergedExtra } from './composables/useColumns'
import { type FlattedData } from './composables/useDataSource'

export const tableProps = {
  expandedRowKeys: IxPropTypes.array<VKey>(),
  selectedRowKeys: IxPropTypes.array<VKey>(),
  borderless: IxPropTypes.bool,
  childrenKey: IxPropTypes.string.def('children'),
  columns: IxPropTypes.array<TableColumn<any>>().def(() => []),
  dataSource: IxPropTypes.array().def(() => []),
  ellipsis: IxPropTypes.bool.def(false),
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
  'onUpdate:expandedRowKeys': IxPropTypes.emit<(keys: VKey[]) => void>(),
  'onUpdate:selectedRowKeys': IxPropTypes.emit<(keys: VKey[]) => void>(),
  onScroll: IxPropTypes.emit<(evt: Event) => void>(),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onScrolledChange: IxPropTypes.emit<(startIndex: number, endIndex: number, visibleData: any[]) => void>(),
  onScrolledBottom: IxPropTypes.emit<() => void>(),
}

export type TableProps = ExtractInnerPropTypes<typeof tableProps>
export type TablePublicProps = ExtractPublicPropTypes<typeof tableProps>
export interface TableBindings {
  scrollTo: VirtualScrollToFn
}
export type TableComponent = DefineComponent<
  Omit<HTMLAttributes, keyof TablePublicProps> & TablePublicProps,
  TableBindings
>
export type TableInstance = InstanceType<DefineComponent<TableProps, TableBindings>>

export type TableColumnComponent = FunctionalComponent<
  Omit<HTMLAttributes, keyof TableColumnBase | keyof TableColumnExpandable | keyof TableColumnSelectable> & TableColumn
>

export type TableColumn<T = any, V = any> =
  | TableColumnBase<T, V>
  | TableColumnExpandable<T, V>
  | TableColumnSelectable<T>

export interface TableColumnCommon<T = any> {
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

export interface TableColumnBase<T = any, V = any> extends TableColumnCommon<T> {
  dataKey?: VKey | VKey[]
  editable?: boolean
  ellipsis?: boolean
  key?: VKey
  sortable?: TableColumnSortable<T>
  filterable?: TableColumnFilterable<T>
  title?: string
  children?: TableColumn<T>[]

  /**
   * @deprecated please use `customCell` instead'
   */
  customRender?: string | ((data: { value: V; record: T; rowIndex: number }) => VNodeChild)
  customCell?: string | ((data: { value: V; record: T; rowIndex: number }) => VNodeChild)
  customTitle?: string | ((data: { title?: string }) => VNodeChild)
}

export interface TableColumnExpandable<T = any, V = any> extends TableColumnCommon<T> {
  type: 'expandable'
  dataKey?: VKey | VKey[]
  disabled?: (record: T) => boolean
  editable?: boolean
  ellipsis?: boolean
  key?: VKey
  icon?: string
  indent?: number
  title?: string
  trigger?: 'click' | 'dblclick'

  onChange?: (expendedRowKeys: VKey[]) => void
  onExpand?: (expanded: boolean, record: T) => void

  customCell?: string | ((data: { value: V; record: T; rowIndex: number }) => VNodeChild)
  customTitle?: string | ((data: { title?: string }) => VNodeChild)
  customExpand?: string | ((data: { record: T; rowIndex: number }) => VNodeChild)
  customIcon?: string | ((data: { expanded: boolean; record: T }) => VNodeChild)
}

export interface TableColumnSelectable<T = any> extends TableColumnCommon<T> {
  type: 'selectable'

  disabled?: (record: T) => boolean
  multiple?: boolean
  menus?: ('all' | 'invert' | 'none' | 'pageInvert' | MenuData)[]
  trigger?: 'click' | 'dblclick'

  onChange?: (selectedRowKeys: VKey[], selectedRows: T[]) => void
  onMenuClick?: (options: MenuClickOptions, currentPageRowKeys: VKey[]) => void
  onSelect?: (selected: boolean, record: T) => void
  onSelectAll?: (selectedRowKeys: VKey[]) => void
  onSelectInvert?: (selectedRowKeys: VKey[]) => void
  onSelectNone?: () => void
  onSelectPageInvert?: (selectedRowKeys: VKey[]) => void
}

export interface TablePagination extends PaginationProps {
  position?: TablePaginationPosition
}

export type TablePaginationPosition = 'topStart' | 'top' | 'topEnd' | 'bottomStart' | 'bottom' | 'bottomEnd'

export interface TableScroll {
  width?: string | number
  height?: string | number
  fullHeight?: boolean
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

export interface TableColumnSortable<T = any> {
  nextTooltip?: boolean
  orderBy?: TableColumnSortOrder
  orders?: TableColumnSortOrder[]
  sorter?: (curr: T, next: T) => number
  onChange?: (currOrderBy?: TableColumnSortOrder) => void
}

export interface TableColumnFilterable<T = any> {
  filter?: (currFilterBy: VKey[], record: T) => boolean
  filterBy?: VKey[]
  footer?: boolean
  menus: MenuData[]
  multiple?: boolean
  onChange?: (currFilterBy: VKey[]) => void

  customTrigger?: string | (() => VNodeChild)
  customMenu?: string | (() => VNodeChild)
}

export interface TableSticky {
  offsetHead?: number
  offsetFoot?: number
  offsetScroll?: number
  container?: Window | HTMLElement
}

/** private components */
export const tableHeadRowProps = {
  columns: IxPropTypes.array<TableColumnMergedExtra>().isRequired,
}

export type TableHeadRowProps = ExtractInnerPropTypes<typeof tableHeadRowProps>

export const tableHeadCellProps = {
  column: IxPropTypes.object<TableColumnMerged>().isRequired,
}

export type TableHeadCellProps = ExtractInnerPropTypes<typeof tableHeadCellProps>

export const tableBodyRowProps = {
  expanded: IxPropTypes.bool,
  rowIndex: IxPropTypes.number.isRequired,
  level: IxPropTypes.number,
  record: IxPropTypes.any.isRequired,
  rowData: IxPropTypes.object<FlattedData>().isRequired,
  rowKey: IxPropTypes.oneOfType([String, Number, Symbol]).isRequired,
}

export type TableBodyRowProps = ExtractInnerPropTypes<typeof tableBodyRowProps>

export const tableBodyCellProps = {
  column: IxPropTypes.object<TableColumnMerged>().isRequired,
  colIndex: IxPropTypes.number.isRequired,
  level: IxPropTypes.number,
  record: IxPropTypes.any.isRequired,
  rowIndex: IxPropTypes.number.isRequired,
  disabled: IxPropTypes.bool,
  expanded: IxPropTypes.bool,
  handleExpend: IxPropTypes.func<() => void>(),
  selected: IxPropTypes.bool,
  indeterminate: IxPropTypes.bool,
  handleSelect: IxPropTypes.func<() => void>(),
}

export type TableBodyCellProps = ExtractInnerPropTypes<typeof tableBodyCellProps>

export const tableMeasureCellProps = {
  cellKey: IxPropTypes.oneOfType([String, Number, Symbol]).isRequired,
  changeColumnWidth: IxPropTypes.func<(key: VKey, width: number | false) => void>().isRequired,
}

export type TableMeasureCellProps = ExtractInnerPropTypes<typeof tableMeasureCellProps>

export const tableFilterableTriggerProps = {
  activeFilterBy: IxPropTypes.array<VKey>().isRequired,
  filterable: IxPropTypes.object<TableColumnFilterable>().isRequired,
  onUpdateFilterBy: IxPropTypes.func<(filterBy: VKey[]) => void>().isRequired,
}

export type TableFilterableTriggerProps = ExtractInnerPropTypes<typeof tableFilterableTriggerProps>

export const tableSortableTriggerProps = {
  activeFilterBy: IxPropTypes.array<VKey>().isRequired,
  filterable: IxPropTypes.object<TableColumnFilterable>().isRequired,
  onUpdateFilterBy: IxPropTypes.func<(filterBy: VKey[]) => void>().isRequired,
}

export type TableSortableTriggerProps = ExtractInnerPropTypes<typeof tableSortableTriggerProps>
