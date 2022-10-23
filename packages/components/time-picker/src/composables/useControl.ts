/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TimePickerProps } from '../types'
import type { DateConfig } from '@idux/components/config'
import type { ComputedRef, Ref } from 'vue'

import { computed, watch } from 'vue'

import { isString } from 'lodash-es'

import { useState } from '@idux/cdk/utils'

import { convertToDate } from '../utils'

export type OnPickerValueChange = (value: Date | undefined) => void

type ValueType = TimePickerProps['value']

export interface PickerControlContext {
  inputValue: ComputedRef<string | undefined>
  panelValue: ComputedRef<Date | undefined>
  inputFocused: ComputedRef<boolean>
  setInputValue: (value: string | undefined) => void
  setPanelValue: (value: Date | undefined) => void

  init: (force?: boolean) => void
  handleInput: (evt: Event) => void
  handleInputClear: () => void
  handleInputFocus: () => void
  handleInputBlur: () => void
  handlePanelChange: (value: Date) => void
}

export function usePickerControl(
  dateConfig: DateConfig,
  formatRef: ComputedRef<string>,
  handleChange: OnPickerValueChange,
  valueProp: Ref<ValueType>,
): PickerControlContext {
  const [inputValue, setInputValue] = useState<string | undefined>(undefined)
  const [inputFocused, setInputFocused] = useState(false)
  const [panelValue, setPanelValue] = useState<Date | undefined>(undefined)
  const { parse, format: formatDate } = dateConfig

  const dateValue = computed(() => convertToDate(dateConfig, valueProp.value, formatRef.value))
  const formatedDateValue = computed(() =>
    isString(valueProp.value) ? valueProp.value : dateValue.value ? formatDate(dateValue.value, formatRef.value) : '',
  )

  function init(force = false) {
    if (
      force ||
      !inputValue.value ||
      parse(inputValue.value, formatRef.value).valueOf() !== dateValue.value?.valueOf()
    ) {
      setInputValue(formatedDateValue.value)
    }

    setPanelValue(dateValue.value)
  }

  watch([valueProp, formatRef], () => init(), { immediate: true })

  function parseInput(value: string, format: string) {
    return value ? dateConfig.parse(value, format) : undefined
  }
  function checkInputValid(date: Date | undefined) {
    return !date || dateConfig.isValid(date)
  }

  function handleInput(evt: Event) {
    const value = (evt.target as HTMLInputElement).value

    setInputValue(value)
    const currDate = parseInput(value, formatRef.value)
    if (checkInputValid(currDate)) {
      handleChange(inputValue.value ? currDate : undefined)
    }
  }

  function handleInputClear() {
    setInputValue('')
  }

  function handleInputFocus() {
    setInputFocused(true)
  }

  function handleInputBlur() {
    setInputFocused(false)
  }

  function handlePanelChange(value: Date) {
    handleChange(value)
  }

  return {
    inputValue,
    panelValue,
    inputFocused,
    setInputValue,
    setPanelValue,

    init,
    handleInput,
    handleInputClear,
    handleInputFocus,
    handleInputBlur,
    handlePanelChange,
  }
}
