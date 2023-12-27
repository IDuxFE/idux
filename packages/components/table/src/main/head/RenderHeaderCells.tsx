/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TableColumnMergedExtra } from '../../composables/useColumns'
import type { VNode, VNodeChild } from 'vue'

import HeadCell from './HeadCell'

export function renderHeaderCells(columns: TableColumnMergedExtra[]): VNodeChild {
  return columns.map(column => renderHeaderCell(column)).filter(Boolean)
}

export function renderHeaderCell(column: TableColumnMergedExtra): VNode | undefined {
  if (column.titleColSpan === 0) {
    return
  }

  return <HeadCell key={column.key} column={column} />
}
