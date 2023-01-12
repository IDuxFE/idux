/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DnDEventType, DroppableOptions } from '../types'

import { watch } from 'vue'

import { type MaybeElementRef, convertElement, tryOnScopeDispose } from '@idux/cdk/utils'

import { type DnDContext } from './useDragDropContext'
import { initContext } from '../utils'

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
  stop: () => void
} {
  context = initContext(context)

  const registry = context.registry
  const state = context.state

  let stopConnectWatch: () => void

  const onDroppable = (targetElement: HTMLElement) => {
    installHandlers(targetElement)
    registry.on(targetElement)
  }

  const offDroppable = (targetElement: HTMLElement) => {
    registry.off(targetElement)
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

  const onDragEnter = (evt: DnDEventType) => {
    options?.onDragEnter?.(evt, state.current.activeTransform)
  }

  const onDragOver = (evt: DnDEventType) => {
    options?.onDragOver?.(evt, state.current.activeTransform)
  }

  const onDragLeave = (evt: DnDEventType) => {
    options?.onDragLeave?.(evt, state.current.activeTransform)
  }

  const onDrop = (evt: DnDEventType) => {
    options?.onDrop?.(evt, state.current.activeTransform)
  }

  const installHandlers = (target: HTMLElement) => {
    if (state.current.isNative) {
      registry.on(target, 'dragenter', onDragEnter)
      registry.on(target, 'dragover', onDragOver)
      registry.on(target, 'dragleave', onDragLeave)
      registry.on(target, 'drop', onDrop)
    }
  }

  const stop = () => {
    offDroppable(convertElement(target)!)
    stopWatch()
    stopConnectWatch()
  }

  tryOnScopeDispose(stop)

  return {
    connect,
    stop,
  }
}
