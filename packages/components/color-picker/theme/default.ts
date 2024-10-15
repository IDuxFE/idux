/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import {
  type CertainThemeTokens,
  type GlobalThemeTokens,
  type ThemeTokenAlgorithms,
  getAlphaColor,
} from '@idux/components/theme'

export function getDefaultThemeTokens(
  tokens: GlobalThemeTokens,
  algorithms: ThemeTokenAlgorithms,
): CertainThemeTokens<'colorPicker'> {
  const { getGreyColors, getColorPalette } = algorithms
  const {
    colorPrimary,
    colorContainerBg,
    borderRadiusSm,
    controlHeightSm,
    controlHeightMd,
    controlHeightLg,
    controlFontSizeSm,
    controlFontSizeMd,
    controlFontSizeLg,
  } = tokens

  const greyColors = getGreyColors()
  const primaryColorPalette = getColorPalette(colorPrimary)

  return {
    panelWidth: 358,
    sliderHeight: 12,
    sliderHandleSize: 12,
    sliderHandleBorderWidth: 2,
    sliderHandleBorderColor: colorContainerBg,
    sliderHandleBoxShadow: 'inset 0 0 1px 0 rgb(0 0 0 / 25%), 0 0 0 1px rgb(0 0 0 / 6%)',
    indicatorBorderRadius: borderRadiusSm,
    indicatorCheckedIconColorLight: greyColors.d30,
    indicatorCheckedIconColorDark: greyColors.l40,
    indicatorHoverBoxShadow: `0px 0px 0px 2px ${getAlphaColor(primaryColorPalette.l40, 0.4)}`,
    indicatorCheckedBoxShadow: `0px 0px 0px 2px ${getAlphaColor(primaryColorPalette.l40, 0.4)}`,
    triggerSizeSm: controlHeightSm,
    triggerSizeMd: controlHeightMd,
    triggerSizeLg: controlHeightLg,
    triggerFontSizeSm: controlFontSizeSm,
    triggerFontSizeMd: controlFontSizeMd,
    triggerFontSizeLg: controlFontSizeLg,

    alphaGridColor: 'rgb(0 0 0 / 6%)',
    alphaGridBoxShadow: 'inset 0 0 1px 0 rgb(0 0 0 / 25%)',
  }
}
