/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, provide, watch } from 'vue'

import { isFunction } from 'lodash-es'

import { useGlobalConfig } from '@idux/components/config'

import { useTokenMerge } from './composables/useTokenMerge'
import { useTokenRegister } from './composables/useTokenRegister'
import { getResetTokens } from './themeTokens'
import { THEME_PROVIDER_TOKEN } from './token'
import {
  type ThemeKeys,
  type UsetThemeProviderStates,
  globalTokenKey,
  resetTokenKey,
  themeProviderProps,
} from './types'

export default defineComponent({
  name: 'IxThemeProvider',
  props: themeProviderProps,
  setup(props, { slots, attrs }) {
    const supperContext = inject(THEME_PROVIDER_TOKEN, null)

    if (props.inherit != 'all' || supperContext) {
      const themeConfig = useGlobalConfig('theme')
      const mergedPresetTheme = computed(
        () =>
          (props.inherit ? supperContext?.presetTheme.value : undefined) ??
          props.presetTheme ??
          themeConfig.presetTheme,
      )
      const mergedHashed = computed(
        () => (props.inherit ? supperContext?.hashed.value : undefined) ?? props.hashed ?? themeConfig.hashed,
      )

      const mergedAttachTo = computed(() => {
        const attachTo =
          (props.inherit ? supperContext?.attachTo.value : undefined) ?? props.attachTo ?? themeConfig.attachTo
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

      const { mergedTokens, getMergedTokens } = useTokenMerge(props, themeConfig, supperContext, mergedPresetTheme)
      const { globalHashId, registerToken, updateToken, getThemeTokens, getThemeHashId, isTokensRegistered } =
        useTokenRegister(mergedPresetTheme, mergedAttachTo, mergedHashed, getMergedTokens)

      watch(
        () => mergedTokens.value.global,
        () => {
          const useSupper = props.inherit && !props.tokens?.global && !!supperContext
          if (!isTokensRegistered(globalTokenKey)) {
            registerToken(
              globalTokenKey,
              () => (useSupper ? supperContext.getThemeTokens(globalTokenKey) : mergedTokens.value.global),
              undefined,
              undefined,
              useSupper ? supperContext!.getThemeHashId(globalTokenKey) : undefined,
            )
          } else {
            updateToken(globalTokenKey, useSupper ? supperContext!.getThemeHashId(globalTokenKey) : undefined)
          }

          if (!isTokensRegistered(resetTokenKey)) {
            registerToken(
              resetTokenKey,
              globalTokens => (useSupper ? supperContext!.getThemeTokens(resetTokenKey) : getResetTokens(globalTokens)),
              undefined,
              false,
              useSupper ? supperContext.getThemeHashId(resetTokenKey) : undefined,
            )
          } else {
            updateToken(resetTokenKey, useSupper ? supperContext.getThemeHashId(resetTokenKey) : undefined)
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

      provide(THEME_PROVIDER_TOKEN, {
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
      })
    }

    return () => (props.tag ? <props.tag {...attrs}>{slots.default?.()}</props.tag> : <>{slots.default?.()}</>)
  },
})
