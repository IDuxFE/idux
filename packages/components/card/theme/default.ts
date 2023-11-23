/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CertainThemeTokens, GlobalThemeTokens } from '@idux/components/theme'
export function getDefaultThemeTokens(tokens: GlobalThemeTokens): CertainThemeTokens<'card'> {
  const { fontSizeSm, fontSizeMd, fontSizeXl, fontSizeLg, marginSizeXs, paddingSizeSm, paddingSizeLg, paddingSizeXl } =
    tokens

  return {
    fontSizeSm: fontSizeSm,
    fontSizeMd: fontSizeSm,
    fontSizeLg: fontSizeMd,

    paddingSizeSm: paddingSizeLg,
    paddingSizeMd: paddingSizeLg,
    paddingSizeLg: paddingSizeXl,
    showShadowBorderWidth: 0,

    markWidth: fontSizeXl,
    markHeight: fontSizeLg,

    headerPadding: paddingSizeSm,

    loadingSpacing: marginSizeXs,
    loadingHeight: fontSizeMd,
    loadingBgSize: `600%`,

    gridWidth: `25%`,
  }
}
