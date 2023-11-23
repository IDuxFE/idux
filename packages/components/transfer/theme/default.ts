/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CertainThemeTokens, GlobalThemeTokens } from '@idux/components/theme'
export function getDefaultThemeTokens(tokens: GlobalThemeTokens): CertainThemeTokens<'transfer'> {
  const { heightLg, heightMd, marginSizeMd, marginSizeSm, paddingSizeSm, paddingSizeMd } = tokens

  return {
    height: 290,
    contentWidth: 260,
    headerHeight: heightLg,
    suffixMarginLeft: marginSizeMd,
    footerHeight: heightLg,

    contentPadding: `0 ${paddingSizeSm}px 0 ${paddingSizeMd}px`,
    oprMinWidth: 4,
    oprPadding: paddingSizeSm,
    oprButtonWidth: 24,
    oprButtonHeight: 32,
    oprButtonGap: marginSizeSm,

    searchWidth: 110,
    listItemMinHeight: heightMd,

    closeIconPadding: `0 ${paddingSizeMd}px`,
  }
}
