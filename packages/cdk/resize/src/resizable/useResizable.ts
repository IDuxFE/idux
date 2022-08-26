/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed, provide, ref, toRaw } from 'vue'

import { type MaybeElementRef, callEmit, convertElement, useEventListener } from '@idux/cdk/utils'

import { resizableToken } from './token'
import { type ResizableHandlePlacement, type ResizableOptions, type ResizePosition } from './types'

export function useResizable(
  target: MaybeElementRef,
  options: ResizableOptions,
): {
  resizing: ComputedRef<boolean>
  position: ComputedRef<ResizePosition>
  stop: () => void
} {
  const resizing = ref(false)
  const activePlacement = ref<ResizableHandlePlacement>()
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
    _placement: ResizableHandlePlacement,
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
    _placement: ResizableHandlePlacement,
    width: number,
    height: number,
    ratio: number,
  ): { width: number; height: number } => {
    const { boundary = 'parent', minWidth = 8, minHeight = 8 } = options
    let boundWidth = Infinity
    let boundHeight = Infinity
    if (boundary === window) {
      if (typeof window !== 'undefined') {
        boundWidth = window.innerWidth
        boundHeight = window.innerHeight
      }
    } else {
      const parent =
        boundary === 'parent' ? convertElement(target)?.parentElement : convertElement(boundary as MaybeElementRef)
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

  const handleResizeStart = (placement: ResizableHandlePlacement, evt: PointerEvent) => {
    activePlacement.value = placement
    const { width, height, left, top } = convertElement(target)!.getBoundingClientRect()
    const { clientX, clientY } = evt
    startPosition.value = { width, height, left, top, clientX, clientY }
    const position = { width, height, offsetWidth: 0, offsetHeight: 0 }
    callEmit(options.onResizeStart, position, evt)
  }

  const handleResizing = (evt: PointerEvent) => {
    const currPlacement = activePlacement.value
    if (!startPosition.value || !currPlacement) {
      return
    }
    setBodyCursor(currPlacement)
    resizing.value = true

    const { width: currWidth, height: currHeight } = calcSizeByEvent(currPlacement, evt)
    const { width: newWidth, height: newHeight } = calcSizeByBounds(currPlacement, currWidth, currHeight, -1)
    const { width, height } = startPosition.value

    const position = {
      width: newWidth,
      height: newHeight,
      offsetWidth: newWidth - width,
      offsetHeight: newHeight - height,
    }
    currPosition.value = position
    callEmit(options.onResizing, position, evt)
  }

  const handleResizeEnd = (evt: PointerEvent) => {
    if (!startPosition.value) {
      return
    }
    clearBodyCursor()
    resizing.value = false
    activePlacement.value = undefined
    startPosition.value = undefined
    callEmit(options.onResizeEnd, toRaw(currPosition.value), evt)
  }

  const listenerStops = [
    useEventListener(document, 'pointermove', handleResizing, true),
    useEventListener(document, 'pointerup', handleResizeEnd, true),
  ]
  const stop = () => {
    listenerStops.forEach(listenerStop => listenerStop())
  }

  provide(resizableToken, { handleResizeStart })

  return {
    resizing: computed(() => resizing.value),
    position: computed(() => currPosition.value),
    stop,
  }
}

function ensureInBounds(value: number, boundValue: number) {
  return value < boundValue ? value : boundValue
}

function setBodyCursor(placement: ResizableHandlePlacement) {
  let cursor = ''
  switch (placement) {
    case 'top':
    case 'bottom':
      cursor = 'ns-resize'
      break
    case 'start':
    case 'end':
      cursor = 'ew-resize'
      break
    case 'topStart':
    case 'bottomEnd':
      cursor = 'nwse-resize'
      break
    case 'topEnd':
    case 'bottomStart':
      cursor = 'nesw-resize'
      break
  }
  document.body.style.cursor = cursor
  document.body.style.userSelect = 'none'
}

function clearBodyCursor() {
  document.body.style.cursor = ''
  document.body.style.userSelect = ''
}
