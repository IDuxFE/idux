/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type {
  BasicTokens,
  DerivedColorTokens,
  DerivedFontTokens,
  DerivedMotionTokens,
  DerivedSizeTokens,
  DerivedTokens,
  ShadowTokens,
} from '../../types'

import { getAlphaColor, getColorPalette, getGreyColors } from '../shared'

function getDerivedColorTokens(basicTokens: BasicTokens): DerivedColorTokens {
  const primaryColorPalette = getColorPalette(basicTokens.colorPrimary)
  const successColorPalette = getColorPalette(basicTokens.colorSuccess)
  const errorColorPalette = getColorPalette(basicTokens.colorError)
  const warningColorPalette = getColorPalette(basicTokens.colorWarning)
  const riskColorPalette = getColorPalette(basicTokens.colorRisk)
  const fatalColorPalette = getColorPalette(basicTokens.colorFatal)
  const infoColorPalette = getColorPalette(basicTokens.colorInfo)

  const primaryStatusColors: Partial<DerivedColorTokens> = {
    colorPrimaryHover: primaryColorPalette.l10,
    colorPrimaryActive: primaryColorPalette.d10,
  }
  const primaryColors: Partial<DerivedColorTokens> = {
    ...primaryStatusColors,
    colorPrimaryBorder: primaryColorPalette.base,
    colorPrimaryBorderHover: primaryColorPalette.l10,
    colorPrimaryBorderActive: primaryColorPalette.d10,

    colorPrimaryText: primaryColorPalette.base,
    colorPrimaryTextHover: primaryStatusColors.colorPrimaryHover,
    colorPrimaryTextActive: primaryStatusColors.colorPrimaryActive,
    colorPrimaryIcon: primaryColorPalette.base,
  }

  const successColors: Partial<DerivedColorTokens> = {
    colorSuccessBg: successColorPalette.base,
    colorSuccessBgHover: successColorPalette.l10,
    colorSuccessBgActive: successColorPalette.d10,
    colorSuccessBorder: successColorPalette.d10,
    colorSuccessBorderHover: successColorPalette.base,
    colorSuccessBorderActive: successColorPalette.d20,

    colorSuccessText: successColorPalette.d10,
    colorSuccessTextHover: successColorPalette.base,
    colorSuccessTextActive: successColorPalette.d20,
    colorSuccessIcon: successColorPalette.base,
  }

  const errorColors: Partial<DerivedColorTokens> = {
    colorErrorBg: errorColorPalette.l10, // 背景色
    colorErrorBgHover: errorColorPalette.l20, // 背景悬浮色
    colorErrorBgActive: errorColorPalette.d10, // 背景激活色
    colorErrorBorder: errorColorPalette.d10, // 边框色
    colorErrorBorderHover: errorColorPalette.base, // 边框悬浮色
    colorErrorBorderActive: errorColorPalette.d20, // 边框激活色

    colorErrorText: errorColorPalette.d10, // 文字色
    colorErrorTextHover: errorColorPalette.base, // 文字悬浮色
    colorErrorTextActive: errorColorPalette.d10, // 文字激活色
    colorErrorIcon: errorColorPalette.l10, // 图标色
  }

  const warningColors: Partial<DerivedColorTokens> = {
    colorWarningBg: warningColorPalette.base,
    colorWarningBgHover: warningColorPalette.l10,
    colorWarningBgActive: warningColorPalette.d10,
    colorWarningBorder: warningColorPalette.base,
    colorWarningBorderHover: warningColorPalette.l10,
    colorWarningBorderActive: warningColorPalette.d10,

    colorWarningText: warningColorPalette.base,
    colorWarningTextHover: warningColorPalette.l10,
    colorWarningTextActive: warningColorPalette.d10,
    colorWarningIcon: warningColorPalette.l10,
  }

  const riskColors: Partial<DerivedColorTokens> = {
    colorRiskBg: riskColorPalette.base,
    colorRiskBgHover: riskColorPalette.l10,
    colorRiskBgActive: riskColorPalette.d10,
    colorRiskBorder: riskColorPalette.base,
    colorRiskBorderHover: riskColorPalette.l10,
    colorRiskBorderActive: riskColorPalette.d10,

    colorRiskText: riskColorPalette.base,
    colorRiskTextHover: riskColorPalette.l10,
    colorRiskTextActive: riskColorPalette.d10,
    colorRiskIcon: riskColorPalette.l10,
  }

  const fatalColors: Partial<DerivedColorTokens> = {
    colorFatalBg: fatalColorPalette.base,
    colorFatalBgHover: fatalColorPalette.l10,
    colorFatalBgActive: fatalColorPalette.d10,
    colorFatalBorder: fatalColorPalette.base,
    colorFatalBorderHover: fatalColorPalette.l10,
    colorFatalBorderActive: fatalColorPalette.d10,

    colorFatalText: fatalColorPalette.base,
    colorFatalTextHover: fatalColorPalette.l10,
    colorFatalTextActive: fatalColorPalette.d10,
    colorFatalIcon: fatalColorPalette.l10,
  }

  const infoColors: Partial<DerivedColorTokens> = {
    colorInfoBg: infoColorPalette.base,
    colorInfoBgHover: infoColorPalette.l10,
    colorInfoBgActive: infoColorPalette.d10,
    colorInfoBorder: infoColorPalette.base,
    colorInfoBorderHover: infoColorPalette.l10,
    colorInfoBorderActive: infoColorPalette.d10,

    colorInfoText: infoColorPalette.base,
    colorInfoTextHover: infoColorPalette.l10,
    colorInfoTextActive: infoColorPalette.d10,
    colorInfoIcon: infoColorPalette.l10,
  }

  const greyColors = getGreyColors('graphite')

  return {
    ...primaryColors,
    ...successColors,
    ...errorColors,
    ...warningColors,
    ...riskColors,
    ...fatalColors,
    ...infoColors,
    colorOffline: greyColors.d10,
    colorOfflineBg: greyColors.d10,
    colorOfflineText: greyColors.d10,
  } as DerivedColorTokens
}

function getDerivedFontTokens(basicTokens: BasicTokens): DerivedFontTokens {
  const { fontSize, fontWeight } = basicTokens

  const fontSizeUnit = 2
  const minFontSize = 10
  const fontWeightUnit = 100

  const fontSizeMap = {
    fontSizeXs: Math.max(fontSize - fontSizeUnit * 2, minFontSize),
    fontSizeSm: Math.max(fontSize - fontSizeUnit, minFontSize),
    fontSizeMd: Math.max(fontSize, minFontSize),
    fontSizeLg: Math.max(fontSize + fontSizeUnit, minFontSize),
    fontSizeXl: Math.max(fontSize + fontSizeUnit * 3, minFontSize),
    fontSize2xl: Math.max(fontSize + fontSizeUnit * 5, minFontSize),
    fontSize3xl: Math.max(fontSize + fontSizeUnit * 8, minFontSize),
  }

  return {
    ...fontSizeMap,
    fontSizeHeaderSm: fontSizeMap.fontSizeMd,
    fontSizeHeaderMd: fontSizeMap.fontSizeLg,
    fontSizeHeaderLg: fontSizeMap.fontSizeXl,
    fontSizeHeaderXl: fontSizeMap.fontSize2xl,

    fontWeightXs: fontWeight - fontWeightUnit * 2,
    fontWeightSm: fontWeight - fontWeightUnit,
    fontWeightMd: fontWeight,
    fontWeightLg: fontWeight + fontWeightUnit,
    fontWeightXl: fontWeight + fontWeightUnit * 2,
  }
}

function getDerivedSizeTokens(basicTokens: BasicTokens): DerivedSizeTokens {
  const { spacing, height, borderRadius, screenSm, screenMd, screenLg, screenXl } = basicTokens

  const spacingSizes = {
    xxs: Math.ceil(spacing * 0.25),
    xs: Math.ceil(spacing * 0.5),
    sm: spacing,
    md: Math.ceil(spacing * 1.5),
    lg: Math.ceil(spacing * 2),
    xl: spacing * 3,
    xxl: Math.ceil(spacing * 4),
  }

  return {
    paddingSize2Xs: spacingSizes.xxs,
    paddingSizeXs: spacingSizes.xs,
    paddingSizeSm: spacingSizes.sm,
    paddingSizeMd: spacingSizes.md,
    paddingSizeLg: spacingSizes.lg,
    paddingSizeXl: spacingSizes.xl,
    paddingSize2Xl: spacingSizes.xxl,

    marginSize2Xs: spacingSizes.xxs,
    marginSizeXs: spacingSizes.xs,
    marginSizeSm: spacingSizes.sm,
    marginSizeMd: spacingSizes.md,
    marginSizeLg: spacingSizes.lg,
    marginSizeXl: spacingSizes.xl,
    marginSize2Xl: spacingSizes.xxl,

    heightXs: height * 0.5,
    heightSm: height * 0.75,
    heightMd: height,
    heightLg: height * 1.25,
    heightXl: height * 1.5,
    height2xl: height * 1.75,
    height3xl: height * 2,

    borderRadiusXs: Math.max(2, Math.floor(borderRadius / 4)),
    borderRadiusSm: Math.max(2, Math.floor(borderRadius / 2)),
    borderRadiusMd: borderRadius,
    borderRadiusLg: Math.min(8, borderRadius * 2),

    lineWidthBold: 2,
    arrowSize: 6,

    screenXsMax: screenSm - 0.01,
    screenSmMin: screenSm,
    screenSmMax: screenMd - 0.01,
    screenMdMin: screenMd,
    screenMdMax: screenLg - 0.01,
    screenLgMin: screenLg,
    screenLgMax: screenXl - 0.01,
    screenXlMin: screenXl,
  }
}

function getDerivedMotionTokens(basicTokens: BasicTokens): DerivedMotionTokens {
  const { motionDuration } = basicTokens
  return {
    motionDurationFast: 0.18,
    motionDurationMedium: motionDuration,
    motionDurationSlow: 0.3,
  }
}

function getShadowTokens(): ShadowTokens {
  const greyColors = getGreyColors('graphite')
  return {
    boxShadowSm: `0 2px 10px 0px ${getAlphaColor(greyColors.d50, 0.16)}`,
    boxShadowMd: `0 4px 16px 0px ${getAlphaColor(greyColors.d50, 0.14)}`,
    boxShadowLg: `0 8px 22px 0px ${getAlphaColor(greyColors.d50, 0.12)}`,
  }
}

export function getDerivedTokens(basicTokens: BasicTokens): DerivedTokens {
  return {
    ...getDerivedColorTokens(basicTokens),
    ...getDerivedFontTokens(basicTokens),
    ...getDerivedSizeTokens(basicTokens),
    ...getDerivedMotionTokens(basicTokens),
    ...getShadowTokens(),
  }
}
