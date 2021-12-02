/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, provide, watch } from 'vue'

import { useControlledProp, useState } from '@idux/cdk/utils'
import { ɵOverlay, ɵTimeSelector } from '@idux/components/_private'
import { normalizeFormat } from '@idux/components/_private/time-selector/src/utils'
import { IxButton } from '@idux/components/button'
import { useDateConfig, useGlobalConfig } from '@idux/components/config'
import { FORM_TOKEN } from '@idux/components/form'
import { getLocale } from '@idux/components/i18n'
import { IxInput } from '@idux/components/input'

import { useInputEnableStatus } from './composables/useInputEnableStatus'
import { PickerControl, useRangePickerControl } from './composables/usePickerControl'
import { useCommonInputProps, useCommonOverlayProps, useCommonSelectorProps } from './composables/useProps'
import { useTimePickerCommonBindings } from './composables/useTimePickerCommonBindings'
import { timeRangePickerContext, timeRangePickerControl } from './tokens'
import RangeTrigger from './trigger/RangeTrigger'
import { timeRangePickerProps } from './types'

export default defineComponent({
  name: 'IxTimeRangePicker',
  props: timeRangePickerProps,
  setup(props, { expose, slots }) {
    const config = useGlobalConfig('timePicker')
    const dateConfig = useDateConfig()
    const { isValid, parse } = dateConfig
    const locale = getLocale('timePicker')
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-time-range-picker`)
    const [visibility, setVisibility] = useControlledProp(props, 'open', false)

    const format = computed(() => normalizeFormat(props.format))

    const { accessor, isDisabled, handleChange, handleClear } = useTimePickerCommonBindings(props)

    const [bufferValue, setBufferValue] = useState<[Date | undefined, Date | undefined] | undefined>(
      accessor.valueRef.value,
    )
    watch(accessor.valueRef, setBufferValue)

    const rangePickerControl = useRangePickerControl(
      bufferValue,
      dateConfig,
      format,
      [],
      (value: string) => !value || isValid(parse(value, format.value)),
      setBufferValue,
    )
    const [fromPickerControl, toPickerControl] = rangePickerControl
    const inputEnableStatus = useInputEnableStatus(props, config)

    expose({ focus, blur })

    const changeVisible = (visible: boolean) => {
      setVisibility(visible)
      if (!visible) {
        fromPickerControl.init()
        toPickerControl.init()
      }
    }
    const handleConfirm = (value: [Date | undefined, Date | undefined] | undefined) => {
      handleChange(value)
      changeVisible(false)
    }

    const formContext = inject(FORM_TOKEN, null)

    provide(timeRangePickerControl, rangePickerControl)
    provide(timeRangePickerContext, {
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

    const inputSlots = {
      suffix: slots.suffix,
      clearIcon: slots.clearIcon,
    }

    function renderSide(pickerControl: PickerControl, placeholder: string, defaultOpenValue: Date | undefined) {
      const { inputValue, selectorValue, handleInputChange, handleSelectorChange } = pickerControl
      const prefixCls = `${mergedPrefixCls.value}-panel-side`

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
          <ɵTimeSelector
            {...selectorProps.value}
            visible={visibility.value}
            defaultOpenValue={defaultOpenValue}
            value={selectorValue.value}
            onChange={handleSelectorChange}
          />
        </div>
      )
    }

    return () => {
      const renderTrigger = () => <RangeTrigger class={mergedPrefixCls.value} value={accessor.valueRef.value} />
      const renderFooter = () =>
        slots.footer?.({ onConfirm: handleConfirm }) ?? (
          <IxButton mode="primary" size="sm" onClick={() => handleConfirm(bufferValue.value)}>
            {locale.value.okText}
          </IxButton>
        )

      const renderContent = () => {
        const prefixCls = `${mergedPrefixCls.value}-panel`
        return (
          <div class={prefixCls}>
            <div class={`${prefixCls}-content`}>
              {renderSide(fromPickerControl, props.placeholder?.[0], props.defaultOpenValue?.[0])}
              {renderSide(toPickerControl, props.placeholder?.[1], props.defaultOpenValue?.[1])}
            </div>
            <div class={`${prefixCls}-footer`}>{renderFooter()}</div>
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
