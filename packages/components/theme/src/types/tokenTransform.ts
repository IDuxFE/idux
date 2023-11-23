/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ThemeKeys, ThemeTokenKey } from './themeTokens'

type TokenValueTransform = (value: number | string) => string

export type TokenTransforms<key extends ThemeKeys | keyof Ext, Ext extends object = object> = Partial<
  Record<ThemeTokenKey<key, Ext>, TokenValueTransform>
>
