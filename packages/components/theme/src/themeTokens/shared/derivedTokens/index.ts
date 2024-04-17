/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { BasicTokens, DerivedTokens, GetBaseColors, GetColorPalette, GetGreyColors } from '../../../types'

import { getDerivedColorTokens } from './getDerivedColorTokens'
import { getDerivedFontTokens } from './getDerivedFontTokens'
import { getDerivedMotionTokens } from './getDerivedMotionTokens'
import { getDerivedSizeTokens } from './getDerivedSizeTokens'
import { getShadowTokens } from './getShadowTokens'

export interface GetDerivedTokensOptions {
  getBaseColors: GetBaseColors
  getColorPalette: GetColorPalette
  getGreyColors: GetGreyColors
}

export function getDerivedTokens(basicTokens: BasicTokens, options: GetDerivedTokensOptions): DerivedTokens {
  const { getBaseColors, getColorPalette, getGreyColors } = options

  return {
    ...getDerivedColorTokens(basicTokens, getBaseColors, getColorPalette, getGreyColors),
    ...getDerivedFontTokens(basicTokens),
    ...getDerivedSizeTokens(basicTokens),
    ...getDerivedMotionTokens(basicTokens),
    ...getShadowTokens(getGreyColors),
  }
}
