/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DnDElement, DragPosition } from './types'

import { ComputedRef, computed, ref } from 'vue'

type InnerState = {
  init: (evt: DragEvent) => void
  canDrop: ComputedRef<boolean>
  draggingElement: ComputedRef<HTMLElement | Window | EventTarget>
  currPosition: ComputedRef<DragPosition>
  resetState: () => void
  update: (evt: DragEvent) => void
  updatePosition: (evt: DragEvent, position: DragPosition) => void
  isDragging: ComputedRef<boolean>
  updateDrop: (result: boolean) => void
}

/**
 * context inner state
 *
 */
export function State(): InnerState {
  const draggingElement = ref<DnDElement>()
  const currentPosition = ref<DragPosition>()
  const canDrop = ref(false)

  const resetState = () => {
    draggingElement.value = undefined
    currentPosition.value = undefined
    canDrop.value = false
  }
  const updateDrop = (result: boolean) => {
    canDrop.value = result
  }
  const init = (evt: DragEvent) => {
    draggingElement.value = evt.target as DnDElement
  }
  const update = (evt: DragEvent) => {
    updatePosition(evt, {
      offsetX: evt.offsetX,
      offsetY: evt.offsetY,
    })
  }
  const updatePosition = (evt: DragEvent, position: DragPosition) => {
    currentPosition.value = {
      left: evt.clientX,
      top: evt.clientY,
      ...position,
    }
  }

  return {
    isDragging: computed(() => draggingElement.value !== undefined),
    canDrop: computed(() => canDrop.value),
    draggingElement: computed(() => draggingElement.value!),
    currPosition: computed(() => currentPosition.value!),
    updatePosition,
    updateDrop,
    resetState,
    update,
    init,
  }
}
