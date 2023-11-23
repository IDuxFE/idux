/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

interface PaddingSizeTokens {
  paddingSize2Xs: number
  paddingSizeXs: number
  paddingSizeSm: number
  paddingSizeMd: number
  paddingSizeLg: number
  paddingSizeXl: number
  paddingSize2Xl: number
}

interface MarginSizeTokens {
  marginSize2Xs: number
  marginSizeXs: number
  marginSizeSm: number
  marginSizeMd: number
  marginSizeLg: number
  marginSizeXl: number
  marginSize2Xl: number
}

interface HeightTokens {
  heightXs: number
  heightSm: number
  heightMd: number
  heightLg: number
  heightXl: number
  height2xl: number
  height3xl: number
}

interface BorderRadiusTokens {
  borderRadiusXs: number
  borderRadiusSm: number
  borderRadiusMd: number
  borderRadiusLg: number
}

interface ScreenTokens {
  screenXsMax: number
  screenSmMin: number
  screenSmMax: number
  screenMdMin: number
  screenMdMax: number
  screenLgMin: number
  screenLgMax: number
  screenXlMin: number
}

export interface DerivedSizeTokens
  extends PaddingSizeTokens,
    MarginSizeTokens,
    HeightTokens,
    BorderRadiusTokens,
    ScreenTokens {
  lineWidthBold: number
  arrowSize: number
}
