/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

export interface TimelineThemeTokens {
  /**
   * @desc 字体大小
   */
  fontSize: number
  /**
   * @desc 时间线圆点尺寸
   */
  dotSize: number
  /**
   * @desc 时间线圆点边框宽度
   */
  dotBorderWidth: number
  /**
   * @desc 内容区标题上边距
   */
  contentLabelMarginTop: number
  /**
   * @desc 线条宽度
   */
  lineWidth: number
  /**
   * @desc 线条背景颜色
   */
  lineBgColor: string

  /**
   * @desc pending状态元素的内容区最小宽度
   */
  pendingItemContentMinWidth: number
  /**
   * @desc 内容区下边距
   */
  contentMarginBottom: number
}
