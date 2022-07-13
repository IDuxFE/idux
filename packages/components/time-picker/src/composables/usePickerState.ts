/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, toRaw } from 'vue'

import { isArray } from 'lodash-es'

import { type FormAccessor, useAccessorAndControl } from '@idux/cdk/forms'
import { callEmit, useState } from '@idux/cdk/utils'
import { type DateConfig } from '@idux/components/config'
import { useFormItemRegister } from '@idux/components/form'

import { type TimePickerProps, type TimeRangePickerProps } from '../types'
import { convertToDate, sortRangeValue } from '../utils'

type StateValueType<T extends TimePickerProps | TimeRangePickerProps> = T extends TimePickerProps
  ? Date | undefined
  : (Date | undefined)[] | undefined

export interface PickerStateContext<T extends TimePickerProps | TimeRangePickerProps> {
  accessor: FormAccessor<T['value']>
  isFocused: ComputedRef<boolean>
  handleChange: (value: StateValueType<T>) => void
  handleClear: (evt: MouseEvent) => void
  handleFocus: (evt: FocusEvent) => void
  handleBlur: (evt: FocusEvent) => void
}

export function usePickerState<T extends TimePickerProps | TimeRangePickerProps>(
  props: T,
  dateConfig: DateConfig,
  formatRef: ComputedRef<string>,
): PickerStateContext<T> {
  const { accessor, control } = useAccessorAndControl<T['value']>()
  useFormItemRegister(control)

  const [isFocused, setFocused] = useState(false)

  function handleChange(value: StateValueType<T>) {
    const newValue = (isArray(value) ? sortRangeValue(value) : value) as StateValueType<T>
    let oldValue = toRaw(accessor.value) as StateValueType<T>
    oldValue = (
      isArray(oldValue)
        ? oldValue.map(v => convertToDate(dateConfig, v, formatRef.value))
        : convertToDate(dateConfig, oldValue, formatRef.value)
    ) as StateValueType<T>

    accessor.setValue(newValue)
    callEmit(props.onChange as (value: StateValueType<T>, oldValue: StateValueType<T>) => void, newValue, oldValue)
  }

  function handleClear(evt: MouseEvent) {
    handleChange(undefined)
    callEmit(props.onClear, evt)
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
