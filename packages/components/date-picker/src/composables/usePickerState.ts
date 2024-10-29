/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed, toRaw } from 'vue'

import { isArray } from 'lodash-es'

import { type FormAccessor, ValidateStatus, useAccessorAndControl } from '@idux/cdk/forms'
import { callEmit, convertArray, useState } from '@idux/cdk/utils'
import { type DateConfig } from '@idux/components/config'
import { FormSize, useFormItemRegister, useFormSize, useFormStatus } from '@idux/components/form'
import { convertToDate, sortRangeValue } from '@idux/components/utils'

import { type DatePickerProps, type DateRangePickerProps } from '../types'

type StateValueType<T extends DatePickerProps | DateRangePickerProps> = T extends DatePickerProps
  ? Date | undefined
  : (Date | undefined)[] | undefined

export interface PickerStateContext<T extends DatePickerProps | DateRangePickerProps> {
  accessor: FormAccessor<T['value']>
  convertedValue: ComputedRef<StateValueType<T>>
  mergedSize: ComputedRef<FormSize>
  mergedStatus: ComputedRef<ValidateStatus | undefined>
  focused: ComputedRef<boolean>
  handleChange: (value: StateValueType<T>) => void
  handleClear: (evt: MouseEvent) => void
  handleFocus: (evt: FocusEvent) => void
  handleBlur: (evt: FocusEvent) => void
}

export function usePickerState<T extends DatePickerProps | DateRangePickerProps>(
  props: T,
  config: { size: FormSize },
  dateConfig: DateConfig,
  formatRef: ComputedRef<string>,
): PickerStateContext<T> {
  const { accessor, control } = useAccessorAndControl<T['value']>()
  useFormItemRegister(control)
  const mergedSize = useFormSize(props, config)
  const mergedStatus = useFormStatus(props, control)
  const [focused, setFocused] = useState(false)

  const convertedValue = computed(() => {
    if (isArray(accessor.value)) {
      return accessor.value.map(v => convertToDate(dateConfig, v, formatRef.value)) as StateValueType<T>
    }

    return convertToDate(dateConfig, accessor.value, formatRef.value) as StateValueType<T>
  })

  function handleChange(value: StateValueType<T>) {
    const newValue = (isArray(value) ? sortRangeValue(dateConfig, value) : value) as StateValueType<T>

    if (convertArray(newValue).some(v => props.disabledDate?.(v))) {
      return
    }

    const oldValue = toRaw(convertedValue.value)
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
    convertedValue,
    mergedSize,
    mergedStatus,
    focused,
    handleChange,
    handleClear,
    handleFocus,
    handleBlur,
  }
}
