/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProTokenGetter } from '@idux/pro/theme'

import { getDarkThemeTokens } from './dark'
import { getDefaultThemeTokens } from './default'

export const getThemeTokens: ProTokenGetter<'proLayout'> = (tokens, presetTheme, algorithms) => {
  return presetTheme === 'default' ? getDefaultThemeTokens(tokens, algorithms) : getDarkThemeTokens(tokens)
}

export type { ProLayoutThemeTokens } from './tokens'
