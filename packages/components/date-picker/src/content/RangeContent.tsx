/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, onMounted, onUpdated, ref } from 'vue'

import { convertArray } from '@idux/cdk/utils'
import { ɵDatePanel } from '@idux/components/_private/date-panel'
import { ɵFooter } from '@idux/components/_private/footer'
import { ɵInput, type ɵInputInstance } from '@idux/components/_private/input'
import { ɵTimePanel } from '@idux/components/_private/time-panel'

import { useRangeActiveDate } from '../composables/useActiveDate'
import { dateRangePickerToken } from '../token'

export default defineComponent({
  setup() {
    const context = inject(dateRangePickerToken)!
    const {
      props,
      config,
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

    const timePanelProps = computed(() => convertArray(context.props.timePanelOptions))
    const { fromActiveDate, toActiveDate, setFromActiveDate, setToActiveDate } = useRangeActiveDate(
      dateConfig,
      props,
      panelValue,
      isSelecting,
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

    const renderBoard = (prefixCls: string, isFrom: boolean) => {
      const { enableOverlayDateInput, enableOverlayTimeInput } = inputEnableStatus.value

      const {
        dateInputValue,
        timeInputVaue,
        handleDateInput,
        handleTimeInput,
        handleDateInputClear,
        handleTimeInputClear,
        handleDateInputFocus,
        handleTimeInputFocus,
        handleTimePanelChange,
      } = isFrom ? fromControl : toControl

      const inputs = enableOverlayDateInput && (
        <div class={`${prefixCls}-inputs`}>
          <ɵInput
            ref={inputInstance}
            class={`${prefixCls}-date-input`}
            v-slots={slots}
            value={dateInputValue.value}
            size="sm"
            clearable={props.clearable ?? config.clearable}
            clearIcon={props.clearIcon ?? config.clearIcon}
            placeholder={dateFormatRef.value}
            onInput={handleDateInput}
            onFocus={handleDateInputFocus}
            onKeydown={handleKeyDown}
            onClear={handleDateInputClear}
          />
          {enableOverlayTimeInput && (
            <ɵInput
              class={`${prefixCls}-time-input`}
              v-slots={slots}
              value={timeInputVaue.value}
              size="sm"
              clearable={props.clearable ?? config.clearable}
              clearIcon={props.clearIcon ?? config.clearIcon}
              placeholder={timeFormatRef.value}
              onInput={handleTimeInput}
              onFocus={handleTimeInputFocus}
              onKeydown={handleKeyDown}
              onClear={handleTimeInputClear}
            />
          )}
        </div>
      )

      const datePanelProps = {
        cellTooltip: props.cellTooltip,
        disabledDate: props.disabledDate,
        type: props.type === 'datetime' ? 'date' : props.type,
        value: panelValue.value,
        visible: overlayOpened.value,
        activeDate: isFrom ? fromActiveDate.value : toActiveDate.value,
        onCellClick: handleDatePanelCellClick,
        onCellMouseenter: handleDatePanelCellMouseenter,
        'onUpdate:activeDate': isFrom ? setFromActiveDate : setToActiveDate,
      }

      return (
        <div class={prefixCls}>
          {inputs}
          <div class={`${prefixCls}-panel`}>
            <ɵDatePanel v-show={visiblePanel.value !== 'timePanel'} v-slots={slots} {...datePanelProps} />
            {inputEnableStatus.value.enableOverlayTimeInput && (
              <ɵTimePanel
                v-show={visiblePanel.value === 'timePanel'}
                {...(timePanelProps.value[isFrom ? 0 : 1] ?? {})}
                value={panelValue.value?.[isFrom ? 0 : 1]}
                visible={visiblePanel.value === 'timePanel'}
                onChange={handleTimePanelChange}
              />
            )}
          </div>
        </div>
      )
    }

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-overlay`
      const boardPrefixCls = `${mergedPrefixCls.value}-board`

      const children = [
        <div class={`${prefixCls}-content`} tabindex={-1} onMousedown={handleMouseDown}>
          {renderBoard(boardPrefixCls, true)}
          <div class={`${prefixCls}-gap`}>{inputEnableStatus.value.enableOverlayDateInput && renderSeparator()}</div>
          {renderBoard(boardPrefixCls, false)}
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

      return props.overlayRender ? (
        props.overlayRender(children)
      ) : (
        <div class={prefixCls} onMousedown={handleMouseDown}>
          {children}
        </div>
      )
    }
  },
})
