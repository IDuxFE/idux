/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TableComponent } from './src/types'

import Table from './src/Table'
import { TableColumn } from './src/column'
import { TABLE_TOKEN } from './src/token'

const IxTable = Table as unknown as TableComponent
const IxTableColumn = TableColumn

export { IxTable, IxTableColumn, TABLE_TOKEN }

export type {
  TableInstance,
  TableComponent,
  TablePublicProps as TableProps,
  TableColumn,
  TableColumnBase,
  TableColumnExpandable,
  TableColumnSelectable,
  TablePagination,
  TablePaginationPosition,
  TableScroll,
  TableSize,
  TableTags,
  TableColumnAlign,
  TableColumnFixed,
  TableColumnSortable,
  TableColumnSortOrder,
  TableColumnFilter,
  TableColumnFilterable,
} from './src/types'

export type TableColumnComponent = typeof IxTableColumn
