/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, inject, onMounted, ref } from 'vue'

import { ɵInput, type ɵInputInstance } from '@idux/components/_private/input'

import { useInputProps } from '../composables/useInputProps'
import { datePickerToken } from '../token'

export default defineComponent({
  name: 'IxDatePickerOverlayInputs',
  setup(_, { slots }) {
    const context = inject(datePickerToken)!
    const {
      mergedPrefixCls,
      dateFormatRef,
      timeFormatRef,
      inputEnableStatus,
      inputRef,
      controlContext: {
        dateInputValue,
        timeInputValue,
        dateInputFocused,
        timeInputFocused,
        handleDateInput,
        handleTimeInput,
        handleDateInputClear,
        handleTimeInputClear,
        handleDateInputFocus,
        handleTimeInputFocus,
        handleDateInputBlur,
        handleTimeInputBlur,
      },
      handleKeyDown,
      handleClear,
    } = context

    const inputInstance = ref<ɵInputInstance>()
    onMounted(() => {
      if (inputEnableStatus.value.allowInput !== 'overlay') {
        return
      }

      inputRef.value = inputInstance.value?.getInputElement()
    })

    const _handleDateInputFocus = (evt: FocusEvent) => {
      handleDateInputFocus()
      if (inputEnableStatus.value.allowInput === 'overlay') {
        inputRef.value = evt.target as HTMLInputElement
      }
    }
    const _handleTimeInputFocus = (evt: FocusEvent) => {
      handleTimeInputFocus()
      if (inputEnableStatus.value.allowInput === 'overlay') {
        inputRef.value = evt.target as HTMLInputElement
      }
    }

    const _handleDateInputClear = (evt: MouseEvent) => {
      if (!inputEnableStatus.value.enableOverlayTimeInput) {
        handleClear(evt)
      }

      handleDateInputClear()
    }

    const inputProps = useInputProps(context)

    return () => {
      if (!inputEnableStatus.value.enableOverlayDateInput) {
        return null
      }

      const prefixCls = `${mergedPrefixCls.value}-overlay-inputs`

      return (
        <div class={prefixCls}>
          <ɵInput
            ref={inputInstance}
            {...inputProps.value}
            class={`${prefixCls}-date-input`}
            v-slots={slots}
            value={dateInputValue.value}
            clearVisible={!!dateInputValue.value && !!inputEnableStatus.value.allowInput}
            focused={dateInputFocused.value}
            placeholder={dateFormatRef.value}
            readonly={!inputEnableStatus.value.allowInput}
            onInput={handleDateInput}
            onFocus={_handleDateInputFocus}
            onBlur={handleDateInputBlur}
            onKeydown={handleKeyDown}
            onClear={_handleDateInputClear}
          />
          {inputEnableStatus.value.enableOverlayTimeInput && (
            <ɵInput
              {...inputProps.value}
              class={`${prefixCls}-time-input`}
              v-slots={slots}
              value={timeInputValue.value}
              clearVisible={!!timeInputValue.value && !!inputEnableStatus.value.allowInput}
              focused={timeInputFocused.value}
              placeholder={timeFormatRef.value}
              readonly={!inputEnableStatus.value.allowInput}
              onInput={handleTimeInput}
              onFocus={_handleTimeInputFocus}
              onBlur={handleTimeInputBlur}
              onKeydown={handleKeyDown}
              onClear={handleTimeInputClear}
            />
          )}
        </div>
      )
    }
  },
})
