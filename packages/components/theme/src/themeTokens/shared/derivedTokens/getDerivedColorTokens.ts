/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { BasicTokens, DerivedColorTokens, GetColorPalette, GetGreyColors } from '../../../types'

export function getDerivedColorTokens(
  basicTokens: BasicTokens,
  getColorPalette: GetColorPalette,
  getGreyColors: GetGreyColors,
): DerivedColorTokens {
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
    colorInfoIcon: infoColorPalette.base,
  }

  const greyColors = getGreyColors()

  return {
    ...primaryColors,
    ...successColors,
    ...errorColors,
    ...warningColors,
    ...riskColors,
    ...fatalColors,
    ...infoColors,
    colorOffline: greyColors.base,
    colorOfflineBg: greyColors.base,
    colorOfflineText: greyColors.base,
  } as DerivedColorTokens
}
