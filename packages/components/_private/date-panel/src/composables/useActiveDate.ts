/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DatePanelProps, DatePanelType } from '../types'
import type { DateConfig } from '@idux/components/config'

import { type ComputedRef, computed } from 'vue'

import { useControlledProp } from '@idux/cdk/utils'

export interface ActiveDateContext {
  activeDate: ComputedRef<Date>
  setActiveDate: (date: Date) => void
  startActiveDate: ComputedRef<Date>
}

export function useActiveDate(
  props: DatePanelProps,
  dateConfig: DateConfig,
  activeType: ComputedRef<DatePanelType>,
): ActiveDateContext {
  const [activeDate, setActiveDate] = useControlledProp(props, 'activeDate', () => dateConfig.now())

  const startActiveDate = computed(() => {
    const currDate = activeDate.value
    const currType = activeType.value
    const { startOf, set, get } = dateConfig

    switch (currType) {
      case 'date':
      case 'week':
        return startOf(startOf(currDate, 'month'), 'week')
      case 'month':
        return startOf(startOf(currDate, 'year'), 'month')
      case 'quarter':
        return startOf(startOf(currDate, 'year'), 'quarter')
      case 'year': {
        return set(currDate, parseInt(`${get(currDate, 'year') / 10}`, 10) * 10 - 1, 'year')
      }
      default:
        return currDate
    }
  })

  return {
    activeDate,
    setActiveDate,
    startActiveDate,
  }
}
