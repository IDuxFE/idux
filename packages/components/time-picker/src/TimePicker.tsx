/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, provide } from 'vue'

import { useControlledProp } from '@idux/cdk/utils'
import { ɵOverlay, ɵTimeSelector } from '@idux/components/_private'
import { normalizeFormat } from '@idux/components/_private/time-selector/src/utils'
import { useDateConfig, useGlobalConfig } from '@idux/components/config'
import { FORM_TOKEN } from '@idux/components/form'
import { IxInput } from '@idux/components/input'

import { useInputEnableStatus } from './composables/useInputEnableStatus'
import { usePickerControl } from './composables/usePickerControl'
import { useCommonInputProps, useCommonOverlayProps, useCommonSelectorProps } from './composables/useProps'
import { useTimePickerCommonBindings } from './composables/useTimePickerCommonBindings'
import { timePickerContext, timePickerControl } from './tokens'
import Trigger from './trigger/Trigger'
import { timePickerProps } from './types'

export default defineComponent({
  name: 'IxTimePicker',
  props: timePickerProps,
  setup(props, { expose, slots }) {
    const config = useGlobalConfig('timePicker')
    const dateConfig = useDateConfig()
    const { isValid, parse } = dateConfig
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-time-picker`)
    const [visibility, setVisibility] = useControlledProp(props, 'open', false)

    const format = computed(() => normalizeFormat(props.format))
    const { accessor, isDisabled, handleChange, handleClear } = useTimePickerCommonBindings(props)
    const pickerControl = usePickerControl(
      accessor.valueRef,
      dateConfig,
      format,
      [],
      (value: string) => !value || isValid(parse(value, format.value)),
      handleChange,
    )
    const { inputValue, selectorValue, init, handleInputChange, handleSelectorChange } = pickerControl

    const inputEnableStatus = useInputEnableStatus(props, config)

    expose({ focus, blur })

    const changeVisible = (visible: boolean) => {
      setVisibility(visible)
      if (!visible) {
        init()
      }
    }
    const handleInputClear = (evt: Event) => {
      evt.stopPropagation()
      handleClear(evt)
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
      overlayOpened: visibility,
      mergedPrefixCls,
      inputEnableStatus,
      setOverlayOpened: changeVisible,
      handleClear,
    })

    const inputProps = useCommonInputProps(props, config, formContext)
    const selectorProps = useCommonSelectorProps(props)
    const overlayProps = useCommonOverlayProps(props, config, mergedPrefixCls, changeVisible)

    return () => {
      const inputSlots = {
        suffix: slots.suffix,
        clearIcon: slots.clearIcon,
      }
      const renderTrigger = () => <Trigger class={mergedPrefixCls.value} value={accessor.valueRef.value} />

      const renderContent = () => {
        const prefixCls = `${mergedPrefixCls.value}-panel`
        return (
          <div class={prefixCls}>
            {inputEnableStatus.value.enableInternalInput && (
              <IxInput
                class={`${prefixCls}-input`}
                {...inputProps.value}
                value={inputValue.value}
                disabled={isDisabled.value}
                readonly={props.readonly}
                placeholder={props.placeholder}
                onChange={handleInputChange}
                onClear={handleInputClear}
                v-slots={inputSlots}
              />
            )}
            <ɵTimeSelector
              {...selectorProps.value}
              visible={visibility.value}
              defaultOpenValue={props.defaultOpenValue}
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
