/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { InputInstance } from '@idux/components/input'

import { computed, defineComponent, inject, nextTick, provide, ref } from 'vue'

import { useControlledProp } from '@idux/cdk/utils'
import { ɵOverlay, ɵTimeSelector } from '@idux/components/_private'
import { useDateConfig, useGlobalConfig } from '@idux/components/config'
import { FORM_TOKEN } from '@idux/components/form'
import { getLocale } from '@idux/components/i18n'
import { IxInput } from '@idux/components/input'

import { useInputEnableStatus } from './composables/useInputEnableStatus'
import { usePickerControl } from './composables/usePickerControl'
import { useCommonInputProps, useCommonOverlayProps, useCommonSelectorProps } from './composables/useProps'
import { useTimePickerCommonBindings } from './composables/useTimePickerCommonBindings'
import { timePickerContext, timePickerControl } from './tokens'
import Trigger from './trigger/Trigger'
import { TimePickerProps, timePickerProps } from './types'
import { convertToDate } from './utils'

export default defineComponent({
  name: 'IxTimePicker',
  props: timePickerProps,
  setup(props, { slots }) {
    const config = useGlobalConfig('timePicker')
    const dateConfig = useDateConfig()
    const { isValid, parse } = dateConfig
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-time-picker`)
    const locale = getLocale('timePicker')
    const [visibility, setVisibility] = useControlledProp(props, 'open', false)

    const format = computed(() => props.format ?? config.format)
    const { accessor, isDisabled, isFocused, handleChange, handleClear, handleFocus, handleBlur } =
      useTimePickerCommonBindings(props)
    const pickerControl = usePickerControl(
      accessor.valueRef,
      dateConfig,
      format,
      [],
      (value: string) => !value || isValid(parse(value, format.value)),
      handleChange,
    )
    const { inputValue, selectorValue, setInputValue, init, handleInputChange, handleSelectorChange } = pickerControl

    const inputEnableStatus = useInputEnableStatus(props, config)

    const inputRef = ref<InputInstance>()
    const changeVisible = (visible: boolean) => {
      setVisibility(visible)
      if (!visible) {
        init()
      } else {
        nextTick(() => inputRef.value?.focus())
      }
    }
    const handleInputClear = (evt: Event) => {
      evt.stopPropagation()
      handleClear(evt)
      setInputValue('')
    }

    const formContext = inject(FORM_TOKEN, null)

    provide(timePickerControl, pickerControl)
    provide(timePickerContext, {
      dateConfig,
      config,
      props,
      format,
      formContext,
      slots,
      isDisabled,
      isFocused,
      overlayOpened: visibility,
      mergedPrefixCls,
      inputEnableStatus,
      setOverlayOpened: changeVisible,
      handleClear,
      handleFocus,
      handleBlur,
    })

    const inputProps = useCommonInputProps(props, config, formContext)
    const selectorProps = useCommonSelectorProps(props, config)
    const overlayProps = useCommonOverlayProps(props, config, mergedPrefixCls, changeVisible)

    function $convertToDate(value: TimePickerProps['value']) {
      if (!value) {
        return undefined
      }

      return convertToDate(dateConfig, value, format.value)
    }

    return () => {
      const inputSlots = {
        clearIcon: slots.clearIcon,
      }
      const renderTrigger = () => (
        <Trigger class={mergedPrefixCls.value} value={$convertToDate(accessor.valueRef.value)} />
      )

      const renderContent = () => {
        const prefixCls = `${mergedPrefixCls.value}-panel`
        return (
          <div class={prefixCls}>
            {inputEnableStatus.value.enableInternalInput && (
              <IxInput
                ref={inputRef}
                class={`${prefixCls}-input`}
                {...inputProps.value}
                value={inputValue.value}
                disabled={isDisabled.value}
                readonly={props.readonly}
                placeholder={props.placeholder ?? locale.value.placeholder}
                onChange={handleInputChange}
                onClear={handleInputClear}
                v-slots={inputSlots}
              />
            )}
            <ɵTimeSelector
              {...selectorProps.value}
              visible={visibility.value}
              defaultOpenValue={$convertToDate(props.defaultOpenValue)}
              value={selectorValue.value}
              onChange={handleSelectorChange}
            />
          </div>
        )
      }

      return (
        <ɵOverlay
          {...overlayProps.value}
          visible={visibility.value}
          v-slots={{ default: renderTrigger, content: renderContent }}
          disabled={isDisabled.value || props.readonly}
        />
      )
    }
  },
})
