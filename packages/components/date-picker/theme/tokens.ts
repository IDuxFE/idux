/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

export interface DatePickerThemeTokens {
  separatorMarginHorizontal: string | number

  overlayWidth: number
  overlayPadding: string | number
  overlayFooterPadding: string | number
  overlayDateInputWidth: number
  overlayTimeInputWidth: number

  boardWidth: number
  boardMaxHeight: number
  rangeBoardBorder: string
  rangeOverlayPadding: string | number
  rangeOverlayFooterPadding: string | number
  rangeOverlaySeparatorWidth: string | number
  rangeOverlaySeparatorFontSize: number

  panelFontSize: number
  panelColor: string

  panelCellWidth: number
  panelCellHeight: number
  panelCellWidthLg: number
  panelCellHeightLg: number
  panelCellColorActive: string
  panelCellColorHover: string
  panelCellColorDisabled: string
  panelCellBgColorHover: string
  panelCellBgColorActive: string
  panelCellBgColorInRange: string
  panelCellBgColorDisabled: string

  panelCellTriggerWidth: number
  panelCellTriggerHeight: number
  panelCellTriggerWidthLg: number
  panelCellTriggerHeightLg: number

  panelCellCurrentColor: string
  panelCellCurrentBorderColor: string
  panelCellCurrentBgColor: string

  panelHeaerHeight: number
  panelHeaderFontSize: number
  panelHeaderFontWeight: number
  panelHeaderSpacing: number

  panelBodyHeaderBgColor: string
}
