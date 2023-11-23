/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type CertainThemeTokens, type GlobalThemeTokens, getBaseColors, getColorPalette } from '@idux/components/theme'
export function getDefaultThemeTokens(tokens: GlobalThemeTokens): CertainThemeTokens<'rate'> {
  const { marginSizeSm } = tokens

  const activeColor = getColorPalette(getBaseColors().brown).l10

  return {
    activeColor: activeColor,
    sizeSm: 14,
    sizeMd: 20,
    sizeLg: 28,
    itemMarginRight: marginSizeSm,
    itemScaleHover: 1.1,
    itemOutlineFocus: `1px dashed ${activeColor}`,
  }
}
