/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, onMounted, onUnmounted, provide, shallowRef, watch } from 'vue'

import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'

import { VKey, callEmit } from '@idux/cdk/utils'

import DndBoxIndicator from '../indicator/DndBoxIndicator'
import DndTreeIndicator from '../indicator/DndTreeIndicator'
import { dndSortableItemToken, dndSortableToken } from '../tokens'
import {
  type CanDragOptions,
  type CanDropOptions,
  type DndSortableIsStickyOptions,
  type DndSortableOnDragArgs,
  type DndSortableOnDragEnterArgs,
  type DndSortableOnDragLeaveArgs,
  type DndSortableOnDragStartArgs,
  type DndSortableOnDropArgs,
  type ListDraggingOverState,
  type TreeDraggingOverState,
  dndSortableItemProps,
} from '../types'
import { callEventHandler, callEventHandlerWithSource, getMergedCanFn, triggerPostMoveFlash } from '../utils'

export default defineComponent({
  name: 'DndSortableItem',
  props: dndSortableItemProps,
  setup(props, { slots }) {
    const {
      mergedStrategy,
      mergedEffect,
      draggingOverState,
      draggingState,
      lastMovedKey,
      registerDraggable,
      registerDropTarget,
    } = inject(dndSortableToken)!

    const listItemRef = shallowRef<HTMLElement>()
    const dragHandleRef = shallowRef<HTMLElement>()

    const mergedCanDrag = getMergedCanFn<CanDragOptions>(() => props.canDrag)
    const mergedCanDrop = getMergedCanFn<CanDropOptions>(() => props.canDrop)
    const mergedIsSticky = getMergedCanFn<DndSortableIsStickyOptions>(() => props.isSticky)

    const isDragging = computed(() => draggingState.value?.key === props.itemKey)
    const resolvedDraggingOverState = computed(() =>
      draggingOverState.value?.key === props.itemKey ? draggingOverState.value : null,
    )

    const classes = computed(() => {
      const prefixCls = 'cdk-dnd-sortable-item'

      return {
        [prefixCls]: true,
        [`${prefixCls}-dragging`]: isDragging.value,
        [`${prefixCls}-dragging-over`]: !!resolvedDraggingOverState.value,
      }
    })

    const setDragHandle = (dragHandle: HTMLElement | undefined) => {
      dragHandleRef.value = dragHandle
    }

    const onDragStart = (args: DndSortableOnDragStartArgs) => {
      callEmit(props.onDragStart, args)
    }
    const onDrag = (args: DndSortableOnDragArgs) => {
      callEmit(props.onDrag, args)
    }
    const onDragEnter = (args: DndSortableOnDragEnterArgs) => {
      callEmit(props.onDragEnter, args)
    }
    const onDragLeave = (args: DndSortableOnDragLeaveArgs) => {
      callEmit(props.onDragEnter, args)
    }
    const onDrop = (args: DndSortableOnDropArgs) => {
      callEmit(props.onDrop, args)
    }

    let cleanUp: (() => void) | undefined

    const init = () => {
      if (!listItemRef.value) {
        return
      }

      cleanUp?.()
      cleanUp = combine(
        registerDraggable({
          key: props.itemKey,
          element: listItemRef.value,
          dragHandle: dragHandleRef.value,
          canDrag: mergedCanDrag,
          onDragStart(args) {
            const { source, location } = args
            callEventHandler(onDragStart, source.data, location)
          },
          onDrag(args) {
            const { source, location } = args
            callEventHandler(onDrag, source.data, location)
          },
        }),
        registerDropTarget({
          key: props.itemKey,
          element: listItemRef.value,
          canDrop: mergedCanDrop,
          isSticky: mergedIsSticky,
          onDragEnter(args) {
            const { self, source, location } = args
            callEventHandlerWithSource(onDragEnter, self.data, source.data, location)
          },
          onDragLeave(args) {
            const { self, source, location } = args
            callEventHandlerWithSource(onDragLeave, self.data, source.data, location)
          },
          onDrop(args) {
            const { self, source, location } = args
            callEventHandlerWithSource(onDrop, self.data, source.data, location)
          },
        }),
      )
    }
    const destroy = () => {
      cleanUp?.()
    }

    provide(dndSortableItemToken, {
      setDragHandle,
    })

    watch([dragHandleRef, () => props.itemKey], init)
    watch(lastMovedKey, key => {
      if (key === props.itemKey && listItemRef.value) {
        triggerPostMoveFlash(listItemRef.value)
      }
    })

    onMounted(init)
    onUnmounted(destroy)

    const renderIndicator = () => {
      if (mergedEffect.value !== 'indicator') {
        return
      }

      const state = resolvedDraggingOverState.value
      if (!state) {
        return
      }

      if (mergedStrategy.value === 'list') {
        return renderEdgeIndicator(state as ListDraggingOverState)
      }

      if (mergedStrategy.value === 'tree') {
        return renderTreeIndicator(state as TreeDraggingOverState, props.itemKey)
      }

      return
    }

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Tag = (props.tag as any) ?? 'div'

      return (
        <Tag class={classes.value} ref={listItemRef}>
          {slots.default?.({
            isDragging: isDragging.value,
            draggingState: draggingOverState.value,
            draggingOverState: resolvedDraggingOverState.value,
          })}
          {renderIndicator()}
        </Tag>
      )
    }
  },
})

function renderEdgeIndicator(state: ListDraggingOverState) {
  const edge = state.instruction?.edge
  if (!edge) {
    return
  }

  return <DndBoxIndicator edge={edge} />
}
function renderTreeIndicator(state: TreeDraggingOverState, key: VKey) {
  const instruction = state.instruction
  if (!instruction || instruction.type === 'instruction-blocked') {
    return
  }

  if (instruction.parent && instruction.parent.key === key) {
    return (
      <DndTreeIndicator
        instruction={{
          type: 'mark-parent',
          currentLevel: instruction.parent.level,
          indentPerLevel: instruction.indentPerLevel,
        }}
      />
    )
  }

  if (state.key === key) {
    return <DndTreeIndicator instruction={instruction} />
  }

  return
}
