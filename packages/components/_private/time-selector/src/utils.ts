/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TimeSelectorColumnType } from './types'

export function normalizeAmPm(hour: number, is12Hours = false): string {
  if (!is12Hours) {
    return ''
  }

  return hour >= 12 ? 'pm' : 'am'
}

export function genDateAtTimeZero(): Date {
  const date = new Date()
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)

  return date
}

export function calculateViewHour(hour: number, is12Hours: boolean): number {
  if (is12Hours) {
    hour > 12 && (hour -= 12)

    // if is12Hours, there is no 0, it should be 12 am or 12 pm
    hour === 0 && (hour = 12)
  }
  return hour
}

export function getHourValue(hour: number, ampm?: string): number {
  if (ampm) {
    ampm = ampm.toLowerCase()
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
  dateNow: Date,
  type: TimeSelectorColumnType,
  is12Hours: boolean,
  value: number | string,
): Date {
  const selectNumber = Number(value)
  const newDate = new Date(dateNow)

  if (type === 'hour') {
    const ampm = normalizeAmPm(newDate.getHours(), is12Hours)
    newDate.setHours(getHourValue(selectNumber, ampm))
  } else if (type === 'minute') {
    newDate.setMinutes(selectNumber)
  } else if (type === 'second') {
    newDate.setSeconds(selectNumber)
  } else if (type === 'AM/PM') {
    newDate.setHours(getHourValue(newDate.getHours(), value.toString()))
  }

  newDate.setMilliseconds(0)
  return newDate
}
