/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { addClass, removeClass } from '@idux/cdk/utils'

import { getScrollBarSize } from '../utils'
import { ScrollStrategy } from './scrollStrategy'

export interface BlockScrollStrategyOptions {
  target?: HTMLElement
  className?: string
}

const defaultClassName = 'cdk-scroll-block'

const cacheStrategy = new Map<number, BlockScrollStrategyOptions>()
const cacheStyle = new Map<HTMLElement, string>()

let uuid = 0

/**
 * Strategy that will prevent the user from scrolling while the overlay is visible.
 */
export class BlockScrollStrategy implements ScrollStrategy {
  uid = uuid++

  private target: HTMLElement
  private className: string

  constructor(options: BlockScrollStrategyOptions = {}) {
    const { target = document.documentElement, className = defaultClassName } = options
    this.target = target
    this.className = className
  }

  /** Blocks scroll while the attached overlay is open. */
  enable(): void {
    if (!this.isScrolled()) {
      return
    }

    const { uid, target, className } = this
    if (cacheStrategy.has(uid)) {
      return
    }

    if (!Array.from(cacheStrategy.values()).some(item => item.target === target)) {
      const scrollBarSize = getScrollBarSize(target === document.documentElement ? undefined : target)
      cacheStyle.set(target, target.style.width)

      target.style.width = scrollBarSize !== 0 ? `calc(100% - ${scrollBarSize}px)` : ''
    }

    this.addClassName()
    cacheStrategy.set(uid, { target, className })
  }

  /** Unblocks scroll while the attached overlay is open. */
  disable(): void {
    const { uid, target, className } = this
    const currStrategy = cacheStrategy.get(uid)
    if (!currStrategy) {
      return
    }

    cacheStrategy.delete(uid)

    const strategyArray = Array.from(cacheStrategy.values())
    if (!strategyArray.some(item => item.target === target && item.className === className)) {
      removeClass(target, className)
    }

    if (!strategyArray.some(item => item.target === target)) {
      target.style.width = cacheStyle.get(target)!
      cacheStyle.delete(target)
    }
  }

  /** Re-lock scroll while the options change. */
  update(options: BlockScrollStrategyOptions): void {
    const { uid, target, className } = this
    const currStrategy = cacheStrategy.get(uid)

    if (currStrategy) {
      this.disable()
    }

    this.target = options.target ?? target
    this.className = options.className ?? className

    if (currStrategy) {
      currStrategy.target = this.target
      currStrategy.className = this.className
      this.enable()
    }
  }

  private isScrolled(): boolean {
    const { target } = this

    return (
      (target === document.documentElement && document.body.scrollWidth > window.innerWidth) ||
      target.scrollHeight > target.clientHeight
    )
  }

  private addClassName(): void {
    const { target, className } = this
    if (!target.classList.contains(className)) {
      addClass(target, className)
    }
  }
}
