/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DnDEventType } from '../types'

import { type DnDContext } from './useDragDropContext'
import { moveElement } from '../utils'

export const withDragFree = (sourceEl: HTMLElement, context: DnDContext): void => {
  const registry = context.registry
  const state = registry.state(sourceEl)!

  const onDrag = () => {
    if (!state.dragging) {
      return
    }
    moveElement(sourceEl, state.activeTransform)
  }

  const onDragEnd = (evt: DnDEventType) => {
    if (!state.dragging) {
      return
    }
    if (evt instanceof DragEvent && evt.dataTransfer) {
      // only available in draggable section
      if (evt.dataTransfer.dropEffect !== 'none') {
        moveElement(sourceEl, state.activeTransform)
      }
    }
  }

  if (state.isNative) {
    registry.on(sourceEl, 'dragend', onDragEnd)
  } else {
    registry.on(sourceEl, 'mousemove', onDrag)
    registry.on(sourceEl, 'touchmove', onDrag)
  }
}
