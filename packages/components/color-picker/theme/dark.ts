/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type CertainThemeTokens, type GlobalThemeTokens, type ThemeTokenAlgorithms } from '@idux/components/theme'

import { getDefaultThemeTokens } from './default'

export function getDarkThemeTokens(
  tokens: GlobalThemeTokens,
  algorithms: ThemeTokenAlgorithms,
): CertainThemeTokens<'colorPicker'> {
  const defaultTokens = getDefaultThemeTokens(tokens, algorithms)
  const { getGreyColors } = algorithms

  const greyColors = getGreyColors()

  return {
    ...defaultTokens,
    indicatorCheckedIconColorLight: greyColors.l40,
    indicatorCheckedIconColorDark: greyColors.d40,
    sliderHandleBoxShadow: 'inset 0 0 1px 0 rgb(255 255 255 / 25%), 0 0 0 1px rgb(255 255 255 / 6%)',
    alphaGridColor: 'rgb(255 255 255 / 6%)',
    alphaGridBoxShadow: 'inset 0 0 1px 0 rgb(255 255 255 / 25%)',
  }
}
