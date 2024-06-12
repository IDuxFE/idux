/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TableColumnMerged } from './useColumns'
import type { VKey } from '@idux/cdk/utils'

import { type ComputedRef, computed } from 'vue'

export function useColumnWidths(
  flattenedColumns: ComputedRef<TableColumnMerged[]>,
  scrollWidth: ComputedRef<string>,
  clientWidth: ComputedRef<number>,
): ComputedRef<Map<VKey, number | string | undefined>> {
  return computed(() => {
    const maxFitWidth = scrollWidth.value ? parseScrollWidth(scrollWidth.value) : clientWidth.value
    if (!maxFitWidth || maxFitWidth <= 0 || !flattenedColumns.value.some(column => !!column.minWidth)) {
      return new Map(flattenedColumns.value.map(column => [column.key, column.width]))
    }

    let totalWidth = 0
    let missedColumnCnt = 0
    const minWidthColumns: TableColumnMerged[] = []
    const widthMap = new Map<VKey, number | string | undefined>()

    flattenedColumns.value.forEach(col => {
      const colWidth = parseColWidth(maxFitWidth, col.width)

      if (colWidth) {
        totalWidth += colWidth
        widthMap.set(col.key, col.width)
      } else {
        missedColumnCnt++

        if (col.minWidth) {
          minWidthColumns.push(col)
        }
      }
    })

    let restWidth = Math.max(maxFitWidth - totalWidth, missedColumnCnt)
    let avgWidth = Math.floor(restWidth / missedColumnCnt)

    minWidthColumns.forEach(col => {
      const parsedMinWidth = parseColWidth(totalWidth, col.minWidth)

      if (parsedMinWidth && parsedMinWidth > avgWidth) {
        widthMap.set(col.key, parsedMinWidth)
        restWidth -= parsedMinWidth
        missedColumnCnt--
        avgWidth = Math.floor(restWidth / missedColumnCnt)
      }
    })

    return widthMap
  })
}

function parseScrollWidth(scrollWidth: string) {
  if (scrollWidth.endsWith('px')) {
    const parsedWidth = parseFloat(scrollWidth)
    return Number.isNaN(parsedWidth) ? null : parsedWidth
  }

  return null
}

function parseColWidth(totalWidth: number, width: string | number = '') {
  if (typeof width === 'number') {
    return width
  }

  if (width.endsWith('%')) {
    const parsedWidth = (totalWidth * parseFloat(width)) / 100
    return Number.isNaN(parsedWidth) ? null : parsedWidth
  }
  return null
}
