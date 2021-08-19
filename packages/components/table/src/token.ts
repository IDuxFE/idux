import type { ComputedRef, InjectionKey, Slots } from 'vue'
import type { TableConfig } from '@idux/components/config'
import type { ColumnsContext } from './composables/useColumns'
import type { DataSourceContext } from './composables/useDataSource'
import type { ExpandableContext } from './composables/useExpandable'
import type { GetRowKey } from './composables/useGetRowKey'
import type { SelectableContext } from './composables/useSelectable'
import type { PaginationContext } from './composables/usePagination'
import type { TagsContext } from './composables/useTags'
import type { TableProps } from './types'

export interface TableContext
  extends ColumnsContext,
    DataSourceContext,
    ExpandableContext,
    PaginationContext,
    SelectableContext,
    TagsContext {
  props: TableProps
  slots: Slots
  config: TableConfig
  getRowKey: ComputedRef<GetRowKey>
}

export const tableToken: InjectionKey<TableContext> = Symbol('tableToken')
