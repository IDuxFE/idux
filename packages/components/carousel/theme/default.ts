/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CertainThemeTokens, GlobalThemeTokens } from '@idux/components/theme'
export function getDefaultThemeTokens(tokens: GlobalThemeTokens): CertainThemeTokens<'carousel'> {
  const { colorWhite } = tokens

  return {
    arrowSize: 32,
    arrowColor: colorWhite,

    horizontalDotWidth: 32,
    horizontalDotHeight: 2,
    verticalDotWidth: 2,
    verticalDotHeight: 16,

    dotBgColor: colorWhite,
    dotBorderRadius: 2,

    iconOpacity: 0.3,
    iconOpacityHover: 0.6,
    iconOpacityActive: 0.8,
  }
}
