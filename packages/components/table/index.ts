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
  TableColumnComponent,
  TableColumn,
  TableColumnBase,
  TableColumnExpandable,
  TableColumnSelectable,
  TableColumnIndexable,
  TableCustomAdditional,
  TableCustomTag,
  TablePagination,
  TablePaginationPosition,
  TableScroll,
  TableSize,
  TableColumnAlign,
  TableColumnFixed,
  TableColumnFilterable,
  TableColumnSortable,
  TableColumnSortOrder,
  TableEmptyCellOptions,
  TableSticky,
} from './src/types'

// private
export { tableProps as ɵTableProps } from './src/types'
export { getColumnKey as ɵGetColumnKey } from './src/utils'
