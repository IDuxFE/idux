/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ColumnOffsetsContext } from './composables/useColumnOffsets'
import type { ColumnWidthMeasureContext } from './composables/useColumnWidthMeasure'
import type { ColumnsContext } from './composables/useColumns'
import type { DataSourceContext } from './composables/useDataSource'
import type { ExpandableContext } from './composables/useExpandable'
import type { FilterableContext } from './composables/useFilterable'
import type { PaginationContext } from './composables/usePagination'
import type { ScrollContext } from './composables/useScroll'
import type { SelectableContext } from './composables/useSelectable'
import type { SortableContext } from './composables/useSortable'
import type { StickyContext } from './composables/useSticky'
import type { TableBodyRowProps, TableEmptyCellOptions, TableProps } from './types'
import type { VirtualScrollEnabled } from '@idux/cdk/scroll'
import type { VKey } from '@idux/cdk/utils'
import type { TableConfig } from '@idux/components/config'
import type { Locale } from '@idux/components/locales'
import type { ComputedRef, InjectionKey, Ref, Slots, VNodeChild } from 'vue'

export interface TableContext
  extends
    ColumnsContext,
    ColumnWidthMeasureContext,
    ColumnOffsetsContext,
    DataSourceContext,
    ExpandableContext,
    PaginationContext,
    ScrollContext,
    SelectableContext,
    SortableContext,
    FilterableContext,
    StickyContext {
  props: TableProps
  slots: Slots
  config: TableConfig
  locale: Locale
  getVirtualColWidth: (rowKey: VKey, colKey: VKey) => number | undefined
  clientWidth: ComputedRef<number>
  setClientWidth: (clientWidth: number) => void
  mergedChildrenKey: ComputedRef<string>
  mergedPrefixCls: ComputedRef<string>
  mergedAutoHeight: ComputedRef<boolean>
  mergedEmptyCell: ComputedRef<string | ((options: TableEmptyCellOptions) => VNodeChild) | undefined>
  mergedInsetShadow: ComputedRef<boolean>
  mergedVirtual: ComputedRef<VirtualScrollEnabled>
  mergedVirtualItemHeight: ComputedRef<number>
  mergedVirtualColWidth: ComputedRef<number>
  tableLayout: ComputedRef<'auto' | 'fixed'>
}

// public token
export const TABLE_TOKEN: InjectionKey<TableContext> = Symbol('TABLE_TOKEN')

export interface TableBodyContext {
  changeColumnWidth: (key: VKey, width: number | false) => void
}

export interface TableBodyRowContext {
  props: TableBodyRowProps
  expandDisabled: ComputedRef<boolean>
  handleExpend: () => void
  isSelected: ComputedRef<boolean>
  isIndeterminate: ComputedRef<boolean>
  selectDisabled: ComputedRef<boolean>
  handleSelect: () => void
  isHover: Ref<boolean>
}

export const tableBodyToken: InjectionKey<TableBodyContext> = Symbol('tableBodyToken')
export const tableBodyRowToken: InjectionKey<TableBodyRowContext> = Symbol('tableBodyRowToken')
