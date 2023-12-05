/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, watch } from 'vue'

import { isFunction } from 'lodash-es'

import { createSharedComposable } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'

import { useTokenMerge } from './useTokenMerge'
import { useTokenRegister } from './useTokenRegister'
import { getResetTokens } from '../themeTokens'
import { type ThemeProviderContext } from '../token'
import {
  type ThemeKeys,
  type ThemeProviderProps,
  type UsetThemeProviderStates,
  globalTokenKey,
  resetTokenKey,
} from '../types'

export function createThemeProviderContext(
  supperContext: ThemeProviderContext | null,
  props?: ThemeProviderProps,
): ThemeProviderContext {
  const themeConfig = useGlobalConfig('theme')
  const injectThemeStyle = computed(() => props?.injectThemeStyle ?? themeConfig.injectThemeStyle)
  const mergedPresetTheme = computed(
    () =>
      (props?.inherit && !props.presetTheme ? supperContext?.presetTheme.value : props?.presetTheme) ??
      themeConfig.presetTheme,
  )
  const mergedHashed = computed(
    () => (props?.inherit ? supperContext?.hashed.value : undefined) ?? props?.hashed ?? themeConfig.hashed,
  )

  const mergedAttachTo = computed(() => {
    const attachTo =
      (props?.inherit ? supperContext?.attachTo.value : undefined) ?? props?.attachTo ?? themeConfig.attachTo
    if (!attachTo) {
      return
    }

    if (attachTo instanceof Element) {
      return attachTo
    }

    if (isFunction(attachTo)) {
      return attachTo()
    }

    return document.querySelector(attachTo) ?? undefined
  })

  const { mergedAlgorithms, mergedTokens, getMergedTokens } = useTokenMerge(
    props,
    themeConfig,
    supperContext,
    mergedPresetTheme,
  )
  const { globalHashId, registerToken, updateToken, getThemeTokens, getThemeHashId, isTokensRegistered } =
    useTokenRegister(
      injectThemeStyle,
      mergedPresetTheme,
      mergedAlgorithms,
      mergedAttachTo,
      mergedHashed,
      getMergedTokens,
    )

  watch(
    () => mergedTokens.value.global,
    () => {
      const useSupper = props?.inherit && !props.tokens?.global && !!supperContext
      if (!isTokensRegistered(globalTokenKey)) {
        registerToken(
          globalTokenKey,
          () => (useSupper ? supperContext!.getThemeTokens(globalTokenKey) : mergedTokens.value.global),
          undefined,
          undefined,
          useSupper ? supperContext!.getThemeHashId(globalTokenKey) : undefined,
        )
      } else {
        updateToken(globalTokenKey, useSupper ? supperContext!.getThemeHashId(globalTokenKey) : undefined)
      }

      // sub providers don't register reset styles
      if (props?.inherit && !!supperContext) {
        return
      }

      if (!isTokensRegistered(resetTokenKey)) {
        registerToken(
          resetTokenKey,
          globalTokens => (useSupper ? supperContext!.getThemeTokens(resetTokenKey) : getResetTokens(globalTokens)),
          undefined,
          false,
          useSupper ? supperContext!.getThemeHashId(resetTokenKey) : undefined,
        )
      } else {
        updateToken(resetTokenKey, useSupper ? supperContext!.getThemeHashId(resetTokenKey) : undefined)
      }
    },
    {
      immediate: true,
      deep: true,
    },
  )
  watch(
    () => mergedTokens.value.components,
    components => {
      Object.keys(components).forEach(key => {
        updateToken(key)
      })
    },
    {
      deep: true,
    },
  )

  const useThemeTokenContextMap = new Map<ThemeKeys, UsetThemeProviderStates>()

  return {
    globalHashId,
    hashed: mergedHashed,
    presetTheme: mergedPresetTheme,
    attachTo: mergedAttachTo,
    mergedTokens,
    useThemeTokenContextMap,
    getThemeHashId,
    registerToken,
    updateToken,
    getThemeTokens,
    isTokensRegistered,
  }
}

// export function useThemeProvider(props?: ThemeProviderProps) {
//   let supperContext = inject(THEME_PROVIDER_TOKEN, null)
//   supperContext = supperContext ?? useSharedThemeProvider()

//   return createThemeProviderContext(supperContext, props)
// }

export const useSharedThemeProvider = createSharedComposable(() => createThemeProviderContext(null))
