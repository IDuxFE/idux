/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DatePanelType } from '../types'
import type { DateConfig } from '@idux/components/config'
import type { ComputedRef } from 'vue'

import { computed } from 'vue'

export interface MaxIndexContext {
  maxRowIndex: ComputedRef<number>
  maxCellIndex: ComputedRef<number>
}

export function useMaxIndex(
  activeType: ComputedRef<DatePanelType>,
  dateConfig: DateConfig,
  activeDate: ComputedRef<Date>,
): MaxIndexContext {
  const maxRowIndex = computed(() => {
    const currType = activeType.value
    const { weekStartsOn, get, startOf, endOf } = dateConfig
    switch (currType) {
      case 'date':
      case 'week': {
        const currDate = activeDate.value
        const weekStarts = weekStartsOn()
        let startDay = get(startOf(currDate, 'month'), 'day')
        if (startDay > weekStarts) {
          startDay = startDay - weekStarts
        } else if (startDay < weekStarts) {
          startDay = startDay - weekStarts + 7
        } else {
          startDay = 0
        }
        const endDate = get(endOf(currDate, 'month'), 'date')
        // 起始天数 + 当月总天数 > 5 * 7, 那么就多显示一周
        return startDay + endDate > 35 ? 6 : 5
      }
      case 'month':
        return 4
      case 'quarter':
        return 1
      case 'year':
        return 4
      default:
        return 0
    }
  })

  const maxCellIndex = computed(() => {
    const currType = activeType.value
    switch (currType) {
      case 'date':
      case 'week':
        return 7
      case 'month':
        return 3
      case 'quarter':
        return 4
      case 'year':
        return 3
      default:
        return 0
    }
  })

  return {
    maxRowIndex,
    maxCellIndex,
  }
}
