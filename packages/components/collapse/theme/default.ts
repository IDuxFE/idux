/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CertainThemeTokens, GlobalThemeTokens } from '@idux/components/theme'
export function getDefaultThemeTokens(tokens: GlobalThemeTokens): CertainThemeTokens<'collapse'> {
  const { fontSizeSm, fontSizeXl, fontSize2xl, paddingSizeMd, paddingSizeLg } = tokens

  return {
    fontSizeSm: fontSizeSm,
    fontSizeMd: fontSizeSm,

    expandIconSizeSm: fontSizeXl,
    expandIconSizeMd: fontSize2xl,

    paddingHorizontalSm: paddingSizeMd,
    paddingHorizontalMd: paddingSizeLg,
  }
}
