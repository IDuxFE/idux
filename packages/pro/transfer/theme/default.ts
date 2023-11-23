/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { GlobalThemeTokens } from '@idux/components/theme'
import type { ProCertainThemeTokens } from '@idux/pro/theme'
export function getDefaultThemeTokens(tokens: GlobalThemeTokens): ProCertainThemeTokens<'proTransfer'> {
  const { paddingSizeSm, paddingSizeMd } = tokens

  return {
    listMinWidth: 260,
    listMinHeight: 290,

    tableCloseIconPadding: `0 0 0 ${paddingSizeMd}px`,
    treeCloseIconPadding: `0 ${paddingSizeSm}px`,
  }
}
