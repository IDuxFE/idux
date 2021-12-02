/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TimePickerProps, TimeRangePickerProps } from '../types'
import type { FormAccessor } from '@idux/cdk/forms'
import type { ComputedRef } from 'vue'

import { computed } from 'vue'

import { isArray } from 'lodash-es'

import { useValueAccessor } from '@idux/cdk/forms'
import { callEmit } from '@idux/cdk/utils'
import { useFormItemRegister } from '@idux/components/form'

export interface TimePickerCommonBindings<T extends TimePickerProps | TimeRangePickerProps> {
  accessor: FormAccessor<CommonBindingValueType<T>>
  isDisabled: ComputedRef<boolean>
  handleChange: (value: CommonBindingValueType<T>) => void
  handleClear: (evt: Event) => void
}

type TimeValue = Date | undefined
type TimeRangeValue = [TimeValue, TimeValue] | undefined
type CommonBindingValueType<T extends TimePickerProps | TimeRangePickerProps> = T extends TimePickerProps
  ? Date | undefined
  : [Date | undefined, Date | undefined] | undefined

function valueIsRange(value: TimeValue | TimeRangeValue): value is Exclude<TimeRangeValue, undefined> {
  return isArray(value)
}
export function useTimePickerCommonBindings<T extends TimePickerProps | TimeRangePickerProps>(
  props: T,
): TimePickerCommonBindings<T> {
  const { accessor, control } = useValueAccessor<CommonBindingValueType<T>>()
  useFormItemRegister(control)

  const isDisabled = computed(() => accessor.disabled.value)

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

  return {
    accessor,
    isDisabled,
    handleChange,
    handleClear,
  }
}

function getValidDateRangeValue(value: Exclude<TimeRangeValue, undefined>, autoSwap: boolean) {
  const [fromDate, toDate] = value

  if (!fromDate || !toDate || fromDate.valueOf() <= toDate.valueOf()) {
    return value
  }

  return autoSwap ? (value.reverse() as Exclude<TimeRangeValue, undefined>) : value
}
