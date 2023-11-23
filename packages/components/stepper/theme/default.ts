/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CertainThemeTokens, GlobalThemeTokens } from '@idux/components/theme'
export function getDefaultThemeTokens(tokens: GlobalThemeTokens): CertainThemeTokens<'stepper'> {
  const { heightSm, heightMd, marginSizeSm, fontSizeSm, fontSizeMd, fontSizeLg, fontSizeHeaderSm, fontSizeHeaderMd } =
    tokens

  return {
    iconSizeSm: heightSm,
    iconSizeMd: heightMd,
    iconFontSizeSm: fontSizeMd,
    iconFontSizeMd: fontSizeLg,
    iconBorderWidthSm: 2,
    iconBorderWidthMd: 2,
    iconMarginSm: `0 ${marginSizeSm}px 0 0`,
    iconMarginMd: `0 ${marginSizeSm}px 0 0`,

    titleFontSizeSm: fontSizeHeaderSm,
    titleFontSizeMd: fontSizeHeaderMd,

    descriptionFontSizeSm: fontSizeSm,
    descriptionFontSizeMd: fontSizeMd,

    contentMinHeightSm: 60,
    contentMinHeightMd: 80,

    lineType: 'dashed',
  }
}
