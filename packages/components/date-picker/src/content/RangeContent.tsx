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
import { useRangeTimePanelProps } from '../composables/useTimePanelProps'
import RangePanel from '../panel/RangePanel'
import { dateRangePickerToken } from '../token'

export default defineComponent({
  setup() {
    const context = inject(dateRangePickerToken)!
    const {
      props,
      locale,
      slots,
      dateFormatRef,
      timeFormatRef,
      hourEnabled,
      minuteEnabled,
      secondEnabled,
      use12Hours,
      rangeControlContext: { buffer, visiblePanel, fromControl, toControl, handlePanelChange },
      mergedPrefixCls,
      inputEnableStatus,
      inputRef,
      handleChange,
      handleKeyDown,
      overlayVisible,
      renderSeparator,
      setOverlayOpened,
    } = context

    const inputInstance = ref<ɵInputInstance>()
    onMounted(() => {
      if (inputEnableStatus.value.allowInput !== 'overlay') {
        return
      }

      inputRef.value = inputInstance.value?.getInputElement()
    })

    const handleConfirm = () => {
      handleChange(buffer.value)
      setOverlayOpened(false)
    }

    const inputProps = useInputProps(context)
    const timePanelProps = useRangeTimePanelProps(props, hourEnabled, minuteEnabled, secondEnabled, use12Hours)

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

      const panelProps = {
        value: buffer.value as Date[],
        cellTooltip: props.cellTooltip,
        disabledDate: props.disabledDate,
        type: props.type,
        timePanelOptions: timePanelProps.value,
        visible: overlayVisible.value && visiblePanel.value,
        onChange: handlePanelChange,
        onSelect: props.onSelect,
      }

      const panelSlots = {
        cell: slots.cell,
        separator: inputEnableStatus.value.enableOverlayDateInput
          ? () => <div class={`${prefixCls}-separator`}></div>
          : undefined,
      }

      const children = [
        <div class={`${prefixCls}-body`}>
          {inputEnableStatus.value.enableOverlayDateInput && (
            <div class={inputsCls}>
              {renderInputsSide(inputsCls, true)}
              <div class={`${prefixCls}-separator`}>{renderSeparator()}</div>
              {renderInputsSide(inputsCls, false)}
            </div>
          )}
          <RangePanel v-slots={panelSlots} {...panelProps} />
        </div>,
        <ɵFooter
          v-slots={slots}
          class={`${prefixCls}-footer`}
          footer={props.footer}
          okText={locale.dateRangePicker.okText}
          okButton={{ size: 'xs', mode: 'primary' }}
          cancelVisible={false}
          ok={handleConfirm}
        />,
      ]

      return props.overlayRender ? props.overlayRender(children) : <div>{children}</div>
    }
  },
})
