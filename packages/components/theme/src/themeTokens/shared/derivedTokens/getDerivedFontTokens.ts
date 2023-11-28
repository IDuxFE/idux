/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { BasicTokens, DerivedFontTokens } from '../../../types'

export function getDerivedFontTokens(basicTokens: BasicTokens): DerivedFontTokens {
  const { fontSize, fontWeight } = basicTokens

  const fontSizeUnit = 2
  const minFontSize = 10
  const fontWeightUnit = 100

  const fontSizeMap = {
    fontSizeXs: Math.max(fontSize - fontSizeUnit * 2, minFontSize),
    fontSizeSm: Math.max(fontSize - fontSizeUnit, minFontSize),
    fontSizeMd: Math.max(fontSize, minFontSize),
    fontSizeLg: Math.max(fontSize + fontSizeUnit, minFontSize),
    fontSizeXl: Math.max(fontSize + fontSizeUnit * 3, minFontSize),
    fontSize2xl: Math.max(fontSize + fontSizeUnit * 5, minFontSize),
    fontSize3xl: Math.max(fontSize + fontSizeUnit * 8, minFontSize),
  }

  return {
    ...fontSizeMap,
    fontSizeHeaderSm: fontSizeMap.fontSizeMd,
    fontSizeHeaderMd: fontSizeMap.fontSizeLg,
    fontSizeHeaderLg: fontSizeMap.fontSizeXl,
    fontSizeHeaderXl: fontSizeMap.fontSize2xl,

    fontWeightXs: fontWeight - fontWeightUnit * 2,
    fontWeightSm: fontWeight - fontWeightUnit,
    fontWeightMd: fontWeight,
    fontWeightLg: fontWeight + fontWeightUnit,
    fontWeightXl: fontWeight + fontWeightUnit * 2,
  }
}
