/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TokenGetter } from '@idux/components/theme'

import { getDarkThemeTokens } from './dark'
import { getDefaultThemeTokens } from './default'

export const getThemeTokens: TokenGetter<'menu'> = (tokens, presetTheme, algorithms) => {
  return presetTheme === 'default' ? getDefaultThemeTokens(tokens, algorithms) : getDarkThemeTokens(tokens, algorithms)
}

export type { MenuThemeTokens } from './tokens'
