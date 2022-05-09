/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { AffixDirection, AffixOffset } from './types'

import { isObject, isUndefined } from 'lodash-es'

import { convertNumber, isHTMLElement, off, on } from '@idux/cdk/utils'

export type ContentStyle = {
  position?: 'fixed' | 'absolute'
  top?: string
  bottom?: string
  left?: string
  right?: string
  width?: string
  height?: string
}

type AffixDirectionNumber = Record<AffixDirection, number>

const events = ['scroll', 'resize'] as const
const directions = ['top', 'bottom', 'left', 'right'] as const

export function normalizeOffset(offset: AffixOffset): Partial<AffixDirectionNumber> {
  if (!isObject(offset)) {
    return { top: convertNumber(offset) }
  }
  const _offset: Partial<AffixDirectionNumber> = {}
  ;(Object.keys(offset) as AffixDirection[]).forEach(dire => {
    _offset[dire] = convertNumber(offset[dire])
  })
  return _offset
}

/**
 * get target position based on container
 */
export function getTargetRect(target: HTMLElement, container: HTMLElement | Window): AffixDirectionNumber | null {
  const targetRect = target.getBoundingClientRect()
  const containerRect = isHTMLElement(container)
    ? container.getBoundingClientRect()
    : { top: 0, bottom: window.innerHeight, left: 0, right: window.innerWidth }

  if (targetRect.width === 0 && targetRect.height === 0) {
    return null
  }

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

export function isSticky(
  target: HTMLElement,
  container: HTMLElement | Window,
  offsetOption: Partial<AffixDirectionNumber>,
): boolean {
  const targetRect = getTargetRect(target, container)
  return !!targetRect && directions.some(dire => isDireSticky(dire, targetRect, offsetOption))
}

export function calcStickyPosition(
  target: HTMLElement,
  container: HTMLElement | Window,
  offsetOption: Partial<AffixDirectionNumber>,
): ContentStyle {
  const targetRect = getTargetRect(target, container)
  if (!targetRect) {
    return {}
  }
  const style: ContentStyle = {}

  style.position = container === window ? 'fixed' : 'absolute'

  const _directions: AffixDirection[] = [
    isDireSticky('bottom', targetRect, offsetOption) ? 'bottom' : 'top',
    isDireSticky('right', targetRect, offsetOption) ? 'right' : 'left',
  ]

  _directions.forEach(dire => {
    if (isDireSticky(dire, targetRect, offsetOption)) {
      style[dire] = `${offsetOption[dire]! - (container === window ? 0 : targetRect[dire])}px`
    } else {
      style[dire] = `${container === window ? targetRect[dire] : 0}px`
    }
  })
  return style
}
