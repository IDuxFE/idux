/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { TableColumnMerged, TableColumnMergedExtra } from './composables/useColumns'
import type { FlattedData } from './composables/useDataSource'
import type { ActiveFilter } from './composables/useFilterable'
import type { ActiveSorter } from './composables/useSortable'
import type { VirtualScrollToFn } from '@idux/cdk/scroll'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray, VKey } from '@idux/cdk/utils'
import type { EmptyProps } from '@idux/components/empty'
import type { HeaderProps } from '@idux/components/header'
import type { MenuClickOptions, MenuData } from '@idux/components/menu'
import type { PaginationProps } from '@idux/components/pagination'
import type { SpinProps } from '@idux/components/spin'
import type { Component, DefineComponent, FunctionalComponent, HTMLAttributes, PropType, VNodeChild } from 'vue'
export const tableProps = {
  expandedRowKeys: { type: Array as PropType<VKey[]>, default: undefined },
  selectedRowKeys: { type: Array as PropType<VKey[]>, default: undefined },

  autoHeight: { type: Boolean, default: undefined },
  borderless: { type: Boolean, default: undefined },
  childrenKey: { type: String, default: undefined },
  columns: { type: Array as PropType<TableColumn[]>, default: () => [] },
  customAdditional: { type: Object as PropType<TableCustomAdditional<any, any>>, default: undefined },
  customTag: { type: Object as PropType<TableCustomTag>, default: undefined },
  dataSource: { type: Array as PropType<any[]>, default: () => [] },
  ellipsis: { type: [Boolean, Object] as PropType<boolean | { title?: boolean; head?: boolean }>, default: false },
  empty: { type: [String, Object] as PropType<'default' | 'simple' | EmptyProps>, default: 'default' },
  emptyCell: {
    type: [String, Function] as PropType<string | ((options: TableEmptyCellOptions) => VNodeChild)>,
    default: undefined,
  },
  getKey: { type: [String, Function] as PropType<string | ((record: any) => any)>, default: undefined },
  header: { type: [String, Object] as PropType<string | HeaderProps>, default: undefined },
  headless: { type: Boolean, default: undefined },
  pagination: { type: [Boolean, Object] as PropType<boolean | TablePagination>, default: true },
  scroll: { type: Object as PropType<TableScroll>, default: undefined },
  size: { type: String as PropType<TableSize>, default: undefined },
  spin: { type: [Boolean, Object] as PropType<boolean | SpinProps>, default: undefined },
  sticky: { type: [Boolean, Object] as PropType<boolean | TableSticky>, default: undefined },
  scrollToTopOnChange: { type: Boolean, default: undefined },
  tableLayout: { type: String as PropType<'auto' | 'fixed'>, default: undefined },
  virtual: { type: Boolean, default: false },
  virtualItemHeight: { type: Number, default: undefined },

  // events
  'onUpdate:expandedRowKeys': [Function, Array] as PropType<MaybeArray<(keys: any[]) => void>>,
  'onUpdate:selectedRowKeys': [Function, Array] as PropType<MaybeArray<(keys: any[]) => void>>,
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

export type TableColumn<T = any, K = VKey> =
  | TableColumnBase<T, K>
  | TableColumnExpandable<T, K>
  | TableColumnSelectable<T, K>
  | TableColumnIndexable<T>

export interface TableColumnCommon<T = any> {
  key?: VKey
  align?: TableColumnAlign
  colSpan?: (record: T, rowIndex: number) => number
  rowSpan?: (record: T, rowIndex: number) => number
  fixed?: TableColumnFixed
  titleColSpan?: number
  width?: string | number
}

export interface TableColumnBase<T = any, K = VKey> extends TableColumnCommon<T> {
  dataKey?: VKey | VKey[]
  ellipsis?: boolean | { title?: boolean; head?: boolean }
  sortable?: TableColumnSortable<T>
  filterable?: TableColumnFilterable<T>
  title?: string
  children?: TableColumn<T, K>[]

  customCell?: string | ((data: { value: any; record: T; rowIndex: number }) => VNodeChild)
  customTitle?: string | ((data: { title?: string }) => VNodeChild)
}

export interface TableColumnExpandable<T = any, K = VKey> extends TableColumnBase<T, K> {
  type: 'expandable'
  disabled?: (record: T) => boolean

  icon?: string | VNodeChild | ((options: { expanded: boolean; record: T }) => string | VNodeChild)
  indent?: number
  trigger?: 'click' | 'dblclick'

  onChange?: (expendedRowKeys: K[]) => void
  onExpand?: (expanded: boolean, record: T) => void

  customExpand?: string | ((data: { record: T; rowIndex: number }) => VNodeChild)
  customIcon?: string | ((data: { record: T; expanded: boolean }) => VNodeChild)
}

export interface TableColumnSelectable<T = any, K = VKey> extends TableColumnCommon<T> {
  type: 'selectable'

  disabled?: (record: T) => boolean
  multiple?: boolean
  menus?: ('all' | 'invert' | 'none' | 'pageInvert' | MenuData)[]
  showIndex?: boolean
  trigger?: 'click' | 'dblclick'

  onChange?: (selectedRowKeys: K[], selectedRows: T[]) => void
  onMenuClick?: <MK = VKey>(options: MenuClickOptions<MK>, currentPageRowKeys: K[]) => void
  onSelect?: (selected: boolean, record: T) => void
  onSelectAll?: (selectedRowKeys: K[]) => void
  onSelectInvert?: (selectedRowKeys: K[]) => void
  onSelectNone?: () => void
  onSelectPageInvert?: (selectedRowKeys: K[]) => void

  customCell?:
    | string
    | ((data: {
        checked: boolean
        disabled: boolean
        indeterminate?: boolean
        record: T
        rowIndex: number
        onChange: () => void
        onClick: () => void
      }) => VNodeChild)
}

export interface TableColumnIndexable<T = any> extends TableColumnCommon<T> {
  type: 'indexable'
  ellipsis?: boolean | { title?: boolean; head?: boolean }
  title?: string
  customCell?: string | ((data: { record: T; rowIndex: number; pageSize: number; pageIndex: number }) => VNodeChild)
  customTitle?: string | ((data: { title?: string }) => VNodeChild)
}

export interface TableCustomAdditional<T = any, K = VKey> {
  bodyCell?: (data: { column: TableColumn<T, K>; record: T; rowIndex: number }) => Record<string, any> | undefined
  bodyRow?: (data: { record: T; rowIndex: number }) => Record<string, any> | undefined
  head?: (data: { rows: TableColumn<T, K>[][] }) => Record<string, any> | undefined
  headCell?: (data: { column: TableColumn<T, K> }) => Record<string, any> | undefined
  headRow?: (data: { columns: TableColumn<T, K>[] }) => Record<string, any> | undefined
}

export interface TableCustomTag {
  bodyCell?: string | Component
  bodyRow?: string | Component
  head?: string | Component
  headCell?: string | Component
  headRow?: string | Component
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
  multiple?: number
  nextTooltip?: boolean
  orderBy?: TableColumnSortOrder
  orders?: TableColumnSortOrder[]
  sorter?: (curr: T, next: T) => number
  onChange?: (orderBy: TableColumnSortOrder | undefined, sorters: ActiveSorter[]) => void
}

export interface TableColumnFilterable<T = any> {
  filter?: (filterBy: any[], record: T) => boolean
  filterBy?: VKey[]
  footer?: boolean
  menus: MenuData[]
  multiple?: boolean
  onChange?: (filterBy: any[], filters: ActiveFilter[]) => void

  customTrigger?: string | (() => VNodeChild)
  customMenu?: string | ((options: { selectedKeys: VKey[]; setSelectedKeys: (value: VKey[]) => void }) => VNodeChild)
}

export interface TableSticky {
  offsetTop?: number
  offsetBottom?: number
  offsetScroll?: number
  container?: Window | HTMLElement
}

export interface TableEmptyCellOptions<T = any, K = VKey> {
  column: TableColumn<T, K>
  record: T
  rowIndex: number
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
  isHover: { type: Boolean, default: undefined },
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

export const tableSortableTriggerProps = {
  activeOrderBy: { type: String as PropType<TableColumnSortOrder>, default: undefined },
  sortable: { type: Object as PropType<TableColumnSortable>, required: true },
} as const

export type TableSortableTriggerProps = ExtractInnerPropTypes<typeof tableSortableTriggerProps>
