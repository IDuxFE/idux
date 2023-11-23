/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CertainThemeTokens, ThemeKeys, TokenGetter, TokenTransforms } from '@idux/components/theme'
import type { ProLayoutThemeTokens } from '@idux/pro/layout'
import type { ProSearchThemeTokens } from '@idux/pro/search'
import type { ProTextareaThemeTokens } from '@idux/pro/textarea'
import type { ProTransferThemeTokens } from '@idux/pro/transfer'
import type { ProTreeThemeTokens } from '@idux/pro/tree'

export interface ProComponentThemeTokens {
  proTextarea: ProTextareaThemeTokens
  proTransfer: ProTransferThemeTokens
  proTree: ProTreeThemeTokens
  proSearch: ProSearchThemeTokens
  proLayout: ProLayoutThemeTokens
}

export type ProCertainThemeTokens<K extends ThemeKeys | keyof ProComponentThemeTokens> = CertainThemeTokens<
  K,
  ProComponentThemeTokens
>
export type ProTokenGetter<K extends ThemeKeys | keyof ProComponentThemeTokens> = TokenGetter<
  K,
  ProComponentThemeTokens
>
export type ProTokenTransforms<K extends ThemeKeys | keyof ProComponentThemeTokens> = TokenTransforms<
  K,
  ProComponentThemeTokens
>
