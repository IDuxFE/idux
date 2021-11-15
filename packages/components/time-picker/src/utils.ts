/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TimePickerPanelColumnType } from './types'
import type { Dayjs } from 'dayjs/esm'

import dayjs from 'dayjs/esm'
import customParseFormat from 'dayjs/esm/plugin/customParseFormat'

dayjs.extend(customParseFormat)

/**
 * normalize format string
 *
 * format with a h and without an a or A will be add an a in the back
 */
export function normalizeFormat(format: string): string {
  if (/(?=h)[^aA]*$/.test(format)) {
    return `${format} a`
  }

  return format
}

export function normalizeAmPm(hour: number, is12Hours = false, capital = false): string {
  if (!is12Hours) {
    return ''
  }
  const str = hour >= 12 ? 'pm' : 'am'
  return capital ? str.toUpperCase() : str
}

export function calculateViewHour(hour: number, is12Hours: boolean): number {
  if (is12Hours) {
    hour > 12 && (hour -= 12)

    // if is12Hours, there is no 0, it should be 12 am or 12 pm
    hour === 0 && (hour = 12)
  }
  return hour
}

export function getHourValue(hour: number, is12Hours: boolean, ampm: string): number {
  if (is12Hours) {
    ampm = ampm.toLowerCase()
    if (ampm === 'am' && hour >= 12) {
      hour -= 12
    }
    if (ampm === 'pm' && hour < 12) {
      hour += 12
    }
  }

  return hour
}

export function calculateValue(
  dateNow: Dayjs,
  type: TimePickerPanelColumnType,
  is12Hours: boolean,
  value: number | string,
): Date {
  const selectNumber = Number(value)

  if (type === 'hour') {
    const ampm = normalizeAmPm(dateNow.hour(), is12Hours, false)
    dateNow = dateNow.hour(getHourValue(selectNumber, is12Hours, ampm))
  } else if (type === 'minute') {
    dateNow = dateNow.minute(selectNumber)
  } else if (type === 'second') {
    dateNow = dateNow.second(selectNumber)
  } else if (type === 'AM/PM') {
    dateNow = dateNow.hour(getHourValue(dateNow.hour(), is12Hours, value.toString()))
  }

  return dateNow.millisecond(0).toDate()
}

export function parseDate(date: Date | undefined): Dayjs
export function parseDate(date: string, format: string, strict?: boolean): Dayjs
export function parseDate(date: string | Date | undefined, format?: string, strict?: boolean): Dayjs {
  return dayjs(date, format, strict)
}

export function formatDate(date: Date, format: string): string {
  return dayjs(date).format(format)
}
