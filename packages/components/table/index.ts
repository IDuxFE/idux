import type { TableComponent } from './src/types'

import Table from './src/Table'

const IxTable = Table as unknown as TableComponent

export { IxTable }

export type {
  TableInstance,
  TablePublicProps as TableProps,
  TableColumn,
  TableColumnBase,
  TableColumnRenderOption,
  TableColumnRenderFn,
  TableColumnTitleFn,
  TableColumnExpandable,
  TableColumnExpandableExpandFn,
  TableColumnExpandableIconFn,
  TableColumnSelectable,
  TableColumnSelectableOption,
  TableExtra,
  TablePagination,
  TablePaginationPosition,
  TableScroll,
  TableSize,
  TableTags,
  TableColumnAlign,
  TableColumnFixed,
  TableColumnSortOrder,
  TableColumnSortable,
} from './src/types'
