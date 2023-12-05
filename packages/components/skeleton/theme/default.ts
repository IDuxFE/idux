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
): CertainThemeTokens<'skeleton'> {
  const { getGreyColors } = algorithms
  const { marginSizeSm, marginSizeXs } = tokens

  const greyColors = getGreyColors()

  return {
    marginBottom: marginSizeSm,
    loaderMarginBottom: marginSizeXs,
    startColor: greyColors.l40,
    endColor: greyColors.l30,
  }
}
