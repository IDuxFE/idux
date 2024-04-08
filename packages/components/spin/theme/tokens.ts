/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

export interface SpinThemeTokens {
  /**
   * @desc 提示文字颜色
   */
  tipColor: string
  /**
   * @desc 图标颜色
   */
  iconColor: string

  /**
   * @desc sm 尺寸下的字体大小
   */
  fontSizeSm: number
  /**
   * @desc md 尺寸下的字体大小
   */
  fontSizeMd: number
  /**
   * @desc lg 尺寸下的字体大小
   */
  fontSizeLg: number

  /**
   * @desc sm 尺寸下的图标大小
   */
  iconSizeSm: number
  /**
   * @desc md 尺寸下的图标大小
   */
  iconSizeMd: number
  /**
   * @desc lg 尺寸下的图标大小
   */
  iconSizeLg: number

  /**
   * @desc loading背景圆环stroke
   */
  bgCircleStroke: string
  /**
   * @desc loading第一个拱形stroke
   */
  fstArchStroke: string
  /**
   * @desc loading第二个拱形stroke
   */
  sndArchStroke: string

  /**
   * @desc loading 的遮罩背景颜色
   */
  maskBgColor: string
}
