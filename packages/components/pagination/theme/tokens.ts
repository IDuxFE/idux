/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

export interface PaginationThemeTokens {
  /**
   * @desc sm 尺寸下分页器字体大小
   */
  fontSizeSm: number
  /**
   * @desc md 尺寸下分页器字体大小
   */
  fontSizeMd: number
  /**
   * @desc lg 尺寸下分页器字体大小
   */
  fontSizeLg: number

  /**
   * @desc sm 尺寸下分页器padding
   */
  itmePaddingSm: string | number
  /**
   * @desc md 尺寸下分页器padding
   */
  itemPaddingMd: string | number
  /**
   * @desc lg 尺寸下分页器padding
   */
  itemPaddingLg: string | number

  /**
   * @desc sm 尺寸下分页器内容尺寸（按钮）
   */
  itemContentSizeSm: number
  /**
   * @desc md 尺寸下分页器内容尺寸（按钮）
   */
  itemContentSizeMd: number
  /**
   * @desc lg 尺寸下分页器内容尺寸（按钮）
   */
  itemContentSizeLg: number

  /**
   * @desc 分页项选中时的外边框颜色
   */
  outLineColor: string
}
