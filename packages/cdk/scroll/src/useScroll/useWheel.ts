/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type Ref } from 'vue'

import { isFirefox } from '@idux/cdk/platform'
import { cancelRAF, rAF, useEventListener } from '@idux/cdk/utils'

import { useScrollLock } from './useScrollLock'

interface FireFoxDOMMouseScrollEvent {
  detail: number
  preventDefault: VoidFunction
}

export function useWheel(
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
  let rafId: number
  let wheelDirection: 'x' | 'y' | 'sx' | null = null
  let directionRafId: number

  let currentDelta: number
  let isFirefoxWheel = false

  const checkScrollLock = useScrollLock(scrolledTop, scrolledBottom, scrolledLeft, scrolledRight)

  const _onWheel = (delta: number, horizontal: boolean) => {
    cancelRAF(rafId)
    currentDelta = delta

    if (checkScrollLock(delta, horizontal, false)) {
      return
    }

    rafId = rAF(() => {
      const fixedDelta = isFirefoxWheel ? 10 * delta : delta
      callback(fixedDelta, horizontal)
    })
  }

  const onWheel = (evt: WheelEvent) => {
    cancelRAF(directionRafId)
    directionRafId = rAF(() => {
      rAF(() => (wheelDirection = null))
    })

    const { deltaX, deltaY, shiftKey } = evt

    let _deltaX = deltaX
    let _deltaY = deltaY

    if (wheelDirection === 'sx' || (!wheelDirection && shiftKey && deltaY && !deltaX)) {
      _deltaX = deltaY
      _deltaY = 0

      wheelDirection = 'sx'
    }

    if (wheelDirection === null) {
      wheelDirection = Math.abs(_deltaX) > Math.abs(_deltaY) ? 'x' : 'y'
    }

    if (!isFirefox) {
      evt.preventDefault()
    }

    if (wheelDirection === 'x' || wheelDirection === 'sx') {
      _onWheel(_deltaX, true)
    } else {
      _onWheel(_deltaY, false)
    }
  }

  const onFirefoxWheel = (evt: FireFoxDOMMouseScrollEvent) => {
    isFirefoxWheel = evt.detail === currentDelta
  }

  let listenerStops: (() => void)[] = []

  const destroy = () => {
    listenerStops.forEach(stop => stop())
    listenerStops = []
  }

  const init = () => {
    listenerStops = [
      useEventListener(elementRef, 'wheel', onWheel),
      useEventListener(elementRef, 'DOMMouseScroll', onFirefoxWheel as unknown as (evt: Event) => void),
    ]
  }

  return {
    init,
    destroy,
  }
}
