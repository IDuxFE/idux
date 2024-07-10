/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type {
  DndOptions,
  DndSortableData,
  DndSortableDirection,
  DndSortableInnerData,
  DndSortableReorderInfo,
  DndSortableStrategyContext,
  DndSortableTransferData,
  GetKey,
  ListDraggingOverState,
} from '../../types'

import { type Ref, computed, toRaw } from 'vue'

import { attachClosestEdge, extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge'
import { getReorderDestinationIndex } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/get-reorder-destination-index'

import { type VKey } from '@idux/cdk/utils'

import { isDndSortableTransferData, reorderList } from '../../utils'

export function createListStrategyContext(options: {
  dataSource: Ref<DndSortableData[]>
  getKey: Ref<GetKey>
  direction: Ref<DndSortableDirection>
  setDraggingOverState: (state: ListDraggingOverState | null) => void
}): DndSortableStrategyContext {
  const { dataSource, getKey, direction, setDraggingOverState } = options
  const dataMap = computed(() => {
    const map = new Map<VKey, DndSortableInnerData>()

    dataSource.value.forEach((data, index) => {
      const key = getKey.value(data)
      map.set(key, { ...data, _data_index: index })
    })

    return map
  })

  const getData = (key: VKey) => dataMap.value.get(key)
  const getDataIndex = (key: VKey) => dataMap.value.get(key)?._data_index
  const dataExists = (key: VKey) => dataMap.value.has(key)

  const getDropTargetData: DndSortableStrategyContext['getDropTargetData'] = (args, data) => {
    const { input, element } = args
    const { direction: itemDirection } = data
    return attachClosestEdge(data, {
      input,
      element,
      allowedEdges: (itemDirection ?? direction.value) === 'vertical' ? ['top', 'bottom'] : ['left', 'right'],
    })
  }

  const reorder = ({
    sourceData,
    targetData,
  }: {
    sourceData: DndSortableTransferData
    targetData: DndSortableTransferData
  }): {
    reorderInfo: DndSortableReorderInfo
    newData: DndSortableData[]
    oldData: DndSortableData[]
  } | null => {
    const sourceIndex = sourceData.listDataIndex
    const targetIndex = targetData.listDataIndex
    const itemDirection = targetData.direction

    const edge = extractClosestEdge(targetData)

    const finishIndex = getReorderDestinationIndex({
      startIndex: sourceIndex,
      closestEdgeOfTarget: edge,
      indexOfTarget: targetIndex,
      axis: itemDirection ?? direction.value,
    })

    if (finishIndex === sourceIndex) {
      return null
    }

    const oldDataSource = toRaw(dataSource.value)
    const reorderInfo = {
      sourceIndex,
      targetIndex,
      sourceKey: sourceData.key,
      targetKey: targetData.key,
      sourceData: sourceData.listData,
      targetData: targetData.listData,
      operation: finishIndex === targetIndex ? ('insertAfter' as const) : ('insertBefore' as const),
    }
    const newDataSource = reorderList(oldDataSource, reorderInfo)

    return {
      newData: newDataSource,
      oldData: oldDataSource,
      reorderInfo,
    }
  }

  const onDragOfTarget: DndOptions['onDragOfTarget'] = args => {
    const { self, source } = args

    const sourceData = source.data
    const targetData = self.data

    if (
      source.element === self.element ||
      !isDndSortableTransferData(sourceData) ||
      !isDndSortableTransferData(targetData)
    ) {
      setDraggingOverState(null)
      return
    }

    const sourceIndex = sourceData.listDataIndex
    const targetIndex = targetData.listDataIndex

    const mergedDirection = targetData.direction ?? direction.value

    const edge = extractClosestEdge(targetData)
    const isItemBeforeSource = targetIndex === sourceIndex - 1
    const isItemAfterSource = targetIndex === sourceIndex + 1

    const [beforeEdge, afterEdge] =
      mergedDirection === 'horizontal' ? (['left', 'right'] as const) : (['top', 'bottom'] as const)
    const unsortted = (isItemBeforeSource && edge === afterEdge) || (isItemAfterSource && edge === beforeEdge)

    if (unsortted) {
      setDraggingOverState(null)
      return
    }

    setDraggingOverState({
      key: targetData.key,
      data: targetData.listData,
      index: targetIndex,
      instruction: edge ? { edge } : null,
    })
  }

  const onDragLeave: DndOptions['onDragLeave'] = () => {
    setDraggingOverState(null)
  }

  const onDrop: DndOptions['onDrag'] = () => {
    setDraggingOverState(null)
  }

  return {
    getData,
    getDataIndex,
    dataExists,
    getDropTargetData,
    reorder,
    eventHandlers: {
      onDragOfTarget,
      onDragLeave,
      onDrop,
    },
  }
}
