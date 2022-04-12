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
