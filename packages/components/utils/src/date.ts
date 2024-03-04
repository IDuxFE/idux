/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DateConfig, DateConfigType, TimeConfigType } from '@idux/components/config'

import { convertArray } from '@idux/cdk/utils'

const typeApplySequence: (DateConfigType | TimeConfigType)[] = [
  'year',
  'month',
  'date',
  'hour',
  'minute',
  'second',
  'millisecond',
]

export function convertToDate(
  dateConfig: DateConfig,
  value: string | number | Date | undefined,
  format: string,
): Date | undefined {
  if (!value) {
    return undefined
  }

  return dateConfig.convert(value, format)
}

export function applyDateTime(
  dateConfig: DateConfig,
  sourceDate: Date,
  targetDate: Date,
  types: DateConfigType | TimeConfigType | (DateConfigType | TimeConfigType)[],
): Date {
  const { set, get, endOf } = dateConfig
  const typesArray = convertArray(types)

  return typesArray.reduce((date, type) => {
    const _type = type === 'week' || type === 'day' ? 'date' : type
    const typeIndex = typeApplySequence.indexOf(_type)
    const value = dateConfig.get(sourceDate, _type)

    if (typeIndex <= 0) {
      return dateConfig.set(date, value, _type)
    }

    const maxValue = get(endOf(targetDate, typeApplySequence[typeIndex - 1]), _type)
    return set(date, Math.min(maxValue, value), _type)
  }, targetDate)
}

export function isSameDateTime(
  dateConfig: DateConfig,
  sourceDate: Date,
  targetDate: Date,
  types: DateConfigType | TimeConfigType | (DateConfigType | TimeConfigType)[],
): boolean {
  const typesArray = convertArray(types)

  return typesArray.every(type => dateConfig.get(sourceDate, type) === dateConfig.get(targetDate, type))
}

export function compareDateTime(
  dateConfig: DateConfig,
  v1: Date | undefined,
  v2: Date | undefined,
  type: DateConfigType | 'time' = 'time',
): number {
  if (!v1) {
    return 1
  }

  if (!v2) {
    return 0
  }

  if (type === 'time') {
    return v1.valueOf() - v2.valueOf()
  }

  return dateConfig.startOf(v1, type).valueOf() - dateConfig.startOf(v2, type).valueOf()
}

export function sortRangeValue(
  dateConfig: DateConfig,
  values: (Date | undefined)[],
  type: DateConfigType | 'time' = 'time',
): (Date | undefined)[] {
  return values.sort((v1, v2) => compareDateTime(dateConfig, v1, v2, type))
}

function getTypeForSequenceSearch(type: DateConfigType | TimeConfigType): DateConfigType | TimeConfigType {
  switch (type) {
    case 'week':
      return 'date'
    case 'day':
      return 'date'
    case 'quarter':
      return 'month'
    default:
      return type
  }
}
function applyDateOfPropValue(
  dateConfig: DateConfig,
  value: Date,
  propValue: Date,
  type: DateConfigType | TimeConfigType,
): Date {
  const typeForSequenceSearch = getTypeForSequenceSearch(type)
  const typesToApplay = typeApplySequence.slice(typeApplySequence.indexOf(typeForSequenceSearch) + 1)

  return applyDateTime(dateConfig, propValue, value, typesToApplay)
}

function adjustRangeBoundary(
  dateConfig: DateConfig,
  value: Date | undefined,
  propValue: Date | undefined,
  type: DateConfigType | TimeConfigType,
  isStart: boolean,
): Date | undefined {
  if (!value) {
    return
  }

  if (propValue) {
    return applyDateOfPropValue(dateConfig, value, propValue, type)
  }

  return isStart ? dateConfig.startOf(value, type) : dateConfig.endOf(value, type)
}

export function adjustRangeValue(
  dateConfig: DateConfig,
  values: (Date | undefined)[] | undefined,
  propValues: undefined | (Date | undefined)[],
  type: DateConfigType | TimeConfigType,
): (Date | undefined)[] | undefined {
  if (!values) {
    return
  }

  const [start, end] = values

  return [
    adjustRangeBoundary(dateConfig, start, propValues?.[0], type, true),
    adjustRangeBoundary(dateConfig, end, propValues?.[1], type, false),
  ]
}
