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

export function sortRangeValue(values: (Date | undefined)[]): (Date | undefined)[] {
  return values.sort((v1, v2) => {
    if (!v1) {
      return 1
    }

    if (!v2) {
      return 0
    }

    return v1.valueOf() - v2.valueOf()
  })
}

export function checkHourEnabled(format: string): boolean {
  return /[hH]/.test(format)
}
export function checkMinuteEnabled(format: string): boolean {
  return /m/.test(format)
}
export function checkSecondEnabled(format: string): boolean {
  return /s/.test(format)
}
export function checkUse12Hours(format: string): boolean {
  return /[aA]/.test(format)
}
export function checkAmPmCapital(format: string): boolean {
  return /A/.test(format)
}
