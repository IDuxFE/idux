/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { type TableColumnComponent } from './types'

const tableColumnKey = Symbol('IxTableColumn')

const TableColumn = (() => {}) as TableColumnComponent

TableColumn.displayName = 'IxTableColumn'
;(TableColumn as any)[tableColumnKey] = true

export { TableColumn, tableColumnKey }
