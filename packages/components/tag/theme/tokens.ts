/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

export interface TagThemeTokens {
  /**
   * @desc 标签背景颜色
   */
  bgColorFilled: string

  /**
   * @desc 标签边框尺寸
   */
  borderWidth: number
  /**
   * @desc 标签边框圆角尺寸
   */
  borderRadius: number

  /**
   * @desc rect标签最小宽度
   */
  minWidthRect: number
  /**
   * @desc round标签最小宽度
   */
  minWidthRound: number
  /**
   * @desc numeric标签最小宽度
   */
  minWidthNumeric: number

  /**
   * @desc successBgColor
   * @private internal
   */
  successBgColor: string
  /**
   * @desc infoBgColor
   * @private internal
   */
  infoBgColor: string
  /**
   * @desc warningBgColor
   * @private internal
   */
  warningBgColor: string
  /**
   * @desc riskBgColor
   * @private internal
   */
  riskBgColor: string
  /**
   * @desc errorBgColor
   * @private internal
   */
  errorBgColor: string
  /**
   * @desc fatalBgColor
   * @private internal
   */
  fatalBgColor: string
}
