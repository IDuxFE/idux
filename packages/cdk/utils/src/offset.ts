/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

export const getOffset = (el: HTMLElement, target: HTMLElement | Window = window): { top: number; left: number } => {
  if (!el || !el.getClientRects().length) {
    return { top: 0, left: 0 }
  }

  let { top, left } = el.getBoundingClientRect()

  if (target === window) {
    const doc = el.ownerDocument.documentElement
    top = top - doc.clientTop
    left = left - doc.clientLeft
  } else {
    const targetRect = (target as HTMLElement).getBoundingClientRect()
    top = top - targetRect.top
    left = left - targetRect.left
  }

  return { top, left }
}
