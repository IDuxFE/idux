/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { kebabCase } from 'lodash-es'

import { defaultTokenTransform } from './tokenTransforms'
import { type ThemeTokenKey, type TokenRecord, type TokenTransforms, globalTokenKey, themeTokenPrefix } from '../types'

export function tokenToCss(record: TokenRecord<string>, prefix?: string, transforms?: TokenTransforms<string>): string {
  const { key, tokens, hashId } = record
  const resolvedPrefix = prefix ?? themeTokenPrefix
  let cssVarContents = ''

  const varNamePrefix = `--${resolvedPrefix}${key === globalTokenKey ? '' : `-${kebabCase(key)}`}`

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
  let name = ''
  let preChar: string | undefined
  for (let i = 0; i < tokenName.length; i++) {
    const char = tokenName[i]

    if (preChar && !isUppercaseOrNumber(preChar) && isUppercaseOrNumber(char)) {
      name += `-${char}`
    } else {
      name += char
    }

    preChar = char
  }
  return name.toLowerCase()
}

function isUppercaseOrNumber(char: string) {
  const charCode = char.charCodeAt(0)
  return (charCode >= 65 && charCode <= 90) || (charCode >= 48 && charCode <= 57)
}
