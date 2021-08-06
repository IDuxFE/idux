import { addClass, removeClass, convertCssPixel } from '@idux/cdk/utils'
import { getScroll, setScroll } from './utils'

export interface ScrollLockerOptions {
  container?: HTMLElement
  blockClassName?: string
}

let locks: { id: number; options: ScrollLockerOptions }[] = []

const defaultBlockClassName = 'ix-cdk-scroll-block'

let uuid = 0

const hasSomeLock = (currOptions: ScrollLockerOptions) => {
  return locks.some(
    ({ options }) =>
      options.container === currOptions.container && options.blockClassName === currOptions.blockClassName,
  )
}

export class ScrollLocker {
  private id = uuid++
  private cacheStyle = { top: '0px', left: '0px' }
  private cacheScroll = { scrollTop: 0, scrollLeft: 0 }

  constructor(private options: ScrollLockerOptions = {}) {}

  getContainer(): HTMLElement {
    return this.options.container ?? document.documentElement
  }

  lock(): void {
    // If currLock exist return
    if (this.getCurrLock()) {
      return
    }

    // If same container effect, return
    if (hasSomeLock(this.options)) {
      locks.push({ id: this.id, options: this.options })
      return
    }
    const container = this.getContainer()

    this.cacheScroll = getScroll(container)
    this.cacheStyle = { top: container.style.top, left: container.style.left }

    container.style.top = convertCssPixel(-this.cacheScroll.scrollTop)
    container.style.left = convertCssPixel(-this.cacheScroll.scrollLeft)

    const blockClassName = this.getBlockClassName()
    addClass(container, blockClassName)

    locks.push({ id: this.id, options: this.options })
  }

  unLock(): void {
    const currLock = this.getCurrLock()
    if (!currLock) {
      return
    }

    locks = locks.filter(({ id }) => id !== this.id)
    if (hasSomeLock(currLock.options)) {
      return
    }

    // Remove Effect
    const container = this.getContainer()
    container.style.top = this.cacheStyle.top
    container.style.left = this.cacheStyle.left
    const blockClassName = this.getBlockClassName()
    removeClass(container, blockClassName)

    setScroll(this.cacheScroll, container)
  }

  reLock(options?: ScrollLockerOptions): void {
    const currLock = this.getCurrLock()

    if (currLock) {
      this.unLock()

      if (options) {
        this.options = { ...this.options, ...options }
        currLock.options = this.options
      }

      this.lock()
    }
  }

  private getCurrLock() {
    return locks.find(({ id }) => id === this.id)
  }

  private getBlockClassName() {
    return this.options.blockClassName ?? defaultBlockClassName
  }
}
