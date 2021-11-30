/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DatePickerComponent } from './src/types'

import DatePicker from './src/DatePicker'

const IxDatePicker = DatePicker as unknown as DatePickerComponent

export { IxDatePicker }

export type { DatePickerInstance, DatePickerPublicProps as DatePickerProps } from './src/types'
