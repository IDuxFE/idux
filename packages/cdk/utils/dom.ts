/* eslint-disable @typescript-eslint/no-explicit-any */

type ElType = HTMLElement | Document | Window

export function on<K extends keyof HTMLElementEventMap>(
  el: ElType,
  type: K,
  listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions,
): void
export function on(
  el: ElType,
  type: string,
  listener: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions,
): void {
  if (el && type && listener) {
    el.addEventListener(type, listener, options)
  }
}

export function off<K extends keyof HTMLElementEventMap>(
  el: ElType,
  type: K,
  listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
  options?: boolean | EventListenerOptions,
): void
export function off(
  el: ElType,
  type: string,
  listener: EventListenerOrEventListenerObject,
  options?: boolean | EventListenerOptions,
): void {
  if (el && type && listener) {
    el.removeEventListener(type, listener, options)
  }
}

export function hasClass(el: HTMLElement, cls: string): boolean {
  if (!el || !cls) {
    return false
  }
  return cls
    .split(' ')
    .filter(item => item)
    .every(item => el.classList.contains(item))
}

export function addClass(el: HTMLElement, cls: string): void {
  if (!el || !cls) {
    return
  }
  cls
    .split(' ')
    .filter(item => item)
    .forEach(item => el.classList.add(item))
}

export function removeClass(el: HTMLElement, cls: string): void {
  if (!el || !cls) {
    return
  }
  cls
    .split(' ')
    .filter(item => item)
    .forEach(item => el.classList.remove(item))
}

export const rAF = requestAnimationFrame || (cb => setTimeout(cb, 1000 / 60))
