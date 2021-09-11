import { addClass, convertCssPixel, removeClass } from '@idux/cdk/utils'
import { getScroll, setScroll } from '../utils'
import { ScrollStrategy } from './scrollStrategy'

export interface BlockScrollStrategyOptions {
  container?: HTMLElement
  className?: string
}

const defaultClassName = 'ix-cdk-scroll-block'

let cacheStrategy: {
  id: number
  options: BlockScrollStrategyOptions
}[] = []

const hasExisted = (uid: number) => {
  return cacheStrategy.some(({ id }) => id === uid)
}

const hasSame = (container: HTMLElement, className: string) => {
  return cacheStrategy.some(({ options }) => options.container === container && options.className === className)
}

let uuid = 0

/**
 * Strategy that will prevent the user from scrolling while the overlay is visible.
 */
export class BlockScrollStrategy implements ScrollStrategy {
  uid = uuid++

  private cacheStyle = { top: '', left: '' }
  private cacheScroll: { scrollTop: number; scrollLeft: number } | undefined
  private container: HTMLElement
  private className: string

  constructor(options: BlockScrollStrategyOptions = {}) {
    const { container = document.documentElement, className = defaultClassName } = options
    this.container = container
    this.className = className
  }

  /** Blocks page-level scroll while the attached overlay is open. */
  enable(): void {
    const { uid, container, className } = this
    if (hasExisted(uid)) {
      return
    }
    if (hasSame(container, className)) {
      cacheStrategy.push({ id: uid, options: { container, className } })
      return
    }

    this.cacheScroll = getScroll(container)
    this.cacheStyle = { top: container.style.top, left: container.style.left }

    container.style.top = convertCssPixel(-this.cacheScroll.scrollTop)
    container.style.left = convertCssPixel(-this.cacheScroll.scrollLeft)

    addClass(container, className)

    cacheStrategy.push({ id: uid, options: { container, className } })
  }

  /** Unblocks page-level scroll while the attached overlay is open. */
  disable(): void {
    const { uid, container, className } = this
    if (!hasExisted(uid)) {
      return
    }
    cacheStrategy = cacheStrategy.filter(({ id }) => id !== this.uid)
    if (hasSame(container, className)) {
      return
    }

    container.style.top = this.cacheStyle.top
    container.style.left = this.cacheStyle.left

    removeClass(container, className)

    setScroll(this.cacheScroll!, container)
  }
}
