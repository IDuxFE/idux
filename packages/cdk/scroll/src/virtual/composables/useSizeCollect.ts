/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { VirtualScrollProps, VirutalDataSizes } from '../types'
import type { VKey } from '@idux/cdk/utils'
import type { ComponentPublicInstance, Ref } from 'vue'

import { ref, watch } from 'vue'

import { isNil } from 'lodash-es'

import { convertElement } from '@idux/cdk/utils'

export interface SizeCollectContext {
  getRowHeight: (rowKey: VKey) => number
  getColWidth: (rowKey: VKey, colKey: VKey) => number
  collectSize: () => void
  sizeUpdateMark: Ref<number>
  setRow: (rowKey: VKey, row: ComponentPublicInstance | null) => void
  setCol: (rowKey: VKey, colKey: VKey, col: ComponentPublicInstance | null) => void
  clearItems: () => void
}

export function useSizeCollect(props: VirtualScrollProps): SizeCollectContext {
  const itemMap = new Map<VKey, { row: HTMLElement; cols: Map<VKey, HTMLElement> }>()
  const strictGridColMap = new Map<VKey, HTMLElement>()
  const sizes: VirutalDataSizes = new Map()
  const strictGridColSizes = new Map<VKey, number>()

  const sizeUpdateMark = ref(0)

  let sizeUpdateId = 0
  let rowHeight = props.rowHeight
  let colWidth = props.colWidth
  let _getColWidth = props.getColWidth
  let _getRowHeight = props.getRowHeight

  watch(
    () => props.rowHeight,
    () => {
      rowHeight = props.rowHeight
    },
  )
  watch(
    () => props.colWidth,
    () => {
      colWidth = props.colWidth
    },
  )
  watch(
    () => props.getColWidth,
    () => {
      _getColWidth = props.getColWidth
    },
  )
  watch(
    () => props.getRowHeight,
    () => {
      _getRowHeight = props.getRowHeight
    },
  )

  const setRowHeight = (rowKey: VKey, height: number | undefined) => {
    if (isNil(height)) {
      return false
    }

    const rowSize = sizes.get(rowKey)

    if (!rowSize) {
      sizes.set(rowKey, { height, colWidths: new Map<VKey, number>() })
      return true
    }

    if (rowSize.height != height) {
      rowSize.height = height
      return true
    }

    return false
  }
  const setColWidth = (colWidths: Map<VKey, number> | undefined, colKey: VKey, width: number | undefined) => {
    if (!width) {
      return false
    }

    if (!colWidths) {
      return false
    }

    const currentColWidth = colWidths.get(colKey)

    if (currentColWidth !== width) {
      colWidths.set(colKey, width)
      return true
    }

    return false
  }
  const updateRowHeight = (rowKey: VKey, row: HTMLElement) => {
    return setRowHeight(rowKey, row.getBoundingClientRect().height)
  }
  const updateColWidth = (rowKey: VKey | undefined, colKey: VKey, col: HTMLElement) => {
    const colWidths = props.isStrictGrid ? strictGridColSizes : isNil(rowKey) ? undefined : sizes.get(rowKey)?.colWidths
    const width = col.getBoundingClientRect().width
    return setColWidth(colWidths, colKey, width)
  }

  const collectSize = () => {
    sizeUpdateId += 1
    const currentId = sizeUpdateId

    setTimeout(() => {
      // Only collect when it's latest call
      if (currentId !== sizeUpdateId) {
        return
      }

      let updated = false

      itemMap.forEach(({ row, cols }, rowKey) => {
        if (!row || !row.offsetParent) {
          return
        }

        const rowUpdated = updateRowHeight(rowKey, row)
        updated = updated || rowUpdated

        if (!props.isStrictGrid) {
          cols.forEach((col, colKey) => {
            const colUpdated = updateColWidth(rowKey, colKey, col)
            updated = updated || colUpdated
          })
        }
      })

      if (props.isStrictGrid) {
        strictGridColMap.forEach((col, colKey) => {
          const colUpdated = updateColWidth(undefined, colKey, col)
          updated = updated || colUpdated
        })
      }

      if (updated) {
        sizeUpdateMark.value++
      }
    })
  }

  const setRow = (rowKey: VKey, row: ComponentPublicInstance | null) => {
    const rowEl = convertElement(row)

    if (!rowEl) {
      itemMap.delete(rowKey)
      return
    }

    const existedRow = itemMap.get(rowKey)

    if (existedRow) {
      existedRow.row = rowEl
    } else {
      itemMap.set(rowKey, { row: rowEl, cols: new Map<VKey, HTMLElement>() })
    }
  }

  const setCol = (rowKey: VKey, colKey: VKey, col: ComponentPublicInstance | null) => {
    if (props.isStrictGrid && strictGridColMap.has(colKey)) {
      return
    }

    const colEl = convertElement(col)

    // when the grid is strictly aligned, collect rendered col only once
    const cols = props.isStrictGrid ? strictGridColMap : itemMap.get(rowKey)?.cols

    if (!cols) {
      return
    }

    if (!colEl) {
      cols.delete(colKey)
    } else {
      cols.set(colKey, colEl)
    }
  }

  const getRowHeight = (rowKey: VKey) => {
    return sizes.get(rowKey)?.height ?? _getRowHeight?.(rowKey) ?? rowHeight
  }
  const getColWidth = (rowKey: VKey, colKey: VKey) => {
    return (
      (props.isStrictGrid ? strictGridColSizes.get(colKey) : sizes.get(rowKey)?.colWidths.get(colKey)) ??
      _getColWidth?.(rowKey, colKey) ??
      colWidth
    )
  }

  const clearItems = () => {
    itemMap.clear()
    strictGridColMap.clear()
  }

  return { collectSize, sizeUpdateMark, setRow, setCol, getRowHeight, getColWidth, clearItems }
}
