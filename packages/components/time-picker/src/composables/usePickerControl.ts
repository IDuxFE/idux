/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DateConfig } from '@idux/components/config'
import type { Ref } from 'vue'

import { computed, watch } from 'vue'

import { isArray } from 'lodash-es'

import { useState } from '@idux/cdk/utils'

export type InputPreProcessor = (value: string) => string
export type OnPickerValueChange = (value: Date | undefined) => void
export type OnRangePickerValueChange = (value: [Date | undefined, Date | undefined]) => void
export type InputValidator = (value: string) => boolean

export interface PickerControl {
  inputValue: Ref<string | undefined>
  selectorValue: Ref<Date | undefined>
  setInputValue: (value: string | undefined) => void
  setSelectorValue: (value: Date | undefined) => void

  init: () => void
  handleInputChange: (value: string) => void
  handleSelectorChange: (value: Date) => void
}

export function usePickerControl(
  valueProp: Ref<Date | undefined>,
  dateConfig: DateConfig,
  format: Ref<string>,
  inputPreProcessors: InputPreProcessor[],
  validateInput: InputValidator,
  onChange: OnPickerValueChange,
): PickerControl {
  const [inputValue, setInputValue] = useState<string | undefined>(undefined)
  const [selectorValue, setSelectorValue] = useState<Date | undefined>(undefined)
  const { parse, format: formatDate } = dateConfig

  function init() {
    if (!inputValue.value || parse(inputValue.value, format.value).valueOf() !== valueProp.value?.valueOf()) {
      setInputValue(valueProp.value ? formatDate(valueProp.value, format.value) : '')
    }

    setSelectorValue(valueProp.value)
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
  valueProp: Ref<[Date | undefined, Date | undefined] | undefined>,
  dateConfig: DateConfig,
  format: Ref<string>,
  inputPreProcessors: InputPreProcessor[],
  validateInput: InputValidator,
  onChange: OnRangePickerValueChange,
): [PickerControl, PickerControl] {
  const rangeValueRef = computed(() => {
    if (!isArray(valueProp.value)) {
      return [undefined, undefined]
    }
    return valueProp.value
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
