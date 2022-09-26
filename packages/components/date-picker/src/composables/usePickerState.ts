/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, toRaw } from 'vue'

import { isArray } from 'lodash-es'

import { type FormAccessor, useAccessorAndControl } from '@idux/cdk/forms'
import { callEmit, convertArray, useState } from '@idux/cdk/utils'
import { type DateConfig } from '@idux/components/config'
import { useFormItemRegister } from '@idux/components/form'

import { type DatePickerProps, type DateRangePickerProps } from '../types'
import { convertToDate, sortRangeValue } from '../utils'

type StateValueType<T extends DatePickerProps | DateRangePickerProps> = T extends DatePickerProps
  ? Date | undefined
  : (Date | undefined)[] | undefined

export interface PickerStateContext<T extends DatePickerProps | DateRangePickerProps> {
  accessor: FormAccessor<T['value']>
  isFocused: ComputedRef<boolean>
  handleChange: (value: StateValueType<T>) => void
  handleClear: (evt: MouseEvent) => void
  handleFocus: (evt: FocusEvent) => void
  handleBlur: (evt: FocusEvent) => void
}

export function usePickerState<T extends DatePickerProps | DateRangePickerProps>(
  props: T,
  dateConfig: DateConfig,
  formatRef: ComputedRef<string>,
): PickerStateContext<T> {
  const { accessor, control } = useAccessorAndControl<T['value']>()
  useFormItemRegister(control)

  const [isFocused, setFocused] = useState(false)

  function handleChange(value: StateValueType<T>) {
    const newValue = (isArray(value) ? sortRangeValue(dateConfig, value) : value) as StateValueType<T>

    if (convertArray(newValue).some(v => props.disabledDate?.(v))) {
      return
    }

    let oldValue = toRaw(accessor.value) as StateValueType<T>
    oldValue = (
      isArray(oldValue)
        ? oldValue.map(v => convertToDate(dateConfig, v, formatRef.value))
        : convertToDate(dateConfig, oldValue, formatRef.value)
    ) as StateValueType<T>
    accessor.setValue(newValue as T['value'])
    callEmit(props.onChange as (value: StateValueType<T>, oldValue: StateValueType<T>) => void, newValue, oldValue)
  }

  function handleClear(evt: MouseEvent) {
    callEmit(props.onClear, evt)
    handleChange(undefined)
  }

  function handleFocus(evt: FocusEvent) {
    setFocused(true)
    callEmit(props.onFocus, evt)
  }

  function handleBlur(evt: FocusEvent) {
    setFocused(false)
    accessor.markAsBlurred()
    callEmit(props.onBlur, evt)
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
