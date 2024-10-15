/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

export type ColorFormat = 'hex' | 'hsb' | 'rgb'

export type HexColor = string
export type HsbColor = {
  h: number
  s: number
  b: number
}

export type HsbaColor = HsbColor & { a: number }

export type RgbColor = {
  r: number
  g: number
  b: number
}

export type RgbaColor = RgbColor & { a: number }

export type ColorType = HexColor | HsbColor | RgbColor | HsbaColor | RgbaColor
