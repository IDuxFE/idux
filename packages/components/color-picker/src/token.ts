/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { SelectedColorContext } from './composables/useSelectedColor'
import type { SelectedFormatContext } from './composables/useSelectedFormat'
import type { ColorPreset } from './types'
import type { ColorPickerLocale } from '@idux/components/locales'
import type { ComputedRef, InjectionKey } from 'vue'

export interface ColorPickerPanelContext extends SelectedColorContext, SelectedFormatContext {
  locale: ColorPickerLocale
  mergedPrefixCls: ComputedRef<string>
  resolvedPresets: ComputedRef<ColorPreset[]>
}
export const colorPickerPanelToken: InjectionKey<ColorPickerPanelContext> = Symbol('colorPickerPanelToken')
