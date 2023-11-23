/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CertainThemeTokens, GlobalThemeTokens } from '@idux/components/theme'

export function getDefaultThemeTokens(tokens: GlobalThemeTokens): CertainThemeTokens<'form'> {
  const { colorTextInfo, colorErrorBg, colorErrorText, fontSizeSm, marginSize2Xs, marginSizeSm, paddingSizeSm } = tokens

  return {
    labelColor: colorTextInfo,
    labelRequiredColor: colorErrorText,

    labelFontSize: fontSizeSm,
    labelColonMarginLeft: marginSize2Xs,
    labelColonMarginRight: marginSizeSm,

    messageTooltipBgColor: colorErrorBg,

    itemMarginBottom: marginSizeSm,

    verticalItemLabelPadding: `0 0 ${paddingSizeSm}px`,
    verticalItemLabelMargin: 0,
  }
}
