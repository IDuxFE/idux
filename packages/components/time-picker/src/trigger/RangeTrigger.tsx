/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PickerControl } from '../composables/usePickerControl'

import { computed, defineComponent, inject } from 'vue'

import { DateConfig, useGlobalConfig } from '@idux/components/config'

import { useCommonTriggerProps } from '../composables/useProps'
import { timeRangePickerContext, timeRangePickerControl } from '../tokens'
import { timeRangePickerTriggerProps } from '../types'
import BaseTrigger from './BaseTrigger'

export default defineComponent({
  name: 'IxTimePickerTrigger',
  props: timeRangePickerTriggerProps,
  setup(props) {
    const common = useGlobalConfig('common')
    const commonPrefixCls = computed(() => common.prefixCls)
    const mergedPrefixCls = computed(() => `${common.prefixCls}-time-range-picker-trigger`)

    const {
      config,
      dateConfig,
      props: pickerProps,
      format,
      formContext,
      isDisabled,
      overlayOpened,
      slots,
      inputEnableStatus,
      setOverlayOpened,
      handleClear,
    } = inject(timeRangePickerContext)!

    const [fromPickerControl, toPickerControl] = inject(timeRangePickerControl)!
    const handleClick = () => {
      if (isDisabled.value) {
        return
      }

      setOverlayOpened(true)
    }

    const triggerProps = useCommonTriggerProps(pickerProps, props, config, formContext, isDisabled, overlayOpened)
    const renderContent = () => {
      const prefixCls = mergedPrefixCls.value
      const enableInput = inputEnableStatus.value.enableExternalInput
      const disabled = isDisabled.value || pickerProps.readonly

      return (
        <span class={`${prefixCls}-content`}>
          <span class={`${prefixCls}-content-side`}>
            {renderSide(
              props.value?.[0],
              format.value,
              dateConfig,
              fromPickerControl,
              enableInput,
              disabled,
              pickerProps.placeholder[0],
              commonPrefixCls.value,
            )}
          </span>
          <span class={`${prefixCls}-content-split`}>至</span>
          <span class={`${prefixCls}-content-side`}>
            {renderSide(
              props.value?.[1],
              format.value,
              dateConfig,
              toPickerControl,
              enableInput,
              disabled,
              pickerProps.placeholder[1],
              commonPrefixCls.value,
            )}
          </span>
        </span>
      )
    }

    return () => (
      <BaseTrigger {...triggerProps.value} v-slots={slots} onClick={handleClick} onClear={handleClear}>
        {renderContent()}
      </BaseTrigger>
    )
  },
})

function renderSide(
  value: Date | undefined,
  format: string,
  dateConfig: DateConfig,
  pickerControl: PickerControl,
  enableInput: boolean,
  disabled: boolean,
  placeholder: string,
  prefixCls: string,
) {
  if (!enableInput) {
    return value ? (
      dateConfig.format(value, format)
    ) : (
      <span class={`${prefixCls}-time-picker-trigger-placeholder`}>{placeholder}</span>
    )
  }

  const { inputValue, handleInputChange } = pickerControl
  const onInput = (evt: Event) => {
    const { value } = evt.target as HTMLInputElement
    handleInputChange(value)
  }

  return (
    <input
      class={`${prefixCls}-time-picker-trigger-input`}
      autocomplete="off"
      disabled={disabled}
      value={inputValue.value}
      placeholder={placeholder}
      onInput={onInput}
    />
  )
}
