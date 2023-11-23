/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { kebabCase } from 'lodash-es'

import { defaultTokenTransform } from './tokenTransforms'
import { type ThemeTokenKey, type TokenRecord, type TokenTransforms, globalTokenKey, themeTokenPrefix } from '../types'

export function tokenToCss(record: TokenRecord<string>, transforms?: TokenTransforms<string>): string {
  const { key, tokens, hashId } = record
  let cssVarContents = ''

  const varNamePrefix = `--${themeTokenPrefix}${key === globalTokenKey ? '' : `-${kebabCase(key)}`}`

  Object.entries(tokens).forEach(([tokenName, value]) => {
    const _tokenName = tokenName as ThemeTokenKey<string>
    const varName = `${varNamePrefix}-${getTokenCssVarName(_tokenName)}`
    const transform = transforms?.[_tokenName] ?? ((value: string | number) => defaultTokenTransform(tokenName, value))

    cssVarContents += `${varName}: ${transform(value)};`
  })

  if (!hashId) {
    return `:root { ${cssVarContents} }`
  }

  return `.${hashId} { ${cssVarContents} }`
}

function getTokenCssVarName(tokenName: string): string {
  return tokenName
    .replace(/(?<![A-Z0-9])([A-Z0-9])/g, (input, upperChar) => (upperChar ? `-${upperChar.toLowerCase()}` : input))
    .toLowerCase()
}
