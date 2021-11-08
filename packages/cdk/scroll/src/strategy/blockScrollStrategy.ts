/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { addClass, convertCssPixel, removeClass } from '@idux/cdk/utils'

import { getScroll, setScroll } from '../utils'
import { ScrollStrategy } from './scrollStrategy'

export interface BlockScrollStrategyOptions {
  target?: HTMLElement
  className?: string
}

const defaultClassName = 'cdk-scroll-block'

interface CacheStrategy extends BlockScrollStrategyOptions {
  uid: number
  cacheScroll: { scrollTop: number; scrollLeft: number }
  cacheStyle: { top: string; left: string }
}

let cacheStrategy: CacheStrategy[] = []

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
    const { uid, target, className } = this
    if (cacheStrategy.some(item => item.uid === uid)) {
      return
    }

    let cacheScroll: { scrollTop: number; scrollLeft: number }
    let cacheStyle: { top: string; left: string }

    const sameTargetTarget = cacheStrategy.find(item => item.target === target)
    if (!sameTargetTarget) {
      cacheScroll = getScroll(target)
      cacheStyle = { top: target.style.top, left: target.style.left }

      target.style.top = convertCssPixel(-cacheScroll.scrollTop)
      target.style.left = convertCssPixel(-cacheScroll.scrollLeft)
    } else {
      cacheScroll = sameTargetTarget.cacheScroll
      cacheStyle = sameTargetTarget.cacheStyle
    }

    if (!target.classList.contains(className)) {
      addClass(target, className)
    }

    cacheStrategy.push({ uid, target, className, cacheScroll, cacheStyle })
  }

  /** Unblocks scroll while the attached overlay is open. */
  disable(): void {
    const { uid, target, className } = this
    const currStrategy = cacheStrategy.find(item => item.uid === uid)
    if (!currStrategy) {
      return
    }

    cacheStrategy = cacheStrategy.filter(item => item.uid !== uid)

    if (!cacheStrategy.some(item => item.target === target && item.className === className)) {
      removeClass(target, className)
    }

    if (!cacheStrategy.some(item => item.target === target)) {
      target.style.top = currStrategy.cacheStyle.top
      target.style.left = currStrategy.cacheStyle.left

      setScroll(currStrategy.cacheScroll, target)
    }
  }

  /** Re-lock scroll while the options change. */
  update(options: BlockScrollStrategyOptions): void {
    const { uid, target, className } = this
    const currStrategy = cacheStrategy.find(item => item.uid === uid)

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
}
