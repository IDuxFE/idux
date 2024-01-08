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
  algrithms: ThemeTokenAlgorithms,
): CertainThemeTokens<'tag'> {
  const {
    lineWidth,
    borderRadiusSm,
    tagCompColorAlpha,
    colorTextInfo,
    colorSuccessBg,
    colorInfoBg,
    colorWarningBg,
    colorRiskBg,
    colorErrorBg,
    colorFatalBg,
  } = tokens
  const { getGreyColors } = algrithms
  const greyColors = getGreyColors()

  return {
    bgColorNormal: getAlphaColor(colorTextInfo, tagCompColorAlpha),
    bgColorFilled: greyColors.base,
    borderWidth: lineWidth,
    borderRadius: borderRadiusSm,

    minWidthRect: 40,
    minWidthRound: 48,
    minWidthNumeric: 64,

    // private
    successBgColor: getAlphaColor(colorSuccessBg, tagCompColorAlpha),
    infoBgColor: getAlphaColor(colorInfoBg, tagCompColorAlpha),
    warningBgColor: getAlphaColor(colorWarningBg, tagCompColorAlpha),
    riskBgColor: getAlphaColor(colorRiskBg, tagCompColorAlpha),
    errorBgColor: getAlphaColor(colorErrorBg, tagCompColorAlpha),
    fatalBgColor: getAlphaColor(colorFatalBg, tagCompColorAlpha),
  }
}
