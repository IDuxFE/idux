/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, withKeys } from 'vue'

import { useGlobalConfig } from '@idux/components/config'
import { getLocale } from '@idux/components/i18n'

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
    const locale = getLocale('timePicker')

    const context = inject(timePickerContext)!
    const {
      dateConfig,
      props: pickerProps,
      format,
      isDisabled,
      slots,
      inputEnableStatus,
      setOverlayOpened,
      handleClear,
    } = context

    const { inputValue, handleInputChange } = inject(timePickerControl)!
    const handleClick = () => {
      if (pickerProps.readonly) {
        return
      }

      setOverlayOpened(true)
    }

    const placeholder = computed(() => pickerProps.placeholder ?? locale.value.placeholder)

    const triggerProps = useCommonTriggerProps(props, context)
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
            placeholder={placeholder.value}
            onInput={onInput}
            onKeydown={onKeydown}
          />
        )
      }

      return props.value ? (
        dateConfig.format(props.value, format.value)
      ) : (
        <span class={`${mergedPrefixCls.value}-placeholder`}>{placeholder.value}</span>
      )
    }

    return () => (
      <BaseTrigger {...triggerProps.value} v-slots={slots} onClick={handleClick} onClear={handleClear}>
        {renderContent()}
      </BaseTrigger>
    )
  },
})
