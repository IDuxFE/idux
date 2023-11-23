/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { GlobalThemeTokens } from '../../types'

import { merge, pick } from 'lodash-es'

import { getBasicTokens } from './getBasicTokens'
import { getDerivedTokens } from './getDerivedTokens'
import { getExtendedTokens } from './getExtendedTokens'

export function getDefaultTokens(tokens?: GlobalThemeTokens): GlobalThemeTokens {
  const presetBasicTokens = getBasicTokens()
  const mergedBasicTokens = merge(presetBasicTokens, pick(tokens, Object.keys(presetBasicTokens)))

  const presetDerivedTokens = getDerivedTokens(mergedBasicTokens)
  const mergedDerivedTokens = merge(presetDerivedTokens, pick(tokens, Object.keys(presetDerivedTokens)))

  const presetExtendedTokens = getExtendedTokens({ ...mergedBasicTokens, ...mergedDerivedTokens })
  const mergedExtendedTokens = merge(presetExtendedTokens, pick(tokens, Object.keys(presetExtendedTokens)))

  return {
    ...mergedBasicTokens,
    ...mergedDerivedTokens,
    ...mergedExtendedTokens,
  }
}
