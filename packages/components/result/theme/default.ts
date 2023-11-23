/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CertainThemeTokens, GlobalThemeTokens } from '@idux/components/theme'
export function getDefaultThemeTokens(tokens: GlobalThemeTokens): CertainThemeTokens<'result'> {
  const { marginSizeXs, marginSizeXl, fontSizeHeaderLg, fontSizeSm } = tokens

  return {
    padding: `48px 32px`,
    iconSize: 48,
    titleFontSize: fontSizeHeaderLg,
    titleLineHeight: 32,
    subtitleFontSize: fontSizeSm,
    subtitleLineHeight: 18,

    subtitleMarginTop: marginSizeXs,
    extraMarginTop: marginSizeXl,
    contentMarginTop: marginSizeXl,
    contentPadding: `24px 40px`,
  }
}
