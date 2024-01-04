/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CertainThemeTokens, GlobalThemeTokens } from '@idux/components/theme'
export function getDefaultThemeTokens(tokens: GlobalThemeTokens): CertainThemeTokens<'header'> {
  const {
    colorPrimary,
    colorPrimaryText,
    colorIcon,
    colorText,
    colorTextDisabled,
    colorIconHover,
    colorIconActive,
    colorIconDisabled,
    heightLg,
    heightXl,
    height2xl,
    fontSizeMd,
  } = tokens

  return {
    heightSm: heightLg,
    heightMd: heightXl,
    heightLg: heightXl,
    heightXl: height2xl,

    barWidth: 2,
    barBgColor: colorPrimary,
    barBorderRadius: 0,
    barMarginRight: 6,

    prefixColor: colorText,
    prefixColorHover: colorPrimaryText,
    prefixColorActive: colorPrimaryText,
    prefixColorDisabled: colorTextDisabled,

    suffixColor: colorIcon,
    suffixColorHover: colorIconHover,
    suffixColorActive: colorIconActive,
    suffixColorDisabled: colorIconDisabled,

    subTitleFontSize: fontSizeMd,
  }
}
