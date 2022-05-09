/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DateConfig, DateConfigType, TimeConfigType } from '@idux/components/config'

import { convertArray } from '@idux/cdk/utils'

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
  const typesArray = convertArray(types)

  return typesArray.reduce((date, type) => dateConfig.set(date, dateConfig.get(sourceDate, type), type), targetDate)
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
