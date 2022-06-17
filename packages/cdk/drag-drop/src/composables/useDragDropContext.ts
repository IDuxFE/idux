/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DnDElement, DnDState } from '../types'

import { onScopeDispose, watch } from 'vue'

import { MaybeElementRef, convertElement, useEventListener } from '@idux/cdk/utils'

import { DnDRegistry } from '../registry'
import { State } from '../state'

export interface DnDContext {
  registry: ReturnType<typeof DnDRegistry>
  sources: Set<DnDElement>
  checkConnect: (target: DnDElement, source: DnDElement) => boolean
  targets: Set<DnDElement>
  state: DnDState
  connect: (target: DnDElement, source: DnDElement) => void
}

export const _dnDContextMap = new Map<HTMLElement, DnDContext>()

/**
 * create a global drag-drop context
 *  - state changed by event driven
 *  - manage drag-drop elements ids
 *  - fix some native drag-drop bugs
 *
 * @param root
 */
export function useDragDropContext(root: MaybeElementRef): DnDContext {
  const registry = DnDRegistry()
  const state = State()

  // context variables
  let isAltPress: boolean

  const setup = (rootElement: HTMLElement) => {
    if (_dnDContextMap.has(rootElement)) {
      throw new Error('DragDropContext already exists')
    }
  }

  /**
   * check (bottom-top) if the drag event can drop on the target
   *
   * @param target
   */
  const canDrop = (target: DragEvent) => {
    return target.composedPath().some(el => registry.checkConnect(el, state.draggingElement.value))
  }

  const endDrag = () => {
    state.resetState()
    isAltPress = false
  }

  const stopWatch = watch(
    () => convertElement(root),
    (currElement, prevElement) => {
      if (prevElement) {
        teardown(prevElement)
      }
      if (currElement) {
        setup(currElement)
      }
    },
    { immediate: true, flush: 'post' },
  )

  const teardown = (rootElement: HTMLElement) => {
    _dnDContextMap.delete(rootElement)
  }

  const clenUp = () => {
    stopWatch()
    teardown(convertElement(root)!)
  }

  const onDragStart = (evt: DragEvent) => {
    if (state.isDragging.value) {
      endDrag()
    }
    state.init(evt)
  }

  const onDragEnter = (evt: DragEvent) => {
    if (!state.isDragging.value) {
      isAltPress = evt.altKey
    }
    state.updateDrop(canDrop(evt))
  }

  const onDrag = (evt: DragEvent) => {
    if (evt.defaultPrevented || !state.isDragging.value) {
      return
    }
    // only allow drop on target
    if (state.canDrop.value) {
      evt.preventDefault()
      isAltPress = evt.altKey
      if (evt.dataTransfer) {
        evt.dataTransfer.dropEffect = isAltPress ? 'copy' : 'move'
      }
    }

    state.update(evt)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onDragEnd = (evt: DragEvent) => {
    if (state.isDragging.value) {
      endDrag()
    }
  }

  useEventListener(root, 'dragstart', onDragStart, true)
  // useEventListener(root, 'dragstart', onCapture, true)
  useEventListener(root, 'dragenter', onDragEnter, true)
  useEventListener(root, 'dragover', onDrag)
  useEventListener(root, 'dragend', onDragEnd)

  onScopeDispose(() => clenUp())

  return {
    sources: registry.sources,
    targets: registry.targets,
    registry,
    state,
    connect: registry.connect,
    checkConnect: registry.checkConnect,
  }
}
