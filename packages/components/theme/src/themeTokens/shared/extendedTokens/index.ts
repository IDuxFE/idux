/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { BasicTokens, DerivedTokens, ExtendedTokens, GetColorPalette, GetGreyColors } from '../../../types'

import { getControlTokens } from './getControlTokens'
import { getExtendedColorTokens } from './getExtendedColorTokens'
import { getExtendedFontTokens } from './getExtendedFontTokens'
import { getExtendedSizeTokens } from './getExtendedSizeTokens'
import { getOverlayTokens } from './getOverlayTokens'
import { getScollbarTokens } from './getScrollbarTokens'

export interface GetExtendedTokensOptions {
  getColorPalette: GetColorPalette
  getGreyColors: GetGreyColors
}

export function getExtendedTokens(
  tokens: BasicTokens & DerivedTokens,
  options: GetExtendedTokensOptions,
): ExtendedTokens {
  const { getColorPalette, getGreyColors } = options

  const extendedColorTokens = getExtendedColorTokens(tokens, getColorPalette, getGreyColors)
  const mergedTokens = { ...tokens, ...extendedColorTokens }

  return {
    ...extendedColorTokens,
    ...getExtendedFontTokens(tokens),
    ...getExtendedSizeTokens(tokens),
    ...getScollbarTokens(getGreyColors),
    ...getControlTokens(mergedTokens),
    ...getOverlayTokens(mergedTokens),
  }
}
