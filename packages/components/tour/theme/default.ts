/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CertainThemeTokens, GlobalThemeTokens } from '@idux/components/theme'
export function getDefaultThemeTokens(tokens: GlobalThemeTokens): CertainThemeTokens<'tour'> {
  const {
    colorPrimary,
    colorText,
    colorTextInfo,
    colorContainerBg,
    borderRadiusMd,
    fontSizeSm,
    marginSizeXs,
    paddingSizeLg,
  } = tokens

  return {
    bgColor: colorContainerBg,
    descriptionColor: colorText,
    indicatorsColor: colorTextInfo,
    outlineColor: colorPrimary,

    borderRadius: borderRadiusMd,

    minWidth: 250,
    paddingTop: paddingSizeLg,
    paddingLeft: paddingSizeLg,
    paddingRight: paddingSizeLg,
    paddingBottom: paddingSizeLg,

    descriptionFontSize: fontSizeSm,
    indicatorsFontSize: fontSizeSm,

    footerBtnGap: marginSizeXs,
  }
}
