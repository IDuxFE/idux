/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { GetKey } from './useGetKey'
import type { SyncScroll } from './useScrollPlacement'
import type { VirtualScrollProps, VirtualScrollToFn, VirtualScrollToOptions } from '../types'
import type { VKey } from '@idux/cdk/utils'
import type { ComputedRef, Ref } from 'vue'

import { isNil } from 'lodash-es'

import { Logger, cancelRAF, rAF } from '@idux/cdk/utils'

import { isRowData } from '../utils'

enum TargetAlign {
  start = -1,
  end = 1,
}

export function useScrollTo(
  props: VirtualScrollProps,
  holderRef: Ref<HTMLElement | undefined>,
  getKey: ComputedRef<GetKey>,
  getRowHeight: (rowKey: VKey) => number,
  getColWidth: (rowKey: VKey, colKey: VKey) => number,
  syncScroll: SyncScroll,
): VirtualScrollToFn {
  let refId: number

  return (option?: number | VirtualScrollToOptions) => {
    if (isNil(option)) {
      return
    }

    // Normal scroll logic
    cancelRAF(refId)

    if (typeof option === 'number') {
      syncScroll({ top: option }, true)
    } else if (typeof option === 'object') {
      if ('top' in option || 'left' in option) {
        syncScroll({ top: option.top, left: option.left }, true)
        return
      }

      const {
        align,
        verticalAlign: _verticalAlign,
        horizontalAlign,
        offset,
        verticalOffset: _verticalOffset,
        horizontalOffset = 0,
      } = option
      const verticalAlign = _verticalAlign ?? align
      const verticalOffset = _verticalOffset ?? offset ?? 0

      if (offset) {
        Logger.warn('cdk/scroll', 'scrollTo option `offset` is deprecated, use verticalOffset instead')
      }
      if (align) {
        Logger.warn('cdk/scroll', 'scrollTo option `align` is deprecated, use verticalAlign instead')
      }

      const { rowIndex, colIndex } = calcScrollIndex(option, props.dataSource, getKey.value)

      // We will retry 3 times in case dynamic height shaking
      const _syncScroll = (
        times: number,
        verticalAlign: 'top' | 'bottom' | 'auto' | undefined,
        horizontalAlign: 'start' | 'end' | 'auto' | undefined,
      ) => {
        const holderElement = holderRef.value
        if (times < 0 || !holderElement) {
          return
        }

        const height = holderElement.clientHeight
        const width = holderElement.clientWidth
        let targetVerticalAlign: 'top' | 'bottom' | undefined
        let targetHorizontalAlign: 'start' | 'end' | undefined

        // Go to next frame if height not exist
        if (height > 0 && width > 0) {
          const { itemTop, itemBottom, itemLeft, itemRight } = calcScrollToState(
            props.dataSource,
            rowIndex,
            colIndex,
            getKey.value,
            getRowHeight,
            getColWidth,
          )

          const { scrollTop, scrollLeft } = holderElement
          let targetTop
          let targetLeft
          ;({ targetVerticalAlign, targetTop } = calcVerticalScrollTarget(
            verticalAlign,
            verticalOffset,
            itemTop,
            itemBottom,
            height,
            scrollTop,
          ))
          ;({ targetHorizontalAlign, targetLeft } = calcHorizontalScrollTarget(
            horizontalAlign,
            horizontalOffset,
            itemLeft,
            itemRight,
            width,
            scrollLeft,
          ))

          if ((!isNil(targetTop) && targetTop !== scrollTop) || (!isNil(targetLeft) && targetLeft !== scrollLeft)) {
            syncScroll({ top: targetTop, left: targetLeft }, true)
          }
        }

        // We will retry since element may not sync height as it described
        refId = rAF(() => {
          _syncScroll(times - 1, targetVerticalAlign, targetHorizontalAlign)
        })
      }

      _syncScroll(3, verticalAlign, horizontalAlign)
    }
  }
}

function calcScrollIndex(option: VirtualScrollToOptions, dataSource: unknown[], getKey: GetKey) {
  let rowIndex: number | undefined
  let colIndex: number | undefined

  if ('rowIndex' in option || 'index' in option) {
    if ('index' in option) {
      Logger.warn('cdk/scroll', 'scrollTo option `index` is deprecated, use rowIndex instead')
    }

    rowIndex = option.rowIndex ?? option.index
    colIndex = option.colIndex
  } else if ('rowKey' in option || 'key' in option) {
    if ('key' in option) {
      Logger.warn('cdk/scroll', 'scrollTo option `key` is deprecated, use rowKey instead')
    }

    const rowKey = option.rowKey ?? option.key
    rowIndex = dataSource.findIndex(item => getKey(item) === rowKey)

    const row = dataSource[rowIndex]

    if (rowIndex > -1 && isRowData(row) && option.colKey) {
      colIndex = row.data.findIndex(item => getKey(item) === option.colKey)
    }
  }

  return {
    rowIndex: rowIndex && rowIndex > -1 ? rowIndex : undefined,
    colIndex: colIndex && colIndex > -1 ? colIndex : undefined,
  }
}

function calcScrollToState(
  dataSource: unknown[],
  rowIndex: number | undefined,
  colIndex: number | undefined,
  getKey: GetKey,
  getRowHeight: (rowKey: VKey) => number,
  getColWidth: (rowKey: VKey, colKey: VKey) => number,
) {
  let stackTop = 0
  let stackLeft = 0
  let itemTop: number | undefined
  let itemBottom: number | undefined
  let itemLeft: number | undefined
  let itemRight: number | undefined

  if (rowIndex) {
    for (let ri = 0; ri <= rowIndex; ri++) {
      const row = dataSource[ri]
      const rowKey = getKey(row)
      itemTop = stackTop
      itemBottom = itemTop + getRowHeight(rowKey)
      stackTop = itemBottom

      if (ri === rowIndex && !isNil(colIndex) && isRowData(row)) {
        const columns = row.data
        for (let ci = 0; ci <= colIndex; ci++) {
          const col = columns[ci]
          const colKey = getKey(col)
          itemLeft = stackLeft
          itemRight = itemLeft + getColWidth(rowKey, colKey)
          stackLeft = itemRight
        }
      }
    }
  }

  return {
    itemTop,
    itemBottom,
    itemLeft,
    itemRight,
  }
}

function calcVerticalScrollTarget(
  align: 'top' | 'bottom' | 'auto' | undefined,
  offset: number,
  itemTop: number | undefined,
  itemBottom: number | undefined,
  containerHeight: number,
  containerScrollTop: number,
): {
  targetVerticalAlign: 'top' | 'bottom' | undefined
  targetTop: number | undefined
} {
  if (isNil(itemTop) || isNil(itemBottom)) {
    return {
      targetVerticalAlign: align === 'auto' ? undefined : align,
      targetTop: undefined,
    }
  }

  const { targetOffset, targetAlign } = _calcScrollTarget(
    align === 'top' ? TargetAlign.start : align === 'bottom' ? TargetAlign.end : undefined,
    offset,
    itemTop,
    itemBottom,
    containerHeight,
    containerScrollTop,
  )

  return {
    targetVerticalAlign: targetAlign && (targetAlign === TargetAlign.start ? 'top' : 'bottom'),
    targetTop: targetOffset,
  }
}

function calcHorizontalScrollTarget(
  align: 'start' | 'end' | 'auto' | undefined,
  offset: number,
  itemLeft: number | undefined,
  itemRight: number | undefined,
  containerWidth: number,
  containerScrollLeft: number,
): {
  targetHorizontalAlign: 'start' | 'end' | undefined
  targetLeft: number | undefined
} {
  if (isNil(itemLeft) || isNil(itemRight)) {
    return {
      targetHorizontalAlign: align === 'auto' ? undefined : align,
      targetLeft: undefined,
    }
  }

  const { targetOffset, targetAlign } = _calcScrollTarget(
    align === 'start' ? TargetAlign.start : align === 'end' ? TargetAlign.end : undefined,
    offset,
    itemLeft,
    itemRight,
    containerWidth,
    containerScrollLeft,
  )

  return {
    targetHorizontalAlign: targetAlign && (targetAlign === TargetAlign.start ? 'start' : 'end'),
    targetLeft: targetOffset,
  }
}

function _calcScrollTarget(
  align: TargetAlign | undefined,
  offset: number,
  itemStart: number,
  itemEnd: number,
  containerSize: number,
  containerScrollStart: number,
) {
  let targetOffset: number | undefined
  let targetAlign: TargetAlign | undefined

  if (!align) {
    const containerScrollEnd = containerScrollStart + containerSize
    if (itemStart < containerScrollStart) {
      targetAlign = TargetAlign.start
    } else if (itemEnd > containerScrollEnd) {
      targetAlign = TargetAlign.end
    }
  } else {
    targetAlign = align
  }

  switch (align) {
    case TargetAlign.start:
      targetOffset = Math.max(itemStart - offset, 0)
      break
    case TargetAlign.end:
      targetOffset = Math.max(itemEnd - containerSize + offset, 0)
      break

    default:
      break
  }

  return {
    targetOffset,
    targetAlign,
  }
}
