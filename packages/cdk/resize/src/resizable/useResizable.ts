/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed, provide, ref, toRaw } from 'vue'

import { type DragPosition } from '@idux/cdk/drag-drop'
import { type MaybeElementRef, callEmit, convertElement } from '@idux/cdk/utils'

import { resizableToken } from './token'
import { type ResizableHandlerPlacement, type ResizableOptions, type ResizePosition } from './types'

export function useResizable(
  target: MaybeElementRef,
  options: ResizableOptions,
): {
  resizing: ComputedRef<boolean>
  position: ComputedRef<ResizePosition>
} {
  const resizing = ref(false)
  const startPosition = ref<{
    width: number
    height: number
    top: number
    left: number
    clientX: number
    clientY: number
  }>()
  const currPosition = ref({} as ResizePosition)

  const calcSizeByEvent = (
    _placement: ResizableHandlerPlacement,
    evt: PointerEvent,
  ): { width: number; height: number } => {
    const { width, height, top, left, clientX, clientY } = startPosition.value!
    let currWidth = width
    let currHeight = height
    switch (_placement) {
      case 'top':
        currHeight = height + clientY - evt.clientY
        break
      case 'bottom':
        currHeight = evt.clientY - top
        break
      case 'start':
        currWidth = width + clientX - evt.clientX
        break
      case 'end':
        currWidth = evt.clientX - left
        break
      case 'topStart':
        currWidth = width + clientX - evt.clientX
        currHeight = height + clientY - evt.clientY
        break
      case 'topEnd':
        currWidth = evt.clientX - left
        currHeight = height + clientY - evt.clientY
        break
      case 'bottomStart':
        currWidth = width + clientX - evt.clientX
        currHeight = evt.clientY - top
        break
      case 'bottomEnd':
        currWidth = evt.clientX - left
        currHeight = evt.clientY - top
        break
    }
    return { width: currWidth, height: currHeight }
  }

  const calcSizeByBounds = (
    _placement: ResizableHandlerPlacement,
    width: number,
    height: number,
    ratio: number,
  ): { width: number; height: number } => {
    const { bounds = 'parent', minWidth = 8, minHeight = 8 } = options
    let boundWidth = Infinity
    let boundHeight = Infinity
    if (bounds === 'window' || bounds === window) {
      if (typeof window !== 'undefined') {
        boundWidth = window.innerWidth
        boundHeight = window.innerHeight
      }
    } else {
      const parent =
        bounds === 'parent' ? convertElement(target)?.parentElement : convertElement(bounds as MaybeElementRef)
      if (parent && parent instanceof HTMLElement) {
        const parentRect = parent.getBoundingClientRect()
        boundWidth = parentRect.width
        boundHeight = parentRect.height
      }
    }

    const maxWidth = ensureInBounds(options.maxWidth ?? Number.MAX_SAFE_INTEGER, boundWidth)
    const maxHeight = ensureInBounds(options.maxHeight ?? Number.MAX_SAFE_INTEGER, boundHeight)

    let newWidth: number
    let newHeight: number
    if (ratio !== -1) {
      if (/(start|end)/i.test(_placement)) {
        newWidth = Math.min(Math.max(width, minWidth), maxWidth)
        newHeight = Math.min(Math.max(newWidth / ratio, minHeight), maxHeight)
        if (newHeight >= maxHeight || newHeight <= minHeight) {
          newWidth = Math.min(Math.max(newHeight * ratio, minWidth), maxWidth)
        }
      } else {
        newHeight = Math.min(Math.max(height, minHeight), maxHeight)
        newWidth = Math.min(Math.max(newHeight * ratio, minWidth), maxWidth)
        if (newWidth >= maxWidth || newWidth <= minWidth) {
          newHeight = Math.min(Math.max(newWidth / ratio, minHeight), maxHeight)
        }
      }
    } else {
      newWidth = Math.min(Math.max(width, minWidth), maxWidth)
      newHeight = Math.min(Math.max(height, minHeight), maxHeight)
    }

    return { width: newWidth, height: newHeight }
  }

  const handleStart = (_placement: ResizableHandlerPlacement, _position: DragPosition, evt: PointerEvent) => {
    const { width, height, left, top } = convertElement(target)!.getBoundingClientRect()
    const { clientX, clientY } = evt

    startPosition.value = { width, height, left, top, clientX, clientY }
    const position = { width, height, offsetWidth: 0, offsetHeight: 0 }

    callEmit(options.onStart, position, evt)
  }

  const handleMove = (_placement: ResizableHandlerPlacement, _position: DragPosition, evt: PointerEvent) => {
    if (!startPosition.value) {
      return
    }

    resizing.value = true

    const { width: currWidth, height: currHeight } = calcSizeByEvent(_placement, evt)
    const { width: newWidth, height: newHeight } = calcSizeByBounds(_placement, currWidth, currHeight, -1)
    const { width, height } = startPosition.value

    const position = {
      width: newWidth,
      height: newHeight,
      offsetWidth: newWidth - width,
      offsetHeight: newHeight - height,
    }
    currPosition.value = position

    callEmit(options.onMove, position, evt)
  }

  const handleEnd = (_placement: ResizableHandlerPlacement, _position: DragPosition, evt: PointerEvent) => {
    if (!startPosition.value) {
      return
    }

    resizing.value = false

    startPosition.value = undefined

    callEmit(options.onEnd, toRaw(currPosition.value), evt)
  }

  provide(resizableToken, { handleStart, handleMove, handleEnd })

  return {
    resizing: computed(() => resizing.value),
    position: computed(() => currPosition.value),
  }
}

function ensureInBounds(value: number, boundValue: number): number {
  return value < boundValue ? value : boundValue
}
