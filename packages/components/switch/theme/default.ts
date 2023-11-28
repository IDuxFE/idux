/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CertainThemeTokens, GlobalThemeTokens, ThemeTokenAlgorithms } from '@idux/components/theme'

export function getDefaultThemeTokens(
  tokens: GlobalThemeTokens,
  algorithms: ThemeTokenAlgorithms,
): CertainThemeTokens<'switch'> {
  const { getColorPalette } = algorithms
  const { colorWhite, controlHeightXs, controlHeightSm, controlHeightMd, paddingSize2Xs, colorPrimary } = tokens

  const primaryColorPalette = getColorPalette(colorPrimary)

  return {
    activeDisabledColor: primaryColorPalette.l30,

    heightSm: controlHeightXs,
    heightMd: controlHeightSm,
    heightLg: controlHeightMd,

    handleSizeSm: 12,
    handleSizeMd: 20,
    handleSizeLg: 28,

    iconFontSizeSm: 9,
    iconFontSizeMd: 14,
    iconFontSizeLg: 14,

    handlePadding: paddingSize2Xs,
    handleBgColor: colorWhite,
    handleBoxShadow: `none`,
  }
}
