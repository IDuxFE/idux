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
): CertainThemeTokens<'table'> {
  const { getGreyColors } = algorithms
  const greyColors = getGreyColors()
  const {
    fontSizeSm,
    heightMd,
    paddingSizeSm,
    paddingSizeMd,
    paddingSizeLg,
    colorTextTitleSecondary,
    colorEmphasizedContainerBg,
    colorBorder,
    colorIconInfo,
    colorPrimary,
    colorContainerBg,
    colorContainerBgHover,
    colorInfoContainerBg,
  } = tokens

  return {
    fontSizeSm: fontSizeSm,
    fontSizeMd: fontSizeSm,
    fontSizeLg: fontSizeSm,

    headRowHeightSm: heightMd,
    headRowHeightMd: heightMd,
    headRowHeightLg: heightMd,

    cellPaddingHorizontalSm: paddingSizeSm,
    cellPaddingHorizontalMd: paddingSizeMd,
    cellPaddingHorizontalLg: paddingSizeLg,

    cellPaddingVerticalSm: 6,
    cellPaddingVerticalMd: 10,
    cellPaddingVerticalLg: 18,

    headColor: colorTextTitleSecondary,
    headBgColor: colorEmphasizedContainerBg,
    headSeparatorColor: colorBorder,
    headIconColor: colorIconInfo,
    headIconColorActive: colorPrimary,
    headIconBgColorHover: getGreyColors().l30,

    insetShadowStart: `inset 10px 0 8px -8px ${getAlphaColor(greyColors.d50, 0.12)}`,
    insetShadowEnd: `inset -10px 0 8px -8px ${getAlphaColor(greyColors.d50, 0.12)}`,

    bodyRowBgColorHover: colorContainerBgHover,
    bodyRowBgColorSelected: colorContainerBg,
    bodyRowBgColorExpanded: colorInfoContainerBg,
    bodyRowBgColorTreeExpanded: colorInfoContainerBg,

    bodyCellVerticalAlign: 'middle',

    expandableIconColor: colorIconInfo,
  }
}
