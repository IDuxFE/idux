/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CertainThemeTokens, GlobalThemeTokens } from '@idux/components/theme'
export function getDefaultThemeTokens(tokens: GlobalThemeTokens): CertainThemeTokens<'breadcrumb'> {
  const { fontSizeSm, fontSizeMd, colorTextInfo, colorLink, colorTextDisabled, colorTextTitle, marginSizeXs } = tokens

  return {
    fontSize: fontSizeMd,
    itemColor: colorTextInfo,
    linkColor: colorTextInfo,
    linkColorHover: colorLink,
    separatorColor: colorTextDisabled,
    separatorFontSize: fontSizeSm,
    lastItemColor: colorTextTitle,
    separatorMargin: `0 ${marginSizeXs}px`,
  }
}
