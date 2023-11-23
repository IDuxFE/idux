/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CertainThemeTokens, GlobalThemeTokens } from '@idux/components/theme'
export function getDefaultThemeTokens(tokens: GlobalThemeTokens): CertainThemeTokens<'timePicker'> {
  const {
    scrollbarThumbBg,
    scrollbarTrackBg,
    fontWeightXl,
    colorTextInfo,
    colorTextTitle,
    marginSizeXl,
    paddingSize2Xs,
    paddingSizeSm,
    paddingSizeLg,
    fontSizeSm,
  } = tokens

  const rangeSeparatorWidth = 32
  const rangeSeparatorFontSize = fontSizeSm

  return {
    separatorMarginHorizontal: marginSizeXl,

    overlayWidth: 200,
    overlayPadding: `${paddingSizeSm}px ${paddingSizeSm}px 0 ${paddingSizeSm}px`,
    overlayFooterPadding: `${paddingSizeSm}px ${paddingSizeLg}px`,

    rangeBoardWidth: 184,
    rangeBoardBorder: 'none',
    rangeOverlayPadding: `${paddingSizeLg}px ${paddingSizeLg}px 0 ${paddingSizeLg}px`,
    rangeOverlayFooterPadding: `${paddingSizeSm}px 0`,
    rangeOverlaySeparatorPadding: `${paddingSize2Xs}px ${(rangeSeparatorWidth - fontSizeSm) / 2}px`,
    rangeOverlaySeparatorFontSize: rangeSeparatorFontSize,

    panelHeight: 224,
    panelPaddingHorizontal: paddingSizeSm,
    panelPaddingVertical: paddingSizeSm,
    panelFontSize: fontSizeSm,

    panelCellHeight: 32,
    panelCellPaddingHorizontal: paddingSizeSm,
    panelCellColor: colorTextInfo,
    panelCellColorActive: colorTextTitle,
    panelCellBgColorHover: 'transparent',
    panelCellBgColorActive: 'transparent',
    panelCellFontWeightActive: fontWeightXl,

    panelScrollbarWidth: 6,
    panelScrollbarThumbBgColor: scrollbarThumbBg,
    panelScrollbarThumbBorderRadius: 10,
    panelScrollbarTrackBgColor: scrollbarTrackBg,
  }
}
