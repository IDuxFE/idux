/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DatePanelProps, DatePanelType } from '../types'
import type { DateConfig } from '@idux/components/config'
import type { ComputedRef } from 'vue'

import { computed, shallowRef, watch } from 'vue'

export interface ActiveDateContext {
  activeDate: ComputedRef<Date>
  setActiveDate: (date: Date) => void
  startActiveDate: ComputedRef<Date>
}

const monthTypes: DatePanelType[] = ['date', 'week']

export function useActiveDate(
  props: DatePanelProps,
  dateConfig: DateConfig,
  activeType: ComputedRef<DatePanelType>,
): ActiveDateContext {
  const tempDate = shallowRef(props.value ?? dateConfig.now())

  const setActiveDate = (date: Date) => {
    const type = monthTypes.includes(activeType.value) ? 'month' : 'year'
    if (!dateConfig.isSame(date, tempDate.value, type)) {
      tempDate.value = date
    }
  }

  watch(
    () => props.value,
    value => value && setActiveDate(value),
  )

  watch(
    () => props.visible,
    visible => visible && props.value && setActiveDate(props.value),
  )

  const startActiveDate = computed(() => {
    const currDate = tempDate.value
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
    activeDate: computed(() => tempDate.value),
    setActiveDate,
    startActiveDate,
  }
}
