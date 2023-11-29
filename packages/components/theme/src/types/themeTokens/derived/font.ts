/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

interface DerivedFontSizeTokens {
  /**
   * @desc 字体大小尺寸Xs
   */
  fontSizeXs: number
  /**
   * @desc 字体大小尺寸Sm
   */
  fontSizeSm: number
  /**
   * @desc 字体大小尺寸Md
   */
  fontSizeMd: number
  /**
   * @desc 字体大小尺寸Lg
   */
  fontSizeLg: number
  /**
   * @desc 字体大小尺寸Xl
   */
  fontSizeXl: number
  /**
   * @desc 字体大小尺寸2Xl
   */
  fontSize2xl: number
  /**
   * @desc 字体大小尺寸3Xl
   */
  fontSize3xl: number

  /**
   * @desc 头部、标题字体大小尺寸Sm
   */
  fontSizeHeaderSm: number
  /**
   * @desc 头部、标题字体大小尺寸Md
   */
  fontSizeHeaderMd: number
  /**
   * @desc 头部、标题字体大小尺寸Lg
   */
  fontSizeHeaderLg: number
  /**
   * @desc 头部、标题字体大小尺寸Xl
   */
  fontSizeHeaderXl: number
}

interface DerivedFontWeightTokens {
  /**
   * @desc 字重Xs
   */
  fontWeightXs: number
  /**
   * @desc 字重Sm
   */
  fontWeightSm: number
  /**
   * @desc 字重Md
   */
  fontWeightMd: number
  /**
   * @desc 字重Lg
   */
  fontWeightLg: number
  /**
   * @desc 字重Xl
   */
  fontWeightXl: number
}

export interface DerivedFontTokens extends DerivedFontSizeTokens, DerivedFontWeightTokens {}
