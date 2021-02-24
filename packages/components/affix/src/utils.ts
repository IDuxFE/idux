import { isHTMLElement, isUndefined, isObject, toNumber } from '@idux/cdk/utils'
import { on, off } from '@idux/cdk/utils'

import { Direction, AffixStyle, OffsetOpt } from './types'

const eventList = ['scroll', 'resize']
const direction: Direction[] = ['top', 'bottom', 'left', 'right']

type DirectionNumber = { [key in Direction]: number }

export function formatOffset(offset: number | string | OffsetOpt): Partial<DirectionNumber> {
  if (!isObject(offset)) {
    return { top: toNumber(offset) }
  }
  const _offset: Partial<DirectionNumber> = {}
  ;(Object.keys(offset) as Direction[]).forEach(dire => {
    _offset[dire] = toNumber(offset[dire])
  })
  return _offset
}

/**
 * get target position based on container
 *
 * @export
 * @param {HTMLElement} target
 * @returns {ClientRect}
 */
export function getTargetRect(target: HTMLElement, container: HTMLElement | Window): { [key in Direction]: number } {
  const targetRect = target.getBoundingClientRect()
  const containerRect = isHTMLElement(container)
    ? container.getBoundingClientRect()
    : { top: 0, bottom: window.innerHeight, left: 0, right: window.innerWidth }
  return {
    top: targetRect.top - containerRect.top,
    left: targetRect.left - containerRect.left,
    bottom: containerRect.bottom - targetRect.bottom,
    right: containerRect.right - targetRect.right,
  }
}

export function getTargetSize(target: HTMLElement | Window): { [key in 'width' | 'height']: number } {
  if (target === window) {
    return {
      width: target.innerWidth,
      height: target.innerHeight,
    }
  }
  return {
    width: (target as HTMLElement).offsetWidth,
    height: (target as HTMLElement).offsetHeight,
  }
}

export function observeTarget(target: HTMLElement | Window, cb: (...args: unknown[]) => unknown): void {
  eventList.forEach(event => {
    on(target, event, cb)
  })
}

export function removeObserveTarget(target: HTMLElement | Window, cb: (...args: unknown[]) => unknown): void {
  eventList.forEach(event => {
    off(target, event, cb)
  })
}

export function isDireSticky(
  dire: Direction,
  affixRect: DirectionNumber,
  offsetOpt: Partial<DirectionNumber>,
): boolean {
  return !isUndefined(offsetOpt[dire]) && affixRect[dire] <= offsetOpt[dire]!
}

export function isSticky(affixRect: DirectionNumber, offsetOpt: Partial<DirectionNumber>): boolean {
  return direction.some(dire => isDireSticky(dire, affixRect, offsetOpt))
}

export function calcPosition(
  affixRect: DirectionNumber,
  offsetOpt: Partial<DirectionNumber>,
  target: Window | HTMLElement,
): AffixStyle {
  let style: AffixStyle = {}

  if (isSticky(affixRect, offsetOpt)) {
    style.position = target === window ? 'fixed' : 'absolute'
    direction.forEach(dire => {
      if (isDireSticky(dire, affixRect, offsetOpt)) {
        style[dire] = `${offsetOpt[dire]! - (target === window ? 0 : affixRect[dire])}px`
      } else {
        style[dire] = `${target === window ? affixRect[dire] : 0}px`
      }
    })

    delete style[isDireSticky('bottom', affixRect, offsetOpt) ? 'top' : 'bottom']
    delete style[isDireSticky('right', affixRect, offsetOpt) ? 'left' : 'right']
  } else {
    style = {}
  }
  return style
}
