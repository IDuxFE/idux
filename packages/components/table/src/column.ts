/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { TableColumn as TableColumnProps } from './types'
import type { FunctionalComponent, HTMLAttributes } from 'vue'

const tableColumnKey = '__IDUX_TABLE_COLUMN'
const TableColumn = (() => {}) as FunctionalComponent<Omit<HTMLAttributes, keyof TableColumnProps> & TableColumnProps>
TableColumn.displayName = 'IxTableColumn'
;(TableColumn as any)[tableColumnKey] = true

export { TableColumn, tableColumnKey }
