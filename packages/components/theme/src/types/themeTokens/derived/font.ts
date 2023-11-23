/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

interface DerivedFontSizeTokens {
  fontSizeXs: number
  fontSizeSm: number
  fontSizeMd: number
  fontSizeLg: number
  fontSizeXl: number
  fontSize2xl: number
  fontSize3xl: number

  fontSizeHeaderSm: number
  fontSizeHeaderMd: number
  fontSizeHeaderLg: number
  fontSizeHeaderXl: number
}

interface DerivedFontWeightTokens {
  fontWeightXs: number
  fontWeightSm: number
  fontWeightMd: number
  fontWeightLg: number
  fontWeightXl: number
}

export interface DerivedFontTokens extends DerivedFontSizeTokens, DerivedFontWeightTokens {}
