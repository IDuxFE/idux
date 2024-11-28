/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CertainThemeTokens, GlobalThemeTokens, ThemeTokenAlgorithms } from '@idux/components/theme'
export function getDefaultThemeTokens(
  tokens: GlobalThemeTokens,
  algorithms: ThemeTokenAlgorithms,
): CertainThemeTokens<'datePicker'> {
  const { getColorPalette } = algorithms
  const {
    colorPrimary,
    colorPrimaryTextHover,
    colorText,
    colorTextInverse,
    colorTextDisabled,
    colorContainerBgHover,
    colorInfoContainerBg,
    marginSizeLg,
    paddingSizeSm,
    paddingSizeMd,
    paddingSizeLg,
    fontSizeSm,
    fontWeightMd,
    heightMd,
  } = tokens

  const primaryColorPalette = getColorPalette(colorPrimary)

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
    rangeShortcutsItemHeight: heightMd,
    rangeShortcutsItemFontSize: fontSizeSm,
    rangeShortcutsItemPadding: `${paddingSizeSm}px ${paddingSizeMd}px`,

    panelFontSize: fontSizeSm,
    panelColor: colorText,

    panelCellWidth: 28,
    panelCellHeight: 28,
    panelCellWidthLg: 52,
    panelCellHeightLg: 24,
    panelCellColorActive: colorTextInverse,
    panelCellColorHover: colorPrimaryTextHover,
    panelCellColorDisabled: colorTextDisabled,
    panelCellBgColorHover: colorContainerBgHover,
    panelCellBgColorActive: colorPrimary,
    panelCellBgColorInRange: primaryColorPalette.l50,
    panelCellBgColorDisabled: colorInfoContainerBg,

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

    panelBodyHeaderBgColor: colorInfoContainerBg,
  }
}
