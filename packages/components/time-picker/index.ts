/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TimePickerComponent } from './src/types'

import TimePicker from './src/TimePicker'

const IxTimePicker = TimePicker as unknown as TimePickerComponent

export { IxTimePicker }

export type {
  TimePickerInstance,
  TimePickerComponent,
  TimePickerPublicProps as TimePickerProps,
  TimeRangePickerInstance,
  TimeRangePickerPublicProps as TimeRangePickerProps,
} from './src/types'
