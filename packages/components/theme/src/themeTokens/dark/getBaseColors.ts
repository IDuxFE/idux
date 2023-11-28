/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { GetBaseColors } from '../../types'

import { colors } from './getColorPalette'
import { getGreyColors } from './getGreyColors'
import { type BaseColorKeys, type BaseColors, getGreyColors as sharedGetGreyColors } from '../shared'

export const getBaseColors: GetBaseColors = () => {
  return Object.keys(colors).reduce(
    (baseColors, key) => {
      baseColors[key as BaseColorKeys] = colors[key as keyof typeof colors].base

      return baseColors
    },
    {
      white: '#fff',
      graphite: getGreyColors().base,
      black: '#000',
      grey: sharedGetGreyColors('grey').base,
    } as BaseColors,
  )
}
