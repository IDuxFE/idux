/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResizeObserver } from '@juggle/resize-observer'
import { isString } from './typeof'

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

type ResizeListener = (entry: ResizeObserverEntry) => void

const resizeMap = new Map<Element, { listeners: ResizeListener[]; ro: ResizeObserver }>()

export function onResize(el: Element, listener: ResizeListener, options?: ResizeObserverOptions): void {
  if (resizeMap.has(el)) {
    resizeMap.get(el)!.listeners.push(listener)
  } else {
    const listeners = [listener]
    const ro = new ResizeObserver(entries => {
      entries.forEach(entry => listeners.forEach(fn => fn(entry)))
    })
    ro.observe(el, options)
    resizeMap.set(el, { listeners, ro })
  }
}

export function offResize(el: Element, listener: ResizeListener): void {
  if (!resizeMap.has(el)) {
    return
  }

  const { listeners, ro } = resizeMap.get(el)!
  const listenerIndex = listeners.indexOf(listener)
  if (listenerIndex > -1) {
    listeners.splice(listenerIndex, 1)
    if (listeners.length === 0) {
      ro.disconnect()
      resizeMap.delete(el)
    }
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

export const stopPropagation = (e: MouseEvent): void => e.stopPropagation()

export const noop = (): void => {}
