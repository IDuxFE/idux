export type ElementOf<T> = T extends (infer E)[] ? E : T extends readonly (infer F)[] ? F : never

export const presetColor = [
  'red',
  'orange',
  'brown',
  'yellow',
  'canary',
  'bud',
  'green',
  'turquoise',
  'cyan',
  'glacier',
  'blue',
  'indigo',
  'purple',
  'magenta',
] as const

export type PresetColor = ElementOf<typeof presetColor>

export const isPresetColor = (color: string | undefined): boolean => {
  return presetColor.includes(color as PresetColor)
}

export const statusColor = ['primary', 'info', 'pending', 'success', 'warning', 'error'] as const

export type StatusColor = ElementOf<typeof statusColor>

export const isStatusColor = (color: string | undefined): boolean => {
  return statusColor.includes(color as StatusColor)
}
