/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DatePickerComponent, DateRangePickerComponent } from './src/types'

import DatePicker from './src/DatePicker'
import DateRangePicker from './src/DateRangePicker'

const IxDatePicker = DatePicker as unknown as DatePickerComponent
const IxDateRangePicker = DateRangePicker as unknown as DateRangePickerComponent

export { IxDatePicker, IxDateRangePicker }

export type {
  DatePickerInstance,
  DatePickerComponent,
  DatePickerPublicProps as DatePickerProps,
  DateRangePickerInstance,
  DateRangePickerComponent,
  DateRangePickerPublicProps as DateRangePickerProps,
} from './src/types'
