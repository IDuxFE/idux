/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TokenGetter } from '@idux/components/theme'

import { getDefaultThemeTokens } from './default'

export const getThemeTokens: TokenGetter<'stepper'> = (tokens, presetTheme) => {
  return presetTheme === 'default' ? getDefaultThemeTokens(tokens) : getDefaultThemeTokens(tokens)
}

export type { StepperThemeTokens } from './tokens'
