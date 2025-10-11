/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { isNil, isObject, isUndefined } from 'lodash-es'

import { type EasingFn, easeInOutCubic, rAF } from '@idux/cdk/utils'

export interface ScrollOptions {
  scrollTop?: number
  scrollLeft?: number
}

/**
 * @deprecated use `scrollTo` instead
 *
 * @param options If it is number, it means scrollTop
 * @param target target element
 */
export function setScroll(options: number | ScrollOptions, target: Element | Window = window): void {
  const { scrollTop, scrollLeft }: ScrollOptions = isObject(options) ? options : { scrollTop: options }
  if (target === window) {
    if (!isNil(scrollTop)) {
      document.body.scrollTop = scrollTop
      document.documentElement.scrollTop = scrollTop
    }
    if (!isNil(scrollLeft)) {
      document.body.scrollLeft = scrollLeft
      document.documentElement.scrollLeft = scrollLeft
    }
  } else {
    if (!isNil(scrollTop)) {
      ;(target as Element).scrollTop = scrollTop
    }
    if (!isNil(scrollLeft)) {
      ;(target as Element).scrollLeft = scrollLeft
    }
  }
}

/** get the position of the scroll */
export function getScroll(target: Element | Window = window): Required<ScrollOptions> {
  if (target === window) {
    return {
      scrollTop: target.scrollY || document.documentElement.scrollTop,
      scrollLeft: target.scrollX || document.documentElement.scrollLeft,
    }
  } else {
    const { scrollTop, scrollLeft } = target as Element
    return { scrollTop, scrollLeft }
  }
}

export interface ScrollToTopOptions {
  /** Scroll amount of change, its priority is greater than `top` */
  amountOfChange?: number
  /** Scroll end position */
  top?: number
  /** Scroll target, default as window */
  target?: Element | Window
  /** Animation duration, default as 450 */
  duration?: number
  /** Scroll easing function, default as easeInOutCubic */
  easing?: EasingFn
  /** Scroll end callback */
  callback?: () => void
}

/**
 * @deprecated use `scrollTo` instead
 *
 * @param options
 * @returns
 */
export const scrollToTop = (options: ScrollToTopOptions = {}): void => {
  const { top, amountOfChange, target = window, duration = 450, easing = easeInOutCubic, callback } = options

  if (isNil(top) && isNil(amountOfChange)) {
    return
  }

  const { scrollTop } = getScroll(target)
  const startTime = Date.now()

  const frameFunc = () => {
    const time = Date.now() - startTime
    const elapsed = time > duration ? duration : time
    const _amountOfChange = amountOfChange ?? top! - scrollTop
    const nextScrollTop = easing(elapsed, scrollTop, _amountOfChange, duration)
    if (target === window) {
      target.scrollTo(window.pageXOffset, nextScrollTop)
    } else {
      ;(target as HTMLElement).scrollTop = nextScrollTop
    }
    if (time < duration) {
      rAF(frameFunc)
    } else if (typeof callback === 'function') {
      callback()
    }
  }

  rAF(frameFunc)
}

export interface ScrollToOptions {
  /** Scroll amount of change, its priority is greater than `scrollLeft` */
  amountOfLeft?: number
  /** Scroll end position */
  scrollLeft?: number
  /** Scroll amount of change, its priority is greater than `scrollTop` */
  amountOfTop?: number
  /** Scroll end position */
  scrollTop?: number
  /** Scroll target, default as window */
  target?: Element | Window
  /** Animation duration, default as 0 */
  duration?: number
  /** Scroll easing function, default as easeInOutCubic */
  easing?: EasingFn
  /** Scroll end callback */
  callback?: () => void
}

export const scrollTo = (options: ScrollToOptions = {}): void => {
  const {
    amountOfLeft,
    scrollLeft,
    amountOfTop,
    scrollTop,
    target = window,
    duration = 0,
    easing = easeInOutCubic,
    callback,
  } = options

  if (isNil(amountOfLeft) && isNil(scrollLeft) && isNil(amountOfTop) && isNil(scrollTop)) {
    return
  }

  const { scrollLeft: originScrollLeft, scrollTop: originScrollTop } = getScroll(target)

  const startTime = Date.now()

  const frameFunc = () => {
    const time = Date.now() - startTime
    const elapsed = time > duration ? duration : time

    const leftChange = amountOfLeft ?? (scrollLeft ? scrollLeft - originScrollLeft : 0)
    const nextScrollLeft = leftChange !== 0 ? easing(elapsed, originScrollLeft, leftChange, duration) : originScrollLeft

    const topChange = amountOfTop ?? (scrollTop ? scrollTop - originScrollTop : 0)
    const nextScrollTop = topChange !== 0 ? easing(elapsed, originScrollTop, topChange, duration) : originScrollTop

    if (target === window) {
      target.scrollTo(nextScrollLeft, nextScrollTop)
    } else {
      ;(target as HTMLElement).scrollLeft = nextScrollLeft
      ;(target as HTMLElement).scrollTop = nextScrollTop
    }
    if (time < duration) {
      rAF(frameFunc)
    } else if (typeof callback === 'function') {
      callback()
    }
  }

  duration ? rAF(frameFunc) : frameFunc()
}

let cachedScrollBarSize: number

export function getScrollBarSize(target?: HTMLElement): number {
  if (isUndefined(document)) {
    return 0
  }

  if (target) {
    const { width } = getComputedStyle(target, '::-webkit-scrollbar')
    const match = width.match(/^(.*)px$/)
    const value = Number(match?.[1])
    if (!Number.isNaN(value)) {
      return value
    }
  }

  if (cachedScrollBarSize === undefined) {
    const inner = document.createElement('div')
    inner.style.width = '100%'
    inner.style.height = '200px'

    const outer = document.createElement('div')
    const outerStyle = outer.style

    outerStyle.position = 'absolute'
    outerStyle.top = '0'
    outerStyle.left = '0'
    outerStyle.pointerEvents = 'none'
    outerStyle.visibility = 'hidden'
    outerStyle.width = '200px'
    outerStyle.height = '150px'
    outerStyle.overflow = 'hidden'

    outer.appendChild(inner)

    document.body.appendChild(outer)

    const widthContained = inner.offsetWidth
    outer.style.overflow = 'scroll'
    let widthScroll = inner.offsetWidth

    if (widthContained === widthScroll) {
      widthScroll = outer.clientWidth
    }

    document.body.removeChild(outer)

    cachedScrollBarSize = widthContained - widthScroll
  }
  return cachedScrollBarSize
}
