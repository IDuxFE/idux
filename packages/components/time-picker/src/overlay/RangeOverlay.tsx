/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PickerControl } from '../composables/usePickerControl'

import { defineComponent, inject } from 'vue'

import { ɵTimePanel } from '@idux/components/_private/time-panel'
import { IxButton } from '@idux/components/button'
import { IxInput } from '@idux/components/input'

import { useCommonInputProps, useCommonPanelProps } from '../composables/useProps'
import { timeRangePickerContext, timeRangePickerControl } from '../tokens'
import { convertToDate } from '../utils'

export default defineComponent({
  name: 'IxTimeRangePickerOverlay',
  setup() {
    const {
      props,
      slots,
      dateConfig,
      locale,
      config,
      mergedPrefixCls,
      format,
      inputEnableStatus,
      overlayOpened,
      formContext,
      bufferValue,
      commonBindings: { isDisabled, handleChange },
      renderSeparator,
      setOverlayOpened,
    } = inject(timeRangePickerContext)!
    const [fromPickerControl, toPickerControl] = inject(timeRangePickerControl)!

    const inputProps = useCommonInputProps(props, config, formContext)
    const panelProps = useCommonPanelProps(props, config)

    const handleConfirm = () => {
      handleChange(bufferValue.value)
      setOverlayOpened(false)
    }

    function renderSide(
      pickerControl: PickerControl,
      placeholder: string,
      defaultOpenValue: number | string | Date | undefined,
    ) {
      const { inputValue, panelValue, handleInputChange, handlePanelChange } = pickerControl
      const prefixCls = `${mergedPrefixCls.value}-overlay-side`
      const inputSlots = {
        clearIcon: slots.clearIcon,
      }

      const handleInputClear = (evt: Event) => {
        evt.stopPropagation()
        handleInputChange('')
      }

      return (
        <div class={prefixCls}>
          {inputEnableStatus.value.enableInternalInput && (
            <IxInput
              class={`${prefixCls}-input`}
              {...inputProps.value}
              value={inputValue.value}
              disabled={isDisabled.value}
              readonly={props.readonly}
              placeholder={placeholder}
              onChange={handleInputChange}
              onClear={handleInputClear}
              v-slots={inputSlots}
            />
          )}
          <ɵTimePanel
            {...panelProps.value}
            visible={overlayOpened.value}
            defaultOpenValue={convertToDate(dateConfig, defaultOpenValue, format.value)}
            value={panelValue.value}
            onChange={handlePanelChange}
          />
        </div>
      )
    }

    const renderFooter = () =>
      slots.footer?.({ onConfirm: handleConfirm }) ?? (
        <IxButton mode="primary" size="sm" onClick={handleConfirm}>
          {locale.timeRangePicker.okText}
        </IxButton>
      )

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-overlay`
      return (
        <div class={prefixCls}>
          <div class={`${prefixCls}-content`}>
            {renderSide(
              fromPickerControl,
              props.placeholder?.[0] ?? locale.timeRangePicker.placeholder[0],
              props.defaultOpenValue?.[0],
            )}
            <div class={`${prefixCls}-gap`}>{renderSeparator()}</div>
            {renderSide(
              toPickerControl,
              props.placeholder?.[1] ?? locale.timeRangePicker.placeholder[1],
              props.defaultOpenValue?.[1],
            )}
          </div>
          <div class={`${prefixCls}-footer`}>{renderFooter()}</div>
        </div>
      )
    }
  },
})
