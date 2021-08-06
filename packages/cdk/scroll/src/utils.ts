import type { EasingFn } from '@idux/cdk/utils'

import { isNil, isObject } from 'lodash-es'
import { easeInOutCubic, rAF } from '@idux/cdk/utils'

export interface ScrollOptions {
  scrollTop?: number
  scrollLeft?: number
}

/**
 *  set the position of the scroll
 * @param options If it is number, it means scrollTop
 * @param target target element
 */
export function setScroll(options: number | ScrollOptions, target: Element | Window = window): void {
  const { scrollTop, scrollLeft }: ScrollOptions = isObject(options) ? options : { scrollTop: options }
  if (target === window) {
    if (scrollTop) {
      document.body.scrollTop = scrollTop
      document.documentElement.scrollTop = scrollTop
    }
    if (scrollLeft) {
      document.body.scrollLeft = scrollLeft
      document.documentElement.scrollLeft = scrollLeft
    }
  } else {
    if (scrollTop) {
      ;(target as Element).scrollTop = scrollTop
    }
    if (scrollLeft) {
      ;(target as Element).scrollLeft = scrollLeft
    }
  }
}

/** get the position of the scroll */
export function getScroll(target: Element | Window = window): Required<ScrollOptions> {
  if (target === window) {
    return {
      scrollTop: target.pageYOffset || document.documentElement.scrollTop,
      scrollLeft: target.pageXOffset || document.documentElement.scrollLeft,
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
