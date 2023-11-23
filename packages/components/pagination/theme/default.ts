/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type CertainThemeTokens, type GlobalThemeTokens, getColorPalette } from '@idux/components/theme'
export function getDefaultThemeTokens(tokens: GlobalThemeTokens): CertainThemeTokens<'pagination'> {
  const { colorPrimary, fontSizeSm, fontSizeMd, paddingSizeXs, heightSm, heightMd } = tokens

  const primaryColorPalette = getColorPalette(colorPrimary)

  return {
    fontSizeSm: fontSizeSm,
    fontSizeMd: fontSizeSm,
    fontSizeLg: fontSizeMd,

    itmePaddingSm: 0,
    itemPaddingMd: paddingSizeXs,
    itemPaddingLg: paddingSizeXs,

    itemContentSizeSm: heightSm,
    itemContentSizeMd: heightSm,
    itemContentSizeLg: heightMd,

    outLineColor: primaryColorPalette.l10,
  }
}
