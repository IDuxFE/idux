/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

export interface ControlTokens {
  controlHeightXs: number // 控件尺寸Xs
  controlHeightSm: number // 控件尺寸Sm
  controlHeightMd: number // 控件尺寸Md
  controlHeightLg: number // 控件尺寸Lg

  controlLineWidth: number // 控件的线框宽度
  controlLineType: string // 控件的线框类型

  controlFontSizeXs: number // 控件字体大小Xs
  controlFontSizeSm: number // 控件字体大小Sm
  controlFontSizeMd: number // 控件字体大小Md
  controlFontSizeLg: number // 控件字体大小Lg

  controlBoxShadowFocus: string // 控件聚焦，激活时的阴影
  controlBoxShadowInvalid: string // 控件校验非法时的阴影

  controlBgColor: string // 控件背景颜色
  controlBgColorDisabled: string // 控件禁用颜色
  controlBorderColorHover: string // 控件悬浮边框颜色
  controlBorderColorActive: string // 控件激活态边框颜色

  controlPaddingSizeHorizontalXs: number // 控件横向内间距Xs
  controlPaddingSizeHorizontalSm: number // 控件横向内间距Sm
  controlPaddingSizeHorizontalMd: number // 控件横向内间距Md
  controlPaddingSizeHorizontalLg: number // 控件横向内间距Lg
  controlPaddingSizeVerticalXs: number // 控件竖向内间距Xs
  controlPaddingSizeVerticalSm: number // 控件竖向内间距Sm
  controlPaddingSizeVerticalMd: number // 控件竖向内间距Md
  controlPaddingSizeVerticalLg: number // 控件竖向内间距Lg

  controlBorderRadiusXs: number // 控件边框圆角Xs
  controlBorderRadiusSm: number // 控件边框圆角Sm
  controlBorderRadiusMd: number // 控件边框圆角Md
  controlBorderRadiusLg: number // 控件边框圆角Lg
}
