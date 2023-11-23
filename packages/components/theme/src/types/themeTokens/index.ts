/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { BasicTokens } from './basicToken'
import type { ComponentThemeKeys, ComponentThemeTokens } from './componentTokens'
import type { DerivedTokens } from './derived'
import type { ExtendedTokens } from './extended'
import type { ResetTokens } from './reset'

export type { BasicTokens } from './basicToken'
export type {
  DerivedTokens,
  DerivedColorTokens,
  DerivedFontTokens,
  DerivedSizeTokens,
  DerivedMotionTokens,
  ShadowTokens,
} from './derived'
export type {
  ExtendedTokens,
  ExtendedColorTokens,
  ExtendedFontTokens,
  ExtendedSizeTokens,
  ControlTokens,
  ScrollbarTokens,
  OverlayTokens,
} from './extended'
export type { ComponentThemeTokens, ComponentThemeKeys } from './componentTokens'
export type { ResetTokens }

export const globalTokenKey = 'global'
export const resetTokenKey = 'reset'
export const componentTokenKey = 'components'
export const themeTokenPrefix = 'ix'

export type GlobalTokenKey = typeof globalTokenKey
export type ResetTokenKey = typeof resetTokenKey

export interface GlobalThemeTokens extends BasicTokens, DerivedTokens, ExtendedTokens {}

export interface ThemeTokens {
  global: GlobalThemeTokens
  reset: ResetTokens
  components: ComponentThemeTokens & { [key: string]: Record<string, string | number> }
}
export interface DeepPartialThemeTokens {
  global?: Partial<GlobalThemeTokens>
  components?: {
    [key in keyof ComponentThemeTokens]?: Partial<ComponentThemeTokens[key]>
  } & {
    [key: string]: Record<string, string | number>
  }
}

export type ThemeKeys =
  | typeof globalTokenKey
  | typeof resetTokenKey
  | ComponentThemeKeys
  | (string & Record<never, never>)

// export type ThemeKeys = LiteralUnion<typeof globalTokenKey | ComponentThemeKeys, string>

export type CertainThemeTokens<
  key extends ThemeKeys | keyof Ext,
  Ext extends object = object,
> = key extends typeof globalTokenKey
  ? GlobalThemeTokens
  : key extends typeof resetTokenKey
  ? ResetTokens
  : key extends keyof ComponentThemeTokens
  ? ComponentThemeTokens[key]
  : key extends keyof Ext
  ? Ext[key]
  : Record<string, string | number>

export type ThemeTokenKey<
  key extends ThemeKeys | keyof Ext,
  Ext extends object = object,
> = key extends typeof globalTokenKey
  ? keyof GlobalThemeTokens
  : key extends keyof ComponentThemeTokens
  ? keyof ComponentThemeTokens[key]
  : key extends keyof Ext
  ? keyof Ext[key]
  : string
