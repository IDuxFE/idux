/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { BoundaryType, DnDEvent, DragPosition } from '../types'
import type { DnDContext } from './useDragDropContext'

import { type ComputedRef, computed, toRaw, watch } from 'vue'

import { type MaybeElementRef, convertElement, tryOnScopeDispose, useEventListener } from '@idux/cdk/utils'

import { initContext } from '../utils'
import { withDragFree } from './withDragFree'
import { withDragHandle } from './withDragHandle'

export interface DraggableOptions {
  /**
   * 作为限制拖拽范围的元素，需自定义droppable时需指定为空
   */
  boundary?: BoundaryType
  /**
   * 指定是否可以拖拽
   */
  free?: boolean
  /**
   * 拖拽把手
   */
  handle?: MaybeElementRef

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
): {
  canDrop: ComputedRef<boolean>
  dragging: ComputedRef<boolean>
  position: ComputedRef<DragPosition>
  reset: () => void
  stop: () => void
} {
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
      withDragFree(source, context!)
    }

    // drag-handle
    if (options?.handle) {
      withDragHandle(source, options.handle, context!)
    }

    installBoundary()

    sourceElement.setAttribute('draggable', 'true')
    sourceElement.classList.add('cdk-draggable')
  }

  const offDraggable = (sourceElement: HTMLElement) => {
    context!.registry.off(sourceElement, 'source')

    sourceElement.setAttribute('draggable', 'false')

    sourceElement.classList.remove('cdk-draggable')
    convertElement(options?.handle)?.classList.remove('cdk-draggable-handle')
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
      // TODO: the calc way has scale problem
      offsetLeft: newT.pageX - oldT.pageX,
      offsetTop: newT.pageY - oldT.pageY,
    }
  }

  const onPointerDown = (evt: MouseEvent) => {
    context!.registry.exec(source, 'source', 'pointerdown', [evt as DragEvent])
  }

  const onPointerUp = (evt: MouseEvent) => {
    context!.registry.exec(source, 'source', 'pointerup', [evt as DragEvent])
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

  const reset = () => {
    firstPosition = null
    if (options?.free) {
      convertElement(source)!.style.transform = ''
    }
  }

  const listenerStops = [
    useEventListener(source, 'dragstart', onDragStart),
    useEventListener(source, 'drag', onDrag),
    useEventListener(source, 'dragend', onDragEnd),
    useEventListener(source, 'pointerdown', onPointerDown),
    useEventListener(source, 'pointerup', onPointerUp),
  ]

  const stop = () => {
    offDraggable(convertElement(source)!)
    stopWatch()
    listenerStops.forEach(listenerStop => listenerStop())
  }

  tryOnScopeDispose(stop)

  return {
    canDrop: computed(() => context!.state.canDrop.value),
    dragging: computed(() => context!.state.isDragging.value),
    position: computed(() => context!.state.currPosition.value),
    reset,
    stop,
  }
}
