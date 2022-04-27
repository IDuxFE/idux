/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { type DefineComponent, FunctionalComponent, type HTMLAttributes, type PropType, type VNodeChild } from 'vue'

import { type BreakpointKey } from '@idux/cdk/breakpoint'
import { type VirtualScrollToFn } from '@idux/cdk/scroll'
import { type ExtractInnerPropTypes, type ExtractPublicPropTypes, type MaybeArray, type VKey } from '@idux/cdk/utils'
import { type EmptyProps } from '@idux/components/empty'
import { type HeaderProps } from '@idux/components/header'
import { type MenuClickOptions, type MenuData } from '@idux/components/menu'
import { type PaginationProps } from '@idux/components/pagination'
import { type SpinProps } from '@idux/components/spin'

import { type TableColumnMerged, type TableColumnMergedExtra } from './composables/useColumns'
import { type FlattedData } from './composables/useDataSource'

export const tableProps = {
  expandedRowKeys: { type: Array as PropType<VKey[]>, default: undefined },
  selectedRowKeys: { type: Array as PropType<VKey[]>, default: undefined },

  autoHeight: { type: Boolean, default: undefined },
  borderless: { type: Boolean, default: undefined },
  childrenKey: { type: String, default: undefined },
  columns: { type: Array as PropType<TableColumn[]>, default: () => [] },
  customAdditional: { type: Object as PropType<TableCustomAdditional>, default: undefined },
  dataSource: { type: Array as PropType<any[]>, default: () => [] },
  ellipsis: { type: Boolean, default: false },
  empty: { type: [String, Object] as PropType<string | EmptyProps>, default: undefined },
  getKey: { type: [String, Function] as PropType<string | ((record: any) => VKey)>, default: undefined },
  header: { type: [String, Object] as PropType<string | HeaderProps>, default: undefined },
  headless: { type: Boolean, default: undefined },
  pagination: { type: [Boolean, Object] as PropType<boolean | TablePagination>, default: undefined },
  /**
   * @deprecated please use `customAdditional` instead'
   */
  rowClassName: { type: Function as PropType<(record: any, rowIndex: number) => string>, default: undefined },
  /**
   * @deprecated please use `getKey` instead'
   */
  rowKey: { type: [String, Function] as PropType<string | ((record: any) => VKey)>, default: undefined },
  scroll: { type: Object as PropType<TableScroll>, default: undefined },
  size: { type: String as PropType<TableSize>, default: undefined },
  spin: { type: [Boolean, Object] as PropType<boolean | SpinProps>, default: undefined },
  sticky: { type: [Boolean, Object] as PropType<boolean | TableSticky>, default: undefined },
  tableLayout: { type: String as PropType<'auto' | 'fixed'>, default: undefined },
  virtual: { type: Boolean, default: false },

  // events
  'onUpdate:expandedRowKeys': [Function, Array] as PropType<MaybeArray<(keys: VKey[]) => void>>,
  'onUpdate:selectedRowKeys': [Function, Array] as PropType<MaybeArray<(keys: VKey[]) => void>>,
  onScroll: [Function, Array] as PropType<MaybeArray<(evt: Event) => void>>,
  onScrolledChange: [Function, Array] as PropType<
    MaybeArray<(startIndex: number, endIndex: number, visibleData: any[]) => void>
  >,
  onScrolledBottom: [Function, Array] as PropType<MaybeArray<() => void>>,
} as const

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
  /**
   * @deprecated please use `customAdditional` instead'
   */
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

export interface TableCustomAdditional<T = any> {
  bodyCell?: (data: { column: TableColumn<T>; record: T; rowIndex: number }) => Record<string, any> | undefined
  bodyRow?: (data: { record: T; rowIndex: number }) => Record<string, any> | undefined
  headCell?: (data: { column: TableColumn<T> }) => Record<string, any> | undefined
  headRow?: (data: { columns: TableColumn<T>[] }) => Record<string, any> | undefined
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
  offsetTop?: number
  offsetBottom?: number
  offsetScroll?: number
  container?: Window | HTMLElement
}

/** private components */
export const tableHeadRowProps = {
  columns: { type: Array as PropType<TableColumnMergedExtra[]>, required: true },
} as const

export type TableHeadRowProps = ExtractInnerPropTypes<typeof tableHeadRowProps>

export const tableHeadCellProps = {
  column: { type: Object as PropType<TableColumnMerged>, required: true },
} as const

export type TableHeadCellProps = ExtractInnerPropTypes<typeof tableHeadCellProps>

export const tableBodyRowProps = {
  expanded: { type: Boolean, default: undefined },
  rowIndex: { type: Number, required: true },
  level: { type: Number, default: undefined },
  record: { type: Object as PropType<any>, required: true },
  rowData: { type: Object as PropType<FlattedData>, required: true },
  rowKey: { type: [String, Number, Symbol] as PropType<VKey>, required: true },
} as const

export type TableBodyRowProps = ExtractInnerPropTypes<typeof tableBodyRowProps>

export const tableBodyCellProps = {
  column: { type: Object as PropType<TableColumnMerged>, required: true },
  colIndex: { type: Number, required: true },
  level: { type: Number, default: undefined },
  record: { type: Object as PropType<any>, required: true },
  rowIndex: { type: Number, required: true },
  disabled: { type: Boolean, default: undefined },
  expanded: { type: Boolean, default: undefined },
  handleExpend: { type: Function as PropType<() => void>, default: undefined },
  selected: { type: Boolean, default: undefined },
  indeterminate: { type: Boolean, default: undefined },
  handleSelect: { type: Function as PropType<() => void>, default: undefined },
} as const

export type TableBodyCellProps = ExtractInnerPropTypes<typeof tableBodyCellProps>

export const tableMeasureCellProps = {
  cellKey: { type: [String, Number, Symbol] as PropType<VKey>, required: true },
  changeColumnWidth: { type: Function as PropType<(key: VKey, width: number | false) => void>, required: true },
} as const

export type TableMeasureCellProps = ExtractInnerPropTypes<typeof tableMeasureCellProps>

export const tableFilterableTriggerProps = {
  activeFilterBy: { type: Array as PropType<VKey[]>, required: true },
  filterable: { type: Object as PropType<TableColumnFilterable>, required: true },
  onUpdateFilterBy: { type: Function as PropType<(filterBy: VKey[]) => void>, required: true },
} as const

export type TableFilterableTriggerProps = ExtractInnerPropTypes<typeof tableFilterableTriggerProps>
