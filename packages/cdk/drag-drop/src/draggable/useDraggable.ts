/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed, ref, toRaw } from 'vue'

import { type MaybeElementRef, convertElement, useEventListener } from '@idux/cdk/utils'

export interface DragPosition {
  left: number
  top: number
  offsetX: number
  offsetY: number
}

export type DraggableEvent = (position: DragPosition, evt: PointerEvent) => void

export interface DraggableOptions {
  onStart?: DraggableEvent
  onMove?: DraggableEvent
  onEnd?: DraggableEvent
}

export function useDraggable(
  target: MaybeElementRef,
  options: DraggableOptions,
): {
  position: ComputedRef<DragPosition>
  isDragging: ComputedRef<boolean>
  stop: () => void
} {
  const startPosition = ref<{ left: number; top: number; pageX: number; pageY: number }>()
  const currPosition = ref({} as DragPosition)

  const onStart = (evt: PointerEvent) => {
    const element = convertElement(target)
    if (evt.target !== element) {
      return
    }

    const { pageX, pageY } = evt
    const { left, top } = element!.getBoundingClientRect()

    startPosition.value = { left, top, pageX, pageY }

    const position = { left, top, offsetX: 0, offsetY: 0 }

    options.onStart?.(position, evt)
  }

  const onMove = (evt: PointerEvent) => {
    if (!startPosition.value) {
      return
    }

    const { left, top, pageX, pageY } = startPosition.value
    const offsetX = evt.pageX - pageX
    const offsetY = evt.pageY - pageY

    const position = {
      left: evt.pageX - pageX + left,
      top: evt.pageY - pageY + top,
      offsetX,
      offsetY,
    }
    currPosition.value = position

    options.onMove?.(position, evt)
  }

  const onEnd = (evt: PointerEvent) => {
    if (!startPosition.value) {
      return
    }

    startPosition.value = undefined

    options.onEnd?.(toRaw(currPosition.value), evt)
  }

  const { stop: stopPointerdown } = useEventListener(target, 'pointerdown', onStart, true)
  const { stop: stopPointermove } = useEventListener(document, 'pointermove', onMove, true)
  const { stop: stopPointerup } = useEventListener(document, 'pointerup', onEnd, true)

  const stop = () => {
    stopPointerdown()
    stopPointermove()
    stopPointerup()
  }

  return {
    isDragging: computed(() => !!startPosition.value),
    position: computed(() => currPosition.value),
    stop,
  }
}
