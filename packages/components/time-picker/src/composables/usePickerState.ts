/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, toRaw } from 'vue'

import { isArray } from 'lodash-es'

import { type FormAccessor, type ValidateStatus, useAccessorAndControl } from '@idux/cdk/forms'
import { callEmit, convertArray, useState } from '@idux/cdk/utils'
import { ɵCalculateViewHour, ɵNormalizeAmPm } from '@idux/components/_private/time-panel'
import { type DateConfig } from '@idux/components/config'
import { type FormSize, useFormItemRegister, useFormSize, useFormStatus } from '@idux/components/form'

import { type TimePickerProps, type TimeRangePickerProps } from '../types'
import { checkUse12Hours, convertToDate, sortRangeValue } from '../utils'

type StateValueType<T extends TimePickerProps | TimeRangePickerProps> = T extends TimePickerProps
  ? Date | undefined
  : (Date | undefined)[] | undefined

export interface PickerStateContext<T extends TimePickerProps | TimeRangePickerProps> {
  accessor: FormAccessor<T['value']>
  mergedSize: ComputedRef<FormSize>
  mergedStatus: ComputedRef<ValidateStatus | undefined>
  focused: ComputedRef<boolean>
  handleChange: (value: StateValueType<T>) => void
  handleClear: (evt: MouseEvent) => void
  handleFocus: (evt: FocusEvent) => void
  handleBlur: (evt: FocusEvent) => void
}

export function usePickerState<T extends TimePickerProps | TimeRangePickerProps>(
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

  const checkValueDisabled = (value: StateValueType<T>) => {
    const { get } = dateConfig
    const use12Hours = checkUse12Hours(formatRef.value)

    return convertArray(value).some(v => {
      const _hour = get(v, 'hour')
      const amPm = ɵNormalizeAmPm(_hour, use12Hours)
      const hour = ɵCalculateViewHour(_hour, !!use12Hours)
      const minute = get(v, 'minute')
      const second = get(v, 'second')

      return (
        props.disabledHours(amPm).includes(hour) ||
        props.disabledMinutes(hour, amPm).includes(minute) ||
        props.disabledSeconds(hour, minute, amPm).includes(second)
      )
    })
  }

  function handleChange(value: StateValueType<T>) {
    const newValue = (isArray(value) ? sortRangeValue(value) : value) as StateValueType<T>

    if (checkValueDisabled(newValue)) {
      return
    }

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
    mergedSize,
    mergedStatus,
    focused,
    handleChange,
    handleClear,
    handleFocus,
    handleBlur,
  }
}
