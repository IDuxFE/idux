import { writeFileSync } from 'fs'
import { resolve } from 'path'

import { getBaseColors, getDarkColorPalette } from '@idux/components/theme/src/themeTokens'

function generateColors(): Record<string, string> {
  const baseColors = getBaseColors()

  const res: Record<string, string> = {}

  Object.entries(baseColors).forEach(([name, color]) => {
    const colorPalette = getDarkColorPalette(color)

    Object.entries(colorPalette).forEach(([level, levelColor]) => {
      res[`@color-${name}-${level}`] = levelColor
    })
  })

  return res
}

function exec() {
  const colors = generateColors()
  const lessContent = Object.entries(colors)
    .map(([key, value]) => `${key}: ${value};`)
    .join('\n')

  writeFileSync(resolve(__dirname, './colors.less'), lessContent)
}

exec()
