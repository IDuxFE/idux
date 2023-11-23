/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import {
  type FullUseThemeTokenContext,
  NullUseThemeTokenContext,
  type ThemeKeys,
  type UseThemeTokenContext,
  useThemeToken as _useThemeToken,
} from '@idux/components/theme'

import { ProComponentThemeTokens } from './types'

export function useThemeToken(): NullUseThemeTokenContext
export function useThemeToken<K extends ThemeKeys | keyof ProComponentThemeTokens>(
  key: K,
): FullUseThemeTokenContext<K, ProComponentThemeTokens>
export function useThemeToken<K extends ThemeKeys | keyof ProComponentThemeTokens>(
  key?: K,
): UseThemeTokenContext<K | undefined, ProComponentThemeTokens> {
  return _useThemeToken<K, ProComponentThemeTokens>(key as K)
}
