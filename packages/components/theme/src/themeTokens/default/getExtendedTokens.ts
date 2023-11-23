/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type {
  BasicTokens,
  ControlTokens,
  DerivedTokens,
  ExtendedColorTokens,
  ExtendedFontTokens,
  ExtendedSizeTokens,
  ExtendedTokens,
  OverlayTokens,
  ScrollbarTokens,
} from '../../types'

import { getAlphaColor, getBaseColors, getColorPalette, getGreyColors } from '../shared'

function getExtendedColorTokens(tokens: BasicTokens & DerivedTokens): ExtendedColorTokens {
  const baseColors = getBaseColors()
  const greyColors = getGreyColors('graphite')

  const { colorPrimary, colorWarning, colorError, colorBg } = tokens

  const primaryColorPalette = getColorPalette(colorPrimary)

  return {
    colorContainerBg: colorBg,
    colorContainerBgHover: greyColors.l50,
    colorContainerBgActive: primaryColorPalette.l50,
    colorContainerBgDisabled: greyColors.l30,
    colorAddonContainerBg: greyColors.l50,
    colorEmphasizedContainerBg: greyColors.l40,
    colorEmphasizedContainerBgHover: greyColors.l30,
    colorEmphasizedContainerBgDisabled: greyColors.l20,
    colorInfoContainerBg: greyColors.l50,
    colorInfoContainerBgHover: greyColors.l50,
    colorInfoContainerBgDisabled: greyColors.l50,
    colorFillContainerBg: greyColors.l10,

    colorSeparator: greyColors.l30,

    colorTextPlaceholder: greyColors.base,
    colorTextDisabled: greyColors.l10,
    colorTextInverse: baseColors.white,
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

    colorBgDisabled: greyColors.l30,
    colorBgInverse: greyColors.d40,
    colorBgInverseDisabled: greyColors.d50,

    colorBorderInverse: baseColors.white,
    colorBorderSecondary: greyColors.l30,

    colorMask: 'rgba(0, 0, 0, 0.45)',

    tagCompColorAlpha: 0.1,
    alertCompColorAlpha: 0.1,
  }
}

function getExtendedFontTokens(tokens: BasicTokens & DerivedTokens): ExtendedFontTokens {
  return {
    fontSizeIcon: 16,
    fontWeightHeader: tokens.fontWeightXl,
  }
}

function getExtendedSizeTokens(tokens: BasicTokens & DerivedTokens): ExtendedSizeTokens {
  return {
    componentBorderRadius: tokens.borderRadiusSm,
  }
}

function getControlTokens(tokens: BasicTokens & DerivedTokens & ExtendedColorTokens): ControlTokens {
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

function getScollbarTokens(): ScrollbarTokens {
  const greyColors = getGreyColors('graphite')

  return {
    scrollbarWidth: 12,
    scrollbarHeight: 12,
    scrollbarThumbBg: greyColors.l30,
    scrollbarThumbBgHover: greyColors.l10,
    scrollbarThumbBgActive: greyColors.l10,
    scrollbarThumbBorderWidth: 2,
    scrollbarThumbBorderRadius: 6,
    scrollbarThumbBoxShadow: 'none',
    scrollbarTrackBg: 'unset',
    scrollbarTrackBorderRadius: 0,
    scrollbarTrackBoxShadow: 'unset',
  }
}

function getOverlayTokens(tokens: BasicTokens & DerivedTokens): OverlayTokens {
  const { borderRadiusSm, arrowSize, colorBg, lineType } = tokens

  return {
    overlayBgColor: colorBg,
    overlayArrowSize: arrowSize,
    overlayBorderRadius: borderRadiusSm,
    overlayBorderWidth: 0,
    overlayBorderColor: 'none',
    overlayBorderType: lineType,
  }
}

export function getExtendedTokens(tokens: BasicTokens & DerivedTokens): ExtendedTokens {
  const extendedColorTokens = getExtendedColorTokens(tokens)
  return {
    ...extendedColorTokens,
    ...getExtendedFontTokens(tokens),
    ...getExtendedSizeTokens(tokens),
    ...getScollbarTokens(),
    ...getControlTokens({ ...tokens, ...extendedColorTokens }),
    ...getOverlayTokens(tokens),
  }
}
