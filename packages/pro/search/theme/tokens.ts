/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

export interface ProSearchThemeTokens {
  /**
   * @desc sm 尺寸高度
   */
  heightSm: number
  /**
   * @desc md 尺寸高度
   */
  heightMd: number
  /**
   * @desc sm 尺寸padding
   */
  containerPaddingSm: number
  /**
   * @desc md 尺寸padding
   */
  containerPaddingMd: number
  /**
   * @desc sm 尺寸标签间距
   */
  tagGapSm: number
  /**
   * @desc md 尺寸标签间距
   */
  tagGapMd: number
  /**
   * @desc sm 尺寸快捷搜索面板padding
   */
  quickSelectPaddingSm: string | number
  /**
   * @desc md 尺寸快捷搜索面板padding
   */
  quickSelectPaddingMd: string | number

  /**
   * @desc 标签字体颜色
   */
  tagColor: string
  /**
   * @desc 标签背景颜色
   */
  tagBgColor: string
  /**
   * @desc 标签禁用状态字体颜色
   */
  tagColorDisabled: string
  /**
   * @desc 标签禁用状态背景颜色
   */
  tagBgColorDisabled: string

  /**
   * @desc 标签名称字体颜色
   */
  tagNameColor: string

  /**
   * @desc 标签内输入段的水平方向padding
   */
  segmentPaddingHorizontal: number
  /**
   * @desc 标签内输入段的最大宽度
   */
  segmentMaxWidth: number

  /**
   * @desc 搜索按钮字体颜色
   */
  searchBtnColor: string
  /**
   * @desc 搜索按钮悬浮字体颜色
   */
  searchBtnColorHover: string
  /**
   * @desc 搜索按钮禁用字体颜色
   */
  searchBtnColorDisabled: string
  /**
   * @desc 搜索按钮背景颜色
   */
  searchBtnBgColor: string
  /**
   * @desc 搜索按钮悬浮背景颜色
   */
  searchBtnBgColorHover: string
  /**
   * @desc 搜索按钮禁用背景颜色
   */
  searchBtnBgColorDisabled: string

  /**
   * @desc 搜索项名称选择面板的最小宽度
   */
  namePanelMinWidth: number
  /**
   * @desc 操作符选择面板的最小宽度
   */
  operatorPanelMinWidth: number
  /**
   * @desc select搜索项面板的最小宽度
   */
  selectPanelMinWidth: number
  /**
   * @desc treeSelect搜索项面板的最小宽度
   */
  treeSelectPanelMinWidth: number
  /**
   * @desc treeSelect搜索项面板的最大宽度
   */
  treeSelectPanelMaxWidth: number
}
