/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DatePickerType, PresetRangeShortcut, RangeShortcutOptions } from './types'
import type { DateConfig, DateConfigType } from '@idux/components/config'

import { isFunction } from 'lodash-es'

export function convertPickerTypeToConfigType(type: DatePickerType): Exclude<DateConfigType, 'day'> {
  return type === 'datetime' ? 'date' : type
}

const oneDayDuration = 24 * 60 * 60 * 1000

export function getPresetRangeShortcutValue(
  dateConfig: DateConfig,
  presetShortcut: PresetRangeShortcut,
): () => [Date, Date] {
  const { now, startOf, endOf } = dateConfig

  switch (presetShortcut) {
    case 'today':
    default:
      return () => {
        const currentDate = now()
        return [startOf(currentDate, 'date'), endOf(currentDate, 'date')]
      }
    case 'yesterday': {
      return () => {
        const currentDate = now()
        const yesterday = new Date(currentDate.valueOf() - oneDayDuration)
        return [startOf(yesterday, 'date'), endOf(yesterday, 'date')]
      }
    }
    case 'last24h': {
      return () => {
        const currentDate = now()
        const currentHour = endOf(currentDate, 'hour')
        return [new Date(currentHour.valueOf() - oneDayDuration), currentHour]
      }
    }
    case 'last7d': {
      return () => {
        const currentDate = now()
        const endOfToday = endOf(currentDate, 'date')
        return [new Date(endOfToday.valueOf() - oneDayDuration * 7), endOfToday]
      }
    }
    case 'last30d': {
      return () => {
        const currentDate = now()
        const endOfToday = endOf(currentDate, 'date')
        return [new Date(endOfToday.valueOf() - oneDayDuration * 30), endOfToday]
      }
    }
    case 'last180d': {
      return () => {
        const currentDate = now()
        const endOfToday = endOf(currentDate, 'date')
        return [new Date(endOfToday.valueOf() - oneDayDuration * 180), endOfToday]
      }
    }
  }
}

export function extractShortcutValue(shortcut: RangeShortcutOptions): [Date, Date] | undefined {
  const value = shortcut.value

  if (!value) {
    return
  }

  return isFunction(value) ? value() : value
}
