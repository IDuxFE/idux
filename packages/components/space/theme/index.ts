/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TokenGetter } from '@idux/components/theme'

export type { SpaceThemeTokens } from './tokens'

import { getDefaultThemeTokens } from './default'

export const getThemeTokens: TokenGetter<'space'> = tokens => {
  return getDefaultThemeTokens(tokens)
}
