/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TimePickerProps, TimeRangePickerProps } from '../types'
import type { ValueAccessor } from '@idux/cdk/forms'
import type { DateConfig } from '@idux/components/config'

import { type ComputedRef, toRaw } from 'vue'

import { isArray } from 'lodash-es'

import { callEmit, useState } from '@idux/cdk/utils'
import { useFormAccessor } from '@idux/components/form'

import { convertToDate, sortRangeValue } from '../utils'

type StateValueType<T extends TimePickerProps | TimeRangePickerProps> = T extends TimePickerProps
  ? Date | undefined
  : (Date | undefined)[] | undefined

export interface PickerStateContext<T extends TimePickerProps | TimeRangePickerProps> {
  accessor: ValueAccessor<T['value']>
  isFocused: ComputedRef<boolean>
  handleChange: (value: StateValueType<T>) => void
  handleClear: (evt: Event) => void
  handleFocus: (evt: FocusEvent) => void
  handleBlur: (evt: FocusEvent) => void
}

export function usePickerState<T extends TimePickerProps | TimeRangePickerProps>(
  props: T,
  dateConfig: DateConfig,
  formatRef: ComputedRef<string>,
): PickerStateContext<T> {
  const accessor = useFormAccessor<T['value']>()

  const [isFocused, setFocused] = useState(false)

  function handleChange(value: StateValueType<T>) {
    const newValue = (isArray(value) ? sortRangeValue(value) : value) as StateValueType<T>
    let oldValue = toRaw(accessor.valueRef.value) as StateValueType<T>
    oldValue = (
      isArray(oldValue)
        ? oldValue.map(v => convertToDate(dateConfig, v, formatRef.value))
        : convertToDate(dateConfig, oldValue, formatRef.value)
    ) as StateValueType<T>

    callEmit(props.onChange as (value: StateValueType<T>, oldValue: StateValueType<T>) => void, newValue, oldValue)
    accessor.setValue(newValue)
  }

  function handleClear(evt: Event) {
    let oldValue = toRaw(accessor.valueRef.value) as StateValueType<T>
    oldValue = (
      isArray(oldValue)
        ? oldValue.map(v => convertToDate(dateConfig, v, formatRef.value))
        : convertToDate(dateConfig, oldValue, formatRef.value)
    ) as StateValueType<T>

    callEmit(props.onClear, evt as MouseEvent)
    callEmit(props.onChange as (value: StateValueType<T>, oldValue: StateValueType<T>) => void, undefined, oldValue)
    accessor.setValue(undefined)
  }

  function handleFocus(evt: FocusEvent) {
    callEmit(props.onFocus, evt)
    setFocused(true)
  }

  function handleBlur(evt: FocusEvent) {
    callEmit(props.onBlur, evt)
    accessor.markAsBlurred()
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
