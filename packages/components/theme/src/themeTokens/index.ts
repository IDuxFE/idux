/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { GlobalThemeTokens, PresetTheme } from '../types'

export * from './shared'

import { getDefaultTokens } from './default/getDefaultTokens'
export { getResetTokens } from './default/getResetTokens'

export function getThemeTokens(presetTheme: PresetTheme, tokens?: GlobalThemeTokens): GlobalThemeTokens {
  return presetTheme === 'default' ? getDefaultTokens(tokens) : getDefaultTokens(tokens)
}
