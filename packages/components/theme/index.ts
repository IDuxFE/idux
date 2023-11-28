/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ThemeProviderComponent } from './src/types'

import ThemeProvider from './src/ThemeProvider'

const IxThemeProvider = ThemeProvider as unknown as ThemeProviderComponent

export { IxThemeProvider }
export { useThemeToken } from './src/useThemeToken'
export { numUnitTransform } from './src/utils'
export {
  getAlphaColor,
  getSolidColor,
  getBaseColors,
  getThemeTokens,
  getColorPalette,
  getDarkColorPalette,
  getGreyColors,
} from './src/themeTokens'

export type {
  ThemeProviderInstance,
  ThemeProviderComponent,
  ThemeProviderPublicProps as ThemeProviderProps,
  ThemeProviderAttachTo,
  ThemeTokenKey,
  ThemeTokens,
  ThemeKeys,
  ThemeTokenAlgorithms,
  TokenTransforms,
  GlobalThemeTokens,
  CertainThemeTokens,
  DeepPartialThemeTokens,
  PresetTheme,
} from './src/types'
export type { UseThemeTokenContext, FullUseThemeTokenContext, NullUseThemeTokenContext } from './src/useThemeToken'
export type { TokenGetter } from './src/composables/useTokenRegister'
