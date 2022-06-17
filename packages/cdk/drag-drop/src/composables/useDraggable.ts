/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { BoundaryType, DnDEvent, DragPosition } from '../types'
import type { DnDContext } from './useDragDropContext'

import { ComputedRef, computed, onScopeDispose, toRaw, watch } from 'vue'

import { type MaybeElementRef, convertElement, useEventListener } from '@idux/cdk/utils'

import { initContext } from '../utils'
import { useDragFree } from './useDragFree'

export interface DraggableOptions {
  boundary?: BoundaryType
  free?: boolean
  onDragStart?: DnDEvent
  onDrag?: DnDEvent
  onDragEnd?: DnDEvent
}

/**
 * make a element draggable
 *
 * @param source element to be draggable
 * @param options
 * @param context default document element
 *
 */
export function useDraggable(
  source: MaybeElementRef,
  options?: DraggableOptions,
  context?: DnDContext,
): { canDrop: ComputedRef<boolean>; currPosition: ComputedRef<DragPosition>; isDragging: ComputedRef<boolean> } {
  context = initContext(context)
  let firstPosition: DragEvent | null = null

  const getBoundaryElement = computed(() => {
    switch (options?.boundary) {
      case undefined:
      case 'parent':
        return convertElement(source)?.parentElement
      case null:
        return null
      default:
        return convertElement(options?.boundary as MaybeElementRef)
    }
  })

  const onDraggable = (sourceElement: HTMLElement) => {
    context!.registry.on(sourceElement, 'source')

    // free drag-drop
    if (options?.free) {
      useDragFree(source, context!)
    }
    installBoundary()
    sourceElement.setAttribute('draggable', 'true')
    sourceElement.classList.add('cdk-draggable')
  }

  const offDraggable = (sourceElement: HTMLElement) => {
    context!.registry.off(sourceElement, 'source')

    sourceElement.setAttribute('draggable', 'false')
    sourceElement.classList.remove('cdk-draggable')
  }
  const installBoundary = () => {
    // avoid repeated install listeners
    const boundaryElement = getBoundaryElement.value

    if (boundaryElement != null) {
      context!.targets.add(boundaryElement!)
      context?.connect(boundaryElement!, convertElement(source)!)
    }
  }

  const onDragStart = (evt: DragEvent) => {
    if (!firstPosition) {
      firstPosition = evt
    }
    context!.registry.exec(source, 'source', 'dragstart', [evt])
    options?.onDragStart?.(evt, toRaw(context!.state.currPosition.value))
  }
  const onDrag = (evt: DragEvent) => {
    context!.registry.exec(source, 'source', 'drag', [evt])
    options?.onDrag?.(evt, toRaw(context!.state.currPosition.value))
  }
  const onDragEnd = (evt: DragEvent) => {
    const diffOffset = diff(firstPosition || evt, evt)
    // sync status
    context!.state.updatePosition(evt, {
      offsetX: diffOffset.offsetLeft,
      offsetY: diffOffset.offsetTop,
    })

    context!.registry.exec(source, 'source', 'dragend', [evt])
    options?.onDragEnd?.(evt, toRaw(context!.state.currPosition.value))
  }
  const diff = (oldT: DragEvent, newT: DragEvent) => {
    return {
      // fix scroll offset bug
      offsetLeft: newT.pageX - oldT.pageX,
      offsetTop: newT.pageY - oldT.pageY,
    }
  }
  const stopWatch = watch(
    [() => convertElement(source), () => options?.free, () => options?.boundary, () => context],
    ([currSourceEl], [prevSourceEl]) => {
      if (prevSourceEl) {
        offDraggable(prevSourceEl)
      }
      if (currSourceEl) {
        onDraggable(currSourceEl)
      }
    },
  )

  const stop = () => {
    offDraggable(convertElement(source)!)
    stopWatch()
  }

  useEventListener(source, 'dragstart', onDragStart)
  useEventListener(source, 'drag', onDrag)
  useEventListener(source, 'dragend', onDragEnd)

  onScopeDispose(stop)

  return {
    isDragging: computed(() => context!.state.isDragging.value),
    canDrop: computed(() => context!.state.isDragging.value),
    currPosition: computed(() => context!.state.currPosition.value),
  }
}
