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
): CertainThemeTokens<'menu'> {
  const defaultTokens = getDefaultThemeTokens(tokens, algorithms)

  return {
    ...defaultTokens,

    darkItemColor: defaultTokens.itemColor,
    darkItemColorHover: defaultTokens.itemColorHover,
    darkItemColorActive: defaultTokens.itemColorActive,
    darkItemColorDisabled: defaultTokens.itemColorDisabled,
    darkItemGroupColor: defaultTokens.itemGroupColor,
    darkItemFontWeightActive: defaultTokens.darkItemFontWeightActive,

    darkItemBg: defaultTokens.itemBg,
    darkItemBgHover: defaultTokens.itemBgHover,
    darkItemBgActive: defaultTokens.itemBgActive,
    darkItemBgDisabled: defaultTokens.itemBgDisabled,
    darkItemGroupBg: defaultTokens.itemGroupBg,

    darkHorizontalItemColorHover: defaultTokens.horizontalItemColorHover,
    darkHorizontalItemColorActive: defaultTokens.horizontalItemColorActive,
    darkHorizontalItemBgHover: defaultTokens.horizontalItemBgHover,
    darkHorizontalItemBgActive: defaultTokens.horizontalItemBgActive,
  }
}
