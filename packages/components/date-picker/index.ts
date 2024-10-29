/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type {
  DatePanelComponent,
  DatePickerComponent,
  DateRangePanelComponent,
  DateRangePickerComponent,
} from './src/types'

import DatePicker from './src/DatePicker'
import DateRangePicker from './src/DateRangePicker'
import { useRangeShortcuts } from './src/composables/useRangeShortcuts'
import IxDatePickerOverlayFooter from './src/content/PickerOverlayFooter'
import IxDatePickerOverlayInputs from './src/content/PickerOverlayInputs'
import IxDateRangePickerOverlayFooter from './src/content/RangePickerOverlayFooter'
import IxDateRangePickerOverlayInputs from './src/content/RangePickerOverlayInputs'
import RangeShortcuts from './src/content/RangeShortcuts'
import DatePanel from './src/panel/Panel'
import DateRangePanel from './src/panel/RangePanel'

const IxDatePicker = DatePicker as unknown as DatePickerComponent
const IxDatePanel = DatePanel as unknown as DatePanelComponent
const IxDateRangePicker = DateRangePicker as unknown as DateRangePickerComponent
const IxDateRangePanel = DateRangePanel as unknown as DateRangePanelComponent

export {
  IxDatePicker,
  IxDatePanel,
  IxDateRangePicker,
  IxDateRangePanel,
  IxDatePickerOverlayInputs,
  IxDatePickerOverlayFooter,
  IxDateRangePickerOverlayInputs,
  IxDateRangePickerOverlayFooter,
  useRangeShortcuts as ɵUseRangeShortcuts,
  RangeShortcuts as ɵRangeShortcuts,
}

export type {
  DatePickerInstance,
  DatePickerComponent,
  DatePickerPublicProps as DatePickerProps,
  DatePanelInstance,
  DatePanelComponent,
  DatePanelPublicProps as DatePanelProps,
  DateRangePickerInstance,
  DateRangePickerComponent,
  DateRangePickerPublicProps as DateRangePickerProps,
  DateRangePanelInstance,
  DateRangePanelComponent,
  DateRangePanelPublicProps as DateRangePanelProps,
  DatePickerType,
  PresetRangeShortcut,
  RangeShortcut,
  RangeShortcutOptions,
  RangeShortcutProp,
  RangeShortcutPanelRenderContext,
} from './src/types'

export { getPresetRangeShortcutValue, extractShortcutValue } from './src/utils'

export { getThemeTokens as getDatePickerThemeTokens } from './theme'
export type { DatePickerThemeTokens } from './theme'
