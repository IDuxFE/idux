/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { Ref } from 'vue'

import { cancelRAF, rAF, useEventListener } from '@idux/cdk/utils'

import { useScrollLock } from './useScrollLock'

const SMOOTH_PTG = 14 / 15

export function useTouchMove(
  elementRef: Ref<HTMLElement | undefined>,
  scrolledTop: Ref<boolean>,
  scrolledBottom: Ref<boolean>,
  scrolledLeft: Ref<boolean>,
  scrolledRight: Ref<boolean>,
  callback: (offset: number, isHorizontal: boolean) => void,
): {
  init: () => void
  destroy: () => void
} {
  let touched = false
  let touchY = 0
  let touchX = 0

  let rafId: number
  let interval: number

  let listenerStops: (() => void)[] = []
  const clearListeners = () => {
    listenerStops.forEach(stop => stop())
    listenerStops = []
  }

  const checkScrollLock = useScrollLock(scrolledTop, scrolledBottom, scrolledLeft, scrolledRight)

  const updateOffset = (offset: number, isHorizontal: boolean) => {
    cancelRAF(rafId)

    rafId = rAF(() => {
      callback(offset, isHorizontal)
    })
  }

  const onTouchMove = (evt: TouchEvent) => {
    if (!touched) {
      return
    }

    const currentTouch = evt.touches[0]
    const currentY = currentTouch.pageY
    const currentX = currentTouch.pageX

    const offsetX = touchX - currentX
    const offsetY = touchY - currentY

    const isHorizontal = Math.abs(offsetX) > Math.abs(offsetY)
    let offset = isHorizontal ? offsetX : offsetY

    if (checkScrollLock(offset, isHorizontal)) {
      evt.preventDefault()
      return
    }

    updateOffset(offset, isHorizontal)

    clearInterval(interval)
    interval = setInterval(() => {
      offset = offset * SMOOTH_PTG

      if (checkScrollLock(offset, isHorizontal) || Math.abs(offset) <= 0.1) {
        clearInterval(interval)
      } else {
        updateOffset(offset, isHorizontal)
      }
    }, 16)
  }

  const onTouchEnd = () => {
    touched = false
    clearListeners()
  }

  const onTouchStart = (evt: TouchEvent) => {
    clearListeners()

    if (evt.touches.length !== 1 || touched) {
      return
    }

    touched = true

    const currentTouch = evt.touches[0]
    touchY = currentTouch.pageY
    touchX = currentTouch.pageX

    listenerStops = [
      useEventListener(elementRef, 'touchmove', onTouchMove),
      useEventListener(elementRef, 'touchend', onTouchEnd),
    ]
  }

  let stopTouchStart: (() => void) | null = null

  const destroy = () => {
    stopTouchStart?.()
    stopTouchStart = null
    clearListeners()
  }

  const init = () => {
    stopTouchStart = useEventListener(elementRef, 'touchstart', onTouchStart)
  }

  return {
    init,
    destroy,
  }
}
