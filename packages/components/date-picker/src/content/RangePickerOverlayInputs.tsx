/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, inject, onMounted, ref } from 'vue'

import { ɵInput, type ɵInputInstance } from '@idux/components/_private/input'

import { useInputProps } from '../composables/useInputProps'
import { dateRangePickerToken } from '../token'

export default defineComponent({
  name: 'IxDateRangePickerOverlayInputs',
  setup(_, { slots }) {
    const context = inject(dateRangePickerToken)!
    const {
      dateFormatRef,
      timeFormatRef,
      rangeControlContext: { fromControl, toControl },
      mergedPrefixCls,
      inputEnableStatus,
      inputRef,
      handleKeyDown,
      renderSeparator,
    } = context

    const inputInstance = ref<ɵInputInstance>()
    onMounted(() => {
      if (inputEnableStatus.value.allowInput !== 'overlay') {
        return
      }

      inputRef.value = inputInstance.value?.getInputElement()
    })

    const inputProps = useInputProps(context)

    const renderInputsSide = (prefixCls: string, isFrom: boolean) => {
      const { enableOverlayTimeInput } = inputEnableStatus.value

      const {
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
      } = isFrom ? fromControl : toControl

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

      return (
        <div class={`${prefixCls}-side`}>
          <ɵInput
            ref={isFrom ? inputInstance : undefined}
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
            onClear={handleDateInputClear}
          />
          {enableOverlayTimeInput && (
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

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-overlay`
      const inputsCls = `${prefixCls}-inputs`

      if (!inputEnableStatus.value.enableOverlayDateInput) {
        return null
      }

      return (
        <div class={inputsCls}>
          {renderInputsSide(inputsCls, true)}
          <div class={`${prefixCls}-separator`}>{renderSeparator()}</div>
          {renderInputsSide(inputsCls, false)}
        </div>
      )
    }
  },
})
