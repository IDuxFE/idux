/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CertainThemeTokens, GlobalThemeTokens } from '@idux/components/theme'
export function getDefaultThemeTokens(tokens: GlobalThemeTokens): CertainThemeTokens<'timeline'> {
  const { fontSizeSm, marginSizeSm, marginSizeLg, colorSeparator } = tokens

  return {
    fontSize: fontSizeSm,
    dotSize: 12,
    dotBorderWidth: 2,
    contentLabelMarginTop: marginSizeSm,
    lineWidth: 2,
    lineBgColor: colorSeparator,

    pendingItemContentMinWidth: 40,
    contentMarginBottom: marginSizeLg,
  }
}
