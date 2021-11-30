/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { InjectionKey, inject } from 'vue'

import { isNil, isString } from 'lodash-es'

import {
  addDays,
  addMonths,
  addYears,
  endOfDay,
  endOfMonth,
  endOfQuarter,
  endOfWeek,
  endOfYear,
  format as formatDate,
  getDate,
  getDay,
  getHours,
  getMinutes,
  getMonth,
  getQuarter,
  getSeconds,
  getWeek,
  getYear,
  isSameDay,
  isSameHour,
  isSameMinute,
  isSameMonth,
  isSameQuarter,
  isSameSecond,
  isSameWeek,
  isSameYear,
  isValid,
  parse as parseDate,
  setDate,
  setDay,
  setHours,
  setMinutes,
  setMonth,
  setQuarter,
  setSeconds,
  setWeek,
  setYear,
  startOfDay,
  startOfMonth,
  startOfQuarter,
  startOfWeek,
  startOfYear,
  toDate,
} from 'date-fns'

import { getLocale } from '@idux/components/i18n'

export type TimeConfigType = 'hour' | 'minute' | 'second'
export type DateConfigType = 'year' | 'quarter' | 'month' | 'week' | 'date' | 'day'

export type DateConfig<P = number | Date, R = Date> = {
  now: () => R
  weekStartsOn: () => number

  get: (date: P, type: DateConfigType | TimeConfigType) => number
  set: (date: P, amount: number, type: DateConfigType | TimeConfigType) => R
  add: (date: P, amount: number, type: 'year' | 'quarter' | 'month' | 'date' | 'day') => R
  startOf: (date: P, type: DateConfigType) => R
  endOf: (date: P, type: DateConfigType) => R
  isSame: (date: P, dateToCompare: P, type: DateConfigType | TimeConfigType) => boolean
  isValid: (date: unknown) => boolean

  format: (date: P, format: string) => string
  parse: (dateString: string, format: string) => R
  covert: (date: unknown, format?: string) => R

  getLocalizedLabels: (
    type: 'month' | 'day' | 'dayPeriod',
    maxIndex: number,
    width: 'narrow' | 'abbreviated' | 'wide',
  ) => string[]
}

export const DATE_CONFIG_TOKEN: InjectionKey<DateConfig> = Symbol('DATE_CONFIG_TOKEN')

let defaultDateConfig: DateConfig<number | Date, Date> | undefined

export function useDateConfig(): DateConfig<number | Date, Date> {
  const config = inject(DATE_CONFIG_TOKEN, null)
  if (config) {
    return config
  }
  if (!defaultDateConfig) {
    defaultDateConfig = createDefaultDateConfig()
  }
  return defaultDateConfig
}

function createDefaultDateConfig(): DateConfig<number | Date, Date> {
  const locale = getLocale('date')
  const now = () => new Date()
  return {
    now,
    weekStartsOn: () => locale.value.options?.weekStartsOn || 1,
    get: (date, type) => {
      switch (type) {
        case 'year':
          return getYear(date)
        case 'quarter':
          return getQuarter(date)
        case 'month':
          return getMonth(date)
        case 'week':
          return getWeek(date, { locale: locale.value })
        case 'date':
          return getDate(date)
        case 'day':
          return getDay(date)
        case 'hour':
          return getHours(date)
        case 'minute':
          return getMinutes(date)
        case 'second':
          return getSeconds(date)
      }
    },
    set: (date, amount, type) => {
      switch (type) {
        case 'year':
          return setYear(date, amount)
        case 'quarter':
          return setQuarter(date, amount)
        case 'month':
          return setMonth(date, amount)
        case 'week':
          return setWeek(date, amount, { locale: locale.value })
        case 'date':
          return setDate(date, amount)
        case 'day':
          return setDay(date, amount, { locale: locale.value })
        case 'hour':
          return setHours(date, amount)
        case 'minute':
          return setMinutes(date, amount)
        case 'second':
          return setSeconds(date, amount)
      }
    },
    add: (date, amount, type) => {
      switch (type) {
        case 'year':
          return addYears(date, amount)
        case 'quarter':
          return addMonths(date, amount * 3)
        case 'month':
          return addMonths(date, amount)
        case 'date':
        case 'day':
          return addDays(date, amount)
      }
    },
    startOf: (date, type) => {
      switch (type) {
        case 'year':
          return startOfYear(date)
        case 'quarter':
          return startOfQuarter(date)
        case 'month':
          return startOfMonth(date)
        case 'week':
          return startOfWeek(date, { locale: locale.value })
        case 'date':
        case 'day':
          return startOfDay(date)
      }
    },
    endOf: (date, type) => {
      switch (type) {
        case 'year':
          return endOfYear(date)
        case 'quarter':
          return endOfQuarter(date)
        case 'month':
          return endOfMonth(date)
        case 'week':
          return endOfWeek(date, { locale: locale.value })
        case 'date':
        case 'day':
          return endOfDay(date)
      }
    },

    isSame: (date, dateToCompare, type) => {
      switch (type) {
        case 'year':
          return isSameYear(date, dateToCompare)
        case 'quarter':
          return isSameQuarter(date, dateToCompare)
        case 'month':
          return isSameMonth(date, dateToCompare)
        case 'week':
          return isSameWeek(date, dateToCompare, { locale: locale.value })
        case 'date':
        case 'day':
          return isSameDay(date, dateToCompare)
        case 'hour':
          return isSameHour(date, dateToCompare)
        case 'minute':
          return isSameMinute(date, dateToCompare)
        case 'second':
          return isSameSecond(date, dateToCompare)
      }
    },
    isValid: date => isValid(date),

    format: (date, format) => formatDate(date, format, { locale: locale.value }),
    parse: (dateString, format) => parseDate(dateString, format, now(), { locale: locale.value }),
    covert: (date, format) => {
      if (isNil(date)) {
        return now()
      }
      if (isString(date)) {
        return parseDate(date, format!, now(), { locale: locale.value })
      }
      return toDate(date as number | Date)
    },
    getLocalizedLabels: (type, length, width) => {
      const localize = locale.value.localize!
      switch (type) {
        case 'month':
          return Array.from({ length }).map((_, i) => localize.month(i, { width }))
        case 'day':
          return Array.from({ length }).map((_, i) => localize!.day(i, { width }))
        case 'dayPeriod':
          return Array.from({ length }).map((_, i) => localize!.dayPeriod(i, { width }))
      }
    },
  }
}
