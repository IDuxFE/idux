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

  const _paddingTop = parseSize(paddingTop)
  const _paddingBottom = parseSize(paddingBottom)
  const _borderTop = parseSize(borderTop)
  const _borderBottom = parseSize(borderBottom)

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

function parseSize(size: string): number {
  const parsedSize = parseFloat(size)

  return Number.isNaN(parsedSize) ? 0 : parsedSize
}
