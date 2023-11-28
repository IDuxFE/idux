/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { BasicTokens, DerivedTokens, ExtendedFontTokens } from '../../../types'

export function getExtendedFontTokens(tokens: BasicTokens & DerivedTokens): ExtendedFontTokens {
  return {
    fontSizeIcon: 16,
    fontWeightHeader: tokens.fontWeightXl,
  }
}
