/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

export interface AlertThemeTokens {
  /**
   * @desc 高度
   */
  height: number
  /**
   * @desc 边框圆角
   */
  borderRadius: number

  /**
   * @private internal
   */
  successBgColor: string
  /**
   * @private internal
   */
  infoBgColor: string
  /**
   * @private internal
   */
  warningBgColor: string
  /**
   * @private internal
   */
  errorBgColor: string
  /**
   * @private internal
   */
  offlineBgColor: string
}
