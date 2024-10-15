/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ColorPickerProps } from '../types'

import { type ComputedRef, toRaw } from 'vue'

import { type FormAccessor, ValidateStatus, useAccessorAndControl } from '@idux/cdk/forms'
import { callEmit, useState } from '@idux/cdk/utils'
import { type FormSize, useFormItemRegister, useFormSize, useFormStatus } from '@idux/components/form'

export interface PickerStateContext {
  accessor: FormAccessor<string>
  mergedSize: ComputedRef<FormSize>
  mergedStatus: ComputedRef<ValidateStatus | undefined>
  focused: ComputedRef<boolean>
  handleChange: (value: string) => void
  handleFocus: (evt: FocusEvent) => void
  handleBlur: (evt: FocusEvent) => void
}

export function usePickerState(props: ColorPickerProps, config: { size: FormSize }): PickerStateContext {
  const { accessor, control } = useAccessorAndControl<string>()

  useFormItemRegister(control)

  const mergedSize = useFormSize(props, config)
  const mergedStatus = useFormStatus(props, control)
  const [focused, setFocused] = useState(false)

  const handleChange = (value: string) => {
    const oldValue = toRaw(accessor.value)

    accessor.setValue(value)
    callEmit(props.onChange, value, oldValue)
  }

  const handleFocus = (evt: FocusEvent) => {
    setFocused(true)
    callEmit(props.onFocus, evt)
  }

  const handleBlur = (evt: FocusEvent) => {
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
    handleFocus,
    handleBlur,
  }
}
