/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { DatePickerProps } from '../types'
import type { FormAccessor } from '@idux/cdk/forms'
import type { DateConfig } from '@idux/components/config'
import type { ComputedRef, Ref } from 'vue'

import { toRaw, watch } from 'vue'

import { callEmit, useState } from '@idux/cdk/utils'

export interface InputStateContext {
  inputValue: Ref<string>
  isFocused: Ref<boolean>
  handleInput: (evt: Event) => void
  handleFocus: (evt: FocusEvent) => void
  handleBlur: (evt: FocusEvent) => void
  handleClear: (evt: MouseEvent) => void
}

export function useInputState(
  props: DatePickerProps,
  dateConfig: DateConfig,
  accessor: FormAccessor,
  formatRef: ComputedRef<string>,
): InputStateContext {
  const initValue = accessor.valueRef.value
  const formatText = formatRef.value
  const initText = initValue
    ? dateConfig.format(dateConfig.covert(accessor.valueRef.value, formatText), formatText)
    : ''
  const [inputValue, setInputValue] = useState(initText)
  const [isFocused, setFocused] = useState(false)

  watch(accessor.valueRef, value => {
    if (!value) {
      setInputValue('')
      return
    }
    const formatText = formatRef.value
    const newValue = dateConfig.format(dateConfig.covert(value, formatText), formatText)
    if (newValue !== inputValue.value) {
      setInputValue(newValue)
    }
  })

  const handleInput = (evt: Event) => {
    callEmit(props.onInput, evt)
    const { value } = evt.target as HTMLInputElement
    if (!value) {
      return
    }
    const formatText = formatRef.value
    const { parse, isValid, format } = dateConfig
    const currDate = parse(value, formatText)
    // strict valid
    if (!isValid(currDate) || format(currDate, formatText) != value) {
      return
    }
    const oldDate = toRaw(accessor.valueRef.value)
    accessor.setValue(currDate)
    callEmit(props.onChange, currDate, oldDate)
  }

  const handleFocus = (evt: FocusEvent) => {
    callEmit(props.onFocus, evt)
    setFocused(true)
  }

  const handleBlur = (evt: FocusEvent) => {
    callEmit(props.onBlur, evt)
    accessor.markAsBlurred()
    setFocused(false)
  }

  const handleClear = (evt: MouseEvent) => {
    callEmit(props.onClear, evt)
    evt.stopPropagation()
    accessor.setValue(undefined)
  }

  return {
    inputValue,
    isFocused,
    handleInput,
    handleFocus,
    handleBlur,
    handleClear,
  }
}
