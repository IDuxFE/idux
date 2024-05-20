/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProCertainThemeTokens } from '@idux/pro/theme'

import { type GlobalThemeTokens, type ThemeTokenAlgorithms, getAlphaColor } from '@idux/components/theme'
export function getDefaultThemeTokens(
  tokens: GlobalThemeTokens,
  algrithms: ThemeTokenAlgorithms,
): ProCertainThemeTokens<'proTagSelect'> {
  const { colorContainerBg, tagCompColorAlpha } = tokens
  const { getBaseColors, getGreyColors } = algrithms

  const greyColors = getGreyColors()
  const greyColor = getGreyColors().base
  const greenColor = getBaseColors().turquoise
  const blueColor = getBaseColors().blue
  const yelloColor = getBaseColors().yellow
  const redColor = getBaseColors().red
  const orangeColor = getBaseColors().orange

  return {
    presetColorGreyLabel: greyColor,
    presetColorGreyIndicator: greyColors.l30,
    presetColorGreyBg: getAlphaColor(greyColor, tagCompColorAlpha, colorContainerBg),
    presetColorGreenLabel: greenColor,
    presetColorGreenIndicator: getAlphaColor(greenColor, 0.3, colorContainerBg),
    presetColorGreenBg: getAlphaColor(greenColor, tagCompColorAlpha, colorContainerBg),
    presetColorBlueLabel: blueColor,
    presetColorBlueIndicator: getAlphaColor(blueColor, 0.3, colorContainerBg),
    presetColorBlueBg: getAlphaColor(blueColor, tagCompColorAlpha, colorContainerBg),
    presetColorYellowLabel: yelloColor,
    presetColorYellowIndicator: getAlphaColor(yelloColor, 0.3, colorContainerBg),
    presetColorYellowBg: getAlphaColor(yelloColor, tagCompColorAlpha, colorContainerBg),
    presetColorRedLabel: redColor,
    presetColorRedIndicator: getAlphaColor(redColor, 0.3, colorContainerBg),
    presetColorRedBg: getAlphaColor(redColor, tagCompColorAlpha, colorContainerBg),
    presetColorOrangeLabel: orangeColor,
    presetColorOrangeIndicator: getAlphaColor(orangeColor, 0.3, colorContainerBg),
    presetColorOrangeBg: getAlphaColor(orangeColor, tagCompColorAlpha, colorContainerBg),
    colorIndicatorSize: 12,
    panelMaxHeight: 256,
    editPanelMinWidth: 140,
    tagHeight: 20,
  }
}
