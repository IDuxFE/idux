/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

export interface HeaderThemeTokens {
  /**
   * @desc sm 尺寸高度
   */
  heightSm: number
  /**
   * @desc md 尺寸高度
   */
  heightMd: number
  /**
   * @desc lg 尺寸高度
   */
  heightLg: number
  /**
   * @desc xl 尺寸高度
   */
  heightXl: number

  /**
   * @desc 竖条宽度
   */
  barWidth: number
  /**
   * @desc 竖条圆角尺寸
   */
  barBorderRadius: number
  /**
   * @desc 竖条距离文字的宽度
   */
  barMarginRight: number
  /**
   * @desc 竖条颜色
   */
  barBgColor: string

  /**
   * @desc 前缀文字颜色
   */
  prefixColor: string
  /**
   * @desc 前缀文字悬浮颜色
   */
  prefixColorHover: string
  /**
   * @desc 前缀文字激活颜色
   */
  prefixColorActive: string
  /**
   * @desc 前缀文字禁用颜色
   */
  prefixColorDisabled: string

  /**
   * @desc 后缀文字颜色
   */
  suffixColor: string
  /**
   * @desc 后缀文字悬浮颜色
   */
  suffixColorHover: string
  /**
   * @desc 后缀文字激活颜色
   */
  suffixColorActive: string
  /**
   * @desc 后缀文字禁用颜色
   */
  suffixColorDisabled: string

  /**
   * @desc 副标题字体大小
   */
  subTitleFontSize: number
}
