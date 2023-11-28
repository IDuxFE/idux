/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { BasicTokens, DerivedTokens, ExtendedSizeTokens } from '../../../types'

export function getExtendedSizeTokens(tokens: BasicTokens & DerivedTokens): ExtendedSizeTokens {
  return {
    componentBorderRadius: tokens.borderRadiusSm,
  }
}
