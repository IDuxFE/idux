/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type CertainThemeTokens, type GlobalThemeTokens, getBaseColors, getColorPalette } from '@idux/components/theme'

export function getDefaultThemeTokens(tokens: GlobalThemeTokens): CertainThemeTokens<'spin'> {
  const baseColors = getBaseColors()
  const graphiteColorPalette = getColorPalette(baseColors.graphite)

  const { colorPrimary, fontSizeSm, fontSizeMd, fontSizeLg } = tokens

  return {
    tipColor: colorPrimary,
    iconColor: colorPrimary,

    fontSizeSm,
    fontSizeMd,
    fontSizeLg,

    iconSizeSm: 20,
    iconSizeMd: 28,
    iconSizeLg: 48,

    bgCircleStroke: colorPrimary,
    fstArchStroke: baseColors.turquoise,
    sndArchStroke: graphiteColorPalette.l20,
  }
}
