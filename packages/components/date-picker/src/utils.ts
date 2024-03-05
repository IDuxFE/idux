/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DatePickerType } from './types'
import type { DateConfigType } from '@idux/components/config'

export function convertPickerTypeToConfigType(type: DatePickerType): Exclude<DateConfigType, 'day'> {
  return type === 'datetime' ? 'date' : type
}
