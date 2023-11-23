/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

export interface BasicTokens {
  //  ----------   color   ---------- //

  /**
   * Brand color
   * 主题色
   */
  colorPrimary: string

  /**
   * Success color
   * 成功信息色
   */
  colorSuccess: string

  /**
   * Warning color
   * 警告信息色
   */
  colorWarning: string

  /**
   * Error color
   * 错误信息色
   */
  colorError: string

  /**
   * Risk color
   * 风险信息色
   */
  colorRisk: string

  /**
   * Fatal color
   * 失陷信息色
   */
  colorFatal: string

  /**
   * Info color
   * 信息颜色
   */
  colorInfo: string

  /**
   * White color
   * 白色
   */
  colorWhite: string

  /**
   * Text color
   * 文字颜色
   */
  colorText: string

  /**
   * Background color base
   * 基础背景颜色
   */
  colorBg: string

  /**
   * Border color
   * 基础边框颜色
   */
  colorBorder: string

  /**
   * Border color secondary
   * 次级边框颜色，比基础边框颜色要浅一阶段， 通常用于表格、卡片等不需要边框特别突出的组件
   */
  colorBorderSecondary: string

  /**
   * Hyperlink color
   * 链接颜色
   */
  colorLink: string

  //  ----------   font   ---------- //

  /**
   * Font size base
   * 基础字体大小
   */
  fontSize: number

  /**
   * Font family
   */
  fontFamily: string

  /**
   * Font family code
   */
  fontFamilyCode: string

  /**
   * Font weight base
   * 基础字体粗度
   */
  fontWeight: number

  //  ----------   size   ---------- //

  /**
   * Border radius base
   * 边框圆角
   */
  borderRadius: number

  /**
   * Height size base
   * 基础高度尺寸
   */
  height: number

  /**
   * Line height gutter
   * 行高gutter，fontSize + gutter = 行高
   */
  lineHeightGutter: number

  /**
   * Spacing base of padding or margin
   * 基础间距
   */
  spacing: number

  /**
   * width of component border or separator
   * 边框，分割线的宽度
   */
  lineWidth: number

  /**
   * type of component border or separator
   * 边框，分割线的线条样式
   */
  lineType: string

  //  ----------   motion   ---------- //

  /**
   * Motion duration base
   * 过渡动画时间
   */
  motionDuration: number

  /**
   * Preset motion curve
   */
  motionEaseIn: string

  /**
   * Preset motion curve
   */
  motionEaseOut: string

  /**
   * Preset motion curve
   */
  motionEaseInOut: string

  /**
   * Preset motion curve
   */
  motionEaseInBack: string

  /**
   * Preset motion curve
   */
  motionEaseOutBack: string

  /**
   * Preset motion curve
   */
  motionEaseInCirc: string

  /**
   * Preset motion curve
   */
  motionEaseOutCirc: string

  /**
   * Preset motion curve
   */
  motionEaseInQuint: string

  /**
   * Preset motion curve
   */
  motionEaseOutQuint: string

  //  ----------   screen   ---------- //

  /**
   * 屏幕尺寸SM
   */
  screenSm: number

  /**
   * 屏幕尺寸MD
   */
  screenMd: number

  /**
   * 屏幕尺寸LG
   */
  screenLg: number

  /**
   * 屏幕尺寸XL
   */
  screenXl: number
}
