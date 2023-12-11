/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CertainThemeTokens, GlobalThemeTokens, ThemeTokenAlgorithms } from '@idux/components/theme'

import { getDefaultThemeTokens } from './default'
export function getDarkThemeTokens(
  tokens: GlobalThemeTokens,
  algorithms: ThemeTokenAlgorithms,
): CertainThemeTokens<'table'> {
  const { getGreyColors } = algorithms
  const greyColors = getGreyColors()
  const defaultTokens = getDefaultThemeTokens(tokens, algorithms)
  return {
    ...defaultTokens,
    insetShadowStart: `inset 10px 0 8px -8px ${greyColors.l50}`,
    insetShadowEnd: `inset -10px 0 8px -8px ${greyColors.l50}`,
  }
}
