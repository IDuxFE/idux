/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { Ref } from 'vue'

import { ref, watch } from 'vue'

import dayjs from 'dayjs/esm'

import { formatDate, parseDate } from './utils'

export type InputPreProcessor = (value: string) => string
export type OnPickerValueChange = (value: Date) => void
export type InputValidator = (value: string) => boolean

export interface PickerControl {
  inputValue: Ref<string>
  pannelValue: Ref<Date | undefined>

  handleInputChange: (value: string) => void
  handlePanelChange: (value: Date) => void
  handleInputConfirm: () => void
  handleClose: () => void
}

class PickerBuffer {
  value: Date | undefined
  onChange: OnPickerValueChange

  constructor(value: Date, onChange: OnPickerValueChange) {
    this.value = value
    this.onChange = onChange
  }

  setValue(value: Date | undefined) {
    if (parseDate(value).isSame(this.value)) {
      return
    }

    this.value = value
  }

  triggerOnChange() {
    this.onChange(this.value!)
  }
}

export function usePickerControl(
  valueProp: Ref<Date>,
  format: string,
  inputPreProcessors: InputPreProcessor[],
  validateInput: InputValidator,
  onChange: OnPickerValueChange,
): PickerControl {
  let inputIsValid = true
  const inputValue = ref('')
  const pannelValue = ref<Date | undefined>()
  const buffer = new PickerBuffer(valueProp.value, onChange)

  const init = (value: Date | undefined) => {
    buffer.setValue(value)
    inputValue.value = value ? formatDate(value, format) : ''
    pannelValue.value = value
  }

  init(valueProp.value)
  watch(valueProp, value => {
    if (dayjs(value).isSame(buffer.value)) {
      return
    }

    init(value)
  })

  function handleInputChange(value: string) {
    const processedValue = preProcessInputValue(value, inputPreProcessors)
    inputValue.value = processedValue

    inputIsValid = validateInput(processedValue)
    if (!inputIsValid) {
      return
    }

    buffer.setValue((pannelValue.value = value ? parseDate(value, format).toDate() : undefined))
  }

  function handleInputConfirm() {
    if (inputIsValid) {
      buffer.triggerOnChange()
      return
    }

    inputValue.value = buffer.value ? formatDate(buffer.value, format) : ''
  }

  function handleClose() {
    init(valueProp.value)
  }

  function handlePanelChange(value: Date) {
    pannelValue.value = value
    inputValue.value = formatDate(value, format)
    buffer.setValue(value)
    buffer.triggerOnChange()
  }

  return {
    inputValue,
    pannelValue,

    handleInputChange,
    handlePanelChange,
    handleInputConfirm,
    handleClose,
  }
}

function preProcessInputValue(value: string, inputPreProcessors: InputPreProcessor[]) {
  return inputPreProcessors.reduce((result, processor) => processor(result), value)
}
