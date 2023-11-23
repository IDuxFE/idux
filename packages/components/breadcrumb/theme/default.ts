/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CertainThemeTokens, GlobalThemeTokens } from '@idux/components/theme'
export function getDefaultThemeTokens(tokens: GlobalThemeTokens): CertainThemeTokens<'breadcrumb'> {
  const { fontSizeLg, colorTextPlaceholder, colorLink, colorIconInfo, colorTextTitle, marginSizeXs } = tokens

  return {
    itemColor: colorTextPlaceholder,
    linkColor: colorTextPlaceholder,
    linkColorHover: colorLink,
    separatorColor: colorIconInfo,
    separatorFontSize: fontSizeLg,
    lastItemColor: colorTextTitle,
    separatorMargin: `0 ${marginSizeXs}px`,
  }
}
