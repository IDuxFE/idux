/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ColorPickerPanelProps } from '../types'

import { type Ref, computed, inject, provide } from 'vue'

import { useGlobalConfig } from '@idux/components/config'

import { useResolvedPresets } from './useResolvedPresets'
import { useSelectedColor } from './useSelectedColor'
import { useSelectedFormat } from './useSelectedFormat'
import { type ColorPickerPanelContext, colorPickerPanelToken } from '../token'

export function useColorPickerPanelContext(
  props: ColorPickerPanelProps,
  valueRef: Ref<string | undefined>,
  handleChange: (value: string) => void,
): ColorPickerPanelContext {
  let context = inject(colorPickerPanelToken, null)

  if (!context) {
    const common = useGlobalConfig('common')
    const config = useGlobalConfig('colorPicker')
    const locale = useGlobalConfig('locale')

    const selectedFormatContext = useSelectedFormat(props, config)

    const selectedColorContext = useSelectedColor(valueRef, selectedFormatContext.format, handleChange)

    const resolvedPresets = useResolvedPresets(props)

    const mergedPrefixCls = computed(() => `${common.prefixCls}-color-picker`)

    context = {
      mergedPrefixCls,
      locale: locale.colorPicker,
      ...selectedFormatContext,
      ...selectedColorContext,
      resolvedPresets,
    }

    provide(colorPickerPanelToken, context)
  }

  return context
}
