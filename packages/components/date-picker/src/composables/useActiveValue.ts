/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DatePanelProps, DatePickerType, DateRangePanelProps } from '../types'
import type { DateConfig } from '@idux/components/config'

import { type ComputedRef, computed, watch } from 'vue'

import { useControlledProp } from '@idux/cdk/utils'

export interface ActiveValueContext {
  activeValue: ComputedRef<Date>
  setActiveValue: (value: Date) => void
}

export interface RangeActiveValueContext {
  fromActiveValue: ComputedRef<Date>
  toActiveValue: ComputedRef<Date>
  setFromActiveValue: (value: Date) => void
  setToActiveValue: (value: Date) => void
}

export function useActiveValue(dateConfig: DateConfig, mergedProps: ComputedRef<DatePanelProps>): ActiveValueContext {
  const [activeValue, setActiveValue] = useControlledProp(
    mergedProps,
    'activeValue',
    mergedProps.value.value ?? dateConfig.now(),
  )

  watch(
    () => mergedProps.value.value,
    value => setActiveValue(value ?? dateConfig.now()),
  )

  return {
    activeValue,
    setActiveValue,
  }
}

const viewTypeMap: Record<DatePickerType, 'month' | 'year'> = {
  date: 'month',
  datetime: 'month',
  week: 'month',
  month: 'year',
  quarter: 'year',
  year: 'year',
}

export function useRangeActiveValue(
  dateConfig: DateConfig,
  mergedProps: ComputedRef<DateRangePanelProps>,
  panelValue: ComputedRef<(Date | undefined)[] | undefined>,
  isSelecting: ComputedRef<boolean>,
): RangeActiveValueContext {
  const { set, get } = dateConfig
  const now = dateConfig.now()

  const viewType = computed(() => viewTypeMap[mergedProps.value.type!])
  const viewSpan = computed(() => (mergedProps.value.type === 'year' ? 12 : 1))

  const fromPanelValue = computed(() => panelValue.value?.[0])
  const toPanelValue = computed(() => panelValue.value?.[1])

  // check if the panel view value provided by params is valid
  const checkActiveDateValid = (from: Date | undefined, to: Date | undefined) => {
    if (!from || !to) {
      return false
    }

    const fromViewValue = get(from, viewType.value)
    const toViewValue = get(to, viewType.value)

    /* eslint-disable indent */
    return mergedProps.value.type === 'year'
      ? fromViewValue < toViewValue - viewSpan.value
      : (() => {
          const fromViewYearValue = get(from, 'year')
          const toViewYearValue = get(to, 'year')

          if (fromViewYearValue > toViewYearValue) {
            return false
          }

          return fromViewYearValue < toViewYearValue || fromViewValue < toViewValue
        })()
    /* eslint-enable indent */
  }

  // calculate valid active date based on given `from` and `to` active panel view value
  const calcValidActiveDate = (from: Date | undefined, to: Date | undefined, type: 'from' | 'to') => {
    const getViewDate = (value: Date) =>
      set(value, get(value, viewType.value) + (type === 'from' ? -viewSpan.value : viewSpan.value), viewType.value)

    if (!from) {
      return type === 'from' ? now : getViewDate(now)
    }

    if (!to) {
      return type === 'from' ? from : getViewDate(from)
    }

    const valid = checkActiveDateValid(from, to)
    if (type === 'from') {
      return valid ? from : getViewDate(to)
    }

    return valid ? to : getViewDate(from)
  }

  const initActiveDate = () => {
    if (isSelecting.value) {
      return
    }

    const fromValue = panelValue.value?.[0] ?? now
    const toValue = panelValue.value?.[1]

    const valueAlreadyInView = [fromValue, toValue].every(value => {
      if (!value) {
        return true
      }

      const yearValue = get(value, 'year')
      if (viewTypeMap[mergedProps.value.type!] === 'year') {
        return [fromActiveValue, toActiveValue].map(activeDate => get(activeDate.value, 'year')).includes(yearValue)
      }

      const monthValue = get(value, 'month')
      return [fromActiveValue, toActiveValue].some(
        activeDate => yearValue === get(activeDate.value, 'year') && monthValue === get(activeDate.value, 'month'),
      )
    })

    // no need to reset panel view when current range is covered within panel view and panel view is valid
    if (valueAlreadyInView && checkActiveDateValid(fromActiveValue.value, toActiveValue.value)) {
      return
    }

    setActiveValue([fromValue, calcValidActiveDate(fromValue, toValue, 'to')])
  }

  const [activeValue, setActiveValue] = useControlledProp(mergedProps, 'activeValue', [
    fromPanelValue.value ?? now,
    calcValidActiveDate(fromPanelValue.value ?? now, toPanelValue.value, 'to'),
  ])
  const fromActiveValue = computed(() => activeValue.value[0])
  const toActiveValue = computed(() => activeValue.value[1])

  // reset panel active value when value, picker type, or visible state changes
  watch([panelValue, () => mergedProps.value.visible, () => mergedProps.value.type], initActiveDate)

  const handleFromActiveValueUpdate = (value: Date) => {
    setActiveValue([value, calcValidActiveDate(value, toActiveValue.value, 'to')])
  }
  const handleToActiveValueUpdate = (value: Date) => {
    setActiveValue([calcValidActiveDate(fromActiveValue.value, value, 'from'), value])
  }

  return {
    fromActiveValue,
    toActiveValue,
    setFromActiveValue: handleFromActiveValueUpdate,
    setToActiveValue: handleToActiveValueUpdate,
  }
}
