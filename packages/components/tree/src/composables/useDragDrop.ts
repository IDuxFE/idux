/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, type Ref, computed, onBeforeUnmount, ref } from 'vue'

import { isNil } from 'lodash-es'

import { type VKey, callEmit } from '@idux/cdk/utils'
import { TreeConfig } from '@idux/components/config'

import { type MergedNode } from './useDataSource'
import { type ExpandableContext } from './useExpandable'
import { type TreeDropType, type TreeDroppable, type TreeProps } from '../types'
import { getChildrenKeys } from '../utils'

export interface DragDropContext {
  draggableIcon: ComputedRef<string>
  dragKey: ComputedRef<VKey | undefined>
  dropKey: ComputedRef<VKey | undefined>
  dropParentKey: Ref<VKey | undefined>
  dropType: Ref<TreeDropType | undefined>
  handleDragstart: (evt: DragEvent, node: MergedNode) => void
  handleDragend: (evt: DragEvent, node: MergedNode) => void
  handleDragenter: (evt: DragEvent, node: MergedNode) => void
  handleDragover: (evt: DragEvent, node: MergedNode) => void
  handleDragleave: (evt: DragEvent, node: MergedNode) => void
  handleDrop: (evt: DragEvent, node: MergedNode) => void
}

export function useDragDrop(
  props: TreeProps,
  config: TreeConfig,
  { expandedKeys, setExpandedKeys }: ExpandableContext,
): DragDropContext {
  const draggableIcon = computed(() => props.draggableIcon ?? config.draggableIcon)

  const dragNodeRef = ref<MergedNode>()
  const dragChildrenKeys = ref<VKey[]>()

  const dropNodeRef = ref<MergedNode>()
  const dropParentKey = ref<VKey>()
  const dropType = ref<TreeDropType>()

  let dragTimer: number | undefined

  const clearTimer = () => {
    if (dragTimer) {
      clearTimeout(dragTimer)
      dragTimer = undefined
    }
  }

  onBeforeUnmount(() => clearTimer())

  const cleanDragState = () => {
    if (!isNil(dragNodeRef.value)) {
      dragNodeRef.value = undefined
      dragChildrenKeys.value = undefined
    }
  }

  const cleanDropState = () => {
    if (!isNil(dropNodeRef.value)) {
      dropNodeRef.value = undefined
      dropParentKey.value = undefined
      dropType.value = undefined
    }
  }

  const getDragDropOptions = (evt: DragEvent, node: MergedNode) => {
    return {
      evt,
      node: node.rawNode,
      dragNode: dragNodeRef.value?.rawNode,
      dropNode: dropNodeRef.value?.rawNode,
      dropType: dropType.value,
    }
  }

  const handleWindowDragend = (evt: DragEvent) => {
    handleDragend(evt, undefined)
    window.removeEventListener('dragend', handleWindowDragend)
  }

  const handleDragstart = (evt: DragEvent, node: MergedNode) => {
    dragNodeRef.value = node
    dragChildrenKeys.value = getChildrenKeys(node)

    delKey(node.key, expandedKeys.value, setExpandedKeys)

    window.addEventListener('dragend', handleWindowDragend)

    callEmit(props.onDragstart, getDragDropOptions(evt, node))
  }

  const handleDragend = (evt: DragEvent, node: MergedNode | undefined) => {
    if (node) {
      callEmit(props.onDragend, getDragDropOptions(evt, node))
    }

    cleanDragState()
    cleanDropState()
  }

  const handleDragenter = async (evt: DragEvent, node: MergedNode) => {
    const dragNode = dragNodeRef.value

    if (dragNode) {
      clearTimer()
      if (dragNode.key !== node.key) {
        dragTimer = setTimeout(() => {
          if (dragNodeRef.value && node.children?.length) {
            addKey(node.key, expandedKeys.value, setExpandedKeys)
          }
          dragTimer = undefined
        }, 1000)
      }

      const type = await calcDropType(node, dragNode, dragChildrenKeys.value, evt, props.droppable)
      if (type) {
        dropNodeRef.value = node
        dropParentKey.value = type !== 'inside' ? node.parentKey : undefined
        dropType.value = type
      } else {
        cleanDropState()
      }
    }

    callEmit(props.onDragenter, getDragDropOptions(evt, node))
  }

  const handleDragover = async (evt: DragEvent, node: MergedNode) => {
    const dragNode = dragNodeRef.value

    if (dragNode) {
      const type = await calcDropType(node, dragNode, dragChildrenKeys.value, evt, props.droppable)
      if (type) {
        dropNodeRef.value = node
        dropParentKey.value = type !== 'inside' ? node.parentKey : undefined
        dropType.value = type
      } else {
        cleanDropState()
      }
    }

    callEmit(props.onDragover, getDragDropOptions(evt, node))
  }

  const handleDragleave = (evt: DragEvent, node: MergedNode) => {
    const dropNode = dropNodeRef.value
    if (dropNode?.key === node.key && !(evt.currentTarget as HTMLDivElement).contains(evt.relatedTarget as Node)) {
      cleanDropState()
    }

    callEmit(props.onDragleave, getDragDropOptions(evt, node))
  }

  const handleDrop = (evt: DragEvent, node: MergedNode) => {
    if (!dropType.value) {
      cleanDropState()
    }

    callEmit(props.onDrop, getDragDropOptions(evt, node))

    cleanDragState()
    cleanDropState()
  }

  return {
    draggableIcon,
    dragKey: computed(() => dragNodeRef.value?.key),
    dropKey: computed(() => dropNodeRef.value?.key),
    dropParentKey,
    dropType,
    handleDragstart,
    handleDragend,
    handleDragenter,
    handleDragover,
    handleDragleave,
    handleDrop,
  }
}

function addKey(key: VKey, keys: VKey[], setKeys: (keys: VKey[]) => void) {
  const index = keys.indexOf(key)
  if (index === -1) {
    setKeys([...keys, key])
  }
}

function delKey(key: VKey, keys: VKey[], setKeys: (keys: VKey[]) => void) {
  const index = keys.indexOf(key)
  if (index !== -1) {
    const tempKeys = [...keys]
    tempKeys.splice(index, 1)
    setKeys(tempKeys)
  }
}

async function calcDropType(
  dropNode: MergedNode,
  dragNode: MergedNode,
  dragChildrenKeys: VKey[] | undefined,
  evt: DragEvent,
  droppable?: TreeDroppable,
) {
  const { key: dropKey, children: dropChildren = [] } = dropNode
  if (dragNode.key === dropKey || (dragChildrenKeys && dragChildrenKeys.includes(dropKey))) {
    return false
  }

  const { clientY } = evt
  const { top, height } = (evt.target as HTMLElement).getBoundingClientRect()
  const isTopHalf = clientY < top + height / 2

  let dropType: TreeDropType | boolean | undefined

  if (droppable) {
    const dropOptions = { evt, isTopHalf, dragNode: dragNode.rawNode, dropNode: dropNode.rawNode }
    dropType = await droppable(dropOptions)
  }

  if (dropType === undefined || dropType === true) {
    if (dropChildren.length > 0) {
      dropType = 'inside'
    } else if (isTopHalf) {
      dropType = 'before'
    } else {
      dropType = 'after'
    }
  }

  return dropType
}
