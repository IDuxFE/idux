/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type {
  ColorPickerComponent,
  ColorPickerIndicatorComponent,
  ColorPickerPanelComponent,
  ColorPickerTriggerComponent,
} from './src/types'

import ColorPickerPalette from './src/ColorPalette'
import ColorPicker from './src/ColorPicker'
import ColorPickerPanel from './src/ColorPickerPanel'
import ColorPickerTrigger from './src/ColorPickerTrigger'
import ColorPickerIndicator from './src/Indicator'
import ColorPickerEditor from './src/editor/Editor'
import ColorPickerPresets from './src/presets/Presets'

const IxColorPicker = ColorPicker as unknown as ColorPickerComponent
const IxColorPickerPanel = ColorPickerPanel as unknown as ColorPickerPanelComponent
const IxColorPickerTrigger = ColorPickerTrigger as unknown as ColorPickerTriggerComponent
const IxColorPickerIndicator = ColorPickerIndicator as unknown as ColorPickerIndicatorComponent
const IxColorPickerPalette = ColorPickerPalette
const IxColorPickerEditor = ColorPickerEditor
const IxColorPickerPresets = ColorPickerPresets

export {
  IxColorPicker,
  IxColorPickerPanel,
  IxColorPickerTrigger,
  IxColorPickerIndicator,
  IxColorPickerPalette,
  IxColorPickerEditor,
  IxColorPickerPresets,
}

export type {
  ColorPickerInstance,
  ColorPickerComponent,
  ColorPickerPublicProps as ColorPickerProps,
  ColorPickerPanelInstance,
  ColorPickerPanelComponent,
  ColorPickerPanelPublicProps as ColorPickerPanelProps,
  ColorPickerTriggerInstance,
  ColorPickerTriggerComponent,
  ColorPickerTriggerPublicProps as ColorPickerTriggerProps,
  ColorPickerIndicatorInstance,
  ColorPickerIndicatorComponent,
  ColorPickerIndicatorPublicProps as ColorPickerIndicatorProps,
  ColorFormat,
  ColorType,
  ColorPreset,
} from './src/types'

export { getThemeTokens as getColorPickerThemeTokens } from './theme'
export type { ColorPickerThemeTokens } from './theme'
