/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed } from 'vue'

import { isString } from 'lodash-es'

import { type VKey, convertNumber } from '@idux/cdk/utils'

import { type ColumnsContext } from './useColumns'

export interface ResizableContext {
  hasResizable: ComputedRef<boolean>
  onResizeEnd: (key: VKey, width: number, offsetWidth: number) => void
}

export function useResizable({ mergedColumns, setMergedColumns, mergedColumnMap }: ColumnsContext): ResizableContext {
  const hasResizable = computed(() => mergedColumns.value.some(column => column.resizable))

  const onResizeEnd = (key: VKey, width: number, offsetWidth: number) => {
    const targetColumn = mergedColumnMap.value.get(key)
    if (!targetColumn) {
      return
    }
    /**
     * 拖拽宽度计算规则
     *
     * * 如果不存在原始的 column.width, 则直接将拖拽后的宽度赋值给 column.width
     * * 如果存在原始的 column.width, 则需要按比例进行计算: (原始宽度 * 拖拽后段都) / 当前真实渲染的宽度
     * * * 同时需要判断是否存在 minWidth, maxWidth，应满足 minWidth < 计算后的宽度 < maxWidth
     */
    const originalWidth = targetColumn.width
    const originalWidthNumber = isString(originalWidth) ? convertNumber(originalWidth.replace('px', '')) : originalWidth
    if (!originalWidthNumber) {
      targetColumn.width = width
    } else {
      const renderWidth = width - offsetWidth
      const newWidth = Math.floor(((originalWidthNumber * width) / renderWidth) * 1000) / 1000
      const { minWidth, maxWidth } = targetColumn
      const minWidthNumber = isString(minWidth) ? convertNumber(minWidth.replace('px', '')) : minWidth
      const maxWidthNumber = isString(maxWidth)
        ? convertNumber(maxWidth.replace('px', ''), Number.MAX_SAFE_INTEGER)
        : maxWidth
      if (minWidthNumber && newWidth < minWidthNumber) {
        targetColumn.width = minWidthNumber
      } else if (maxWidthNumber && newWidth > maxWidthNumber) {
        targetColumn.width = maxWidthNumber
      } else {
        targetColumn.width = newWidth
      }
    }
    setMergedColumns([...mergedColumns.value])
  }

  return { hasResizable, onResizeEnd }
}
