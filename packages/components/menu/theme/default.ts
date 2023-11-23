/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type CertainThemeTokens, type GlobalThemeTokens, getGreyColors } from '@idux/components/theme'
export function getDefaultThemeTokens(tokens: GlobalThemeTokens): CertainThemeTokens<'menu'> {
  const {
    heightMd,
    heightLg,
    fontSizeSm,
    fontSizeMd,
    fontWeightHeader,
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
    colorBgInverse,
  } = tokens

  const greyColors = getGreyColors('graphite')

  return {
    borderRadius: 0,

    height: heightMd,
    heightLevel1: heightLg,

    fontSize: fontSizeSm,
    fontSizeLevel1: fontSizeMd,

    overlayMinWidth: 128,
    collapsedWidth: 44,

    itemColor: colorText,
    itemColorHover: colorText,
    itemColorActive: colorPrimaryText,
    itemColorDisabled: colorTextDisabled,
    itemGroupColor: colorTextInfo,

    itemBg: colorContainerBg,
    itemBgHover: colorContainerBgHover,
    itemBgActive: colorContainerBgActive,
    itemBgDisabled: colorContainerBg,
    itemGroupBg: colorContainerBg,

    horizontalItemColorHover: colorText,
    horizontalItemColorActive: colorPrimaryText,
    horizontalItemBgHover: colorContainerBgHover,
    horizontalItemBgActive: colorContainerBgActive,

    darkItemColor: colorTextInverse,
    darkItemColorHover: colorTextInverse,
    darkItemColorActive: colorTextInverse,
    darkItemColorDisabled: colorTextInverseDisabled,
    darkItemGroupColor: colorTextInfo,
    darkItemFontWeightActive: fontWeightHeader,

    darkItemBg: colorBgInverse,
    darkItemBgHover: greyColors.d50,
    darkItemBgActive: colorPrimary,
    darkItemBgDisabled: colorBgInverse,
    darkItemGroupBg: colorBgInverse,

    darkHorizontalItemColorHover: colorTextInverse,
    darkHorizontalItemColorActive: colorTextInverse,
    darkHorizontalItemBgHover: greyColors.d50,
    darkHorizontalItemBgActive: greyColors.d30,
  }
}
