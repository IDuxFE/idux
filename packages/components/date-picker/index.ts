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
import DatePanel from './src/panel/Panel'
import DateRangePanel from './src/panel/RangePanel'

const IxDatePicker = DatePicker as unknown as DatePickerComponent
const IxDatePanel = DatePanel as unknown as DatePanelComponent
const IxDateRangePicker = DateRangePicker as unknown as DateRangePickerComponent
const IxDateRangePanel = DateRangePanel as unknown as DateRangePanelComponent

export { IxDatePicker, IxDatePanel, IxDateRangePicker, IxDateRangePanel }

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
} from './src/types'
