/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { GlobalThemeTokens, ResetTokens } from '../../types'

export function getResetTokens(tokens: GlobalThemeTokens): ResetTokens {
  const {
    colorBg,
    colorText,
    colorTextTitle,
    colorLink,
    fontFamily,
    fontFamilyCode,
    fontSizeSm,
    fontWeight,
    fontWeightHeader,

    lineHeightGutter,

    scrollbarWidth,
    scrollbarHeight,
    scrollbarThumbBg,
    scrollbarThumbBgHover,
    scrollbarThumbBgActive,
    scrollbarThumbBorderWidth,
    scrollbarThumbBorderRadius,
    scrollbarThumbBoxShadow,
    scrollbarTrackBg,
    scrollbarTrackBorderRadius,
    scrollbarTrackBoxShadow,
  } = tokens

  return {
    colorText,
    colorTextTitle,
    colorBg,
    colorLink,
    fontFamily,
    fontFamilyCode,
    fontSize: fontSizeSm,
    fontWeight,
    fontWeightHeader,

    lineHeightGutter,

    scrollbarWidth,
    scrollbarHeight,
    scrollbarThumbBg,
    scrollbarThumbBgHover,
    scrollbarThumbBgActive,
    scrollbarThumbBorderWidth,
    scrollbarThumbBorderRadius,
    scrollbarThumbBoxShadow,
    scrollbarTrackBg,
    scrollbarTrackBorderRadius,
    scrollbarTrackBoxShadow,
  }
}
