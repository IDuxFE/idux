/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

export interface BoxSizingData {
  boxSizing: string
  paddingTop: number
  paddingBottom: number
  paddingLeft: number
  paddingRight: number
  borderTop: number
  borderBottom: number
  borderLeft: number
  borderRight: number
}

export function getBoxSizingData(node: HTMLElement): BoxSizingData {
  const {
    boxSizing,
    paddingBottom,
    paddingTop,
    paddingLeft,
    paddingRight,
    borderBottom,
    borderTop,
    borderLeft,
    borderRight,
  } = window.getComputedStyle(node)

  return {
    boxSizing,
    paddingTop: parseFloat(paddingTop),
    paddingBottom: parseFloat(paddingBottom),
    paddingLeft: parseFloat(paddingLeft),
    paddingRight: parseFloat(paddingRight),
    borderTop: parseFloat(borderTop),
    borderBottom: parseFloat(borderBottom),
    borderLeft: parseFloat(borderLeft),
    borderRight: parseFloat(borderRight),
  }
}
