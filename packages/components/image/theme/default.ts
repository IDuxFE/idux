/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CertainThemeTokens, GlobalThemeTokens } from '@idux/components/theme'
export function getDefaultThemeTokens(tokens: GlobalThemeTokens): CertainThemeTokens<'image'> {
  const { colorWhite, fontSizeXl } = tokens

  return {
    minWidth: 96,
    minHeight: 96,

    objectFit: 'contain',

    previewBgColor: `rgba(0, 0, 0, 0.5)`,
    previewIconColor: colorWhite,
    previewIconSize: fontSizeXl,

    viewerBgColor: `rgba(0, 0, 0, 0.45)`,
    viewerOprColor: colorWhite,
    viewerOprColorDisabled: `rgba(255, 255, 255, 0.35)`,

    viewerOprHeight: 48,
    viewerOprMarginBottom: 48,
    viewerOprFontSize: fontSizeXl,
    viewerOprBgColor: `rgba(0, 0, 0, 0.1)`,
    viewerOprItemMargin: `0 24px`,
  }
}
