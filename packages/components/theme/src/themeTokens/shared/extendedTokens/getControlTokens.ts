/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { BasicTokens, ControlTokens, DerivedTokens, ExtendedColorTokens } from '../../../types'

import { getAlphaColor } from '../color'

export function getControlTokens(tokens: BasicTokens & DerivedTokens & ExtendedColorTokens): ControlTokens {
  const {
    colorPrimary,
    colorError,
    colorPrimaryBorderHover,
    colorPrimaryBorderActive,
    colorContainerBg,
    colorContainerBgDisabled,
    heightXs,
    heightSm,
    heightMd,
    heightLg,
    fontSizeXs,
    fontSizeSm,
    fontSizeMd,
    borderRadiusSm,
    lineWidth,
    lineType,
    lineHeightGutter,
  } = tokens

  const controlHeightXs = heightXs
  const controlHeightSm = heightSm
  const controlHeightMd = heightMd
  const controlHeightLg = heightLg
  const controlLineWidth = lineWidth
  const controlFontSizeXs = fontSizeXs
  const controlFontSizeSm = fontSizeSm
  const controlFontSizeMd = fontSizeSm
  const controlFontSizeLg = fontSizeMd

  const getVerticalPadding = (height: number, fontSize: number) => {
    return Math.round((height - (fontSize + lineHeightGutter)) / 2 - controlLineWidth)
  }

  return {
    controlHeightXs,
    controlHeightSm,
    controlHeightMd,
    controlHeightLg,

    controlLineWidth,
    controlLineType: lineType,

    controlFontSizeXs,
    controlFontSizeSm,
    controlFontSizeMd,
    controlFontSizeLg,

    controlBoxShadowFocus: `0 0 0 2px ${getAlphaColor(colorPrimary, 0.2)}`,
    controlBoxShadowInvalid: `0 0 0 2px ${getAlphaColor(colorError, 0.2)}`,

    controlBgColor: colorContainerBg,
    controlBgColorDisabled: colorContainerBgDisabled,
    controlBorderColorHover: colorPrimaryBorderHover,
    controlBorderColorActive: colorPrimaryBorderActive,

    controlPaddingSizeHorizontalXs: 7,
    controlPaddingSizeHorizontalSm: 7,
    controlPaddingSizeHorizontalMd: 11,
    controlPaddingSizeHorizontalLg: 11,

    controlPaddingSizeVerticalXs: Math.max(getVerticalPadding(controlHeightXs, controlFontSizeXs), 0),
    controlPaddingSizeVerticalSm: Math.max(getVerticalPadding(controlHeightSm, controlFontSizeSm), 0),
    controlPaddingSizeVerticalMd: Math.max(getVerticalPadding(controlHeightMd, controlFontSizeMd), 2),
    controlPaddingSizeVerticalLg: Math.ceil(getVerticalPadding(controlHeightLg, controlFontSizeLg)),

    controlBorderRadiusXs: borderRadiusSm,
    controlBorderRadiusSm: borderRadiusSm,
    controlBorderRadiusMd: borderRadiusSm,
    controlBorderRadiusLg: borderRadiusSm,
  }
}
