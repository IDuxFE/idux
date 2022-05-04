/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TimePickerProps, TimeRangePickerProps } from '../types'
import type { ValueAccessor } from '@idux/cdk/forms'
import type { ComputedRef } from 'vue'

import { computed } from 'vue'

import { isArray } from 'lodash-es'

import { callEmit, useState } from '@idux/cdk/utils'
import { useFormAccessor } from '@idux/components/form'

type TimeValueProp = TimePickerProps['value']
type TimeRangeValueProp = TimeRangePickerProps['value']
type TimeValue = Date | undefined
type TimeRangeValue = [TimeValue, TimeValue] | undefined
type CommonBindingValueType<T extends TimePickerProps | TimeRangePickerProps> = T extends TimePickerProps
  ? TimeValue
  : TimeRangeValue
type AccessorValueType<T extends TimePickerProps | TimeRangePickerProps> = T extends TimePickerProps
  ? TimeValueProp
  : TimeRangeValueProp

export interface TimePickerCommonBindings<T extends TimePickerProps | TimeRangePickerProps> {
  accessor: ValueAccessor<AccessorValueType<T>>
  isDisabled: ComputedRef<boolean>
  isFocused: ComputedRef<boolean>
  handleChange: (value: CommonBindingValueType<T>) => void
  handleClear: (evt: Event) => void
  handleFocus: (evt: FocusEvent) => void
  handleBlur: (evt: FocusEvent) => void
}

function valueIsRange(value: TimeValue | TimeRangeValue): value is Exclude<TimeRangeValue, undefined> {
  return isArray(value)
}
export function useTimePickerCommonBindings<T extends TimePickerProps | TimeRangePickerProps>(
  props: T,
): TimePickerCommonBindings<T> {
  const accessor = useFormAccessor<AccessorValueType<T>>()

  const isDisabled = computed(() => accessor.disabled.value)
  const [isFocused, setFocused] = useState(false)

  function handleChange(value: CommonBindingValueType<T>) {
    let newValue: CommonBindingValueType<T>
    if (valueIsRange(value)) {
      newValue = getValidDateRangeValue(value, props.autoSwap) as CommonBindingValueType<T>
    } else {
      newValue = value
    }

    callEmit(props.onChange as (value: CommonBindingValueType<T>) => void, newValue)
    accessor.setValue(newValue)
  }

  function handleClear(evt: Event) {
    callEmit(props.onClear, evt as MouseEvent)
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
    isDisabled,
    isFocused,
    handleChange,
    handleClear,
    handleFocus,
    handleBlur,
  }
}

function getValidDateRangeValue(value: Exclude<TimeRangeValue, undefined>, autoSwap: boolean) {
  const [fromDate, toDate] = value

  if (!fromDate || !toDate || fromDate.valueOf() <= toDate.valueOf()) {
    return value
  }

  return autoSwap ? (value.reverse() as Exclude<TimeRangeValue, undefined>) : value
}
