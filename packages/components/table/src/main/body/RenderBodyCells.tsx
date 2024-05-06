/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import type { TableColumnMerged } from '../../composables/useColumns'
import type { VNode } from 'vue'

import BodyCell from './BodyCell'

export function renderBodyCells(columns: TableColumnMerged[], record: any, rowIndex: number): VNode[] {
  const children: VNode[] = []
  columns.forEach((column, colIndex) => {
    const cell = renderBodyCell(column, record, rowIndex, colIndex === columns.length - 1)

    if (cell) {
      children.push(cell)
    }
  })

  return children
}

export function renderBodyCell(
  column: TableColumnMerged,
  record: any,
  rowIndex: number,
  isLast: boolean,
): VNode | undefined {
  const { colSpan: getColSpan, rowSpan: getRowSpan } = column
  const colSpan = getColSpan?.(record, rowIndex)
  const rowSpan = getRowSpan?.(record, rowIndex)
  if (colSpan === 0 || rowSpan === 0) {
    return
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const colProps: any = {
    key: column.key,
    colSpan: colSpan === 1 ? undefined : colSpan,
    rowSpan: rowSpan === 1 ? undefined : rowSpan,
    isLast,
    column,
  }

  return <BodyCell {...colProps}></BodyCell>
}
