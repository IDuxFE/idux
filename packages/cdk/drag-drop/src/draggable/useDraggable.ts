/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed, ref, toRaw } from 'vue'

import { type MaybeElementRef, convertElement, useEventListener } from '@idux/cdk/utils'

import { type DragPosition, type DraggableOptions } from './types'

export function useDraggable(
  target: MaybeElementRef,
  options: DraggableOptions,
): {
  dragging: ComputedRef<boolean>
  position: ComputedRef<DragPosition>
  stop: () => void
} {
  const startPosition = ref<{ left: number; top: number; pageX: number; pageY: number }>()
  const currPosition = ref({} as DragPosition)
  const dragging = ref(false)

  const onStart = (evt: PointerEvent) => {
    const element = convertElement(target)

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

    dragging.value = true

    const { left, top, pageX, pageY } = startPosition.value

    const position = {
      left: evt.pageX - pageX + left,
      top: evt.pageY - pageY + top,
      offsetX: evt.pageX - pageX,
      offsetY: evt.pageY - pageY,
    }
    currPosition.value = position

    options.onMove?.(position, evt)
  }

  const onEnd = (evt: PointerEvent) => {
    if (!startPosition.value) {
      return
    }
    dragging.value = false
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
    dragging: computed(() => dragging.value),
    position: computed(() => currPosition.value),
    stop,
  }
}
