import type { AffixDirection, AffixOffset } from './types'

import { isHTMLElement, isUndefined, isObject, toNumber } from '@idux/cdk/utils'
import { on, off } from '@idux/cdk/utils'

export type AffixStyle = {
  position?: 'fixed' | 'absolute'
  top?: string
  bottom?: string
  left?: string
  right?: string
}

type AffixDirectionNumber = Record<AffixDirection, number>

const events = ['scroll', 'resize'] as const
const directions = ['top', 'bottom', 'left', 'right'] as const

export function normalizeOffset(offset: AffixOffset): Partial<AffixDirectionNumber> {
  if (!isObject(offset)) {
    return { top: toNumber(offset) }
  }
  const _offset: Partial<AffixDirectionNumber> = {}
  ;(Object.keys(offset) as AffixDirection[]).forEach(dire => {
    _offset[dire] = toNumber(offset[dire])
  })
  return _offset
}

/**
 * get target position based on container
 */
export function getTargetRect(target: HTMLElement, container: HTMLElement | Window): AffixDirectionNumber {
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

export function getTargetSize(target: HTMLElement | Window): Record<'width' | 'height', number> {
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
  events.forEach(event => {
    on(target, event, cb)
  })
}

export function removeObserveTarget(target: HTMLElement | Window, cb: (...args: unknown[]) => unknown): void {
  events.forEach(event => {
    off(target, event, cb)
  })
}

export function isDireSticky(
  dire: AffixDirection,
  affixRect: AffixDirectionNumber,
  offsetOption: Partial<AffixDirectionNumber>,
): boolean {
  return !isUndefined(offsetOption[dire]) && affixRect[dire] <= offsetOption[dire]!
}

export function isSticky(affixRect: AffixDirectionNumber, offsetOption: Partial<AffixDirectionNumber>): boolean {
  return directions.some(dire => isDireSticky(dire, affixRect, offsetOption))
}

export function calcPosition(
  affixRect: AffixDirectionNumber,
  offsetOption: Partial<AffixDirectionNumber>,
  target: Window | HTMLElement,
): AffixStyle {
  const style: AffixStyle = {}

  if (isSticky(affixRect, offsetOption)) {
    style.position = target === window ? 'fixed' : 'absolute'

    const _directions: AffixDirection[] = [
      isDireSticky('bottom', affixRect, offsetOption) ? 'bottom' : 'top',
      isDireSticky('right', affixRect, offsetOption) ? 'right' : 'left',
    ]

    _directions.forEach(dire => {
      if (isDireSticky(dire, affixRect, offsetOption)) {
        style[dire] = `${offsetOption[dire]! - (target === window ? 0 : affixRect[dire])}px`
      } else {
        style[dire] = `${target === window ? affixRect[dire] : 0}px`
      }
    })
  }
  return style
}
