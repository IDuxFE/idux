/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { GlobalThemeTokens } from '../../types'

import { getBaseColors } from './getBaseColors'
import { getColorPalette } from './getColorPalette'
import { getGreyColors } from './getGreyColors'
import { getAlphaColor } from '../shared'

export function getPresetTokens(): Partial<GlobalThemeTokens> {
  const greyColors = getGreyColors()
  const baseColors = getBaseColors()

  const colorError = baseColors.red
  const errorColorPalette = getColorPalette(colorError)

  const colorSuccess = baseColors.turquoise
  const colorInfo = baseColors.blue
  const colorWarning = baseColors.brown
  const colorRisk = baseColors.orange
  const colorFatal = errorColorPalette.l20
  const successColorPalette = getColorPalette(colorSuccess)

  return {
    colorSuccess,
    colorError,
    colorInfo,
    colorWarning,
    colorRisk,
    colorFatal,

    colorBg: greyColors.l50,
    colorContainerBg: greyColors.l50,
    colorContainerBgHover: greyColors.l40,

    colorEmphasizedContainerBg: greyColors.l30,
    colorEmphasizedContainerBgHover: greyColors.l30,
    colorEmphasizedContainerBgDisabled: greyColors.l10,

    colorAddonContainerBg: greyColors.l40,

    colorInfoContainerBg: greyColors.l40,
    colorInfoContainerBgHover: greyColors.l40,
    colorInfoContainerBgDisabled: greyColors.l30,

    colorTextInverse: baseColors.white,
    colorBgInverse: baseColors.white,

    colorMask: getAlphaColor(greyColors.l40, 0.88),

    overlayBorderWidth: 1,
    overlayBorderColor: greyColors.l30,

    boxShadowSm: `0 2px 10px 0px ${greyColors.l50}`,
    boxShadowMd: `0 4px 16px 0px ${greyColors.l50}`,
    boxShadowLg: `0 8px 22px 0px ${greyColors.l50}`,

    colorSuccessBg: successColorPalette.base,
    colorSuccessBgHover: successColorPalette.l10,
    colorSuccessBgActive: successColorPalette.d10,
    colorSuccessBorder: successColorPalette.base,
    colorSuccessBorderHover: successColorPalette.l10,
    colorSuccessBorderActive: successColorPalette.d10,

    colorSuccessText: successColorPalette.base,
    colorSuccessTextHover: successColorPalette.l10,
    colorSuccessTextActive: successColorPalette.d10,
    colorSuccessIcon: successColorPalette.base,

    colorErrorBg: errorColorPalette.base, // 背景色
    colorErrorBgHover: errorColorPalette.l10, // 背景悬浮色
    colorErrorBgActive: errorColorPalette.d10, // 背景激活色
    colorErrorBorder: errorColorPalette.base, // 边框色
    colorErrorBorderHover: errorColorPalette.l10, // 边框悬浮色
    colorErrorBorderActive: errorColorPalette.d10, // 边框激活色

    colorErrorText: errorColorPalette.base, // 文字色
    colorErrorTextHover: errorColorPalette.l10, // 文字悬浮色
    colorErrorTextActive: errorColorPalette.d10, // 文字激活色
    colorErrorIcon: errorColorPalette.base, // 图标色

    colorInfoIcon: colorInfo,
    colorWarningIcon: colorWarning,
    colorRiskIcon: colorRisk,
    colorFatalIcon: colorFatal,

    tagCompColorAlpha: 0.2,
    alertCompColorAlpha: 0.2,
  }
}
