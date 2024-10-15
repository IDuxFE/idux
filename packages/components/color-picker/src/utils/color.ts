/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ColorFormat, ColorType, HsbColor, HsbaColor, RgbaColor } from '../types'
import type { ColorInput, HSVA, Numberify } from '@ctrl/tinycolor'

import { TinyColor } from '@ctrl/tinycolor'

const regexHex = /(^#[\da-f]{6}$)|(^#[\da-f]{8}$)/i
export const isHexString = (hex: string): boolean => regexHex.test(hex)

const isHsbColor = (color: unknown): color is HsbColor => {
  return Boolean(color && typeof color === 'object' && 'h' in color && 'b' in color)
}

export const isBrightColor = (value: ColorType | undefined, bgColorToken: string): boolean => {
  const color = new Color(value)
  const { r, g, b, a } = color.toRgb()

  const hsv = color.onBackground(bgColorToken).toHsv()
  if (a <= 0.5) {
    // Adapted to dark mode
    return hsv.v > 0.5
  }
  return r * 0.299 + g * 0.587 + b * 0.114 > 192
}

const convertHsb2Hsv = (color: TinyColor | ColorType | string | number): ColorInput => {
  if (isHsbColor(color)) {
    const { b, ...resets } = color as HsbColor
    return {
      ...resets,
      v: b,
    }
  }
  if (typeof color === 'string' && /hsb/.test(color)) {
    return color.replace(/hsb/, 'hsv')
  }

  return color as ColorInput
}

const getRoundNumber = (value: number): number => Math.round(Number(value || 0))

export const toHexFormat = (value?: string, alpha?: boolean): string =>
  value?.replace(/[^\w/]/gi, '').slice(0, alpha ? 8 : 6) || ''

export const getHex = (value?: string, alpha?: boolean): string => (value ? toHexFormat(value, alpha) : '')

export const getTargetFormatColorStr = (color: Color, colorFormat: ColorFormat): string => {
  switch (colorFormat) {
    case 'hsb':
      return color.toHsbString()
    case 'rgb':
      return color.toRgbString()
    case 'hex':
    default:
      return color.toHexString()
  }
}

export class Color {
  private metaColor: TinyColor

  constructor(color: TinyColor | ColorType | string | number | undefined) {
    this.metaColor = new TinyColor(convertHsb2Hsv(color ?? ''))
  }

  isValid(): boolean {
    return this.metaColor.isValid
  }

  equals(color: ColorType): boolean {
    return this.metaColor.equals(convertHsb2Hsv(color))
  }

  toHsb(): HsbaColor {
    let hsv = this.metaColor.toHsv()
    if (typeof this.metaColor.originalInput === 'object' && this.metaColor.originalInput) {
      if ('h' in this.metaColor.originalInput) {
        hsv = this.metaColor.originalInput as Numberify<HSVA>
      }
    }

    const { v, a, ...resets } = hsv
    return {
      ...resets,
      a: a,
      b: hsv.v,
    }
  }

  toHsbString(): string {
    const hsb = this.toHsb()
    const saturation = getRoundNumber(hsb.s * 100)
    const lightness = getRoundNumber(hsb.b * 100)
    const hue = getRoundNumber(hsb.h)
    const a = hsb.a

    const hsbString = `hsb(${hue}, ${saturation}%, ${lightness}%)`
    const hsbaString = `hsba(${hue}, ${saturation}%, ${lightness}%, ${a.toFixed(a === 0 ? 0 : 2)})`
    return a === 1 ? hsbString : hsbaString
  }

  toHsv(): Numberify<HSVA> {
    return this.metaColor.toHsv()
  }

  toHex(alpha = true): string {
    return getHex(this.metaColor.toHexString(), alpha ? this.metaColor.getAlpha() < 1 : false)
  }

  toHexString(): string {
    return this.metaColor.getAlpha() === 1 ? this.metaColor.toHexString() : this.metaColor.toHex8String()
  }

  toRgb(): RgbaColor {
    return this.metaColor.toRgb()
  }

  toRgbString(): string {
    return this.metaColor.toRgbString()
  }

  getAlpha(): number {
    return this.metaColor.getAlpha()
  }

  setAlpha(alpha: number): void {
    const hsbVal = this.toHsb()
    hsbVal.a = alpha

    this.metaColor = new TinyColor(convertHsb2Hsv(hsbVal))

    this.metaColor
  }

  setHue(hue: number): void {
    const hsbVal = this.toHsb()
    hsbVal.h = hue

    this.metaColor = new TinyColor(convertHsb2Hsv(hsbVal))

    this.metaColor
  }

  setSaturation(saturation: number): void {
    const hsbVal = this.toHsb()
    hsbVal.s = saturation

    this.metaColor = new TinyColor(convertHsb2Hsv(hsbVal))

    this.metaColor
  }

  onBackground(bgColor: string): Color {
    return new Color(this.metaColor.onBackground(bgColor))
  }
}
