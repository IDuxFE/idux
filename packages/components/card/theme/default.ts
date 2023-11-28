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
): CertainThemeTokens<'card'> {
  const { getGreyColors } = algorithms
  const { fontSizeSm, fontSizeMd, fontSizeXl, fontSizeLg, marginSizeXs, paddingSizeSm, paddingSizeLg, paddingSizeXl } =
    tokens

  const greyColors = getGreyColors()

  return {
    fontSizeSm: fontSizeSm,
    fontSizeMd: fontSizeSm,
    fontSizeLg: fontSizeMd,

    paddingSizeSm: paddingSizeLg,
    paddingSizeMd: paddingSizeLg,
    paddingSizeLg: paddingSizeXl,
    showShadowBorderWidth: 0,

    markWidth: fontSizeXl,
    markHeight: fontSizeLg,

    headerPadding: paddingSizeSm,

    loadingSpacing: marginSizeXs,
    loadingHeight: fontSizeMd,
    loadingBgSize: `600%`,

    loadingStartColor: greyColors.l40,
    loadingEndColor: greyColors.l30,

    gridWidth: `25%`,
  }
}
