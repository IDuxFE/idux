/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProTableComponent, ProTableLayoutToolComponent } from './src/types'

import ProTable from './src/ProTable'
import ProTableLayoutTool from './src/ProTableLayoutTool'

const IxProTable = ProTable as unknown as ProTableComponent
const IxProTableLayoutTool = ProTableLayoutTool as unknown as ProTableLayoutToolComponent

export { IxProTable, IxProTableLayoutTool }

export type {
  ProTableInstance,
  ProTableComponent,
  ProTablePublicProps as ProTableProps,
  ProTableLayoutToolInstance,
  ProTableLayoutToolComponent,
  ProTableLayoutToolPublicProps as ProTableLayoutToolProps,
  ProTableColumn,
  ProTableColumnBase,
  ProTableColumnExpandable,
  ProTableColumnSelectable,
  ProTableColumnIndexable,
  ProTableDataDndSortable,
} from './src/types'
