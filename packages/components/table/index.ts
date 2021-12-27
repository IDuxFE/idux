/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TableComponent } from './src/types'

import Table from './src/Table'

const IxTable = Table as unknown as TableComponent

export { IxTable }

export type {
  TableInstance,
  TableComponent,
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
