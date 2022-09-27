/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TimePanelColumnType } from './types'
import type { DateConfig } from '@idux/components/config'

export function normalizeAmPm(hour: number, is12Hours = false): 'am' | 'pm' | undefined {
  if (!is12Hours) {
    return
  }

  return hour >= 12 ? 'pm' : 'am'
}

export function calculateViewHour(hour: number, is12Hours: boolean): number {
  if (is12Hours) {
    hour > 12 && (hour -= 12)

    // if is12Hours, there is no 0, it should be 12 am or 12 pm
    hour === 0 && (hour = 12)
  }
  return hour
}

export function getHourValue(hour: number, ampm?: 'am' | 'pm' | ''): number {
  if (ampm) {
    ampm = ampm.toLowerCase() as 'am' | 'pm' | ''
    if (ampm === 'am') {
      hour >= 12 && (hour -= 12)
    }
    if (ampm === 'pm') {
      hour < 12 && (hour += 12)
    }
  }

  return hour
}

export function calculateValue(
  dateConfig: DateConfig,
  dateNow: Date,
  type: TimePanelColumnType,
  is12Hours: boolean,
  value: number | 'am' | 'pm' | '',
): Date {
  const { get, set } = dateConfig
  const selectNumber = Number(value)
  const newDate = new Date(dateNow)

  switch (type) {
    case 'hour':
      return set(newDate, getHourValue(selectNumber, normalizeAmPm(get(dateNow, 'hour'), is12Hours)), 'hour')
    case 'minute':
      return set(newDate, selectNumber, 'minute')
    case 'second':
      return set(newDate, selectNumber, 'second')
    case 'AM/PM':
      return set(newDate, getHourValue(get(newDate, 'hour'), value.toString() as 'am' | 'pm' | ''), 'hour')
  }
}
