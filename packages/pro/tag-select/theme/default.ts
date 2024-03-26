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

  const greyColor = getGreyColors().base
  const greenColor = getBaseColors().green
  const blueColor = getBaseColors().blue
  const yelloColor = getBaseColors().yellow
  const redColor = getBaseColors().red
  const orangeColor = getBaseColors().orange

  return {
    presetColorGreyLabel: greyColor,
    presetColorGreyBg: getAlphaColor(greyColor, tagCompColorAlpha, colorContainerBg),
    presetColorGreenLabel: greenColor,
    presetColorGreenBg: getAlphaColor(greenColor, tagCompColorAlpha, colorContainerBg),
    presetColorBlueLabel: blueColor,
    presetColorBlueBg: getAlphaColor(blueColor, tagCompColorAlpha, colorContainerBg),
    presetColorYellowLabel: yelloColor,
    presetColorYellowBg: getAlphaColor(yelloColor, tagCompColorAlpha, colorContainerBg),
    presetColorRedLabel: redColor,
    presetColorRedBg: getAlphaColor(redColor, tagCompColorAlpha, colorContainerBg),
    presetColorOrangeLabel: orangeColor,
    presetColorOrangeBg: getAlphaColor(orangeColor, tagCompColorAlpha, colorContainerBg),
    colorIndicatorSize: 12,
    panelMaxHeight: 256,
    editPanelMinWidth: 225,
    tagHeight: 20,
  }
}
