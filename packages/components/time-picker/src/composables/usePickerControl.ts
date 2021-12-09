/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TimePickerProps, TimeRangePickerProps } from '../types'
import type { DateConfig } from '@idux/components/config'
import type { ComputedRef, Ref } from 'vue'

import { computed, watch } from 'vue'

import { isArray, isString } from 'lodash-es'

import { useState } from '@idux/cdk/utils'

import { convertToDate } from '../utils'

export type InputPreProcessor = (value: string) => string
export type OnPickerValueChange = (value: Date | undefined) => void
export type OnRangePickerValueChange = (value: [Date | undefined, Date | undefined]) => void
export type InputValidator = (value: string) => boolean

type ValueType = TimePickerProps['value']
type RangeValueType = TimeRangePickerProps['value']

export interface PickerControl {
  inputValue: ComputedRef<string | undefined>
  selectorValue: ComputedRef<Date | undefined>
  setInputValue: (value: string | undefined) => void
  setSelectorValue: (value: Date | undefined) => void

  init: () => void
  handleInputChange: (value: string) => void
  handleSelectorChange: (value: Date) => void
}

export function usePickerControl(
  valueProp: Ref<ValueType>,
  dateConfig: DateConfig,
  format: ComputedRef<string>,
  inputPreProcessors: InputPreProcessor[],
  validateInput: InputValidator,
  onChange: OnPickerValueChange,
): PickerControl {
  const [inputValue, setInputValue] = useState<string | undefined>(undefined)
  const [selectorValue, setSelectorValue] = useState<Date | undefined>(undefined)
  const { parse, format: formatDate } = dateConfig

  const dateValue = computed(() => convertToDate(dateConfig, valueProp.value, format.value))
  const formatedDateValue = computed(() =>
    isString(valueProp.value) ? valueProp.value : dateValue.value ? formatDate(dateValue.value, format.value) : '',
  )

  function init() {
    if (!inputValue.value || parse(inputValue.value, format.value).valueOf() !== dateValue.value?.valueOf()) {
      setInputValue(formatedDateValue.value)
    }

    setSelectorValue(dateValue.value)
  }

  init()
  watch(valueProp, () => {
    init()
  })

  function handleInputChange(value: string) {
    const processedValue = preProcessInputValue(value, inputPreProcessors)
    setInputValue(value)

    if (validateInput(processedValue)) {
      onChange(inputValue.value ? parse(inputValue.value, format.value) : undefined)
    }
  }

  function handleSelectorChange(value: Date) {
    onChange(value)
  }

  return {
    inputValue,
    selectorValue,
    setInputValue,
    setSelectorValue,

    init,
    handleInputChange,
    handleSelectorChange,
  }
}

function preProcessInputValue(value: string, inputPreProcessors: InputPreProcessor[]) {
  return inputPreProcessors.reduce((result, processor) => processor(result), value)
}

export function useRangePickerControl(
  valueProp: Ref<RangeValueType>,
  dateConfig: DateConfig,
  format: ComputedRef<string>,
  inputPreProcessors: InputPreProcessor[],
  validateInput: InputValidator,
  onChange: OnRangePickerValueChange,
): [PickerControl, PickerControl] {
  const rangeValueRef = computed(() => {
    if (!isArray(valueProp.value)) {
      return [undefined, undefined]
    }
    return valueProp.value.map(v => convertToDate(dateConfig, v, format.value))
  })
  const fromValue = computed(() => rangeValueRef.value[0])
  const toValue = computed(() => rangeValueRef.value[1])

  const fromControl = usePickerControl(fromValue, dateConfig, format, inputPreProcessors, validateInput, value => {
    onChange([value, toValue.value])
  })
  const toControl = usePickerControl(toValue, dateConfig, format, inputPreProcessors, validateInput, value => {
    onChange([fromValue.value, value])
  })

  return [fromControl, toControl]
}
