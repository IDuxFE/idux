/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ColorFormat, ColorPickerPanelProps } from '../types'
import type { ColorPickerConfig } from '@idux/components/config'

import { type ComputedRef, computed, toRaw } from 'vue'

import { callEmit, useControlledProp } from '@idux/cdk/utils'

export interface SelectedFormatContext {
  format: ComputedRef<ColorFormat>
  setFormat: (format: ColorFormat) => void
}

export function useSelectedFormat(props: ColorPickerPanelProps, config: ColorPickerConfig): SelectedFormatContext {
  const [format, setFormat] = useControlledProp(props, 'format')

  const mergedFormat = computed(() => format.value ?? config.format)

  const updateFormat = (newFormat: ColorFormat) => {
    const oldFormat = toRaw(mergedFormat.value)

    setFormat(newFormat)
    callEmit(props.onFormatChange, newFormat, oldFormat)
  }

  return {
    format: mergedFormat,
    setFormat: updateFormat,
  }
}
