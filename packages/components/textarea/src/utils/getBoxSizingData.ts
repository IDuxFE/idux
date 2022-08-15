/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

export interface BoxSizingData {
  boxSizing: string
  paddingSize: number
  borderSize: number
  paddingTop: number
  paddingBottom: number
  borderTop: number
  borderBottom: number
}

export function getBoxSizingData(node: HTMLElement): BoxSizingData {
  const { boxSizing, paddingBottom, paddingTop, borderBottom, borderTop } = window.getComputedStyle(node)

  const _paddingTop = parseFloat(paddingTop)
  const _paddingBottom = parseFloat(paddingBottom)
  const _borderTop = parseFloat(borderTop)
  const _borderBottom = parseFloat(borderBottom)

  return {
    boxSizing,
    paddingSize: _paddingTop + _paddingBottom,
    borderSize: _borderTop + _borderBottom,
    paddingTop: _paddingTop,
    paddingBottom: _paddingBottom,
    borderTop: _borderTop,
    borderBottom: _borderBottom,
  }
}
