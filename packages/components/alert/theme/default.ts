/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type CertainThemeTokens, type GlobalThemeTokens, getAlphaColor } from '@idux/components/theme'
export function getDefaultThemeTokens(tokens: GlobalThemeTokens): CertainThemeTokens<'alert'> {
  const {
    heightMd,
    borderRadiusSm,
    alertCompColorAlpha,
    colorSuccessBg,
    colorInfoBg,
    colorWarningBg,
    colorErrorBg,
    colorOffline,
  } = tokens

  return {
    height: heightMd,
    borderRadius: borderRadiusSm,

    successBgColor: getAlphaColor(colorSuccessBg, alertCompColorAlpha),
    infoBgColor: getAlphaColor(colorInfoBg, alertCompColorAlpha),
    warningBgColor: getAlphaColor(colorWarningBg, alertCompColorAlpha),
    errorBgColor: getAlphaColor(colorErrorBg, alertCompColorAlpha),
    offlineBgColor: getAlphaColor(colorOffline, alertCompColorAlpha),
  }
}
