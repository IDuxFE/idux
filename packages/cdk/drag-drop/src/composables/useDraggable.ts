/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DnDEventName, DnDEventType, DnDPosition, DraggableOptions } from '../types'
import type { DnDContext } from './useDragDropContext'

import { type ComputedRef, computed, ref, watch } from 'vue'

import { type MaybeElementRef, convertElement, tryOnScopeDispose, useEventListener } from '@idux/cdk/utils'

import { DnDState } from '../state'
import { extraMove, initContext, reMoveElement } from '../utils'
import { withDragFree } from './withDragFree'
import { withDragHandle } from './withDragHandle'

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
  position: ComputedRef<DnDPosition>
  reset: () => void
  stop: () => void
} {
  context = initContext(context)

  const registry = context.registry!
  const stateRef = ref<DnDState>()

  const onDraggable = (sourceElement: HTMLElement) => {
    stateRef.value = new DnDState(options?.backend ?? 'native', extraMove(sourceElement))
    registry.on(sourceElement, undefined, undefined, stateRef.value)

    installHandlers(sourceElement)

    // drag-handle
    if (options?.handle) {
      withDragHandle(source, options.handle, context!)
    }

    // free drag-drop
    if (options?.free) {
      withDragFree(source, context!)
    }

    installBoundary()

    if (stateRef.value!.isNative) {
      sourceElement.setAttribute('draggable', 'true')
    }
    sourceElement.classList.add('cdk-draggable')
  }

  const offDraggable = (sourceElement: HTMLElement) => {
    registry.off(sourceElement)
    listenerStops.forEach(listenerStop => listenerStop())

    if (stateRef.value!.isNative) {
      sourceElement.setAttribute('draggable', 'false')
    }
    sourceElement.classList.remove('cdk-draggable')
    convertElement(options?.handle)?.classList.remove('cdk-draggable-handle')
  }

  const installBoundary = () => {
    // avoid repeated install listeners
    const boundaryElement = getBoundaryElement.value

    if (boundaryElement != null) {
      context?.connect(boundaryElement!, convertElement(source)!)
    }
  }

  const onDragStart = (evt: DnDEventType) => {
    if (!stateRef.value?.dragging) {
      return
    }

    const sourceEl = convertElement(source)!
    if (!stateRef.value!.isNative) {
      if (evt instanceof MouseEvent) {
        registry.exec(sourceEl, 'mousedown', [evt])
      } else {
        registry.exec(sourceEl, 'touchstart', [evt])
      }
    } else {
      registry.exec(sourceEl, 'dragstart', [evt])
    }

    options?.onDragStart?.(evt, stateRef.value!.activeTransform)
  }

  const onDrag = (evt: DnDEventType) => {
    options?.onDrag?.(evt, stateRef.value!.activeTransform)
  }

  const onDragEnd = (evt: DnDEventType) => {
    options?.onDragEnd?.(evt, stateRef.value!.activeTransform)
  }

  const onPointer = (evt: DnDEventType, eventName: DnDEventName) => {
    if (options?.handle && stateRef.value?.isNative) {
      registry.exec(convertElement(source)!, eventName, [evt])
    }
  }

  const installHandlers = (source: HTMLElement) => {
    if (!stateRef.value!.isNative) {
      registry.on(source, 'touchmove', onDrag)
      registry.on(source, 'touchend', onDragEnd)

      registry.on(source, 'mousemove', onDrag)
      registry.on(source, 'mouseup', onDragEnd)
    } else {
      registry.on(source, 'drag', onDrag)
      registry.on(source, 'dragend', onDragEnd)
    }
  }

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

  const stopWatch = watch(
    [() => convertElement(source), () => options!.free, () => options!.boundary, () => options!.backend],
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
    if (options?.free) {
      reMoveElement(convertElement(source)!)
      stateRef.value?.reset()
    }
  }

  const listenerStops = [
    useEventListener(source, 'dragstart', onDragStart),
    useEventListener(source, 'touchstart', onDragStart, { passive: true }),
    useEventListener(source, 'mousedown', onDragStart),
    useEventListener(source, 'pointerdown', evt => onPointer(evt, 'pointerdown')),
    useEventListener(source, 'pointerup', evt => onPointer(evt, 'pointerup')),
  ]

  const stop = () => {
    offDraggable(convertElement(source)!)
    stopWatch()
  }

  tryOnScopeDispose(stop)

  return {
    canDrop: computed(() => stateRef.value?.canDrop ?? false),
    dragging: computed(() => stateRef.value?.dragging ?? false),
    position: computed(() => stateRef.value?.activeTransform ?? { x: 0, y: 0 }),
    reset,
    stop,
  }
}
