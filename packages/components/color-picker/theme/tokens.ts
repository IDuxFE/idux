/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

export interface ColorPickerThemeTokens {
  /**
   * @desc 面板宽度
   */
  panelWidth: number
  /**
   * @desc 滑动选择条的高度
   */
  sliderHeight: number
  /**
   * @desc 滑动选择条把手的尺寸
   */
  sliderHandleSize: number
  /**
   * @desc 滑动选择条把手的边框宽度
   */
  sliderHandleBorderWidth: number

  /**
   * @desc 滑动选择条把手的边框颜色
   */
  sliderHandleBorderColor: string
  /**
   * @desc 滑动选择条把手的阴影
   */
  sliderHandleBoxShadow: string

  /**
   * @desc 颜色指示器边框圆角
   */
  indicatorBorderRadius: number

  /**
   * @desc 颜色指示器中间选中图标在颜色为亮色时的颜色
   */
  indicatorCheckedIconColorLight: string
  /**
   * @desc 颜色指示器中间选中图标在颜色为暗色时的颜色
   */
  indicatorCheckedIconColorDark: string

  /**
   * @desc 颜色指示器悬浮时的阴影
   */
  indicatorHoverBoxShadow: string
  /**
   * @desc 颜色指示器选中时的阴影
   */
  indicatorCheckedBoxShadow: string

  /**
   * @desc 触发器 sm 尺寸大小
   */
  triggerSizeSm: number
  /**
   * @desc 触发器 md 尺寸大小
   */
  triggerSizeMd: number
  /**
   * @desc 触发器 sm 尺寸大小
   */
  triggerSizeLg: number

  /**
   * @desc 触发器 sm 尺寸字体大小
   */
  triggerFontSizeSm: number
  /**
   * @desc 触发器 md 尺寸字体大小
   */
  triggerFontSizeMd: number
  /**
   * @desc 触发器 lg 尺寸字体大小
   */
  triggerFontSizeLg: number

  /**
   * @desc 透明度网格颜色
   */
  alphaGridColor: string

  /**
   * @desc 透明度网格阴影
   */
  alphaGridBoxShadow: string
}
