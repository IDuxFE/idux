/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

export interface ShadowTokens {
  /**
   * @desc 阴影Sm，物体处于低层，hover触发为悬浮状态，如：卡片hover
   */
  boxShadowSm: string
  /**
   * @desc 阴影Md, 物体处于中层，由地面上的元素展开产生，如：下拉面板等
   */
  boxShadowMd: string
  /**
   * @desc 阴影Lg, 物体处于高层，物体和其他层级没有关系，如：对话框、抽屉
   */
  boxShadowLg: string
}
