/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { BasicTokens } from '../../types'
import { getBaseColors, getColorPalette, getGreyColors } from '../shared'

export function getBasicTokens(): BasicTokens {
  const baseColors = getBaseColors()
  const redColorPalette = getColorPalette(baseColors.red)
  const greyColors = getGreyColors('graphite')

  return {
    colorPrimary: baseColors.blue,
    colorError: baseColors.red,
    colorSuccess: baseColors.turquoise,
    colorWarning: baseColors.brown,
    colorRisk: baseColors.orange,
    colorFatal: redColorPalette.d30,
    colorInfo: baseColors.blue,
    colorLink: baseColors.blue,

    colorWhite: baseColors.white,

    colorText: greyColors.d40,
    colorBg: baseColors.white,
    colorBorder: greyColors.l20,
    colorBorderSecondary: greyColors.l30,

    fontSize: 14,
    fontFamily: `pingfang SC, helvetica neue, arial, hiragino sans gb, microsoft yahei ui, microsoft yahei, simsun, sans-serif`,
    fontFamilyCode: `'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace`,
    fontWeight: 400,

    borderRadius: 4,
    height: 32,
    lineHeightGutter: 8,
    spacing: 8,
    lineWidth: 1,
    lineType: 'solid',

    motionDuration: 0.24,
    motionEaseIn: 'cubic-bezier(0.12, 0, 0.39, 0)',
    motionEaseOut: 'cubic-bezier(0.61, 1, 0.88, 1)',
    motionEaseInOut: 'cubic-bezier(0.37, 0, 0.63, 1)',
    motionEaseInBack: 'cubic-bezier(0.36, 0, 0.66, -0.56)',
    motionEaseOutBack: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    motionEaseInCirc: 'cubic-bezier(0.55, 0, 1, 0.45)',
    motionEaseOutCirc: 'cubic-bezier(0, 0.55, 0.45, 1)',
    motionEaseInQuint: 'cubic-bezier(0.64, 0, 0.78, 0)',
    motionEaseOutQuint: 'cubic-bezier(0.22, 1, 0.36, 1)',

    screenSm: 600,
    screenMd: 960,
    screenLg: 1280,
    screenXl: 1720,
  }
}
