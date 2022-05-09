/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DatePickerProps, DatePickerType, DateRangePickerProps } from '../types'
import type { DateConfig } from '@idux/components/config'

import { type ComputedRef, computed, watch } from 'vue'

import { convertArray, useState } from '@idux/cdk/utils'

import { convertToDate, sortRangeValue } from '../utils'

export interface ActiveDateContext {
  activeDate: ComputedRef<Date>
  setActiveDate: (value: Date) => void
}

export interface RangeActiveDateContext {
  fromActiveDate: ComputedRef<Date>
  toActiveDate: ComputedRef<Date>
  setFromActiveDate: (value: Date) => void
  setToActiveDate: (value: Date) => void
}

export function useActiveDate(
  dateConfig: DateConfig,
  props: DatePickerProps,
  valueRef: ComputedRef<Date | undefined>,
  formatRef: ComputedRef<string>,
): ActiveDateContext {
  const defaultOpenValue = computed(
    () => convertToDate(dateConfig, props.defaultOpenValue ?? dateConfig.now(), formatRef.value)!,
  )
  const [activeDate, setActiveDate] = useState(valueRef.value ?? defaultOpenValue.value)

  watch(valueRef, value => setActiveDate(value ?? defaultOpenValue.value))

  return {
    activeDate,
    setActiveDate,
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

export function useRangeActiveDate(
  dateConfig: DateConfig,
  props: DateRangePickerProps,
  valuesRef: ComputedRef<(Date | undefined)[] | undefined>,
  isSelecting: ComputedRef<boolean>,
  overlayOpened: ComputedRef<boolean>,
  formatRef: ComputedRef<string>,
): RangeActiveDateContext {
  const { set, get } = dateConfig
  const now = dateConfig.now()

  const fromPanelValue = computed(() => valuesRef.value?.[0])
  const toPanelValue = computed(() => valuesRef.value?.[1])

  const defaultOpenValue = computed(() => {
    const convertedValues = sortRangeValue(dateConfig, [
      ...convertArray(props.defaultOpenValue).map(v => convertToDate(dateConfig, v, formatRef.value)),
    ])

    return [convertedValues[0] ?? now, convertedValues[1]]
  })

  const calcValidActiveDate = (from: Date | undefined, to: Date | undefined, type: 'from' | 'to') => {
    const viewType = viewTypeMap[props.type]
    const viewSpan = props.type === 'year' ? 12 : 1
    const getViewDate = (value: Date) =>
      set(value, get(value, viewType) + (type === 'from' ? -viewSpan : viewSpan), viewType)

    if (!from) {
      return type === 'from' ? now : getViewDate(now)
    }

    if (!to) {
      return type === 'from' ? from : getViewDate(from)
    }

    const fromViewValue = get(from, viewType)
    const toViewValue = get(to, viewType)

    /* eslint-disable indent */
    const valid =
      props.type === 'year'
        ? fromViewValue < toViewValue - viewSpan
        : (() => {
            const fromViewYearValue = get(from, 'year')
            const toViewYearValue = get(to, 'year')

            return fromViewValue < toViewValue && fromViewYearValue <= toViewYearValue
          })()
    /* eslint-disable indent */

    if (type === 'from') {
      return valid ? from : getViewDate(to)
    }

    return valid ? to : getViewDate(from)
  }

  const initActiveDate = () => {
    if (isSelecting.value) {
      return
    }

    const fromValue = valuesRef.value?.[0] ?? defaultOpenValue.value[0]!
    const toValue = valuesRef.value?.[1] ?? defaultOpenValue.value[1]

    const valueAlreadyInView = [fromValue, toValue].every(value => {
      if (!value) {
        return true
      }

      const yearValue = get(value, 'year')
      if (viewTypeMap[props.type] === 'year') {
        return [fromActiveDate, toActiveDate].map(activeDate => get(activeDate.value, 'year')).includes(yearValue)
      }

      const monthValue = get(value, 'month')
      return [fromActiveDate, toActiveDate].some(
        activeDate => yearValue === get(activeDate.value, 'year') && monthValue === get(activeDate.value, 'month'),
      )
    })
    if (valueAlreadyInView) {
      return
    }

    setFromActiveDate(fromValue)
    setToActiveDate(calcValidActiveDate(fromValue, toValue, 'to'))
  }

  const [fromActiveDate, setFromActiveDate] = useState(fromPanelValue.value ?? defaultOpenValue.value[0]!)
  const [toActiveDate, setToActiveDate] = useState(
    calcValidActiveDate(
      fromPanelValue.value ?? defaultOpenValue.value[0],
      toPanelValue.value ?? defaultOpenValue.value[1],
      'to',
    ),
  )

  watch(valuesRef, initActiveDate)
  watch(overlayOpened, opened => {
    if (!opened) {
      initActiveDate()
    }
  })

  const handleFromActiveDateUpdate = (value: Date) => {
    setFromActiveDate(value)
    setToActiveDate(calcValidActiveDate(value, toActiveDate.value, 'to'))
  }
  const handleToActiveDateUpdate = (value: Date) => {
    setToActiveDate(value)
    setFromActiveDate(calcValidActiveDate(fromActiveDate.value, value, 'from'))
  }

  return {
    fromActiveDate,
    toActiveDate,
    setFromActiveDate: handleFromActiveDateUpdate,
    setToActiveDate: handleToActiveDateUpdate,
  }
}
