/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { BaseColors, ColorPalette } from '../themeTokens'

import { type ComputedRef, reactive } from 'vue'

import { useState } from '@idux/cdk/utils'

import { useDynamicCss } from './useDynamicCss'
import {
  type CertainThemeTokens,
  type GlobalThemeTokens,
  type PresetTheme,
  type ThemeKeys,
  type ThemeTokenAlgorithms,
  type TokenRecord,
  type TokenTransforms,
  globalTokenKey,
} from '../types'
import { createTokensHash, tokenToCss } from '../utils'

export type TokenGetter<K extends ThemeKeys | keyof Ext, Ext extends object = object> = (
  globalTokens: GlobalThemeTokens,
  presetTheme: PresetTheme,
  algorithms: {
    getColorPalette: (color: string) => ColorPalette
    getGreyColors: () => ColorPalette
    getBaseColors: () => BaseColors
  },
) => CertainThemeTokens<K, Ext>

export type RegisterToken<K extends ThemeKeys | keyof Ext, Ext extends object = object> = (
  key: K,
  getTokens: TokenGetter<K, Ext>,
  transforms?: TokenTransforms<K, Ext> | undefined,
  hashed?: boolean,
  hashId?: string,
) => string | undefined
export type UpdateToken<K extends ThemeKeys | keyof Ext, Ext extends object = object> = (
  key: K,
  hashId?: string,
) => string | undefined

export interface TokenRegisterContext<Ext extends object = object> {
  globalHashId: ComputedRef<string>
  isTokensRegistered: (key: ThemeKeys | keyof Ext) => boolean
  registerToken: RegisterToken<ThemeKeys | keyof Ext, Ext>
  updateToken: UpdateToken<ThemeKeys | keyof Ext, Ext>
  getThemeTokens: <K extends ThemeKeys | keyof Ext>(key: K) => CertainThemeTokens<K, Ext>
  getThemeHashId: (key: ThemeKeys | keyof Ext) => string | undefined
}

export function useTokenRegister(
  mergedPresetTheme: ComputedRef<PresetTheme>,
  mergedAlgorithms: ComputedRef<ThemeTokenAlgorithms>,
  mergedAttachTo: ComputedRef<Element | undefined>,
  mergedHashed: ComputedRef<boolean>,
  getMergedTokens: <K extends ThemeKeys>(key: K, tokens: CertainThemeTokens<K>) => CertainThemeTokens<K>,
): TokenRegisterContext {
  const tokenRecordMap = reactive(new Map<string, TokenRecord<ThemeKeys>>())
  const tokenGettersMap = new Map<ThemeKeys, TokenGetter<ThemeKeys>>()
  const tokenTransformsMap = new Map<ThemeKeys, TokenTransforms<ThemeKeys> | undefined>()
  const tokenHashedMap = new Map<ThemeKeys, boolean | undefined>()

  const updateThemeStyle = useDynamicCss(mergedAttachTo)

  const [globalHashId, setGlobalHashId] = useState<string>('')

  const _updateToken = <K extends ThemeKeys>(
    key: K,
    getTokens: TokenGetter<K>,
    transforms: TokenTransforms<K> | undefined,
    force: boolean,
    hashed?: boolean,
    existedHashId?: string,
  ) => {
    let record = tokenRecordMap.get(key ?? globalTokenKey)

    if (record && !force) {
      return record.hashId
    }

    const globalTokens = (key === globalTokenKey
      ? {}
      : tokenRecordMap.get(globalTokenKey)?.tokens) as unknown as GlobalThemeTokens

    if (!globalTokens) {
      return
    }

    const tokens = getTokens(globalTokens, mergedPresetTheme.value, mergedAlgorithms.value)

    if (!tokens) {
      return
    }

    const mergedCompTokens = getMergedTokens(key, tokens)

    const hashId = existedHashId ?? createTokensHash(key, mergedCompTokens as Record<string, string | number>)

    if (record?.hashId === hashId) {
      return hashId
    }

    const oldHashId = record?.hashId

    record = {
      key,
      hashId: hashId,
      tokens: mergedCompTokens,
    }

    tokenRecordMap.set(key, record)
    tokenGettersMap.set(key, getTokens)
    tokenTransformsMap.set(key, transforms)
    tokenHashedMap.set(key, hashed)

    // if hashId is already provided, we consider the style injected already, no need to inject it again
    if (!existedHashId) {
      const cssContent = tokenToCss(
        { ...record, hashId: hashed ?? mergedHashed.value ? record.hashId : '' } as TokenRecord<string>,
        transforms,
      )
      updateThemeStyle(cssContent, record.hashId, oldHashId)
    }

    if (key === globalTokenKey) {
      setGlobalHashId(record.hashId)
      ;[...tokenRecordMap.keys()].forEach(componentTokenKey => {
        updateToken(componentTokenKey)
      })
    }

    return record.hashId
  }

  const registerToken = <K extends ThemeKeys>(
    key: K,
    getTokens: TokenGetter<K>,
    transforms: TokenTransforms<K> | undefined,
    hashed?: boolean,
    hashId?: string,
  ) => {
    return _updateToken(key, getTokens, transforms, false, hashed, hashId)
  }

  const updateToken = <K extends ThemeKeys>(key: K, hashId?: string) => {
    if (!isTokensRegistered(key)) {
      return
    }

    const tokenGetter = tokenGettersMap.get(key)!
    const tokenTransforms = tokenTransformsMap.get(key)
    const tokenHashed = tokenHashedMap.get(key)

    return _updateToken(key, tokenGetter, tokenTransforms, true, tokenHashed, hashId)
  }

  const isTokensRegistered = (key: ThemeKeys) => {
    return tokenRecordMap.has(key)
  }
  const getThemeTokens = <K extends ThemeKeys>(key: K) => {
    return tokenRecordMap.get(key)!.tokens as CertainThemeTokens<K>
  }
  const getThemeHashId = (key: ThemeKeys) => {
    return tokenRecordMap.get(key)?.hashId
  }

  return {
    globalHashId,
    isTokensRegistered,
    getThemeTokens,
    getThemeHashId,
    registerToken,
    updateToken,
  }
}
