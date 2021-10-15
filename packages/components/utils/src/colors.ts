/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

export type ElementOf<T> = T extends (infer E)[] ? E : T extends readonly (infer F)[] ? F : never

export const presetColors = [
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

export type PresetColor = ElementOf<typeof presetColors>

export function isPresetColor(color: string | undefined): boolean {
  return presetColors.includes(color as PresetColor)
}

export const statusColors = ['primary', 'info', 'pending', 'success', 'warning', 'error'] as const

export type StatusColor = ElementOf<typeof statusColors>

export function isStatusColor(color: string | undefined): boolean {
  return statusColors.includes(color as StatusColor)
}
