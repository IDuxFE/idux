/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { GetKey } from './useGetKey'
import type { Scroll } from './useScrollPlacement'
import type { VirtualScrollEnabled, VirtualScrollProps, VirtualScrollRowData } from '../types'
import type { VKey } from '@idux/cdk/utils'
import type { ComputedRef, Ref } from 'vue'

import { ref, watch } from 'vue'

import { calcDataHeight, calcDataWidth, isNumArrayEqual, isRowData } from '../utils'

export interface ScrollStateContext {
  scrollHeight: Ref<number>
  scrollWidth: Ref<number>
  scrollOffsetTop: Ref<number | undefined>
  scrollOffsetLeft: Ref<number | undefined>
  topIndex: Ref<number>
  bottomIndex: Ref<number>
  leftIndex: Ref<number[]>
  rightIndex: Ref<number[]>
}

export function useScrollState(
  props: VirtualScrollProps,
  enabled: ComputedRef<VirtualScrollEnabled>,
  getKey: ComputedRef<GetKey>,
  scroll: Ref<Scroll>,
  containerSize: ComputedRef<{ width: number; height: number }>,
  heightUpdatedMark: Ref<number>,
  getRowHeight: (rowKey: VKey) => number,
  getColWidth: (rowKey: VKey, colKey: VKey) => number,
): ScrollStateContext {
  const scrollHeight = ref(0)
  const scrollWidth = ref(0)
  const scrollOffsetTop = ref<number>()
  const scrollOffsetLeft = ref<number>()

  const topIndex = ref(0)
  const bottomIndex = ref(0)
  const rightIndex = ref<number[]>([])
  const leftIndex = ref<number[]>([])

  const setNumArray = (arr: number[], arrRef: Ref<number[]>) => {
    if (!isNumArrayEqual(arr, arrRef.value)) {
      arrRef.value = arr
    }
  }
  const setNum = (num: number, numRef: Ref<number | undefined>) => {
    if (num !== numRef.value) {
      numRef.value = num
    }
  }

  const getGridHorizontalIndex = (index: number[]) => {
    if (props.isStrictGrid) {
      return new Array(bottomIndex.value - topIndex.value + 1).fill(index[0])
    }
    return index
  }

  let calculated = false
  let renderedHeight = 0
  let renderedWidth = 0

  watch(
    [
      enabled,
      () => props.dataSource,
      () => props.bufferSize,
      () => props.rowHeight,
      () => props.colWidth,
      () => containerSize.value.height,
      () => containerSize.value.width,
      getKey,
      scroll,
      heightUpdatedMark,
    ],
    (
      [enabled, dataSource, bufferSize, rowHeight, colWidth, height, width, getKey, scroll],
      [, oldDataSource, , , , oldHeight, oldWidth],
    ) => {
      // to ensure that the rendered size is stable between render cycles
      // the rendered size should be at least the size of that in last render tick
      // we do this to maximize render pool reusage
      let minHorizontalLength: number[] | undefined
      let minVerticalLength: number | undefined
      if (oldDataSource !== dataSource || oldDataSource.length !== dataSource.length) {
        calculated = false
      }

      if (oldWidth === width) {
        minHorizontalLength = rightIndex.value.map((_rightIndex, index) => _rightIndex - leftIndex.value[index])
      }
      if (oldHeight === height) {
        minVerticalLength = bottomIndex.value - topIndex.value
      }

      const verticalState = calcVerticalState(
        getKey,
        enabled.vertical,
        dataSource,
        height,
        rowHeight,
        scroll.top ?? 0,
        scrollOffsetTop.value ?? 0,
        getRowHeight,
        bufferSize,
        props.bufferOffset,
        renderedHeight,
        minVerticalLength,
        !calculated,
      )

      if (verticalState) {
        setNum(verticalState.topIndex, topIndex)
        setNum(verticalState.bottomIndex, bottomIndex)
        setNum(verticalState.offsetTop, scrollOffsetTop)
        setNum(verticalState.scrollHeight, scrollHeight)
        renderedHeight = verticalState.renderedHeight
      }

      const isStrictGrid = props.isStrictGrid

      const rows = isStrictGrid
        ? [dataSource[topIndex.value]].filter(Boolean)
        : dataSource.slice(topIndex.value, bottomIndex.value + 1)

      const horizontalState = calcHorizontalState(
        getKey,
        enabled.horizontal,
        rows,
        width,
        colWidth,
        scroll.left ?? 0,
        scrollOffsetLeft.value ?? 0,
        getColWidth,
        bufferSize,
        props.bufferOffset,
        renderedWidth,
        minHorizontalLength,
        !calculated || !!verticalState,
      )

      if (horizontalState) {
        setNumArray(getGridHorizontalIndex(horizontalState.leftIndex), leftIndex)
        setNumArray(getGridHorizontalIndex(horizontalState.rightIndex), rightIndex)
        setNum(horizontalState.offsetLeft, scrollOffsetLeft)
        setNum(horizontalState.scrollWidth, scrollWidth)
        renderedWidth = horizontalState.renderedWidth
      }

      if (horizontalState && verticalState) {
        calculated = true
      }
    },
    { immediate: true, flush: 'pre' },
  )

  return { scrollHeight, scrollWidth, scrollOffsetTop, scrollOffsetLeft, topIndex, bottomIndex, leftIndex, rightIndex }
}

function calcVerticalState(
  getKey: GetKey,
  virtual: boolean,
  rows: unknown[],
  height: number,
  rowHeight: number,
  scrollTop: number,
  currentOffsetTop: number,
  getRowHeight: (rowKey: VKey) => number,
  bufferSize: number,
  bufferOffset: number,
  renderedHeight: number,
  minLength: number | undefined,
  force: boolean,
) {
  // skip calcuation when height is 0
  if (virtual && height === 0) {
    return
  }

  const dataLength = rows.length

  if (!virtual || dataLength === 0 || rowHeight * dataLength <= height) {
    const scrollHeight = calcDataHeight(rows, getRowHeight, getKey)
    return {
      scrollHeight: virtual ? scrollHeight : 0,
      topIndex: 0,
      bottomIndex: dataLength === 0 ? 0 : dataLength - 1,
      offsetTop: 0,
      renderedHeight: scrollHeight,
    }
  }

  const bufferOffsetDistance = bufferOffset * rowHeight

  // skip caculation when current scroll hasent reached render window edge and size was caculated
  if (
    !force &&
    !!bufferSize &&
    scrollTop >= currentOffsetTop + bufferOffsetDistance &&
    scrollTop <= currentOffsetTop + renderedHeight - height - bufferOffsetDistance
  ) {
    return
  }

  let scrollHeight = 0
  let offsetTop = 0
  let topIndex: number | undefined
  let bottomIndex: number | undefined
  let _renderedHeight = 0

  for (let index = 0; index < dataLength; index += 1) {
    const rowHeight = getRowHeight(getKey(rows[index]))
    const currentItemBottom = scrollHeight + rowHeight

    if (currentItemBottom >= scrollTop && topIndex === undefined) {
      topIndex = index
      offsetTop = scrollHeight
    }

    if (topIndex !== undefined && bottomIndex === undefined) {
      _renderedHeight += rowHeight
    }

    if (currentItemBottom > scrollTop + height && bottomIndex === undefined) {
      bottomIndex = index
    }

    scrollHeight = currentItemBottom
  }

  // Fallback to normal if not match. This code should never reach
  /* istanbul ignore next */
  if (topIndex === undefined) {
    topIndex = 0
    offsetTop = 0
  }
  if (bottomIndex === undefined) {
    bottomIndex = dataLength - 1
  }

  // append buffered item
  for (let index = 0; index < bufferSize; index += 1) {
    if (topIndex !== 0) {
      topIndex -= 1
      const appendedRowHeight = getRowHeight(getKey(rows[topIndex]))
      offsetTop! -= appendedRowHeight
      _renderedHeight += appendedRowHeight
    }

    if (bottomIndex !== dataLength - 1) {
      bottomIndex += 1
      _renderedHeight += getRowHeight(getKey(rows[bottomIndex]))
    }
  }

  // size fixing
  for (
    let index = 0;
    index < getFixSize(rowHeight ? Math.ceil(height / rowHeight) : 0, minLength, topIndex, bottomIndex);
    index += 1
  ) {
    if (bottomIndex !== dataLength - 1) {
      bottomIndex += 1
      _renderedHeight += getRowHeight(getKey(rows[bottomIndex]))
    }
  }

  return {
    scrollHeight,
    topIndex,
    bottomIndex,
    offsetTop,
    renderedHeight: _renderedHeight,
  }
}

function calcHorizontalState(
  getKey: GetKey,
  virtual: boolean,
  rows: (unknown | VirtualScrollRowData)[],
  width: number,
  colWidth: number,
  scrollLeft: number,
  currentOffsetLeft: number,
  getColWidth: (rowKey: VKey, colKey: VKey) => number,
  bufferSize: number,
  bufferOffset: number,
  renderedWidth: number,
  minLength: number[] | undefined,
  force: boolean,
) {
  // skip caculation when width 0
  if (virtual && width === 0) {
    return
  }

  const getRowColLength = (row: unknown | VirtualScrollRowData) => {
    if (isRowData(row)) {
      return row.data.length
    }

    return 1
  }

  const maxColLength = Math.max(...rows.map(row => getRowColLength(row)))

  if (!virtual || rows.length === 0 || colWidth * maxColLength <= width) {
    const scrollWidth = calcDataWidth(rows, getColWidth, getKey)
    return {
      scrollWidth: virtual ? scrollWidth : 0,
      leftIndex: rows.map(() => 0),
      rightIndex: rows.map(row => getRowColLength(row) - 1),
      offsetLeft: 0,
      renderedWidth: scrollWidth,
    }
  }

  const bufferOffsetDistance = bufferOffset * colWidth

  // skip caculation when current scroll hasent reached render window edge and size was caculated
  if (
    scrollLeft >= currentOffsetLeft + bufferOffsetDistance &&
    scrollLeft <= currentOffsetLeft + renderedWidth - width - bufferOffsetDistance &&
    !force &&
    !!bufferSize
  ) {
    return
  }

  let scrollWidth = 0
  let _renderedWidth = 0
  let offsetLeft = 0
  const windowRenderSize = colWidth ? Math.ceil(width / colWidth) : 0
  const leftIndex: number[] = []
  const rightIndex: number[] = []

  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    const row = rows[rowIndex]

    if (!isRowData(row)) {
      leftIndex.push(0)
      rightIndex.push(0)
      continue
    }

    const rowKey = getKey(row)
    let rowWidth = 0
    let rowOffset = 0
    let left: number | undefined
    let right: number | undefined
    let rowRenderedWidth = 0

    for (let index = 0; index < row.data.length; index += 1) {
      const colWidth = getColWidth(rowKey, getKey(row.data[index]))
      const currentItemRight = rowWidth + colWidth

      if (currentItemRight >= scrollLeft && left === undefined) {
        left = index
        rowOffset = rowOffset ? Math.min(rowOffset, rowWidth) : rowWidth
      }

      if (left !== undefined && right === undefined) {
        rowRenderedWidth += colWidth
      }

      if (currentItemRight > scrollLeft + width && right === undefined) {
        right = index
      }

      rowWidth = currentItemRight
    }

    // Fallback to normal if not match. This code should never reach
    /* istanbul ignore next */
    if (left === undefined) {
      left = 0
    }
    if (right === undefined) {
      right = row.data.length - 1
    }

    // append items according to buffer size
    for (let index = 0; index < bufferSize; index += 1) {
      if (left !== 0) {
        left -= 1
        const appendedColWidth = getColWidth(rowKey, getKey(row.data[left]))
        rowOffset = rowOffset ? Math.max(0, rowOffset - appendedColWidth) : rowOffset
        rowRenderedWidth += appendedColWidth
      }

      if (right !== row.data.length - 1) {
        right += 1
        rowRenderedWidth += getColWidth(rowKey, getKey(row.data[right]))
      }
    }

    // size fixing
    for (let index = 0; index < getFixSize(windowRenderSize, minLength?.[rowIndex], left, right); index += 1) {
      if (right !== row.data.length - 1) {
        right += 1
        rowRenderedWidth += getColWidth(rowKey, getKey(row.data[right]))
      }
    }

    leftIndex.push(left)
    rightIndex.push(right)
    scrollWidth = Math.max(scrollWidth, rowWidth)
    _renderedWidth = Math.max(_renderedWidth, rowRenderedWidth)
    offsetLeft = offsetLeft ? Math.min(offsetLeft, rowOffset) : rowOffset
  }

  if (offsetLeft === undefined) {
    offsetLeft = 0
  }

  return {
    scrollWidth,
    leftIndex,
    rightIndex,
    offsetLeft,
    renderedWidth: _renderedWidth,
  }
}

/**
 * fix current renderSize to last renderSize
 *
 * if fixSize is over maxFixSize, list item height is very unstable,
 * size fixing will result in too many extra node render,
 * which may cause the rendered size to be extreamly large constantly
 * so we use max window render size fixing when this happens
 */
function getFixSize(windowRenderSize: number, minSize: number | undefined, start: number, end: number) {
  const renderedSize = end - start

  if (!minSize) {
    return 0
  }

  if (renderedSize > minSize) {
    return 0
  }

  return Math.max(Math.min(minSize, windowRenderSize) - renderedSize, 0)
}
