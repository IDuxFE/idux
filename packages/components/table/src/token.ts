/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ColumnsContext } from './composables/useColumns'
import type { DataSourceContext } from './composables/useDataSource'
import type { ExpandableContext } from './composables/useExpandable'
import type { FilterableContext } from './composables/useFilterable'
import type { PaginationContext } from './composables/usePagination'
import type { ScrollContext } from './composables/useScroll'
import type { SelectableContext } from './composables/useSelectable'
import type { SortableContext } from './composables/useSortable'
import type { StickyContext } from './composables/useSticky'
import type { TableProps } from './types'
import type { VKey } from '@idux/cdk/utils'
import type { TableConfig } from '@idux/components/config'
import type { Locale } from '@idux/components/locales'
import type { ComputedRef, InjectionKey, Ref, Slots } from 'vue'

export interface TableContext
  extends ColumnsContext,
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
  mergedPrefixCls: ComputedRef<string>
  tableLayout: ComputedRef<'auto' | 'fixed'>
}

// public token
export const TABLE_TOKEN: InjectionKey<TableContext> = Symbol('TABLE_TOKEN')

export interface TableBodyContext {
  mainTableWidth: Ref<number>
  changeColumnWidth: (key: VKey, width: number | false) => void
}

export const tableBodyToken: InjectionKey<TableBodyContext> = Symbol('tableBodyToken')
