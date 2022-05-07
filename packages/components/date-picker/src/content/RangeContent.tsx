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

import { useRangeActiveDate } from '../composables/useActiveDate'
import { useInputProps } from '../composables/useInputProps'
import { useRangeTimePanelProps } from '../composables/useTimePanelProps'
import { dateRangePickerToken } from '../token'

export default defineComponent({
  setup() {
    const context = inject(dateRangePickerToken)!
    const {
      props,
      dateConfig,
      locale,
      slots,
      overlayOpened,
      formatRef,
      dateFormatRef,
      timeFormatRef,
      rangeControlContext: {
        buffer,
        panelValue,
        visiblePanel,
        isSelecting,
        fromControl,
        toControl,
        handleDatePanelCellClick,
        handleDatePanelCellMouseenter,
      },
      mergedPrefixCls,
      inputEnableStatus,
      inputRef,
      handleChange,
      handleKeyDown,
      renderSeparator,
      setOverlayOpened,
    } = context

    const { fromActiveDate, toActiveDate, setFromActiveDate, setToActiveDate } = useRangeActiveDate(
      dateConfig,
      props,
      panelValue,
      isSelecting,
      overlayOpened,
      formatRef,
    )

    const inputInstance = ref<ɵInputInstance>()
    onMounted(() => {
      inputRef.value = inputInstance.value?.getInputElement()
    })
    onUpdated(() => {
      inputRef.value = inputInstance.value?.getInputElement()
    })

    const handleConfirm = () => {
      handleChange(buffer.value)
      setOverlayOpened(false)
    }

    const handleMouseDown = (e: MouseEvent) => {
      if (!(e.target instanceof HTMLInputElement)) {
        e.preventDefault()
      }
    }

    const inputProps = useInputProps(context)
    const timePanelProps = useRangeTimePanelProps(props, timeFormatRef)

    const renderBoard = (isFrom: boolean) => {
      const { enableOverlayDateInput, enableOverlayTimeInput } = inputEnableStatus.value
      const boardPrefixCls = `${mergedPrefixCls.value}-board`

      const {
        dateInputValue,
        timeInputVaue,
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
        handleTimePanelChange,
      } = isFrom ? fromControl : toControl

      const inputs = enableOverlayDateInput && (
        <div class={`${boardPrefixCls}-inputs`}>
          <ɵInput
            ref={isFrom ? inputInstance : undefined}
            {...inputProps.value}
            class={`${boardPrefixCls}-date-input`}
            v-slots={slots}
            value={dateInputValue.value}
            clearVisible={!!dateInputValue.value}
            focused={dateInputFocused.value}
            placeholder={dateFormatRef.value}
            onInput={handleDateInput}
            onFocus={handleDateInputFocus}
            onBlur={handleDateInputBlur}
            onKeydown={handleKeyDown}
            onClear={handleDateInputClear}
          />
          {enableOverlayTimeInput && (
            <ɵInput
              {...inputProps.value}
              class={`${boardPrefixCls}-time-input`}
              v-slots={slots}
              value={timeInputVaue.value}
              clearVisible={!!timeInputVaue.value}
              focused={timeInputFocused.value}
              placeholder={timeFormatRef.value}
              onInput={handleTimeInput}
              onFocus={handleTimeInputFocus}
              onBlur={handleTimeInputBlur}
              onKeydown={handleKeyDown}
              onClear={handleTimeInputClear}
            />
          )}
        </div>
      )

      const timeValue = panelValue.value?.[isFrom ? 0 : 1]
      const activeDate = isFrom ? fromActiveDate.value : toActiveDate.value
      const datePanelProps = {
        cellTooltip: props.cellTooltip,
        disabledDate: props.disabledDate,
        type: props.type === 'datetime' ? 'date' : props.type,
        value: panelValue.value,
        visible: overlayOpened.value,
        activeDate,
        onCellClick: handleDatePanelCellClick,
        onCellMouseenter: handleDatePanelCellMouseenter,
        'onUpdate:activeDate': isFrom ? setFromActiveDate : setToActiveDate,
      }
      const _timePanelProps = {
        ...timePanelProps.value[isFrom ? 0 : 1],
        activeValue: timeValue ?? activeDate,
        value: timeValue,
        visible: visiblePanel.value === 'timePanel',
        onChange: handleTimePanelChange,
        'onUpdate:activeValue': isFrom ? setFromActiveDate : setToActiveDate,
      }

      return (
        <div class={boardPrefixCls}>
          {inputs}
          <div class={`${boardPrefixCls}-panel`}>
            <ɵDatePanel v-show={visiblePanel.value !== 'timePanel'} v-slots={slots} {...datePanelProps} />
            {inputEnableStatus.value.enableOverlayTimeInput && (
              <ɵTimePanel v-show={visiblePanel.value === 'timePanel'} {..._timePanelProps} />
            )}
          </div>
        </div>
      )
    }

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-overlay`

      const children = [
        <div class={`${prefixCls}-body`} tabindex={-1} onMousedown={handleMouseDown}>
          {renderBoard(true)}
          <div class={`${prefixCls}-separator`}>
            {inputEnableStatus.value.enableOverlayDateInput && renderSeparator()}
          </div>
          {renderBoard(false)}
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

      return props.overlayRender ? props.overlayRender(children) : <div onMousedown={handleMouseDown}>{children}</div>
    }
  },
})
