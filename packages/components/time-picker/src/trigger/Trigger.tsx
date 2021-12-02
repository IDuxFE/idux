/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, withKeys } from 'vue'

import { useGlobalConfig } from '@idux/components/config'

import { useCommonTriggerProps } from '../composables/useProps'
import { timePickerContext, timePickerControl } from '../tokens'
import { timePickerTriggerProps } from '../types'
import BaseTrigger from './BaseTrigger'

export default defineComponent({
  name: 'IxTimePickerTrigger',
  props: timePickerTriggerProps,
  setup(props) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-time-picker-trigger`)

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
    } = inject(timePickerContext)!

    const { inputValue, handleInputChange } = inject(timePickerControl)!
    const handleClick = () => {
      if (isDisabled.value) {
        return
      }

      setOverlayOpened(true)
    }

    const triggerProps = useCommonTriggerProps(pickerProps, props, config, formContext, isDisabled, overlayOpened)
    const renderContent = () => {
      const prefixCls = mergedPrefixCls.value
      if (inputEnableStatus.value.enableExternalInput) {
        const onInput = (evt: Event) => {
          const { value } = evt.target as HTMLInputElement
          handleInputChange(value)
        }
        const onKeydown = withKeys(() => {
          setOverlayOpened(false)
        }, ['enter'])
        return (
          <input
            class={`${prefixCls}-input`}
            autocomplete="off"
            disabled={isDisabled.value || pickerProps.readonly}
            value={inputValue.value}
            placeholder={pickerProps.placeholder}
            onInput={onInput}
            onKeydown={onKeydown}
          />
        )
      }

      return props.value ? (
        dateConfig.format(props.value, format.value)
      ) : (
        <span class={`${mergedPrefixCls.value}-placeholder`}>{pickerProps.placeholder}</span>
      )
    }

    return () => (
      <BaseTrigger {...triggerProps.value} v-slots={slots} onClick={handleClick} onClear={handleClear}>
        {renderContent()}
      </BaseTrigger>
    )
  },
})
