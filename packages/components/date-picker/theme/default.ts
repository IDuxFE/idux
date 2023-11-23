/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type CertainThemeTokens, type GlobalThemeTokens, getColorPalette, getGreyColors } from '@idux/components/theme'
export function getDefaultThemeTokens(tokens: GlobalThemeTokens): CertainThemeTokens<'datePicker'> {
  const {
    colorPrimary,
    colorPrimaryTextHover,
    colorText,
    colorTextInverse,
    colorTextDisabled,
    marginSizeLg,
    paddingSizeSm,
    paddingSizeLg,
    fontSizeSm,
    fontWeightMd,
    heightMd,
  } = tokens

  const primaryColorPalette = getColorPalette(colorPrimary)
  const greyColors = getGreyColors('graphite')

  return {
    separatorMarginHorizontal: marginSizeLg,

    overlayWidth: 252,
    overlayPadding: paddingSizeLg,
    overlayFooterPadding: `${paddingSizeSm}px ${paddingSizeLg}px`,
    overlayDateInputWidth: 120,
    overlayTimeInputWidth: 96,

    boardWidth: 220,
    boardMaxHeight: 260,
    rangeBoardBorder: 'none',
    rangeOverlayPadding: `${paddingSizeLg}px ${paddingSizeLg}px 0 ${paddingSizeLg}px`,
    rangeOverlayFooterPadding: `${paddingSizeSm}px 0`,
    rangeOverlaySeparatorWidth: 32,
    rangeOverlaySeparatorFontSize: fontSizeSm,

    panelFontSize: fontSizeSm,
    panelColor: colorText,

    panelCellWidth: 28,
    panelCellHeight: 28,
    panelCellWidthLg: 52,
    panelCellHeightLg: 24,
    panelCellColorActive: colorTextInverse,
    panelCellColorHover: colorPrimaryTextHover,
    panelCellColorDisabled: colorTextDisabled,
    panelCellBgColorHover: greyColors.l50,
    panelCellBgColorActive: colorPrimary,
    panelCellBgColorInRange: primaryColorPalette.l50,
    panelCellBgColorDisabled: greyColors.l50,

    panelCellTriggerWidth: 20,
    panelCellTriggerHeight: 20,
    panelCellTriggerWidthLg: 52,
    panelCellTriggerHeightLg: 24,

    panelCellCurrentColor: colorPrimary,
    panelCellCurrentBorderColor: primaryColorPalette.l40,
    panelCellCurrentBgColor: colorPrimary,

    panelHeaerHeight: heightMd,
    panelHeaderFontSize: fontSizeSm,
    panelHeaderFontWeight: fontWeightMd,
    panelHeaderSpacing: marginSizeLg,

    panelBodyHeaderBgColor: greyColors.l50,
  }
}
