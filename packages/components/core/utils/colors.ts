import { isUndefined } from '@idux/cdk/utils'

export const PresetColor = [
  'red',
  'orange',
  'gold',
  'yellow',
  'canary',
  'prasinous',
  'verdant',
  'green',
  'cyan',
  'sky',
  'blue',
  'admiral',
  'purple',
  'magenta',
  'lime',
  'grey',
] as const

export const isPresetColor = (color: string | undefined): boolean => {
  return !isUndefined(color) && (PresetColor as readonly string[]).includes(color)
}

export type PresetColorType = ElementOf<typeof PresetColor>
