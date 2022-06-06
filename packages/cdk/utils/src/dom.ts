/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { isString } from 'lodash-es'

export type EventTarget = HTMLElement | Document | Window | null | undefined

export function on<K extends keyof HTMLElementEventMap>(
  el: EventTarget,
  type: K | undefined,
  listener: ((this: HTMLElement, ev: HTMLElementEventMap[K]) => any) | undefined,
  options?: boolean | AddEventListenerOptions,
): void
export function on(
  el: EventTarget,
  type: string | undefined,
  listener: EventListenerOrEventListenerObject | undefined,
  options?: boolean | AddEventListenerOptions,
): void
export function on(
  el: EventTarget,
  type: string | undefined,
  listener: EventListenerOrEventListenerObject | undefined,
  options?: boolean | AddEventListenerOptions,
): void {
  if (el && type && listener) {
    el.addEventListener(type, listener, options)
  }
}

export function off<K extends keyof HTMLElementEventMap>(
  el: EventTarget,
  type: K | undefined,
  listener: ((this: HTMLElement, ev: HTMLElementEventMap[K]) => any) | undefined,
  options?: boolean | EventListenerOptions,
): void
export function off(
  el: EventTarget,
  type: string | undefined,
  listener: EventListenerOrEventListenerObject | undefined,
  options?: boolean | EventListenerOptions,
): void
export function off(
  el: EventTarget,
  type: string | undefined,
  listener: EventListenerOrEventListenerObject | undefined,
  options?: boolean | EventListenerOptions,
): void {
  if (el && type && listener) {
    el.removeEventListener(type, listener, options)
  }
}

export function hasClass(el: HTMLElement, className: string): boolean {
  if (!className) {
    return false
  }
  return el.classList.contains(className)
}

export function addClass(el: HTMLElement, className: string | string[]): void {
  const cls: string[] = isString(className) ? [className] : className
  el.classList.add(...cls)
}

export function removeClass(el: HTMLElement, className: string | string[]): void {
  const cls: string[] = isString(className) ? [className] : className
  el.classList.remove(...cls)
}

export const rAF = requestAnimationFrame || (cb => setTimeout(cb, 1000 / 60))

export const cancelRAF = cancelAnimationFrame || clearTimeout

export function throttleRAF<T extends (...args: any[]) => void>(
  fn: T,
): {
  (...args: Parameters<T>): void
  cancel(): void
} {
  let id: number | null = null

  const frameCb = (...args: Parameters<T>) => {
    id = null
    fn(...args)
  }

  const requestCb = (...args: Parameters<T>): void => {
    if (id === null) {
      id = rAF(() => frameCb(...args))
    }
  }

  requestCb.cancel = () => {
    if (id !== null) {
      ;(cancelAnimationFrame || clearTimeout)(id)
    }
  }

  return requestCb
}

function isStyleVisible(element: HTMLElement | SVGElement) {
  const { display, visibility, opacity } = getComputedStyle(element)

  return display !== 'none' && visibility !== 'hidden' && visibility !== 'collapse' && opacity !== '0'
}

function isAttributeVisible(element: HTMLElement | SVGElement) {
  let box: DOMRect | undefined
  if (element instanceof HTMLElement) {
    if (element.offsetParent) {
      return true
    }
    box = element.getBoundingClientRect()
  } else if ((element as SVGGraphicsElement).getBBox) {
    box = (element as SVGGraphicsElement).getBBox()
  }

  if (box && box.width && box.height) {
    return true
  }
  return false
}

export function isVisibleElement(element: HTMLElement | SVGElement | undefined): boolean {
  if (!element) {
    return false
  }

  return isStyleVisible(element) && isAttributeVisible(element)
}

/**
 * Investigate if an event is a `TouchEvent`.
 */
export function isTouchEvent(evt: MouseEvent | TouchEvent): evt is TouchEvent {
  return evt.type.startsWith('touch')
}

export function getMouseEvent(evt: MouseEvent | TouchEvent): MouseEvent | Touch {
  return isTouchEvent(evt) ? evt.touches[0] || evt.changedTouches[0] : evt
}

export function getMouseClientXY(evt: MouseEvent | TouchEvent): { clientX: number; clientY: number } {
  const { clientX, clientY } = getMouseEvent(evt)
  return { clientX, clientY }
}
