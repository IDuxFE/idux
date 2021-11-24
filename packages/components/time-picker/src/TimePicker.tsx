/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, provide, withKeys } from 'vue'

import { useControlledProp } from '@idux/cdk/utils'
import { ɵOverlay } from '@idux/components/_private'
import { useGlobalConfig } from '@idux/components/config'

import { useTimePickerCommonBindings } from './composables/useTimePickerCommonBindings'
import { usePickerControl } from './composables/usePickerControl'
import { useCommonOverlayProps, useCommonInputProps, useCommonPanelProps } from './composables/useProps'
import { normalizeFormat, parseDate } from './utils'
import { FORM_TOKEN } from '@idux/components/form'
import { IxInput } from '@idux/components/input'
import TimePickerPanel from './panel/TimePickerPanel'
import { timePickerToken } from './tokens'
import { timePickerProps } from './types'

export default defineComponent({
  name: 'IxTimePicker',
  props: timePickerProps,
  setup(props, { attrs, expose, slots }) {
    const config = useGlobalConfig('timePicker')
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-time-picker`)
    const [visibility, setVisibility] = useControlledProp(props, 'open', false)

    const format = normalizeFormat(props.format)
    const { inputRef, accessor, isDisabled, handleChange, handleClear, handleBlur, handleFocus, focus, blur } =
      useTimePickerCommonBindings(props)
    const { inputValue, pannelValue, handleInputChange, handlePanelChange, handleInputConfirm, handleClose } =
      usePickerControl(
        accessor.valueRef,
        props.format,
        [],
        (value: string) => !value || parseDate(value, format, true).isValid(),
        handleChange,
      )

    provide(timePickerToken, { mergedPrefixCls })

    expose({ focus, blur })

    const changeVisible = (visible: boolean) => {
      setVisibility(visible)
      if (!visible) {
        handleClose()
      }
    }

    const formContext = inject(FORM_TOKEN, null)

    const inputProps = useCommonInputProps(props, config, formContext)
    const panelProps = useCommonPanelProps(props)
    const overlayProps = useCommonOverlayProps(props, changeVisible)

    const handleConfirm = withKeys(() => {
      changeVisible(false)
      handleInputConfirm()
    }, ['enter'])
    const handleInput = () => changeVisible(true)
    const handleInputClick = () => changeVisible(true)
    const handleInputClear = (evt: Event) => {
      handleClear(evt)
      changeVisible(false)
    }

    return () => {
      const inputSlots = {
        suffix: slots.suffix,
        clearIcon: slots.clearIcon,
      }
      const renderTrigger = () => {
        const cls = visibility.value ? `${common.prefixCls}-input-focused` : ''
        return (
          <div class={mergedPrefixCls}>
            <IxInput
              {...inputProps.value}
              ref={inputRef}
              class={cls}
              value={inputValue.value}
              disabled={isDisabled.value}
              readonly={props.readonly}
              placeholder={props.placeholder}
              onChange={handleInputChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              onClear={handleInputClear}
              onKeydown={handleConfirm}
              onInput={handleInput}
              onClick={handleInputClick}
              v-slots={inputSlots}
            />
          </div>
        )
      }
      const renderContent = () => (
        <TimePickerPanel
          {...panelProps.value}
          visible={visibility.value}
          defaultOpenValue={props.defaultOpenValue}
          value={pannelValue.value}
          onChange={handlePanelChange}
        />
      )

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
