/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import {
  type UseThemeTokenContext,
  type UseThemeTokenScope,
  useThemeToken as _useThemeToken,
} from '@idux/components/theme'

import { ProComponentThemeTokens } from './types'

export function useThemeToken(): UseThemeTokenContext<undefined>
export function useThemeToken<K extends UseThemeTokenScope | keyof ProComponentThemeTokens | undefined>(
  key: K,
): UseThemeTokenContext<K, ProComponentThemeTokens>
export function useThemeToken<K extends UseThemeTokenScope | keyof ProComponentThemeTokens | undefined>(
  key?: K,
): UseThemeTokenContext<K, ProComponentThemeTokens> {
  return _useThemeToken<ProComponentThemeTokens, K>(key as K)
}
