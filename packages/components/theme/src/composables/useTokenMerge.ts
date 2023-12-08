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

import { getPresetAlgorithms, getThemeTokens } from '../themeTokens'
import {
  type CertainThemeTokens,
  type GlobalThemeTokens,
  type PresetTheme,
  type ResetTokenKey,
  type ThemeKeys,
  type ThemeProviderProps,
  type ThemeTokenAlgorithms,
  type ThemeTokens,
  globalTokenKey,
} from '../types'

export interface TokenMergeContext {
  mergedAlgorithms: ComputedRef<ThemeTokenAlgorithms>
  mergedTokens: ComputedRef<Omit<ThemeTokens, ResetTokenKey>>
  getMergedTokens: <K extends ThemeKeys>(key: K, tokens: CertainThemeTokens<K>) => CertainThemeTokens<K>
}

export function useTokenMerge(
  props: ThemeProviderProps | undefined,
  config: ThemeConfig,
  supperContext: ThemeProviderContext | null,
  mergedPresetTheme: ComputedRef<PresetTheme>,
): TokenMergeContext {
  const mergedAlgorithms = computed(() => {
    const presetAlgorithms = getPresetAlgorithms(mergedPresetTheme.value)
    const { getBaseColors, getColorPalette, getGreyColors } = props?.algorithm ?? {}

    return {
      getBaseColors: getBaseColors ?? presetAlgorithms.getBaseColors,
      getColorPalette: getColorPalette ?? presetAlgorithms.getColorPalette,
      getGreyColors: getGreyColors ?? presetAlgorithms.getGreyColors,
    }
  })

  const mergedTokens = computed(() => {
    const configGlobalTokens = config.global
    const configComponentTokens = config.components

    const overwrittenTokens = merge(
      { ...(props?.inherit && !props.presetTheme ? supperContext?.mergedTokens.value.global ?? {} : {}) },
      { ...configGlobalTokens },
      props?.tokens?.global,
    ) as GlobalThemeTokens

    const mergedGlobalTokens = getThemeTokens(mergedPresetTheme.value, overwrittenTokens, mergedAlgorithms.value)

    const mergedComponentTokens = merge(
      { ...(props?.inherit ? supperContext?.mergedTokens.value.components ?? {} : {}) },
      { ...configComponentTokens },
      props?.tokens?.components,
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
    mergedAlgorithms,
    mergedTokens: mergedTokens as ComputedRef<Omit<ThemeTokens, ResetTokenKey>>,
    getMergedTokens,
  }
}
