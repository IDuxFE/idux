/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { inputToRGB, rgbToHex, rgbToHsv } from '@ctrl/tinycolor'

const defaultHueStep = 2 // 色相阶梯
const defaultSaturationStepLight = 0.16 // 饱和度阶梯，浅色部分
const defaultSaturationStepDark = 0.05 // 饱和度阶梯，深色部分
const defaultBrightnessStepLight = 0.05 // 亮度阶梯，浅色部分
const defaultBrightnessStepDark = 0.15 // 亮度阶梯，深色部分
const lightColorCount = 5 // 浅色数量，主色上
const darkColorCount = 5 // 深色数量，主色下

export interface ColorPalette {
  base: string
  l10: string
  l20: string
  l30: string
  l40: string
  l50: string
  d10: string
  d20: string
  d30: string
  d40: string
  d50: string
}

export interface HsvObject {
  h: number
  s: number
  v: number
}

export interface RgbObject {
  r: number
  g: number
  b: number
}

export interface ColorPaletteOptions {
  hueStep?: number
  brightnessStepLight?: number
  brightnessStepDark?: number
  saturationStepLight?: number
  saturationStepDark?: number
}

// Wrapper function ported from TinyColor.prototype.toHsv
// Keep it here because of `hsv.h * 360`
export function toHsv({ r, g, b }: RgbObject): HsvObject {
  const hsv = rgbToHsv(r, g, b)
  return { h: hsv.h * 360, s: hsv.s, v: hsv.v }
}

// Wrapper function ported from TinyColor.prototype.toHexString
// Keep it here because of the prefix `#`
export function toHex({ r, g, b }: RgbObject): string {
  return `#${rgbToHex(r, g, b, false)}`
}

export function getHue(hsv: HsvObject, i: number, hueStep: number, light?: boolean): number {
  let hue: number
  // 根据色相不同，色相转向不同
  if (Math.round(hsv.h) >= 60 && Math.round(hsv.h) <= 240) {
    hue = light ? Math.round(hsv.h) - hueStep * i : Math.round(hsv.h) + hueStep * i
  } else {
    hue = light ? Math.round(hsv.h) + hueStep * i : Math.round(hsv.h) - hueStep * i
  }
  if (hue < 0) {
    hue += 360
  } else if (hue >= 360) {
    hue -= 360
  }
  return hue
}

export function getSaturation(
  hsv: HsvObject,
  i: number,
  saturationStepLight: number,
  saturationStepDark: number,
  light?: boolean,
): number {
  // grey color don't change saturation
  if (hsv.h === 0 && hsv.s === 0) {
    return hsv.s
  }
  let saturation: number
  if (light) {
    saturation = hsv.s - saturationStepLight * i
  } else if (i === darkColorCount) {
    saturation = hsv.s + saturationStepLight
  } else {
    saturation = hsv.s + saturationStepDark * i
  }
  // 边界值修正
  if (saturation > 1) {
    saturation = 1
  }
  // 第一格的 s 限制在 0.06-0.1 之间
  if (light && i === lightColorCount && saturation > 0.1) {
    saturation = 0.1
  }
  if (saturation < 0.06) {
    saturation = 0.06
  }
  return Number(saturation.toFixed(2))
}

export function getValue(hsv: HsvObject, i: number, brightnessStep: number, light?: boolean): number {
  let value: number
  if (light) {
    value = hsv.v + brightnessStep * i
  } else {
    value = hsv.v - brightnessStep * i
  }
  if (value > 1) {
    value = 1
  }
  return Number(value.toFixed(2))
}

const colorPaletteCache = new Map<string, ColorPalette>()

export function getColorPalette(color: string, options?: ColorPaletteOptions): ColorPalette {
  // const baseColor = getBaseColors()
  const {
    brightnessStepLight = defaultBrightnessStepLight,
    brightnessStepDark = defaultBrightnessStepDark,
    saturationStepLight = defaultSaturationStepLight,
    saturationStepDark = defaultSaturationStepDark,
    hueStep = defaultHueStep,
  } = options ?? {}

  const pColor = inputToRGB(color)
  const hexColor = toHex(pColor)

  if (colorPaletteCache.has(hexColor)) {
    return colorPaletteCache.get(hexColor)!
  }

  const colorPalette = { base: hexColor } as ColorPalette
  for (let i = 1; i <= lightColorCount; i++) {
    const hsv = toHsv(pColor)
    const colorString: string = toHex(
      inputToRGB({
        h: getHue(hsv, i, hueStep, true),
        s: getSaturation(hsv, i, saturationStepLight, saturationStepDark, true),
        v: getValue(hsv, i, brightnessStepLight, true),
      }),
    )
    colorPalette[`l${i}0` as keyof ColorPalette] = colorString
  }

  for (let i = 1; i <= darkColorCount; i++) {
    const hsv = toHsv(pColor)
    const colorString: string = toHex(
      inputToRGB({
        h: getHue(hsv, i, hueStep),
        s: getSaturation(hsv, i, saturationStepLight, saturationStepDark),
        v: getValue(hsv, i, brightnessStepDark),
      }),
    )
    colorPalette[`d${i}0` as keyof ColorPalette] = colorString
  }

  colorPaletteCache.set(hexColor, colorPalette)
  return colorPalette
}
