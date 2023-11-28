/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CertainThemeTokens, GlobalThemeTokens } from '@idux/components/theme'

import { getDefaultThemeTokens } from './default'

export function getDarkThemeTokens(tokens: GlobalThemeTokens): CertainThemeTokens<'collapse'> {
  const { colorContainerBg, colorInfoContainerBg } = tokens

  const defaultTokens = getDefaultThemeTokens(tokens)

  return {
    ...defaultTokens,

    panelHeaderBgColor: colorInfoContainerBg,
    panelContentBgColor: colorContainerBg,
  }
}
