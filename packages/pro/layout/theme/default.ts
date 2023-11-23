/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProCertainThemeTokens } from '@idux/pro/theme'

import { type GlobalThemeTokens, getGreyColors } from '@idux/components/theme'
export function getDefaultThemeTokens(tokens: GlobalThemeTokens): ProCertainThemeTokens<'proLayout'> {
  const {
    fontSizeXl,
    fontWeightHeader,
    colorBorderSecondary,
    colorText,
    colorTextInfo,
    colorTextInverse,
    colorTextInverseDisabled,
    colorPrimary,
    colorPrimaryText,
    colorTextDisabled,
    colorContainerBg,
    colorContainerBgHover,
    colorContainerBgActive,
    colorEmphasizedContainerBg,
    colorEmphasizedContainerBgHover,
    colorInfoContainerBg,
    colorBgInverse,
  } = tokens

  const greyColors = getGreyColors('graphite')

  return {
    contentBgColor: colorInfoContainerBg,

    headerBoxShadow: `0 1px 0 0 ${colorBorderSecondary}`,
    siderBoxShadow: `1px 0 0 0 ${colorBorderSecondary}`,

    logoFontSize: fontSizeXl,
    logoFontWeight: fontWeightHeader,
    logoImgHeight: 36,

    siderTriggerBg: colorEmphasizedContainerBg,
    siderTriggerBgHover: colorEmphasizedContainerBgHover,
    darkSiderTriggerBg: greyColors.d30,
    darkSiderTriggerBgHover: greyColors.d50,

    menuItemColor: colorText,
    menuItemColorHover: colorText,
    menuItemColorActive: colorPrimaryText,
    menuItemColorDisabled: colorTextDisabled,
    menuItemGroupColor: colorTextInfo,

    menuItemBg: colorContainerBg,
    menuItemBgHover: colorContainerBgHover,
    menuItemBgActive: colorContainerBgActive,
    menuItemBgDisabled: colorContainerBg,
    menuItemGroupBg: colorContainerBg,

    menuHorizontalItemColorHover: colorText,
    menuHorizontalItemColorActive: colorPrimaryText,
    menuHorizontalItemBgHover: colorContainerBgHover,
    menuHorizontalItemBgActive: colorContainerBgActive,

    darkMenuItemColor: colorTextInverse,
    darkMenuItemColorHover: colorTextInverse,
    darkMenuItemColorActive: colorTextInverse,
    darkMenuItemColorDisabled: colorTextInverseDisabled,
    darkMenuItemGroupColor: colorTextInfo,
    darkMenuItemFontWeightActive: fontWeightHeader,

    darkMenuItemBg: colorBgInverse,
    darkMenuItemBgHover: greyColors.d50,
    darkMenuItemBgActive: colorPrimary,
    darkMenuItemBgDisabled: colorBgInverse,
    darkMenuItemGroupBg: colorBgInverse,

    darkMenuHorizontalItemColorHover: colorTextInverse,
    darkMenuHorizontalItemColorActive: colorTextInverse,
    darkMenuHorizontalItemBgHover: greyColors.d50,
    darkMenuHorizontalItemBgActive: greyColors.d30,
  }
}
