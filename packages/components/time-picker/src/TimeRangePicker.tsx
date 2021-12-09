/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TimePickerProps } from './types'
import type { ComputedRef } from 'vue'

import { computed, defineComponent, inject, provide, watch } from 'vue'

import { isArray } from 'lodash-es'

import { useControlledProp, useState } from '@idux/cdk/utils'
import { ɵOverlay } from '@idux/components/_private/overlay'
import { ɵTimePanel } from '@idux/components/_private/time-panel'
import { IxButton } from '@idux/components/button'
import { useDateConfig, useGlobalConfig } from '@idux/components/config'
import { FORM_TOKEN } from '@idux/components/form'
import { getLocale } from '@idux/components/i18n'
import { IxInput } from '@idux/components/input'

import { useInputEnableStatus } from './composables/useInputEnableStatus'
import { PickerControl, useRangePickerControl } from './composables/usePickerControl'
import { useCommonInputProps, useCommonOverlayProps, useCommonPanelProps } from './composables/useProps'
import { useTimePickerCommonBindings } from './composables/useTimePickerCommonBindings'
import { timeRangePickerContext, timeRangePickerControl } from './tokens'
import RangeTrigger from './trigger/RangeTrigger'
import { timeRangePickerProps } from './types'
import { convertToDate } from './utils'

export default defineComponent({
  name: 'IxTimeRangePicker',
  props: timeRangePickerProps,
  setup(props, { slots }) {
    const config = useGlobalConfig('timeRangePicker')
    const dateConfig = useDateConfig()
    const { isValid, parse } = dateConfig
    const locale = getLocale('timePicker')
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-time-range-picker`)
    const [visibility, setVisibility] = useControlledProp(props, 'open', false)

    const format = computed(() => props.format ?? config.format)

    const { accessor, isDisabled, isFocused, handleChange, handleClear, handleFocus, handleBlur } =
      useTimePickerCommonBindings(props)

    function $convertToDate(value: TimePickerProps['value']) {
      if (!value) {
        return undefined
      }

      return convertToDate(dateConfig, value, format.value)
    }
    const accessorDateValue = computed(() => {
      if (!isArray(accessor.valueRef.value)) {
        return [undefined, undefined]
      }

      return accessor.valueRef.value.map(v => $convertToDate(v))
    }) as ComputedRef<[Date | undefined, Date | undefined]>
    const [bufferValue, setBufferValue] = useState<[Date | undefined, Date | undefined]>(accessorDateValue.value)
    watch(accessorDateValue, setBufferValue)

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

    const changeVisible = (visible: boolean) => {
      setVisibility(visible)
      if (!visible) {
        setBufferValue(accessorDateValue.value)
      }
    }
    const handleConfirm = (value: [Date | undefined, Date | undefined] | undefined) => {
      handleChange(value)
      changeVisible(false)
    }

    const formContext = inject(FORM_TOKEN, null)

    const renderSeparator = () => slots.separator?.() ?? props.separator ?? config.separator ?? locale.value.to

    provide(timeRangePickerControl, rangePickerControl)
    provide(timeRangePickerContext, {
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
      renderSeparator,
    })

    const inputProps = useCommonInputProps(props, config, formContext)
    const panelProps = useCommonPanelProps(props, config)
    const overlayProps = useCommonOverlayProps(props, config, mergedPrefixCls, changeVisible)

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
            visible={visibility.value}
            defaultOpenValue={$convertToDate(defaultOpenValue)}
            value={panelValue.value}
            onChange={handlePanelChange}
          />
        </div>
      )
    }

    return () => {
      const renderTrigger = () => <RangeTrigger class={mergedPrefixCls.value} value={accessorDateValue.value} />
      const renderFooter = () =>
        slots.footer?.({ onConfirm: handleConfirm }) ?? (
          <IxButton mode="primary" size="sm" onClick={() => handleConfirm(bufferValue.value)}>
            {locale.value.okText}
          </IxButton>
        )

      const renderContent = () => {
        const prefixCls = `${mergedPrefixCls.value}-overlay`
        return (
          <div class={prefixCls}>
            <div class={`${prefixCls}-content`}>
              {renderSide(
                fromPickerControl,
                props.placeholder?.[0] ?? locale.value.startTimePlaceholder,
                props.defaultOpenValue?.[0],
              )}
              <div class={`${prefixCls}-gap`}>{renderSeparator()}</div>
              {renderSide(
                toPickerControl,
                props.placeholder?.[1] ?? locale.value.endTimePlaceholder,
                props.defaultOpenValue?.[1],
              )}
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
