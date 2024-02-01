/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { BasicTokens, DerivedTokens, ExtendedColorTokens, GetColorPalette, GetGreyColors } from '../../../types'

export function getExtendedColorTokens(
  tokens: BasicTokens & DerivedTokens,
  getColorPalette: GetColorPalette,
  getGreyColors: GetGreyColors,
): ExtendedColorTokens {
  const greyColors = getGreyColors()

  const { colorPrimary, colorWarning, colorError, colorBg } = tokens

  const primaryColorPalette = getColorPalette(colorPrimary)

  return {
    colorContainerBg: colorBg, // 一级背景
    colorContainerBgHover: greyColors.l50,
    colorContainerBgActive: primaryColorPalette.l50,
    colorContainerBgDisabled: greyColors.l40,
    colorAddonContainerBg: greyColors.l50,
    colorEmphasizedContainerBg: greyColors.l40,
    colorEmphasizedContainerBgHover: greyColors.l30,
    colorEmphasizedContainerBgDisabled: greyColors.l10,
    colorInfoContainerBg: greyColors.l50,
    colorInfoContainerBgHover: greyColors.l50,
    colorInfoContainerBgDisabled: greyColors.l30,
    colorFillContainerBg: greyColors.l10,

    colorSeparator: greyColors.l30,

    colorTextPlaceholder: greyColors.base,
    colorTextDisabled: greyColors.l10,
    colorTextInverse: colorBg,
    colorTextInverseDisabled: greyColors.l10,
    colorTextTitle: greyColors.d40,
    colorTextTitleSecondary: greyColors.d30,
    colorTextInfo: greyColors.d10,

    colorIcon: greyColors.d20,
    colorIconInfo: greyColors.l10,
    colorIconHover: colorPrimary,
    colorIconActive: primaryColorPalette.d10,
    colorIconDisabled: greyColors.l10,

    colorWarningOutline: colorWarning,
    colorErrorOutline: colorError,

    colorBgInverse: greyColors.d40,
    colorBgInverseDisabled: greyColors.d50,

    colorBorderInverse: colorBg,
    colorBorderSecondary: greyColors.l30,

    colorMask: 'rgba(0, 0, 0, 0.45)',

    tagCompColorAlpha: 0.1,
    alertCompColorAlpha: 0.1,
  }
}
