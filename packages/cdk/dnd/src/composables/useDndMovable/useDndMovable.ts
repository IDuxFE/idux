/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DndMovableOptions, DndOptions, Position } from '../../types'

import { type ComputedRef, watch } from 'vue'

import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import { disableNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/disable-native-drag-preview'
import { pointerOutsideOfPreview } from '@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview'
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview'

import { convertCssPixel, tryOnScopeDispose } from '@idux/cdk/utils'

import { useMovablePosition } from './useMovablePosition'
import { useResolvedOptions } from './useResolvedOptions'
import { isInBoundary, keepInBoundary } from '../../utils'
import { useDndContext } from '../useDndContext'

export interface DndMovableContext {
  init: () => void
  position: ComputedRef<Position>
  offset: ComputedRef<Position>
}

export function useDndMovable(options: DndMovableOptions): DndMovableContext {
  const {
    mode,
    allowedAxis,
    strategy,
    canDrag,
    draggableElement,
    dropTargets,
    boundary,
    dragHandle,
    preview,
    onDragStart,
    onDrag,
    onDrop,
    ...rest
  } = useResolvedOptions(options)

  const {
    position,
    offset,
    init: initPosition,
    start,
    end,
    update,
  } = useMovablePosition(draggableElement, strategy, boundary, allowedAxis)

  let currentTarget: Element | null = null

  const onMovableItemDrop: DndOptions['onDrop'] = args => {
    if (!draggableElement.value || mode.value !== 'afterDrop') {
      return
    }

    const {
      location: {
        current: {
          input: { clientX, clientY },
        },
        initial: {
          input: { clientX: initialX, clientY: initialY },
        },
      },
    } = args

    if (!dropTargets.value?.length) {
      update({
        x: clientX,
        y: clientY,
      })
      return
    }

    const elementRect = draggableElement.value.getBoundingClientRect()
    const currentOffset = {
      x: clientX - initialX,
      y: clientY - initialY,
    }
    const dropTarget = dropTargets.value.find(target =>
      isInBoundary(elementRect, target.getBoundingClientRect(), currentOffset),
    )

    if (dropTarget) {
      currentTarget = dropTarget
      update({
        x: clientX,
        y: clientY,
      })
      return
    }

    if (currentTarget) {
      const { x, y } = keepInBoundary(elementRect, currentTarget.getBoundingClientRect(), currentOffset)
      update({
        x: x + initialX,
        y: y + initialY,
      })
    }
  }

  const { registerDraggable, registerDropTarget } = useDndContext({
    monitor: false,
    ...rest,
    onDragStart(args) {
      const {
        location: {
          initial: {
            input: { clientX, clientY },
          },
        },
      } = args

      start({ x: clientX, y: clientY })
      onDragStart?.(args)
    },
    onDrag(args) {
      const {
        location: {
          current: {
            input: { clientX, clientY },
          },
        },
      } = args

      if (mode.value === 'immediate') {
        update({
          x: clientX,
          y: clientY,
        })
      }

      onDrag?.(args)
    },
    onDrop(args) {
      onMovableItemDrop(args)
      end()
      onDrop?.(args)
    },
  })

  let draggableCleanup: (() => void) | undefined
  let dropTargetCleanup: (() => void) | undefined

  watch(
    [draggableElement, dragHandle],
    ([element, handleEl]) => {
      draggableCleanup?.()

      if (!element) {
        return
      }

      draggableCleanup = registerDraggable({
        element,
        dragHandle: handleEl ?? undefined,
        canDrag() {
          return canDrag.value
        },
        onGenerateDragPreview({ nativeSetDragImage }) {
          if (mode.value === 'immediate' || preview.value === false) {
            disableNativeDragPreview({ nativeSetDragImage })
            return
          }

          if (preview.value === true || !preview.value) {
            return
          }

          const { offset, mount, unmount } = preview.value
          setCustomNativeDragPreview({
            nativeSetDragImage,
            getOffset: offset
              ? pointerOutsideOfPreview({ x: convertCssPixel(offset.x), y: convertCssPixel(offset.y) })
              : undefined,
            render({ container }) {
              // this is hack for large preview to render with less transparency gradient
              Object.assign(container.style, {
                width: '1000px',
                height: '1000px',
              })
              mount?.({ container })

              return () => {
                unmount?.({ container })
              }
            },
          })
        },
      })
    },
    {
      immediate: true,
    },
  )

  watch(
    dropTargets,
    targets => {
      dropTargetCleanup?.()

      if (!targets?.length) {
        return
      }

      dropTargetCleanup = combine(
        ...targets.map(target =>
          registerDropTarget({
            element: target,
          }),
        ),
      )
    },
    {
      immediate: true,
    },
  )

  const init = () => {
    currentTarget = null
    initPosition(true)
  }

  tryOnScopeDispose(() => {
    draggableCleanup?.()
    dropTargetCleanup?.()
  })

  return {
    init,
    position,
    offset,
  }
}
