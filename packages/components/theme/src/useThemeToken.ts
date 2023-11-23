/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TokenGetter } from './composables/useTokenRegister'

import { type ComputedRef, computed, effectScope, inject } from 'vue'

import { Logger, tryOnScopeDispose } from '@idux/cdk/utils'

import { THEME_PROVIDER_TOKEN, type ThemeProviderContext } from './token'
import {
  type CertainThemeTokens,
  type GlobalTokenKey,
  type ThemeKeys,
  type TokenTransforms,
  type UsetThemeProviderStates,
  globalTokenKey,
} from './types'

export interface FullUseThemeTokenContext<K extends ThemeKeys | keyof Ext, Ext extends object = object> {
  globalHashId: ComputedRef<string>
  hashId: ComputedRef<string>
  themeTokens: ComputedRef<CertainThemeTokens<K, Ext>>
  registerToken: (getTokens: TokenGetter<K, Ext>, transforms?: TokenTransforms<K, Ext>) => string
}

export interface NullUseThemeTokenContext {
  globalHashId: ComputedRef<string>
}

export type UseThemeTokenContext<K extends ThemeKeys | keyof Ext | undefined, Ext extends object = object> = K extends
  | ThemeKeys
  | keyof Ext
  ? FullUseThemeTokenContext<K, Ext>
  : NullUseThemeTokenContext

let emptyContext: UseThemeTokenContext<ThemeKeys>

export function useThemeToken(): NullUseThemeTokenContext
export function useThemeToken<K extends ThemeKeys | keyof Ext, Ext extends object = object>(
  key: K,
): FullUseThemeTokenContext<K, Ext>
export function useThemeToken<K extends ThemeKeys | keyof Ext, Ext extends object = object>(
  key?: K,
): UseThemeTokenContext<K, Ext> {
  const themeProviderContext = inject(THEME_PROVIDER_TOKEN, null)

  if (!themeProviderContext) {
    Logger.warn('components/theme', '<IxThemeProvider> not found.')

    if (!emptyContext) {
      emptyContext = {
        globalHashId: computed(() => ''),
        hashId: computed(() => ''),
        themeTokens: computed(() => ({})),
        registerToken: (() => {}) as unknown as UseThemeTokenContext<ThemeKeys>['registerToken'],
      } as UseThemeTokenContext<ThemeKeys>
    }

    return emptyContext as unknown as UseThemeTokenContext<K, Ext>
  }

  const {
    useThemeTokenContextMap,
    globalHashId: _globalHashId,
    hashed,
    getThemeTokens,
    getThemeHashId,
    registerToken: _registerToken,
  } = themeProviderContext as unknown as ThemeProviderContext<Ext>

  const globalContext = getSharedContext(
    globalTokenKey,
    useThemeTokenContextMap,
    () =>
      ({
        globalHashId: computed(() => (hashed.value ? _globalHashId.value : '')),
      }) as UseThemeTokenContext<GlobalTokenKey, Ext>,
  )

  if (!key) {
    return globalContext as unknown as UseThemeTokenContext<K, Ext>
  }

  const context = getSharedContext(key, useThemeTokenContextMap, () => {
    const globalHashId = globalContext.globalHashId
    const hashId = computed(() => (hashed.value ? getThemeHashId(key) ?? '' : ''))
    const themeTokens = computed(() => getThemeTokens(key))

    const registerToken = (getTokens: TokenGetter<K, Ext>, transforms?: TokenTransforms<K, Ext>) => {
      return _registerToken(key, getTokens, transforms as TokenTransforms<ThemeKeys | keyof Ext, Ext>) ?? ''
    }

    return {
      globalHashId,
      hashId,
      themeTokens,
      registerToken,
    } as UseThemeTokenContext<K, Ext>
  })

  return context as unknown as UseThemeTokenContext<K, Ext>
}

// create a context shared through all scopes using the same context to avoid repeaded context initiation
function getSharedContext<K extends ThemeKeys | keyof Ext, Ext extends object = object>(
  key: K,
  map: Map<ThemeKeys | keyof Ext, UsetThemeProviderStates<Ext> | undefined>,
  getContext: () => UseThemeTokenContext<K, Ext>,
): UseThemeTokenContext<K, Ext> {
  let states = map.get(key)

  if (!states) {
    const scope = effectScope(true)
    const context = scope.run(() => getContext())! as UseThemeTokenContext<K, Ext>

    states = {
      scope,
      context,
      subscribers: 1,
    }

    tryOnScopeDispose(() => {
      if (states && scope && --states.subscribers <= 0) {
        states.scope.stop()
        map.set(key, undefined)
      }
    })

    map.set(key, states)
  } else {
    states.subscribers++
  }

  return states!.context as unknown as UseThemeTokenContext<K, Ext>
}