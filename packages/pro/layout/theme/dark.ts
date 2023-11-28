/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { GlobalThemeTokens } from '@idux/components/theme'
import type { ProCertainThemeTokens } from '@idux/pro/theme'

import { darkActiveBg } from './darkActiveBg'

export function getDarkThemeTokens(tokens: GlobalThemeTokens): ProCertainThemeTokens<'proLayout'> {
  const {
    fontSizeXl,
    fontWeightMd,
    fontWeightHeader,
    colorBorderSecondary,
    colorText,
    colorTextInfo,
    colorPrimaryText,
    colorTextDisabled,
    colorContainerBg,
    colorContainerBgHover,
    colorContainerBgActive,
    colorEmphasizedContainerBg,
    colorEmphasizedContainerBgHover,
    colorInfoContainerBg,
  } = tokens

  const siderTriggerBg = colorEmphasizedContainerBg
  const siderTriggerBgHover = colorEmphasizedContainerBgHover

  const menuItemColor = colorText
  const menuItemColorHover = colorText
  const menuItemColorActive = menuItemColor
  const menuItemColorDisabled = colorTextDisabled
  const menuItemGroupColor = colorTextInfo

  const menuItemBg = colorContainerBg
  const menuItemBgHover = `linear-gradient(to right, rgba(28, 110, 255, 0.20) 1%, rgba(76, 140, 255, 0.05) 99%)`
  const menuItemBgActive = `left / 100% 100% no-repeat url(${darkActiveBg})`
  const menuItemBgDisabled = colorContainerBg
  const menuItemGroupBg = colorContainerBg

  const menuSubExpandedBg = colorContainerBg
  const menuSubExpandedBgActive = colorInfoContainerBg

  const menuHorizontalItemColorHover = colorText
  const menuHorizontalItemColorActive = colorPrimaryText
  const menuHorizontalItemBgHover = colorContainerBgHover
  const menuHorizontalItemBgActive = colorContainerBgActive

  return {
    contentBgColor: colorInfoContainerBg,

    headerBoxShadow: `0 1px 0 0 ${colorBorderSecondary}`,
    siderBoxShadow: `1px 0 0 0 ${colorBorderSecondary}`,

    logoFontSize: fontSizeXl,
    logoFontWeight: fontWeightHeader,
    logoImgHeight: 36,

    siderTriggerBg,
    siderTriggerBgHover,
    darkSiderTriggerBg: siderTriggerBg,
    darkSiderTriggerBgHover: siderTriggerBgHover,

    menuItemColor,
    menuItemColorHover,
    menuItemColorActive,
    menuItemColorDisabled,
    menuItemGroupColor,

    menuItemBg,
    menuItemBgHover,
    menuItemBgActive,
    menuItemBgDisabled,
    menuItemGroupBg,

    menuSubExpandedBg,
    menuSubExpandedBgActive,

    menuHorizontalItemColorHover,
    menuHorizontalItemColorActive,
    menuHorizontalItemBgHover,
    menuHorizontalItemBgActive,

    darkMenuItemColor: menuItemColor,
    darkMenuItemColorHover: menuItemColorHover,
    darkMenuItemColorActive: menuItemColorActive,
    darkMenuItemColorDisabled: menuItemColorDisabled,
    darkMenuItemGroupColor: menuItemGroupColor,
    darkMenuItemFontWeightActive: fontWeightMd,

    darkMenuItemBg: menuItemBg,
    darkMenuItemBgHover: menuItemBgHover,
    darkMenuItemBgActive: menuItemBgActive,
    darkMenuItemBgDisabled: menuItemBgDisabled,
    darkMenuItemGroupBg: menuItemGroupBg,

    darkMenuSubExpandedBg: menuSubExpandedBg,
    darkMenuSubExpandedBgActive: menuSubExpandedBgActive,

    darkMenuHorizontalItemColorHover: menuHorizontalItemColorHover,
    darkMenuHorizontalItemColorActive: menuHorizontalItemColorActive,
    darkMenuHorizontalItemBgHover: menuHorizontalItemBgHover,
    darkMenuHorizontalItemBgActive: menuHorizontalItemBgActive,
  }
}
