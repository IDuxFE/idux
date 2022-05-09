/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TimePickerProps, TimeRangePickerProps } from '../types'
import type { DateConfig } from '@idux/components/config'

import { type ComputedRef, computed, watch } from 'vue'

import { convertArray, useState } from '@idux/cdk/utils'

import { convertToDate } from '../utils'

export interface ActiveValueContext {
  activeValue: ComputedRef<Date | undefined>
  setActiveValue: (value: Date | undefined) => void
}

export interface RangeActiveValueContext {
  fromActiveValue: ComputedRef<Date | undefined>
  toActiveValue: ComputedRef<Date | undefined>
  setFromActiveValue: (value: Date | undefined) => void
  setToActiveValue: (value: Date | undefined) => void
}

export function useActiveValue(
  props: TimePickerProps,
  dateConfig: DateConfig,
  formatRef: ComputedRef<string>,
  valueRef: ComputedRef<Date | undefined>,
): ActiveValueContext {
  const defaultOpenValue = computed(() => convertToDate(dateConfig, props.defaultOpenValue, formatRef.value))
  const [activeValue, setActiveValue] = useState(() => valueRef.value ?? defaultOpenValue.value)

  watch(valueRef, value => {
    setActiveValue(value ?? defaultOpenValue.value)
  })

  return {
    activeValue,
    setActiveValue,
  }
}

export function useRangeActiveValue(
  props: TimeRangePickerProps,
  dateConfig: DateConfig,
  formatRef: ComputedRef<string>,
  valuesRef: ComputedRef<(Date | undefined)[] | undefined>,
): RangeActiveValueContext {
  const defaultOpenValue = computed(() =>
    convertArray(props.defaultOpenValue).map(value => convertToDate(dateConfig, value, formatRef.value)),
  )
  const [fromActiveValue, setFromActiveValue] = useState(() => valuesRef.value?.[0] ?? defaultOpenValue.value[0])
  const [toActiveValue, setToActiveValue] = useState(() => valuesRef.value?.[1] ?? defaultOpenValue.value[1])

  watch(valuesRef, values => {
    setFromActiveValue(values?.[0] ?? defaultOpenValue.value[0])
    setToActiveValue(values?.[1] ?? defaultOpenValue.value[1])
  })

  return {
    fromActiveValue,
    toActiveValue,
    setFromActiveValue,
    setToActiveValue,
  }
}
