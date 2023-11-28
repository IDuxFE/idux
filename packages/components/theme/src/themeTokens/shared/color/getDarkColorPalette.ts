/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { inputToRGB } from '@ctrl/tinycolor'

import { type ColorPalette, type ColorPaletteOptions, type RgbObject, getColorPalette, toHex } from './getColorPalette'

interface DarkColorPaletteOptions extends ColorPaletteOptions {
  bgColor?: string
}

// 暗色主题颜色映射关系表
const darkColorMap = {
  l50: { key: 'd20', opacity: 0.15 },
  l40: { key: 'd10', opacity: 0.25 },
  l30: { key: 'base', opacity: 0.3 },
  l20: { key: 'base', opacity: 0.45 },
  l10: { key: 'base', opacity: 0.65 },
  base: { key: 'base', opacity: 0.85 },
  d10: { key: 'l10', opacity: 0.9 },
  d20: { key: 'l20', opacity: 0.95 },
  d30: { key: 'l30', opacity: 0.97 },
  d40: { key: 'l40', opacity: 0.98 },
  d50: { key: 'l50', opacity: 1 },
} as const

// Wrapper function ported from TinyColor.prototype.mix, not treeshakable.
// Amount in range [0, 1]
// Assume color1 & color2 has no alpha, since the following src code did so.
function mix(rgb1: RgbObject, rgb2: RgbObject, amount: number): RgbObject {
  const p = amount
  const rgb = {
    r: (rgb2.r - rgb1.r) * p + rgb1.r,
    g: (rgb2.g - rgb1.g) * p + rgb1.g,
    b: (rgb2.b - rgb1.b) * p + rgb1.b,
  }
  return rgb
}

const colorPaletteCache = new Map<string, ColorPalette>()

export function getDarkColorPalette(color: string, bgColor?: string, options?: DarkColorPaletteOptions): ColorPalette {
  const lightColorPalette = getColorPalette(color, options)
  const mergedBgColor = bgColor || '#0a0c0f'

  const cacheKey = `${color}-${mergedBgColor}`

  if (colorPaletteCache.has(cacheKey)) {
    return colorPaletteCache.get(cacheKey)!
  }

  const darkColorPalette = {} as ColorPalette

  Object.entries(darkColorMap).forEach(([key, map]) => {
    darkColorPalette[key as keyof ColorPalette] = toHex(
      mix(inputToRGB(mergedBgColor), inputToRGB(lightColorPalette[map.key]), map.opacity),
    )
  })

  colorPaletteCache.set(cacheKey, darkColorPalette)

  return darkColorPalette
}
