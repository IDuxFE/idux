/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CertainThemeTokens, GlobalThemeTokens, ThemeTokenAlgorithms } from '@idux/components/theme'
export function getDefaultThemeTokens(
  tokens: GlobalThemeTokens,
  algorithms: ThemeTokenAlgorithms,
): CertainThemeTokens<'backTop'> {
  const { getColorPalette } = algorithms
  const { overlayBorderWidth, overlayBorderType, overlayBorderColor, colorPrimary, colorContainerBg } = tokens

  const primaryColorPalette = getColorPalette(colorPrimary)

  return {
    sizeLg: 64,
    sizeMd: 48,
    sizeSm: 40,
    boxShadow: `0 2px 8px 0 rgba(0, 0, 0, 0.05)`,
    color: primaryColorPalette.l30,
    colorHover: colorPrimary,
    bgColor: colorContainerBg,
    borderWidth: overlayBorderWidth,
    borderType: overlayBorderType,
    borderColor: overlayBorderColor,
  }
}
