/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TimePickerProps } from './types'
import type { DateConfig } from '@idux/components/config'

export function convertToDate(
  dateConfig: DateConfig,
  value: TimePickerProps['value'],
  format: string,
): Date | undefined {
  if (!value) {
    return undefined
  }

  return dateConfig.convert(value, format)
}
