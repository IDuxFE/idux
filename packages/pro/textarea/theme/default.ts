/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { GlobalThemeTokens, ThemeTokenAlgorithms } from '@idux/components/theme'
import type { ProCertainThemeTokens } from '@idux/pro/theme'

export function getDefaultThemeTokens(
  tokens: GlobalThemeTokens,
  algorithms: ThemeTokenAlgorithms,
): ProCertainThemeTokens<'proTextarea'> {
  const { getColorPalette } = algorithms
  const {
    colorText,
    colorTextPlaceholder,
    paddingSizeXs,
    colorInfoContainerBg,
    colorInfoContainerBgDisabled,
    colorError,
  } = tokens

  const errorColorPalette = getColorPalette(colorError)

  return {
    indexColColor: colorText,
    indexColMinWidth: 32,
    indexColPaddingHorizontal: paddingSizeXs,
    indexColBgColor: colorInfoContainerBg,
    indexColBgColorDisabled: colorInfoContainerBgDisabled,
    indexColCellErrorBgColor: errorColorPalette.l30,

    errorLineBgColor: errorColorPalette.l50,

    countBottom: 1,
    countRight: 8,
    countOpacity: 0.9,
    countColor: colorTextPlaceholder,
  }
}
