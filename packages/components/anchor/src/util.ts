import { rAF } from '@idux/cdk/utils'
import { easeInOutCubic } from '@idux/components/utils'

interface ScrollToOptions {
  container?: HTMLElement | Window | Document
  callback?: () => void
  duration?: number
}

export function getCurrentScrollTop(currTarget: Window | HTMLElement | Document): number {
  if (currTarget === window) {
    return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop
  }

  return (currTarget as HTMLElement).scrollTop
}

export const scrollTo = (y: number, options: ScrollToOptions = {}): void => {
  const { callback, duration = 450 } = options
  const container = options.container || window
  const scrollTop = getCurrentScrollTop(container)
  const startTime = Date.now()

  const frameFunc = () => {
    const timestamp = Date.now()
    const time = timestamp - startTime
    const nextScrollTop = easeInOutCubic(time > duration ? duration : time, scrollTop, y - scrollTop, duration)
    if (container === window) {
      ;(container as Window).scrollTo(window.pageXOffset, nextScrollTop)
    } else {
      ;(container as HTMLElement).scrollTop = nextScrollTop
    }
    if (time < duration) {
      rAF(frameFunc)
    } else if (typeof callback === 'function') {
      callback()
    }
  }
  rAF(frameFunc)
}

export function getOffsetTop(element: HTMLElement, container: HTMLElement | Window): number {
  if (!element.getClientRects().length) {
    return 0
  }
  const rect = element.getBoundingClientRect()
  if (rect.width || rect.height) {
    return (
      rect.top -
      (container === window
        ? element.ownerDocument!.documentElement!.clientTop
        : (container as HTMLElement).getBoundingClientRect().top)
    )
  }
  return rect.top
}
