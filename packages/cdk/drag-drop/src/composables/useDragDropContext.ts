/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DnDElement, DnDEventName, DnDEventType } from '../types'

import { watch } from 'vue'

import { type MaybeElementRef, convertElement, tryOnScopeDispose, useEventListener } from '@idux/cdk/utils'

import { DnDRegistry } from '../registry'
import { DnDState } from '../state'

export interface DnDContext {
  registry: ReturnType<typeof DnDRegistry>
  checkConnect: (target: DnDElement, source: DnDElement) => boolean
  state: InnerState
  connect: (target: DnDElement, source: DnDElement) => void
}

type InnerState = { current: DnDState }
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
  const state: InnerState = { current: {} as DnDState }

  let draggingEl: DnDElement
  let dropEl: DnDElement
  let isAltPress: boolean

  const setup = (rootElement: HTMLElement) => {
    if (_dnDContextMap.has(rootElement)) {
      throw new Error('DragDropContext already exists')
    }
  }

  const teardown = (rootElement: HTMLElement) => {
    _dnDContextMap.delete(rootElement)
  }

  const onDragStart = (evt: DnDEventType) => {
    if (state.current.dragging) {
      endDrag()
    }
    const el = evt.composedPath().find(el => registry.has(el)) as DnDElement
    const current = registry.state(el)
    if (!el || !current) {
      return
    }

    draggingEl = el
    state.current = current
    state.current.start(evt)
  }

  const onDrag = (evt: DnDEventType) => {
    if (!state.current.dragging) {
      return
    }
    state.current.updatePosition(evt)

    const source = draggingEl
    if (!state.current.isNative) {
      if (evt instanceof MouseEvent) {
        registry.exec(source, 'mousemove', [evt])
      } else {
        registry.exec(source, 'touchmove', [evt])
      }
    } else if (state.current.canDrop) {
      evt.preventDefault()
      isAltPress = evt.altKey
      if ('dataTransfer' in evt && evt.dataTransfer) {
        evt.dataTransfer.dropEffect = isAltPress ? 'copy' : 'move'
      }
      registry.exec(source, 'drag', [evt])
      registry.exec(dropEl, 'dragover', [evt])
    }
  }

  const onDragEnter = (evt: DnDEventType) => {
    if (!state.current.dragging) {
      isAltPress = evt.altKey
      return
    }

    state.current.canDrop = canDrop(evt)
    registry.exec(dropEl, 'dragenter', [evt])
  }

  const onDragEnd = (evt: DnDEventType) => {
    if (!state.current.dragging) {
      return
    }

    state.current.updatePosition(evt)

    const source = draggingEl
    if (state.current.isNative) {
      if (state.current.canDrop) {
        if (evt instanceof DragEvent) {
          registry.exec(source, 'dragend', [evt])
        } else {
          registry.exec(source, 'pointerup', [evt])
        }
      }
    } else {
      if (evt instanceof MouseEvent) {
        registry.exec(source, 'mouseup', [evt])
      } else {
        registry.exec(source, 'touchend', [evt])
      }
    }
    endDrag()
  }

  /**
   * check (bottom-top) if the drag event can drop on the target
   *
   * @param target
   */
  const canDrop = (target: DnDEventType) => {
    const eventTarget = target.composedPath().find(el => registry.checkConnect(el, draggingEl))
    if (eventTarget) {
      dropEl = eventTarget
      return true
    }
    return false
  }

  const endDrag = () => {
    state.current.end()
    isAltPress = false
  }

  const nothingExec = (eventName: DnDEventName, evt: DnDEventType) => {
    if (!state.current.dragging) {
      return
    }
    registry.exec(draggingEl, eventName, [evt])
  }

  useEventListener(root, 'dragstart', onDragStart, true)
  useEventListener(root, 'touchstart', onDragStart, { passive: true, capture: true })
  useEventListener(root, 'mousedown', onDragStart, true)

  useEventListener(root, 'drag', onDrag)
  useEventListener(root, 'touchmove', onDrag, { passive: true })
  useEventListener(root, 'mousemove', onDrag)

  useEventListener(root, 'dragend', onDragEnd)
  useEventListener(root, 'mouseup', onDragEnd)
  useEventListener(root, 'touchend', onDragEnd, { passive: true })

  useEventListener(root, 'dragenter', onDragEnter, true)
  useEventListener(root, 'dragover', onDrag)
  useEventListener(root, 'dragleave', evt => nothingExec('dragleave', evt))
  useEventListener(root, 'drop', evt => nothingExec('drop', evt))

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

  const cleanup = () => {
    stopWatch()
    teardown(convertElement(root)!)
  }

  tryOnScopeDispose(cleanup)

  return {
    registry,
    state,
    connect: registry.connect,
    checkConnect: registry.checkConnect,
  }
}
