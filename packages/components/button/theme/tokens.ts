/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

export interface ButtonThemeTokens {
  fontSizeXs: number
  fontSizeSm: number
  fontSizeMd: number
  fontSizeLg: number
  fontSizeXl: number

  minWidthXs: number | string
  minWidthSm: number | string
  minWidthMd: number | string
  minWidthLg: number | string
  minWidthXl: number | string

  heightXs: number
  heightSm: number
  heightMd: number
  heightLg: number
  heightXl: number

  paddingSizeHorizontalXs: number
  paddingSizeHorizontalSm: number
  paddingSizeHorizontalMd: number
  paddingSizeHorizontalLg: number
  paddingSizeHorizontalXl: number

  color: string
  colorDisabled: string
  bgColor: string
  bgColorDisabled: string
  borderColor: string
  borderRadius: number

  primaryColor: string
  primaryBgColor: string
  primaryBgColorHover: string
  primaryBgColorActive: string

  dangerColor: string
  dangerColorHover: string
  dangerColorActive: string

  dangerBgColor: string
  dangerBgColorHover: string
  dangerBgColorActive: string

  ghostBorderColor: string
  ghostBgColorHover: string
  ghostBgColorActive: string
  ghostBgColorDisabled: string

  iconColor: string
  iconFontSize: number
}
