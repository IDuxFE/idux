import type { ComputedRef, InjectionKey, Ref, Slots } from 'vue'
import type { TableConfig } from '@idux/components/config'
import type { TableLocale } from '@idux/components/i18n'
import type { ColumnsContext } from './composables/useColumns'
import type { DataSourceContext } from './composables/useDataSource'
import type { ExpandableContext } from './composables/useExpandable'
import type { GetRowKey } from './composables/useGetRowKey'
import type { ScrollContext } from './composables/useScroll'
import type { SelectableContext } from './composables/useSelectable'
import type { SortableContext } from './composables/useSortable'
import type { StickyContext } from './composables/useSticky'
import type { PaginationContext } from './composables/usePagination'
import type { TagsContext } from './composables/useTags'
import type { Key, TableProps } from './types'

export interface TableContext
  extends ColumnsContext,
    DataSourceContext,
    ExpandableContext,
    PaginationContext,
    ScrollContext,
    SelectableContext,
    SortableContext,
    StickyContext,
    TagsContext {
  props: TableProps
  slots: Slots
  config: TableConfig
  locale: ComputedRef<TableLocale>
  getRowKey: ComputedRef<GetRowKey>
  tableLayout: ComputedRef<'auto' | 'fixed'>
}

export const tableToken: InjectionKey<TableContext> = Symbol('tableToken')

// public token
export const TABLE_TOKEN: InjectionKey<TableContext> = Symbol('TABLE_TOKEN')

export interface TableBodyContext {
  mainTableWidth: Ref<number>
  changeColumnWidth: (key: Key, width: number) => void
}

export const tableBodyToken: InjectionKey<TableBodyContext> = Symbol('tableBodyToken')
