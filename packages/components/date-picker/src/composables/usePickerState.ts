/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DatePickerProps, DateRangePickerProps } from '../types'
import type { ValueAccessor } from '@idux/cdk/forms'
import type { DateConfig } from '@idux/components/config'

import { type ComputedRef, toRaw } from 'vue'

import { isArray } from 'lodash-es'

import { callEmit, useState } from '@idux/cdk/utils'
import { useFormAccessor } from '@idux/components/form'

import { convertToDate, sortRangeValue } from '../utils'

type StateValueType<T extends DatePickerProps | DateRangePickerProps> = T extends DatePickerProps
  ? Date | undefined
  : (Date | undefined)[] | undefined

export interface PickerStateContext<T extends DatePickerProps | DateRangePickerProps> {
  accessor: ValueAccessor<T['value']>
  isFocused: ComputedRef<boolean>
  handleChange: (value: StateValueType<T>) => void
  handleClear: (evt: Event) => void
  handleFocus: (evt: FocusEvent) => void
  handleBlur: (evt: FocusEvent) => void
}

export function usePickerState<T extends DatePickerProps | DateRangePickerProps>(
  props: T,
  dateConfig: DateConfig,
  formatRef: ComputedRef<string>,
): PickerStateContext<T> {
  const accessor = useFormAccessor<T['value']>()

  const [isFocused, setFocused] = useState(false)

  function handleChange(value: StateValueType<T>) {
    const newValue = (isArray(value) ? sortRangeValue(dateConfig, value) : value) as StateValueType<T>
    let oldValue = toRaw(accessor.valueRef.value) as StateValueType<T>
    oldValue = (
      isArray(oldValue)
        ? oldValue.map(v => convertToDate(dateConfig, v, formatRef.value))
        : convertToDate(dateConfig, oldValue, formatRef.value)
    ) as StateValueType<T>
    accessor.setValue(value)
    callEmit(props.onChange as (value: StateValueType<T>, oldValue: StateValueType<T>) => void, newValue, oldValue)
  }

  function handleClear(evt: Event) {
    let oldValue = toRaw(accessor.valueRef.value) as StateValueType<T>
    oldValue = (
      isArray(oldValue)
        ? oldValue.map(v => convertToDate(dateConfig, v, formatRef.value))
        : convertToDate(dateConfig, oldValue, formatRef.value)
    ) as StateValueType<T>

    accessor.setValue(undefined)
    callEmit(props.onClear, evt as MouseEvent)
    callEmit(props.onChange as (value: StateValueType<T>, oldValue: StateValueType<T>) => void, undefined, oldValue)
  }

  function handleFocus(evt: FocusEvent) {
    callEmit(props.onFocus, evt)
    setFocused(true)
  }

  function handleBlur(evt: FocusEvent) {
    accessor.markAsBlurred()
    callEmit(props.onBlur, evt)
    setFocused(false)
  }

  return {
    accessor,
    isFocused,
    handleChange,
    handleClear,
    handleFocus,
    handleBlur,
  }
}
