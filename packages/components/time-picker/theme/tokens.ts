/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

export interface TimePickerThemeTokens {
  separatorMarginHorizontal: string | number

  overlayWidth: number
  overlayPadding: string | number
  overlayFooterPadding: string | number

  rangeBoardWidth: number
  rangeBoardBorder: string
  rangeOverlayPadding: string | number
  rangeOverlayFooterPadding: string | number
  rangeOverlaySeparatorPadding: string | number
  rangeOverlaySeparatorFontSize: number

  panelHeight: number
  panelPaddingHorizontal: number
  panelPaddingVertical: number
  panelFontSize: number

  panelCellHeight: number
  panelCellPaddingHorizontal: number
  panelCellColor: string
  panelCellColorActive: string
  panelCellBgColorHover: string
  panelCellBgColorActive: string
  panelCellFontWeightActive: number

  panelScrollbarWidth: number
  panelScrollbarThumbBgColor: string
  panelScrollbarThumbBorderRadius: number
  panelScrollbarTrackBgColor: string
}
