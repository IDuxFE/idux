/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/**
 * @license
 * Copyright (c) 2019-present react-component
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/react-component/tour/blob/master/LICENSE
 */
export function isInViewPort(element: HTMLElement): boolean {
  const viewWidth = window.innerWidth || document.documentElement.clientWidth
  const viewHeight = window.innerHeight || document.documentElement.clientHeight
  const { top, right, bottom, left } = element.getBoundingClientRect()

  return top >= 0 && left >= 0 && right <= viewWidth && bottom <= viewHeight
}

export function isInBox(x: number, y: number, box: { x: number; y: number; width: number; height: number }): boolean {
  return x > box.x && y > box.y && x < box.x + box.width && y < box.y + box.height
}

export function easeInOutQuad(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
  if ((elapsed /= duration / 2) < 1) {
    return (amountOfChange / 2) * elapsed * elapsed + initialValue
  }
  return (-amountOfChange / 2) * (--elapsed * (elapsed - 2) - 1) + initialValue
}
