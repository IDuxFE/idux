/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CertainThemeTokens, GlobalThemeTokens } from '@idux/components/theme'
export function getDefaultThemeTokens(tokens: GlobalThemeTokens): CertainThemeTokens<'table'> {
  const {
    fontSizeSm,
    heightMd,
    heightLg,
    height2xl,
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
    colorContainerBgDisabled,
    colorInfoContainerBg,
  } = tokens

  return {
    fontSizeSm: fontSizeSm,
    fontSizeMd: fontSizeSm,
    fontSizeLg: fontSizeSm,

    headRowHeightSm: heightMd,
    headRowHeightMd: heightMd,
    headRowHeightLg: heightMd,

    bodyRowHeightSm: heightMd,
    bodyRowHeightMd: heightLg,
    bodyRowHeightLg: height2xl,

    rowPaddingHorizontalSm: paddingSizeSm,
    rowPaddingHorizontalMd: paddingSizeMd,
    rowPaddingHorizontalLg: paddingSizeLg,

    headColor: colorTextTitleSecondary,
    headBgColor: colorEmphasizedContainerBg,
    headSeparatorColor: colorBorder,
    headIconColor: colorIconInfo,
    headIconColorActive: colorPrimary,
    headIconBgColorHover: colorContainerBgDisabled,

    bodyRowBgColorHover: colorContainerBgHover,
    bodyRowBgColorSelected: colorContainerBg,
    bodyRowBgColorExpanded: colorInfoContainerBg,
    bodyRowBgColorTreeExpanded: colorInfoContainerBg,

    expandableIconColor: colorIconInfo,
  }
}
