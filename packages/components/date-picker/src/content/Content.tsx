/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, inject, onMounted, ref } from 'vue'

import { ɵFooter } from '@idux/components/_private/footer'
import { ɵInput, type ɵInputInstance } from '@idux/components/_private/input'

import { useInputProps } from '../composables/useInputProps'
import { useTimePanelProps } from '../composables/useTimePanelProps'
import Panel from '../panel/Panel'
import { datePickerToken } from '../token'

export default defineComponent({
  setup() {
    const context = inject(datePickerToken)!
    const {
      props,
      mergedPrefixCls,
      dateFormatRef,
      timeFormatRef,
      slots,
      inputEnableStatus,
      inputRef,
      controlContext: {
        dateInputValue,
        timeInputValue,
        visiblePanel,
        panelValue,
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
        handlePanelChange,
      },
      overlayVisible,
      setOverlayOpened,
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

    const _handlePanelChange = (value: Date | undefined) => {
      handlePanelChange(value)

      if (!inputEnableStatus.value.enableOverlayTimeInput) {
        setOverlayOpened(false)
      }
    }

    const _handleDateInputClear = (evt: Event) => {
      if (!inputEnableStatus.value.enableOverlayTimeInput) {
        handleClear(evt)
      }

      handleDateInputClear()
    }

    const inputProps = useInputProps(context)
    const timePanelProps = useTimePanelProps(props, timeFormatRef)

    const renderInputs = (prefixCls: string) => {
      if (!inputEnableStatus.value.enableOverlayDateInput) {
        return
      }

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

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-overlay`
      const inputsCls = `${prefixCls}-inputs`

      const paneProps = {
        cellTooltip: props.cellTooltip,
        disabledDate: props.disabledDate,
        value: panelValue.value,
        type: props.type,
        timePanelOptions: timePanelProps.value,
        visible: overlayVisible.value && visiblePanel.value,
        onChange: _handlePanelChange,
      }

      const children = [
        <div class={`${prefixCls}-body`} tabindex={-1}>
          {renderInputs(inputsCls)}
          <Panel v-slots={slots} {...paneProps} />
        </div>,
        <ɵFooter v-slots={slots} class={`${prefixCls}-footer`} footer={props.footer} />,
      ]

      return props.overlayRender ? props.overlayRender(children) : <div>{children}</div>
    }
  },
})
