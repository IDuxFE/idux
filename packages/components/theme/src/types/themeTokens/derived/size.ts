/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

interface PaddingSizeTokens {
  /**
   * @desc 内边距尺寸2Xs
   */
  paddingSize2Xs: number
  /**
   * @desc 内边距尺寸Xs
   */
  paddingSizeXs: number
  /**
   * @desc 内边距尺寸Sm
   */
  paddingSizeSm: number
  /**
   * @desc 内边距尺寸Md
   */
  paddingSizeMd: number
  /**
   * @desc 内边距尺寸Lg
   */
  paddingSizeLg: number
  /**
   * @desc 内边距尺寸Xl
   */
  paddingSizeXl: number
  /**
   * @desc 内边距尺寸2Xl
   */
  paddingSize2Xl: number
}

interface MarginSizeTokens {
  /**
   * @desc 外边距尺寸2Xs
   */
  marginSize2Xs: number

  /**
   * @desc 外边距尺寸Xs
   */
  marginSizeXs: number
  /**
   * @desc 外边距尺寸Sm
   */
  marginSizeSm: number
  /**
   * @desc 外边距尺寸Md
   */
  marginSizeMd: number
  /**
   * @desc 外边距尺寸Lg
   */
  marginSizeLg: number
  /**
   * @desc 外边距尺寸Xl
   */
  marginSizeXl: number
  /**
   * @desc 外边距尺寸2Xl
   */
  marginSize2Xl: number
}

interface HeightTokens {
  /**
   * @desc 高度尺寸Xs
   */
  heightXs: number
  /**
   * @desc 高度尺寸Sm
   */
  heightSm: number
  /**
   * @desc 高度尺寸Md
   */
  heightMd: number
  /**
   * @desc 高度尺寸Lg
   */
  heightLg: number
  /**
   * @desc 高度尺寸Xl
   */
  heightXl: number
  /**
   * @desc 高度尺寸2Xl
   */
  height2xl: number
  /**
   * @desc 高度尺寸3Xl
   */
  height3xl: number
}

interface BorderRadiusTokens {
  /**
   * @desc 边框圆角尺寸Xs
   */
  borderRadiusXs: number
  /**
   * @desc 边框圆角尺寸Sm
   */
  borderRadiusSm: number
  /**
   * @desc 边框圆角尺寸Md
   */
  borderRadiusMd: number
  /**
   * @desc 边框圆角尺寸Lg
   */
  borderRadiusLg: number
}

interface ScreenTokens {
  /**
   * @private
   */
  screenXsMax: number
  /**
   * @private
   */
  screenSmMin: number
  /**
   * @private
   */
  screenSmMax: number
  /**
   * @private
   */
  screenMdMin: number
  /**
   * @private
   */
  screenMdMax: number
  /**
   * @private
   */
  screenLgMin: number
  /**
   * @private
   */
  screenLgMax: number
  /**
   * @private
   */
  screenXlMin: number
}

export interface DerivedSizeTokens
  extends PaddingSizeTokens,
    MarginSizeTokens,
    HeightTokens,
    BorderRadiusTokens,
    ScreenTokens {
  /**
   * @desc 粗线框尺寸
   */
  lineWidthBold: number
  /**
   * @desc 箭头尺寸
   */
  arrowSize: number
}
