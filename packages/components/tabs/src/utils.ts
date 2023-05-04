/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

export function getMarginSize(el: Element, isHorizontal: boolean): number {
  const style = window.getComputedStyle(el)
  if (isHorizontal) {
    const marginLeft = parseFloat(style.marginLeft) || 0
    const marginRight = parseFloat(style.marginRight) || 0
    return marginLeft + marginRight
  } else {
    const marginTop = parseFloat(style.marginTop) || 0
    const marginBottom = parseFloat(style.marginBottom) || 0
    return marginTop + marginBottom
  }
}
