/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DnDEvent } from '../types'

import { onScopeDispose, toRaw, watch } from 'vue'

import { type MaybeElementRef, convertElement, useEventListener } from '@idux/cdk/utils'

import { initContext } from '../utils'
import { type DnDContext } from './useDragDropContext'

export interface DroppableOptions {
  onDragEnter?: DnDEvent
  onDragOver?: DnDEvent
  onDragLeave?: DnDEvent
  onDrop?: DnDEvent
}

/**
 * make a element droppable as a container and accept draggable element
 *
 * @param target
 * @param options
 * @param context
 */
export function useDroppable(
  target: MaybeElementRef,
  options?: DroppableOptions,
  context?: DnDContext,
): {
  connect: (source: MaybeElementRef) => void
} {
  context = initContext(context)

  let stopConnectWatch: () => void

  const onDroppable = (targetElement: HTMLElement) => {
    context?.registry.on(targetElement, 'target')
  }

  const offDroppable = (targetElement: HTMLElement) => {
    context?.registry.off(targetElement, 'target')
  }

  /**
   * connect drag source to drop target
   *
   * @param source
   */
  const connect = (source: MaybeElementRef) => {
    stopConnectWatch = watch(
      [() => convertElement(target), () => convertElement(source)],
      ([target, source]) => {
        if (target && source) {
          context!.connect(target, source)
        }
      },
      { immediate: true, flush: 'post' },
    )
  }
  const stopWatch = watch(
    () => convertElement(target),
    (currElement, prevElement) => {
      if (prevElement) {
        offDroppable(prevElement)
      }

      if (currElement) {
        onDroppable(currElement)
      }
    },
    { immediate: true, flush: 'post' },
  )

  const stop = () => {
    offDroppable(convertElement(target)!)
    stopWatch()
    stopConnectWatch()
  }

  const onDragEnter = (evt: DragEvent) => {
    context?.registry.exec(target, 'target', 'dragenter', [evt])
    options?.onDragEnter?.(evt, toRaw(context!.state.currPosition.value))
  }

  const onDragOver = (evt: DragEvent) => {
    context?.registry.exec(target, 'target', 'dragover', [evt])
    options?.onDragOver?.(evt, toRaw(context!.state.currPosition.value))
  }

  const onDragLeave = (evt: DragEvent) => {
    context?.registry.exec(target, 'target', 'dragleave', [evt])
    options?.onDragLeave?.(evt, toRaw(context!.state.currPosition.value))
  }

  const onDrop = (evt: DragEvent) => {
    context?.registry.exec(target, 'target', 'drop', [evt])
    options?.onDrop?.(evt, toRaw(context!.state.currPosition.value))
  }

  useEventListener(target, 'dragenter', onDragEnter)
  useEventListener(target, 'dragover', onDragOver)
  useEventListener(target, 'dragleave', onDragLeave)
  useEventListener(target, 'drop', onDrop)

  onScopeDispose(stop)

  return {
    connect,
  }
}
