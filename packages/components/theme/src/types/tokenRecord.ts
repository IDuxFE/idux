/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { CertainThemeTokens, ThemeKeys } from './themeTokens'

export interface TokenRecord<K extends ThemeKeys> {
  key: K
  hashId: string
  tokens: CertainThemeTokens<K>
}
