/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TimeSelectorColumnType } from './types'

/**
 * normalize format string
 *
 * format with a h and without an a or A will be add an a in the back
 */
export function normalizeFormat(format: string): string {
  if (/(?=h)[^aA]*$/.test(format)) {
    return `${format} a`
  }

  return format.replace(/A/g, 'a')
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
    const ampm = normalizeAmPm(newDate.getHours(), is12Hours, false)
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

function generateNumArray(from: number, to: number, min: number, max: number) {
  const _min = Math.min(min, to)
  const _max = Math.max(max, from)

  if (_max < _min) {
    return []
  }

  const genArr = (from: number, to: number) => {
    const arr = []
    for (let i = from; i < to; i++) {
      arr.push(i)
    }

    return arr
  }

  if (from > to) {
    return [...genArr(_min, to), ...genArr(from, _max)]
  }

  return genArr(from, to)
}

export function generateDisabledSeconds(
  selectedValue: Date | undefined,
  disabledAfter: Date | undefined,
  disabledBefore: Date | undefined,
): number[] {
  if (!selectedValue) {
    return []
  }

  const before =
    disabledBefore &&
    disabledBefore.getHours() === selectedValue.getHours() &&
    disabledBefore.getMinutes() === selectedValue.getMinutes()
      ? disabledBefore.getSeconds()
      : 0
  const after =
    disabledAfter &&
    disabledAfter.getHours() === selectedValue.getHours() &&
    disabledAfter.getMinutes() === selectedValue.getMinutes()
      ? disabledAfter.getSeconds() + 1
      : 60

  return generateNumArray(after, before, 0, 60)
}
export function generateDisabledMinutes(
  selectedValue: Date | undefined,
  disabledAfter: Date | undefined,
  disabledBefore: Date | undefined,
): number[] {
  if (!selectedValue) {
    return []
  }

  const before =
    disabledBefore && disabledBefore.getHours() === selectedValue.getHours() ? disabledBefore.getMinutes() : 0
  const after =
    disabledAfter && disabledAfter.getHours() === selectedValue.getHours() ? disabledAfter.getMinutes() + 1 : 60

  return generateNumArray(after, before, 0, 60)
}
export function generateDisabledHours(
  disabledAfter: Date | undefined,
  disabledBefore: Date | undefined,
  is12Hours?: boolean,
): number[] {
  const min = 0
  const max = is12Hours ? 12 : 24
  const before = disabledBefore ? calculateViewHour(disabledBefore.getHours(), !!is12Hours) : min
  const after = disabledAfter ? calculateViewHour(disabledAfter.getHours(), !!is12Hours) + 1 : max

  return generateNumArray(after, before, min, max)
}
