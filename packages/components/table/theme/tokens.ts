/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

export interface TableThemeTokens {
  /**
   * @desc sm 尺寸下表格字体大小
   */
  fontSizeSm: number
  /**
   * @desc md 尺寸下表格字体大小
   */
  fontSizeMd: number
  /**
   * @desc lg 尺寸下表格字体大小
   */
  fontSizeLg: number

  /**
   * @desc sm 尺寸下表格表头高度
   */
  headRowHeightSm: number
  /**
   * @desc md 尺寸下表格表头高度
   */
  headRowHeightMd: number
  /**
   * @desc lg 尺寸下表格表头高度
   */
  headRowHeightLg: number

  /**
   * @desc sm 尺寸下表格单元格水平内边距
   */
  cellPaddingHorizontalSm: number
  /**
   * @desc md 尺寸下表格单元格水平内边距
   */
  cellPaddingHorizontalMd: number
  /**
   * @desc lg 尺寸下表格单元格水平内边距
   */
  cellPaddingHorizontalLg: number

  /**
   * @desc sm 尺寸下表格单元格垂直内边距
   */
  cellPaddingVerticalSm: number
  /**
   * @desc sm 尺寸下表格单元格垂直内边距
   */
  cellPaddingVerticalMd: number
  /**
   * @desc sm 尺寸下表格单元格垂直内边距
   */
  cellPaddingVerticalLg: number

  /**
   * @desc 表头字体颜色
   */
  headColor: string
  /**
   * @desc 表头背景颜色
   */
  headBgColor: string
  /**
   * @desc 表头分割线颜色
   */
  headSeparatorColor: string
  /**
   * @desc 表头按钮颜色
   */
  headIconColor: string
  /**
   * @desc 表头按钮激活颜色
   */
  headIconColorActive: string
  /**
   * @desc 表头按钮悬浮颜色
   */
  headIconBgColorHover: string

  /**
   * @desc 位于左侧固定列以及横向滚动条溢出的边缘阴影
   */
  insetShadowStart: string
  /**
   * @desc 位于右侧固定列以及横向滚动条溢出的边缘阴影
   */
  insetShadowEnd: string

  /**
   * @desc 表格内容行悬浮背景颜色
   */
  bodyRowBgColorHover: string
  /**
   * @desc 表格内容行选中背景颜色
   */
  bodyRowBgColorSelected: string
  /**
   * @desc 表格内容行展开背景颜色
   */
  bodyRowBgColorExpanded: string
  /**
   * @desc 树表格内容行展开背景颜色
   */
  bodyRowBgColorTreeExpanded: string

  /**
   * @desc 表格内容单元格垂直方向对齐
   */
  bodyCellVerticalAlign: string

  /**
   * @desc 表格展开收起图标
   */
  expandableIconColor: string
}
