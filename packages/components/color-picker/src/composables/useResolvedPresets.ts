/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ColorPickerPanelProps, ColorPreset } from '../types'

import { type ComputedRef, computed } from 'vue'

import { Color } from '../utils'

export function useResolvedPresets(props: ColorPickerPanelProps): ComputedRef<ColorPreset[]> {
  const resolvedPresets = computed(() => {
    return (
      props.presets?.map<ColorPreset>(preset => {
        return {
          key: preset.key,
          label: preset.label,
          colors: preset.colors
            .map(color => {
              if (!color) {
                return 'rgba(0,0,0,0)'
              }

              const colorObj = new Color(color)

              if (!colorObj.isValid()) {
                return false
              }

              return color
            })
            .filter(Boolean) as string[],
          defaultOpen: preset.defaultOpen,
        }
      }) ?? []
    )
  })

  return resolvedPresets
}
