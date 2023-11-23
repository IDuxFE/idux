/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ThemeProviderContext } from '../token'
import type { ThemeConfig } from '@idux/components/config'

import { type ComputedRef, computed } from 'vue'

import { merge } from 'lodash-es'

import { getThemeTokens } from '../themeTokens'
import {
  type CertainThemeTokens,
  type GlobalThemeTokens,
  type PresetTheme,
  type ResetTokenKey,
  type ThemeKeys,
  type ThemeProviderProps,
  type ThemeTokens,
  globalTokenKey,
} from '../types'

export interface TokenMergeContext {
  mergedTokens: ComputedRef<Omit<ThemeTokens, ResetTokenKey>>
  getMergedTokens: <K extends ThemeKeys>(key: K, tokens: CertainThemeTokens<K>) => CertainThemeTokens<K>
}

export function useTokenMerge(
  props: ThemeProviderProps,
  config: ThemeConfig,
  supperContext: ThemeProviderContext | null,
  mergedPresetTheme: ComputedRef<PresetTheme>,
): TokenMergeContext {
  const mergedTokens = computed(() => {
    const configGlobalTokens = config.global
    const configComponentTokens = config.components

    const globalTokens = merge(
      { ...(props.inherit ? supperContext?.mergedTokens.value.global ?? {} : {}) },
      { ...configGlobalTokens },
      props.tokens?.global,
    ) as GlobalThemeTokens
    const mergedGlobalTokens = getThemeTokens(mergedPresetTheme.value, globalTokens)

    const mergedComponentTokens = merge(
      { ...(props.inherit ? supperContext?.mergedTokens.value.components ?? {} : {}) },
      { ...configComponentTokens },
      props.tokens?.components,
    )

    return {
      global: mergedGlobalTokens,
      components: mergedComponentTokens,
    }
  })

  const getMergedTokens = <K extends ThemeKeys>(key: K, tokens: CertainThemeTokens<K>): CertainThemeTokens<K> => {
    if (key === globalTokenKey) {
      return merge({ ...tokens }, mergedTokens.value.global)
    }

    return merge({ ...tokens }, mergedTokens.value.components?.[key])
  }

  return {
    mergedTokens: mergedTokens as ComputedRef<Omit<ThemeTokens, ResetTokenKey>>,
    getMergedTokens,
  }
}