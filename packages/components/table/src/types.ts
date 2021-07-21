import type { DefineComponent, HTMLAttributes, VNodeTypes } from 'vue'
import type { BreakpointKey } from '@idux/cdk/breakpoint'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { EmptyProps } from '@idux/components/empty'
import type { PaginationProps } from '@idux/components/pagination'
import type { SpinProps } from '@idux/components/spin'

import { IxPropTypes } from '@idux/cdk/utils'

export const tableProps = {
  borderless: IxPropTypes.bool,
  columns: IxPropTypes.array<TableColumnPublicProps>(),
  dataSource: IxPropTypes.array(),
  empty: IxPropTypes.oneOfType<string | EmptyProps>([String, IxPropTypes.object()]),
  expandable: IxPropTypes.object<TableExpandable>(),
  extra: IxPropTypes.object<TableExtra>(),
  headless: IxPropTypes.bool,
  pagination: IxPropTypes.oneOfType<boolean | TablePagination>([Boolean, IxPropTypes.object<TablePagination>()]),
  rowClassName: IxPropTypes.func<(record: unknown, index: number) => string>(),
  rowKey: IxPropTypes.oneOfType([String, IxPropTypes.func<(record: unknown) => number | string>()]),
  selectable: IxPropTypes.object<TableSelectable>(),
  scrollable: IxPropTypes.object<TableScrollable>(),
  size: IxPropTypes.oneOf<TableSize>(['large', 'medium', 'small']),
  spin: IxPropTypes.oneOfType([Boolean, IxPropTypes.object<SpinProps>()]).def(false),
  tableLayout: IxPropTypes.oneOf(['auto', 'fixed'] as const),
  tags: IxPropTypes.object<TableTags>(),
}

export type TableProps = IxInnerPropTypes<typeof tableProps>
export type TablePublicProps = IxPublicPropTypes<typeof tableProps>
export type TableComponent = DefineComponent<HTMLAttributes & typeof tableProps>
export type TableInstance = InstanceType<DefineComponent<TableProps>>

export const tableColumnProps = {
  align: IxPropTypes.oneOf<TableColumnAlign>(['left', 'right', 'center']),
  colSpan: IxPropTypes.number,
  dataKey: IxPropTypes.oneOfType([String, IxPropTypes.arrayOf(String)]),
  editable: IxPropTypes.bool,
  ellipsis: IxPropTypes.bool,
  fixed: IxPropTypes.oneOf<TableColumnFixed>(['left', 'right']),
  key: IxPropTypes.oneOfType([String, Number]),
  render: IxPropTypes.func<(options: unknown) => VNodeTypes | unknown>(),
  responsive: IxPropTypes.array<BreakpointKey>(),
  sortable: IxPropTypes.object<TableColumnSortable>(),
  title: IxPropTypes.string,
  width: IxPropTypes.oneOfType([String, Number]),
}

export type TableColumnProps = IxInnerPropTypes<typeof tableColumnProps>
export type TableColumnPublicProps = IxPublicPropTypes<typeof tableColumnProps>
export type TableColumnComponent = DefineComponent<HTMLAttributes & typeof tableColumnProps>
export type TableColumnInstance = InstanceType<DefineComponent<TableProps>>

export const tableColumnGroupProps = {
  title: IxPropTypes.string,
}

export type TableColumnGroupProps = IxInnerPropTypes<typeof tableColumnGroupProps>
export type TableColumnGroupPublicProps = IxPublicPropTypes<typeof tableColumnGroupProps>
export type TableColumnGroupComponent = DefineComponent<HTMLAttributes & typeof tableColumnGroupProps>
export type TableColumnGroupInstance = InstanceType<DefineComponent<TableProps>>

export interface TableExpandable<T = unknown> {
  enabled?: (record: T, index: number) => boolean
  fixed?: 'left' | 'right'
  icon?: [string, string] | ((options: unknown) => VNodeTypes)
  indent?: number
  index?: number
  rowKeys?: (string | number)[]
  render?: (option: unknown) => VNodeTypes
  trigger?: 'click' | 'doubleClick'
  width?: string | number
  onChange?: (expendedRowKeys: (string | number)[], expendedRecords: T[]) => void
  onExpand?: (expanded: boolean, record: T) => void
}

export interface TableExtra {
  dropdown?: (options: unknown) => VNodeTypes
  dropdownVisible?: boolean
  icon?: string
  options: unknown[]
  onDropDownVisibleChange: (visible: boolean) => void
}

export interface TablePagination extends PaginationProps {
  position: 'topStart' | 'top' | 'topEnd' | 'bottomStart' | 'bottom' | 'bottomEnd'
}

export interface TableSelectable<T = unknown> {
  enabled?: (record: T, index: number) => boolean
  fixed?: 'left' | 'right'
  multiple?: boolean
  rowKeys?: (string | number)[]
  selections?: TableSelectableSelection[]
  trigger?: 'click' | 'doubleClick'
  width?: string | number
  onChange?: (selectedRowKeys: (string | number)[], selectedRecords: T[]) => void
  onSelect?: (selected: boolean, record: T) => void
  onSelectAll?: (selectedRowKeys: (string | number)[]) => void
  onSelectInvert?: (selectedRowKeys: (string | number)[]) => void
  onSelectNone?: () => void
}

export interface TableSelectableSelection {
  key: string | number
  text: string
  onClick: (selectedRowKeys: (string | number)[]) => void
}

export interface TableScrollable {
  toTopOnChange?: boolean
  x?: string | number | boolean
  y?: string | number
}

export type TableSize = 'large' | 'medium' | 'small'

export interface TableTags {
  table?: VNodeTypes
  head?: {
    thead?: VNodeTypes
    tr?: VNodeTypes
    th?: VNodeTypes
  }
  body?: {
    tbody?: VNodeTypes
    tr?: VNodeTypes
    td?: VNodeTypes
  }
}

export type TableColumnAlign = 'left' | 'right' | 'center'

export type TableColumnFixed = 'left' | 'right'

export type TableColumnSortOrder = 'ascend' | 'descend' | null

export interface TableColumnSortable<T = unknown> {
  directions?: TableColumnSortOrder[]
  order?: TableColumnSortOrder
  showTooltip?: boolean
  onSort: (curr: T, next: T) => number
}
