/** get position of `el` against `target` */
export const getOffset = (el: HTMLElement, target: HTMLElement | Window): { top: number; left: number } => {
  if (!el || !el.getClientRects().length) {
    return { top: 0, left: 0 }
  }

  let { width, height, top, left } = el.getBoundingClientRect()

  if (width || height) {
    if (target === window) {
      const doc = el.ownerDocument.documentElement
      top = top - doc.clientTop
      left = left - doc.clientLeft
    } else {
      const targetRect = (target as HTMLElement).getBoundingClientRect()
      top = top - targetRect.top
      left = left - targetRect.left
    }
  }

  return { top, left }
}
