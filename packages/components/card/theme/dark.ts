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
): CertainThemeTokens<'card'> {
  const { lineWidth } = tokens

  const defaultTokens = getDefaultThemeTokens(tokens, algorithms)

  return {
    ...defaultTokens,
    showShadowBorderWidth: lineWidth,
  }
}
