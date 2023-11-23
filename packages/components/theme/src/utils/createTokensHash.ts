/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import hash from '@emotion/hash'

import { themeTokenPrefix } from '../types'

export function createTokensHash(key: string, tokens: Record<string, string | number>): string {
  return `${themeTokenPrefix}-${key}-${hash(flattenTokens(tokens))}`
}

function flattenTokens(tokens: Record<string, string | number>) {
  let str = ''

  Object.entries(tokens).forEach(([key, value]) => {
    str += `${key}${value}`
  })

  return str
}
