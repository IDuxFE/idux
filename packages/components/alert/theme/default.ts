/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import {
  type CertainThemeTokens,
  type GlobalThemeTokens,
  type ThemeTokenAlgorithms,
  getAlphaColor,
} from '@idux/components/theme'
export function getDefaultThemeTokens(
  tokens: GlobalThemeTokens,
  algorithms: ThemeTokenAlgorithms,
): CertainThemeTokens<'alert'> {
  const {
    heightMd,
    borderRadiusSm,
    alertCompColorAlpha,
    colorContainerBg,
    colorSuccessText,
    colorSuccessBg,
    colorInfoText,
    colorInfoBg,
    colorErrorText,
    colorErrorBg,
    colorOfflineText,
    colorOffline,
  } = tokens
  const { getColorPalette, getBaseColors } = algorithms

  const bronzeColorPalette = getColorPalette(getBaseColors().bronze)

  return {
    height: heightMd,
    borderRadius: borderRadiusSm,

    successTextColor: colorSuccessText,
    successBgColor: getAlphaColor(colorSuccessBg, alertCompColorAlpha, colorContainerBg),
    infoTextColor: colorInfoText,
    infoBgColor: getAlphaColor(colorInfoBg, alertCompColorAlpha, colorContainerBg),
    warningTextColor: bronzeColorPalette.d10,
    warningBgColor: getAlphaColor(getBaseColors().gold, alertCompColorAlpha, colorContainerBg),
    errorTextColor: colorErrorText,
    errorBgColor: getAlphaColor(colorErrorBg, alertCompColorAlpha, colorContainerBg),
    offlineTextColor: colorOfflineText,
    offlineBgColor: getAlphaColor(colorOffline, alertCompColorAlpha, colorContainerBg),
  }
}
