/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type {
  DndSortableDraggableOptions,
  DndSortableDraggingOverState,
  DndSortableDraggingState,
  DndSortableDropTargetOptions,
  DndSortableOptions,
  DndSortableTransferData,
} from '../../types'

import { type ComputedRef, computed } from 'vue'

import { disableNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/disable-native-drag-preview'
import { pointerOutsideOfPreview } from '@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview'
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview'

import { type VKey, convertCssPixel, useState } from '@idux/cdk/utils'

import { useDndSortableStrategy } from './useDndSortableStrategy'
import { callEventHandler, callEventHandlerWithSource, isDndSortableTransferData } from '../../utils'
import { useDndContext } from '../useDndContext'
import { useGetKey } from '../useGetKey'

export interface DndSortableContext {
  registerDraggable: (options: DndSortableDraggableOptions) => () => void
  registerDropTarget: (options: DndSortableDropTargetOptions) => () => void
  draggingOverState: ComputedRef<DndSortableDraggingOverState | null>
  draggingState: ComputedRef<DndSortableDraggingState | null>
}

export function useDndSortable(options: DndSortableOptions): DndSortableContext {
  const {
    getKey,
    direction,
    preview,
    isSticky,
    canDrag,
    canDrop,
    onDrag,
    onDragStart,
    onDragEnter,
    onDragLeave,
    onDrop,
    onSortReorder,
    onSortChange,
  } = options

  const mergedGetKey = useGetKey(getKey)
  const mergedDirection = computed(() => {
    if (!direction?.value) {
      return 'vertical'
    }

    return direction.value
  })

  const [draggingState, setDraggingState] = useState<DndSortableDraggingState | null>(null)

  const strategyContext = useDndSortableStrategy(options, mergedDirection, mergedGetKey)

  const getListData = (key: VKey) => strategyContext.getData(key)
  const getListDataIndex = (key: VKey) => strategyContext.getDataIndex(key)
  const listDataExists = (key: VKey) => strategyContext.dataExists(key)

  const reorderDataSource = (args: { sourceData: DndSortableTransferData; targetData: DndSortableTransferData }) => {
    const result = strategyContext.reorder(args)

    if (!result) {
      return
    }

    const { newData, oldData, reorderInfo } = result

    onSortReorder?.(reorderInfo)
    onSortChange?.(newData, oldData)
  }

  const { registerDraggable: _registerDraggable, registerDropTarget: _registerDropTarget } = useDndContext({
    monitor: true,
    onDragStart(args) {
      const { source, location } = args
      const sourceData = source.data
      if (!isDndSortableTransferData(sourceData)) {
        return
      }

      strategyContext.eventHandlers.onDragStart?.(args)
      setDraggingState({ key: sourceData.key, data: sourceData.listData, index: sourceData.listDataIndex })

      callEventHandler(onDragStart, sourceData, location)
    },
    onDrag(args) {
      const { source, location } = args

      const sourceData = source.data

      strategyContext.eventHandlers.onDrag?.(args)
      callEventHandler(onDrag, sourceData, location)
    },
    onDragOfTarget(args) {
      strategyContext.eventHandlers.onDragOfTarget?.(args)
    },
    onDragEnter(args) {
      const { self, source, location } = args

      strategyContext.eventHandlers.onDragEnter?.(args)
      callEventHandlerWithSource(onDragEnter, self.data, source.data, location)
    },
    onDragLeave(args) {
      const { self, source, location } = args

      strategyContext.eventHandlers.onDragLeave?.(args)
      callEventHandlerWithSource(onDragLeave, self.data, source.data, location)
    },
    onDrop(args) {
      const { source, location } = args
      setDraggingState(null)
      strategyContext.eventHandlers.onDrop?.(args)
      const target = location.current.dropTargets[0]
      if (!target) {
        callEventHandlerWithSource(onDrop, undefined, undefined, location)
        return
      }

      const sourceData = source.data
      const targetData = target.data

      if (!isDndSortableTransferData(sourceData) || !isDndSortableTransferData(targetData)) {
        callEventHandlerWithSource(onDrop, targetData, sourceData, location)
        return
      }

      if (
        listDataExists(mergedGetKey.value(sourceData.listData)) &&
        listDataExists(mergedGetKey.value(targetData.listData))
      ) {
        reorderDataSource({
          sourceData,
          targetData,
        })
      }

      callEventHandlerWithSource(onDrop, targetData, sourceData, location)
    },
  })

  const registerDraggable = (options: DndSortableDraggableOptions) => {
    const { getInitialData, canDrag: innerCanDrag, key, onGenerateDragPreview, preview: itemPreview, ...rest } = options
    return _registerDraggable({
      ...rest,
      getInitialData(args) {
        const listData = getListData(key)
        const listDataIndex = getListDataIndex(key)

        return {
          ...(getInitialData?.(args) ?? {}),
          key,
          listData,
          listDataIndex,
        }
      },
      canDrag(args) {
        if (!listDataExists(key)) {
          return false
        }

        if (!canDrag && !innerCanDrag) {
          return true
        }

        const sourceData = getListData(key)
        const sourceIndex = getListDataIndex(key)

        const canDragOptions = { sourceKey: key, sourceData, sourceIndex }

        const listCanDrag = canDrag ? (canDrag(canDragOptions) ?? true) : true
        const itemCanDrag = innerCanDrag ? (innerCanDrag({ ...args, ...canDragOptions }) ?? true) : true

        return listCanDrag && itemCanDrag
      },
      onGenerateDragPreview(args) {
        if (onGenerateDragPreview) {
          onGenerateDragPreview(args)
          return
        }

        const {
          nativeSetDragImage,
          source: { data: sourceData },
        } = args

        if (!isDndSortableTransferData(sourceData)) {
          return
        }

        const listPreview = preview?.value

        if (listPreview === false || itemPreview === false) {
          disableNativeDragPreview({ nativeSetDragImage })
          return
        }

        const mergedPreview = itemPreview ?? listPreview

        if (mergedPreview === true || !mergedPreview) {
          return
        }

        const { offset, mount, unmount } = mergedPreview
        setCustomNativeDragPreview({
          nativeSetDragImage,
          getOffset: offset
            ? pointerOutsideOfPreview({ x: convertCssPixel(offset.x), y: convertCssPixel(offset.y) })
            : undefined,
          render({ container }) {
            const previewState = { key, data: sourceData.listData, index: sourceData.listDataIndex, container }

            // this is hack for large preview to render with less transparency gradient
            Object.assign(container.style, {
              width: '1000px',
              height: '1000px',
            })
            mount?.(previewState)

            return () => {
              unmount?.(previewState)
            }
          },
        })
      },
    })
  }

  const registerDropTarget = (options: DndSortableDropTargetOptions) => {
    const {
      key,
      element,
      direction,
      canDrop: innerCanDrop,
      isSticky: itemIsSticky,
      getIsSticky,
      getData,
      onDrag,
      onDragLeave,
      onDrop,
      ...rest
    } = options
    return _registerDropTarget({
      element,
      ...rest,
      getData(args) {
        const listData = getListData(key)
        const listDataIndex = getListDataIndex(key)
        const data = {
          ...(getData?.(args) ?? {}),
          key,
          direction,
          listData,
          listDataIndex,
        }

        return strategyContext.getDropTargetData
          ? strategyContext.getDropTargetData(args, data as DndSortableTransferData)
          : data
      },
      getIsSticky(args) {
        if (getIsSticky) {
          return getIsSticky(args)
        }

        const options = {
          key,
          data: getListData(key),
          index: getListDataIndex(key),
        }

        return !!(itemIsSticky?.(options) ?? isSticky?.(options))
      },
      canDrop(args) {
        if (!listDataExists(key)) {
          return false
        }

        if (!canDrop && !innerCanDrop) {
          return true
        }

        const targetData = getListData(key)
        const targetIndex = getListDataIndex(key)
        const { key: sourceKey, data: sourceData, index: sourceIndex } = draggingState.value ?? {}

        const canDropOptions = { sourceKey, sourceData, sourceIndex, targetKey: key, targetData, targetIndex }

        const listCanDrop = canDrop ? (canDrop(canDropOptions) ?? true) : true
        const itemCanDrop = innerCanDrop ? (innerCanDrop({ ...args, ...canDropOptions }) ?? true) : true
        return listCanDrop && itemCanDrop
      },
    })
  }

  return {
    registerDraggable,
    registerDropTarget,
    draggingState,
    draggingOverState: strategyContext.draggingOverState,
  }
}
