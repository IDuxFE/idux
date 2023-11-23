/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type CertainThemeTokens, type GlobalThemeTokens, getAlphaColor, getBaseColors } from '@idux/components/theme'
export function getDefaultThemeTokens(tokens: GlobalThemeTokens): CertainThemeTokens<'slider'> {
  const { colorPrimary, lineType, colorText, colorTextPlaceholder, colorContainerBgDisabled, colorSeparator } = tokens

  const baseColors = getBaseColors()

  return {
    railSize: 2,
    markLabelColor: colorTextPlaceholder,
    markLabelColorActive: colorText,

    dotBgColor: colorSeparator,
    dotBgColorDisabled: colorContainerBgDisabled,
    dotBgColorActive: colorPrimary,

    railBgColor: colorSeparator,
    railBgColorHover: colorSeparator,

    trackBgColor: colorPrimary,
    trackBgColorHover: colorPrimary,
    trackBgColorDisabled: colorContainerBgDisabled,

    thumbBgColor: baseColors.white,
    thumbBorderColor: colorPrimary,
    thumbBorderColorHover: colorPrimary,
    thumbBorderColorDisabled: colorContainerBgDisabled,
    thumbBorderWidth: 2,
    thumbBorderType: lineType,
    thumbBorderColorFocus: colorPrimary,
    thumbBoxShadowFocus: `0 0 0 5px ${getAlphaColor(colorPrimary, 0.12)}`,

    thumbSize: 10,
  }
}
