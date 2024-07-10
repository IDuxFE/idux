/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type {
  DndOptions,
  DndSortableData,
  DndSortableInnerData,
  DndSortableReorderInfo,
  DndSortableStrategyContext,
  DndSortableTransferData,
  GetKey,
  TreeDraggingOverState,
} from '../../types'

import { type Ref, computed, toRaw, watch } from 'vue'

import { isArray, isNil } from 'lodash-es'

import { attachInstruction, extractInstruction } from '@atlaskit/pragmatic-drag-and-drop-hitbox/tree-item'

import { type VKey, traverseTree } from '@idux/cdk/utils'

import { isDndSortableTransferData, reorderTree } from '../../utils'

export function createTreeStrategyContext<C extends keyof V, V extends object>(options: {
  dataSource: Ref<DndSortableData<C, V>[]>
  getKey: Ref<GetKey>
  childrenKey: Ref<C>
  treeIndent: Ref<number>
  isTreeItemExpanded?: (key: VKey, data: DndSortableData<C, V>) => void
  setDraggingOverState: (state: TreeDraggingOverState | null) => void
}): DndSortableStrategyContext {
  const { dataSource, getKey, childrenKey, treeIndent, isTreeItemExpanded, setDraggingOverState } = options

  const dataContext = computed(() => {
    const dataMap = new Map<VKey, DndSortableInnerData<C, V>>()
    const parentKeyMap = new Map<VKey, VKey>()
    const depthMap = new Map<VKey, number>()

    traverseTree(dataSource.value, childrenKey.value, (item, parents, index) => {
      const key = getKey.value(item)
      const parent = parents[0]
      dataMap.set(key, { ...item, _data_index: index })
      depthMap.set(key, parents.length)

      if (parent) {
        parentKeyMap.set(key, getKey.value(parent))
      }
    })

    return {
      dataMap,
      parentKeyMap,
      depthMap,
    }
  })

  const pathToItemCache = new Map<VKey, VKey[]>()
  const isLastInGroupCache = new Map<VKey, boolean>()

  const getPathToItem = (key: VKey) => {
    if (pathToItemCache.has(key)) {
      return pathToItemCache.get(key)!
    }

    const path = []
    let current: VKey | undefined = key
    while (!isNil(current)) {
      path.unshift(current)
      current = dataContext.value.parentKeyMap.get(current)
    }

    pathToItemCache.set(key, path)

    return path
  }
  const getIsLastInGroup = (key: VKey) => {
    if (isLastInGroupCache.has(key)) {
      return isLastInGroupCache.get(key)!
    }

    const parentKey = dataContext.value.parentKeyMap.get(key)
    const dataArray = isNil(parentKey) ? dataSource.value : getData(parentKey)![childrenKey.value] ?? []
    const dataIndex = getDataIndex(key)

    const isLastInGroup = dataIndex === dataArray.length - 1

    isLastInGroupCache.set(key, isLastInGroup)

    return isLastInGroup
  }
  watch(dataContext, () => {
    pathToItemCache.clear()
    isLastInGroupCache.clear()
  })

  const getData = (key: VKey) => dataContext.value.dataMap.get(key)
  const getDataIndex = (key: VKey) => dataContext.value.dataMap.get(key)?._data_index
  const dataExists = (key: VKey) => dataContext.value.dataMap.has(key)

  const getDropTargetData: DndSortableStrategyContext['getDropTargetData'] = (args, targetData) => {
    const { input, element, source } = args
    const { key } = targetData
    const sourceData = source.data as DndSortableTransferData
    const sourceKey = sourceData.key
    const targetKey = targetData.key
    const targetTreeData = targetData.listData as DndSortableData<C, V>

    const pathToTarget = getPathToItem(targetKey)
    const isTargetChildrenOfSource = pathToTarget.includes(sourceKey)

    return attachInstruction(targetData, {
      input,
      element,
      indentPerLevel: treeIndent.value,
      currentLevel: dataContext.value.depthMap.get(key)!,
      mode: isTreeItemExpanded?.(key, targetTreeData)
        ? 'expanded'
        : getIsLastInGroup(key)
          ? 'last-in-group'
          : 'standard',
      block: isTargetChildrenOfSource
        ? ['make-child', 'reorder-above', 'reorder-below', 'reparent']
        : !isArray(targetTreeData[childrenKey.value])
          ? ['make-child']
          : undefined,
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
    const instruction = extractInstruction(targetData)

    if (!instruction) {
      return null
    }

    const sourceKey = sourceData.key
    const targetKey = targetData.key
    const sourceIndex = sourceData.listDataIndex
    const targetIndex = targetData.listDataIndex
    const oldData = toRaw(dataSource.value)

    let reorderInfo: DndSortableReorderInfo | undefined
    const pathToItem = getPathToItem(targetKey)

    if (pathToItem.includes(sourceKey)) {
      return null
    }

    if (instruction.type === 'reparent') {
      const desiredKey = pathToItem[instruction.desiredLevel]

      if (isNil(desiredKey)) {
        return null
      }

      const desiredIndex = getDataIndex(desiredKey)!

      reorderInfo = {
        sourceIndex,
        targetIndex: desiredIndex,
        sourceKey,
        targetKey: desiredKey,
        sourceData: sourceData.listData,
        targetData: getData(desiredKey)!,
        operation: 'insertAfter',
      }
    } else if (instruction.type === 'make-child') {
      reorderInfo = {
        sourceIndex,
        targetIndex,
        sourceKey,
        targetKey,
        sourceData: sourceData.listData,
        targetData,
        operation: 'insertChild',
      }
    } else if (instruction.type === 'reorder-above') {
      reorderInfo = {
        sourceIndex,
        targetIndex,
        sourceKey,
        targetKey,
        sourceData: sourceData.listData,
        targetData,
        operation: 'insertBefore',
      }
    } else if (instruction.type === 'reorder-below') {
      reorderInfo = {
        sourceIndex,
        targetIndex,
        sourceKey,
        targetKey,
        sourceData: sourceData.listData,
        targetData,
        operation: 'insertAfter',
      }
    }

    if (!reorderInfo) {
      return null
    }

    const newData = reorderTree(oldData, reorderInfo, childrenKey.value, getKey.value)

    return {
      oldData,
      newData,
      reorderInfo,
    }
  }

  const onDragOfTarget: DndOptions['onDragOfTarget'] = args => {
    const { self, source } = args

    const sourceData = source.data
    const targetData = self.data

    if (!isDndSortableTransferData(sourceData) || !isDndSortableTransferData(targetData)) {
      setDraggingOverState(null)
      return
    }

    const targetIndex = targetData.listDataIndex
    const instruction = extractInstruction(targetData)
    const { parentKeyMap, depthMap } = dataContext.value
    const targetKey = targetData.key
    const parentKey = parentKeyMap.get(targetKey)

    if (sourceData.key !== targetData.key || instruction?.type === 'reparent') {
      setDraggingOverState({
        key: targetKey,
        data: targetData,
        index: targetIndex,
        instruction: instruction
          ? {
              ...instruction,
              parent: !isNil(parentKey)
                ? {
                    key: parentKey,
                    level: depthMap.get(parentKey)!,
                  }
                : undefined,
            }
          : null,
      })
      return
    }

    setDraggingOverState(null)
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
    getDropTargetData,
    dataExists,
    reorder,
    eventHandlers: {
      onDragOfTarget,
      onDragLeave,
      onDrop,
    },
  }
}
