/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TimePickerComponent, TimeRangePickerComponent } from './src/types'

import TimePicker from './src/TimePicker'
import TimeRangePicker from './src/TimeRangePicker'

const IxTimePicker = TimePicker as unknown as TimePickerComponent
const IxTimeRangePicker = TimeRangePicker as unknown as TimeRangePickerComponent

export { IxTimePicker, IxTimeRangePicker }

export type {
  TimePickerInstance,
  TimePickerComponent,
  TimePickerPublicProps as TimePickerProps,
  TimeRangePickerInstance,
  TimeRangePickerComponent,
  TimeRangePickerPublicProps as TimeRangePickerProps,
} from './src/types'
