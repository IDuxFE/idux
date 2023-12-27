/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { GetKey } from './composables/useGetKey'
import type { VirtualScrollRowData } from './types'
import type { VKey } from '@idux/cdk/utils'

export function isRowData(row: unknown | VirtualScrollRowData): row is VirtualScrollRowData {
  return 'data' in (row as VirtualScrollRowData)
}

export function calcDataHeight(
  data: (unknown | VirtualScrollRowData)[],
  getRowHeight: (rowKey: VKey) => number,
  getKey: GetKey,
): number {
  let height = 0
  for (const item of data) {
    height += getRowHeight(getKey(item))
  }

  return height
}

export function calcDataWidth(
  data: (unknown | VirtualScrollRowData)[],
  getColWidth: (rowKey: VKey, colKey: VKey) => number,
  getKey: GetKey,
): number {
  let width = 0

  for (const row of data) {
    let rowWidth = 0
    if (!isRowData(row)) {
      rowWidth = 0
    } else {
      const rowKey = getKey(row)
      for (const col of row.data) {
        rowWidth += getColWidth(rowKey, getKey(col))
      }
    }

    width = Math.max(width, rowWidth)
  }

  return width
}

export function isNumArrayEqual(arr1: number[], arr2: number[]): boolean {
  return arr1.length === arr2.length && arr1.every((num, idx) => num === arr2[idx])
}
