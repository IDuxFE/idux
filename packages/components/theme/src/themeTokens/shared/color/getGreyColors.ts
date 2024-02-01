/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ColorPalette } from './getColorPalette'

import { getBaseColors } from './getBaseColors'

type GreyColorKeys = 'graphite' | 'grey'

export function getGreyColors(color: GreyColorKeys): ColorPalette {
  const baseColor = getBaseColors()

  if (color === 'grey') {
    return {
      l50: '#fafafa',
      l40: '#f5f5f5',
      l30: '#eeeeee',
      l20: '#e0e0e0',
      l10: '#c2c2c2',
      base: baseColor.grey,
      d10: '#7a7a7a',
      d20: '#5c5c5c',
      d30: '#3d3d3d',
      d40: '#1f1f1f',
      d50: '#141414',
    }
  }

  return {
    l50: '#f7f9fc',
    l40: '#edf1f7',
    l30: '#e1e5eb',
    l20: '#d3d7de',
    l10: '#bec3cc',
    base: baseColor.graphite,
    d10: '#6f7785',
    d20: '#5e6573',
    d30: '#454c59',
    d40: '#2f3540',
    d50: '#1e232b',
  }
}
