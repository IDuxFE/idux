/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed, defineComponent, inject } from 'vue'

import { type DateConfig, useGlobalConfig } from '@idux/components/config'

import { type PickerControl } from '../composables/usePickerControl'
import { useCommonTriggerProps } from '../composables/useProps'
import { timeRangePickerContext, timeRangePickerControl } from '../tokens'
import { timeRangePickerTriggerProps } from '../types'
import BaseTrigger from './BaseTrigger'

export default defineComponent({
  name: 'IxTimeRangePickerTrigger',
  props: timeRangePickerTriggerProps,
  setup(props) {
    const common = useGlobalConfig('common')
    const commonPrefixCls = computed(() => common.prefixCls)
    const mergedPrefixCls = computed(() => `${common.prefixCls}-time-range-picker-trigger`)

    const context = inject(timeRangePickerContext)!
    const {
      props: pickerProps,
      slots,
      dateConfig,
      locale,
      format,
      inputEnableStatus,
      setOverlayOpened,
      renderSeparator,
      commonBindings: { isDisabled, handleClear },
    } = context

    const [fromPickerControl, toPickerControl] = inject(timeRangePickerControl)!
    const handleClick = () => {
      if (pickerProps.readonly) {
        return
      }

      setOverlayOpened(true)
    }

    const placeholder: ComputedRef<[string, string]> = computed(() => [
      pickerProps.placeholder?.[0] ?? locale.timeRangePicker.placeholder[0],
      pickerProps.placeholder?.[1] ?? locale.timeRangePicker.placeholder[1],
    ])

    const triggerProps = useCommonTriggerProps(props, context)
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
              placeholder.value[0],
              commonPrefixCls.value,
            )}
          </span>
          <span class={`${prefixCls}-content-separator`}>{renderSeparator()}</span>
          <span class={`${prefixCls}-content-side`}>
            {renderSide(
              props.value?.[1],
              format.value,
              dateConfig,
              toPickerControl,
              enableInput,
              disabled,
              placeholder.value[1],
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
