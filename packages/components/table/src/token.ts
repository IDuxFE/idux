import type { ComputedRef, InjectionKey, Slots } from 'vue'
import type { TableConfig } from '@idux/components/config'
import type { TableProps } from './types'
import type { ColumnsContext } from './composables/useColumns'
import type { DataSourceContext } from './composables/useDataSource'
import type { ExpandableContext } from './composables/useExpandable'
import type { TagsContext } from './composables/useTags'
import type { PaginationContext } from './composables/usePagination'

export interface TableContext
  extends ColumnsContext,
    DataSourceContext,
    ExpandableContext,
    PaginationContext,
    TagsContext {
  props: TableProps
  slots: Slots
  config: TableConfig
  getRowKey: ComputedRef<(record: unknown) => string | number>
}

export const tableToken: InjectionKey<TableContext> = Symbol('tableToken')
