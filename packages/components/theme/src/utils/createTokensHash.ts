/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import hash from '@emotion/hash'

import { themeTokenPrefix } from '../types'

const unhasedHashSalt = '__unhashed__'

const sequenceCache = new Map<string, string[]>()
export function createTokensHash(key: string, tokens: Record<string, string | number>, hashed = true): string {
  let sequence = sequenceCache.get(key)

  if (!sequence) {
    sequence = getTokenSequence(tokens)
    sequenceCache.set(key, sequence)
  }

  let str = flattenTokens(tokens, sequence)

  if (!hashed) {
    str += unhasedHashSalt
  }

  return `${themeTokenPrefix}-${key}-${hash(str)}`
}

function flattenTokens(tokens: Record<string, string | number>, sequence: string[]): string {
  let str = ''
  sequence

  sequence.forEach(key => {
    const value = tokens[key]
    str += `${key}${value || ''}`
  })

  return str
}

function getTokenSequence(tokens: Record<string, string | number>): string[] {
  return Object.keys(tokens).sort()
}
