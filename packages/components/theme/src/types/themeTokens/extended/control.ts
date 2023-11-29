/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

export interface ControlTokens {
  /**
   * @desc 控件尺寸Xs
   */
  controlHeightXs: number
  /**
   * @desc 控件尺寸Sm
   */
  controlHeightSm: number
  /**
   * @desc 控件尺寸Md
   */
  controlHeightMd: number
  /**
   * @desc 控件尺寸Lg
   */
  controlHeightLg: number

  /**
   * @desc 控件的线框宽度
   */
  controlLineWidth: number
  /**
   * @desc 控件的线框类型
   */
  controlLineType: string

  /**
   * @desc 控件字体大小Xs
   */
  controlFontSizeXs: number
  /**
   * @desc 控件字体大小Sm
   */
  controlFontSizeSm: number
  /**
   * @desc 控件字体大小Md
   */
  controlFontSizeMd: number
  /**
   * @desc 控件字体大小Lg
   */
  controlFontSizeLg: number

  /**
   * @desc 控件聚焦，激活时的阴影
   */
  controlBoxShadowFocus: string
  /**
   * @desc 控件校验非法时的阴影
   */
  controlBoxShadowInvalid: string

  /**
   * @desc 控件背景颜色
   */
  controlBgColor: string
  /**
   * @desc 控件禁用颜色
   */
  controlBgColorDisabled: string
  /**
   * @desc 控件悬浮边框颜色
   */
  controlBorderColorHover: string
  /**
   * @desc 控件激活态边框颜色

   */
  controlBorderColorActive: string

  /**
   * @desc 控件横向内间距Xs
   */
  controlPaddingSizeHorizontalXs: number
  /**
   * @desc 控件横向内间距Sm
   */
  controlPaddingSizeHorizontalSm: number
  /**
   * @desc 控件横向内间距Md
   */
  controlPaddingSizeHorizontalMd: number
  /**
   * @desc 控件横向内间距Lg
   */
  controlPaddingSizeHorizontalLg: number
  /**
   * @desc 控件竖向内间距Xs
   */
  controlPaddingSizeVerticalXs: number
  /**
   * @desc 控件竖向内间距Sm
   */
  controlPaddingSizeVerticalSm: number
  /**
   * @desc 控件竖向内间距Md
   */
  controlPaddingSizeVerticalMd: number
  /**
   * @desc 控件竖向内间距Lg
   */
  controlPaddingSizeVerticalLg: number

  /**
   * @desc 控件边框圆角Xs
   */
  controlBorderRadiusXs: number
  /**
   * @desc 控件边框圆角Sm
   */
  controlBorderRadiusSm: number
  /**
   * @desc 控件边框圆角Md
   */
  controlBorderRadiusMd: number
  /**
   * @desc 控件边框圆角Lg
   */
  controlBorderRadiusLg: number
}
