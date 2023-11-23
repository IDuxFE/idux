/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CertainThemeTokens, GlobalThemeTokens } from '@idux/components/theme'

export function getDefaultThemeTokens(tokens: GlobalThemeTokens): CertainThemeTokens<'button'> {
  const {
    fontSizeSm,
    fontSizeMd,
    fontSizeLg,
    heightSm,
    heightMd,
    heightLg,
    heightXl,
    paddingSizeSm,
    paddingSizeMd,
    paddingSizeLg,
    paddingSizeXl,
    paddingSize2Xl,

    colorPrimary,
    colorPrimaryHover,
    colorPrimaryActive,
    colorErrorBg,
    colorErrorBgHover,
    colorErrorBgActive,
    colorErrorText,
    colorErrorTextHover,
    colorErrorTextActive,
    colorText,
    colorTextDisabled,
    colorTextInverse,
    colorContainerBg,
    colorContainerBgDisabled,
    colorBorder,
    borderRadiusSm,
    fontSizeIcon,
  } = tokens

  return {
    fontSizeXs: fontSizeSm,
    fontSizeSm,
    fontSizeMd,
    fontSizeLg,
    fontSizeXl: fontSizeLg,

    minWidthXs: 56,
    minWidthSm: 64,
    minWidthMd: 72,
    minWidthLg: 120,
    minWidthXl: 160,

    heightXs: heightSm,
    heightSm: heightMd,
    heightMd,
    heightLg,
    heightXl,

    paddingSizeHorizontalXs: paddingSizeSm,
    paddingSizeHorizontalSm: paddingSizeMd,
    paddingSizeHorizontalMd: paddingSizeLg,
    paddingSizeHorizontalLg: paddingSizeXl,
    paddingSizeHorizontalXl: paddingSize2Xl,

    color: colorText,
    colorDisabled: colorTextDisabled,
    bgColor: colorContainerBg,
    bgColorDisabled: colorContainerBgDisabled,
    borderColor: colorBorder,
    borderRadius: borderRadiusSm,

    primaryColor: colorTextInverse,
    primaryBgColor: colorPrimary,
    primaryBgColorHover: colorPrimaryHover,
    primaryBgColorActive: colorPrimaryActive,

    dangerColor: colorErrorText,
    dangerColorHover: colorErrorTextHover,
    dangerColorActive: colorErrorTextActive,

    dangerBgColor: colorErrorBg,
    dangerBgColorHover: colorErrorBgHover,
    dangerBgColorActive: colorErrorBgActive,

    ghostBorderColor: colorContainerBg,
    ghostBgColorHover: 'rgba(255, 255, 255, 0.2)',
    ghostBgColorActive: colorContainerBg,
    ghostBgColorDisabled: 'rgba(255, 255, 255, 0.4)',

    iconColor: 'inherit',
    iconFontSize: fontSizeIcon,
  }
}
