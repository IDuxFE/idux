/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DeepPartialThemeTokens, ThemeKeys } from './themeTokens'
import type { UseThemeTokenContext } from '../useThemeToken'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, EffectScope, HTMLAttributes, PropType } from 'vue'

export type ThemeInherit = boolean | 'all'
export type PresetTheme = 'default' | 'dark'
export type ThemeProviderAttachTo = string | HTMLElement | (() => HTMLElement)

export interface UsetThemeProviderStates<Ext extends object = object> {
  scope: EffectScope
  subscribers: number
  context: UseThemeTokenContext<ThemeKeys | keyof Ext, Ext>
}

export const themeProviderProps = {
  presetTheme: {
    type: String as PropType<PresetTheme>,
    default: undefined,
  },
  hashed: {
    type: Boolean,
    default: undefined,
  },
  tag: String,
  inherit: {
    type: [Boolean, String] as PropType<ThemeInherit>,
    default: true,
  },
  attachTo: [String, Object, Function] as PropType<ThemeProviderAttachTo>,
  tokens: Object as PropType<DeepPartialThemeTokens>,
} as const

export type ThemeProviderProps = ExtractInnerPropTypes<typeof themeProviderProps>
export type ThemeProviderPublicProps = ExtractPublicPropTypes<typeof themeProviderProps>
export type ThemeProviderComponent = DefineComponent<
  Omit<HTMLAttributes, keyof ThemeProviderPublicProps> & ThemeProviderPublicProps
>
export type ThemeProviderInstance = InstanceType<DefineComponent<ThemeProviderProps>>
