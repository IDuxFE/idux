/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

export interface BasicTokens {
  //  ----------   color   ---------- //

  /**
   * @desc 主题色
   */
  colorPrimary: string

  /**
   * @desc 成功信息色
   */
  colorSuccess: string

  /**
   * @desc 警告信息色
   */
  colorWarning: string

  /**
   * @desc 错误信息色
   */
  colorError: string

  /**
   * @desc 风险信息色
   */
  colorRisk: string

  /**
   * @desc 失陷信息色
   */
  colorFatal: string

  /**
   * @desc 信息颜色
   */
  colorInfo: string

  /**
   * @desc 白色
   */
  colorWhite: string

  /**
   * @desc 文字颜色
   */
  colorText: string

  /**
   * @desc 基础背景颜色
   */
  colorBg: string

  /**
   * @desc 基础边框颜色
   */
  colorBorder: string

  /**
   * @desc 次级边框颜色，比基础边框颜色要浅一阶段， 通常用于表格、卡片等不需要边框特别突出的组件
   */
  colorBorderSecondary: string

  /**
   * @desc 链接颜色
   */
  colorLink: string

  //  ----------   font   ---------- //

  /**
   * @desc 基础字体大小, 默认解析为中号字体，正文字体使用sm
   */
  fontSize: number

  /**
   * @desc Font family
   */
  fontFamily: string

  /**
   * @desc Font family code
   */
  fontFamilyCode: string

  /**
   * @desc 基础字重
   */
  fontWeight: number

  //  ----------   size   ---------- //

  /**
   * @desc 边框圆角
   */
  borderRadius: number

  /**
   * @desc 基础高度尺寸
   */
  height: number

  /**
   * @desc 行高gutter，fontSize + gutter = 行高
   */
  lineHeightGutter: number

  /**
   * @desc 基础间距
   */
  spacing: number

  /**
   * @desc 边框，分割线的宽度
   */
  lineWidth: number

  /**
   * @desc 边框，分割线的线条样式
   */
  lineType: string

  //  ----------   motion   ---------- //

  /**
   * @desc 过渡动画时间
   */
  motionDuration: number

  /**
   * @desc 预设动效曲率
   */
  motionEaseIn: string

  /**
   * @desc 预设动效曲率
   */
  motionEaseOut: string

  /**
   * @desc 预设动效曲率
   */
  motionEaseInOut: string

  /**
   * @desc 预设动效曲率
   */
  motionEaseInBack: string

  /**
   * @desc 预设动效曲率
   */
  motionEaseOutBack: string

  /**
   * @desc 预设动效曲率
   */
  motionEaseInCirc: string

  /**
   * Preset motion curve
   */
  motionEaseOutCirc: string

  /**
   * @desc 预设动效曲率
   */
  motionEaseInQuint: string

  /**
   * @desc 预设动效曲率
   */
  motionEaseOutQuint: string

  //  ----------   screen   ---------- //

  /**
   * @desc 屏幕尺寸Sm
   */
  screenSm: number

  /**
   * @desc 屏幕尺寸Md
   */
  screenMd: number

  /**
   * @desc 屏幕尺寸Lg
   */
  screenLg: number

  /**
   * @desc 屏幕尺寸Xl
   */
  screenXl: number
}
