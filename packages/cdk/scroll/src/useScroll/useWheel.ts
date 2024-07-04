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

type WheelDirection = 'x' | 'y' | 'sx' | null

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
  let wheelDirection: WheelDirection = null
  let directionRafId: number

  let currentDelta: number
  let isFirefoxWheel = false

  const checkScrollLock = useScrollLock(scrolledTop, scrolledBottom, scrolledLeft, scrolledRight)

  const calcWheelDirectionAndDelta = (evt: Event) => {
    const { deltaX, deltaY, shiftKey } = evt as WheelEvent

    let _deltaX = deltaX
    let _deltaY = deltaY
    let _wheelDirection: WheelDirection = null

    if (wheelDirection === 'sx' || (!wheelDirection && shiftKey && deltaY && !deltaX)) {
      _deltaX = deltaY
      _deltaY = 0

      _wheelDirection = 'sx'
    }

    if (_wheelDirection === null) {
      _wheelDirection = Math.abs(_deltaX) > Math.abs(_deltaY) ? 'x' : 'y'
    }

    return {
      direction: _wheelDirection,
      delta: _wheelDirection === 'x' || _wheelDirection === 'sx' ? _deltaX : _deltaY,
    }
  }

  const shouldPreventWheelDefault = (direction: WheelDirection, delta: number) => {
    if (direction === 'x' || direction === 'sx') {
      return delta > 0 ? !scrolledRight.value : !scrolledLeft.value
    }

    return delta > 0 ? !scrolledBottom.value : !scrolledTop.value
  }

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

    const { delta, direction } = calcWheelDirectionAndDelta(evt)

    wheelDirection = direction

    if (wheelDirection === 'x' || wheelDirection === 'sx') {
      _onWheel(delta, true)
    } else {
      _onWheel(delta, false)
    }

    if (shouldPreventWheelDefault(direction, delta)) {
      evt.preventDefault()
    }
  }

  const onFirefoxWheel = (evt: FireFoxDOMMouseScrollEvent) => {
    isFirefoxWheel = evt.detail === currentDelta
  }

  const onPixelScroll = (evt: Event) => {
    const { delta, direction } = calcWheelDirectionAndDelta(evt)

    if (shouldPreventWheelDefault(direction, delta)) {
      evt.preventDefault()
    }
  }

  let listenerStops: ((() => void) | undefined)[] = []

  const destroy = () => {
    listenerStops.forEach(stop => stop?.())
    listenerStops = []
  }

  const init = () => {
    listenerStops = [
      useEventListener(elementRef, 'wheel', onWheel),
      useEventListener(elementRef, 'DOMMouseScroll', onFirefoxWheel as unknown as (evt: Event) => void),
      isFirefox ? useEventListener(elementRef.value, 'MozMousePixelScroll', onPixelScroll) : undefined,
    ]
  }

  return {
    init,
    destroy,
  }
}
