/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, inject, onMounted, onUpdated, ref } from 'vue'

import { ɵDatePanel } from '@idux/components/_private/date-panel'
import { ɵFooter } from '@idux/components/_private/footer'
import { ɵInput, type ɵInputInstance } from '@idux/components/_private/input'
import { ɵTimePanel } from '@idux/components/_private/time-panel'

import { useActiveDate } from '../composables/useActiveDate'
import { useInputProps } from '../composables/useInputProps'
import { useTimePanelProps } from '../composables/useTimePanelProps'
import { datePickerToken } from '../token'

export default defineComponent({
  setup() {
    const context = inject(datePickerToken)!
    const {
      props,
      dateConfig,
      mergedPrefixCls,
      formatRef,
      dateFormatRef,
      timeFormatRef,
      slots,
      overlayOpened,
      inputEnableStatus,
      inputRef,
      controlContext: {
        dateInputValue,
        timeInputVaue,
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
        handleDatePanelChange,
        handleTimePanelChange,
      },
      setOverlayOpened,
      handleKeyDown,
      handleClear,
    } = context

    const { activeDate, setActiveDate } = useActiveDate(dateConfig, props, panelValue, formatRef)

    const inputInstance = ref<ɵInputInstance>()
    const setInputRef = () => {
      if (inputEnableStatus.value.allowInput === 'overlay') {
        inputRef.value = inputInstance.value?.getInputElement()
      }
    }
    onMounted(setInputRef)
    onUpdated(setInputRef)

    const handleDatePanelCellClick = (value: Date) => {
      handleDatePanelChange(value)

      if (!inputEnableStatus.value.enableOverlayTimeInput) {
        setOverlayOpened(false)
      }
    }

    const handleMouseDown = (e: MouseEvent) => {
      if (!(e.target instanceof HTMLInputElement)) {
        e.preventDefault()
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
        <div class={`${prefixCls}-inputs`} onMousedown={handleMouseDown}>
          <ɵInput
            ref={inputInstance}
            {...inputProps.value}
            class={`${prefixCls}-date-input`}
            v-slots={slots}
            value={dateInputValue.value}
            clearVisible={!!dateInputValue.value}
            focused={dateInputFocused.value}
            placeholder={dateFormatRef.value}
            onInput={handleDateInput}
            onFocus={handleDateInputFocus}
            onBlur={handleDateInputBlur}
            onKeydown={handleKeyDown}
            onClear={_handleDateInputClear}
          />
          {inputEnableStatus.value.enableOverlayTimeInput && (
            <ɵInput
              {...inputProps.value}
              class={`${prefixCls}-time-input`}
              v-slots={slots}
              value={timeInputVaue.value}
              clearVisible={!!timeInputVaue.value}
              placeholder={timeFormatRef.value}
              focused={timeInputFocused.value}
              onInput={handleTimeInput}
              onFocus={handleTimeInputFocus}
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
      const boardPrefixCls = `${mergedPrefixCls.value}-board`
      const datePanelType = props.type === 'datetime' ? 'date' : props.type

      const datePanelProps = {
        cellTooltip: props.cellTooltip,
        disabledDate: props.disabledDate,
        type: datePanelType,
        value: panelValue.value,
        visible: overlayOpened.value,
        activeDate: activeDate.value,
        onCellClick: handleDatePanelCellClick,
        'onUpdate:activeDate': setActiveDate,
      }
      const _timePanelProps = {
        ...timePanelProps.value,
        activeValue: activeDate.value,
        value: panelValue.value,
        visible: visiblePanel.value === 'timePanel',
        onChange: handleTimePanelChange,
        'onUpdate:activeValue': setActiveDate,
      }

      const children = [
        <div class={`${prefixCls}-body ${boardPrefixCls}`} tabindex={-1} onMousedown={handleMouseDown}>
          {renderInputs(boardPrefixCls)}
          <div class={`${boardPrefixCls}-panel`} tabindex={-1}>
            <ɵDatePanel v-show={visiblePanel.value === 'datePanel'} v-slots={slots} {...datePanelProps} />
            {inputEnableStatus.value.enableOverlayTimeInput && (
              <ɵTimePanel v-show={visiblePanel.value === 'timePanel'} {..._timePanelProps} />
            )}
          </div>
        </div>,
        <ɵFooter v-slots={slots} class={`${prefixCls}-footer`} footer={props.footer} />,
      ]

      return props.overlayRender ? props.overlayRender(children) : <div onMousedown={handleMouseDown}>{children}</div>
    }
  },
})
