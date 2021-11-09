/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject } from 'vue'

import dayjs from 'dayjs/esm'

import { ɵOverlay, ɵUseVisibility } from '@idux/components/_private'
import { useGlobalConfig } from '@idux/components/config'
import { FORM_TOKEN } from '@idux/components/form'
import { IxInput } from '@idux/components/input'

import TimePickerPanel from './TimePickerPanel'
import { useCommonBindings, useCommonInputProps, useCommonOverlayProps, useCommonPanelProps } from './hooks'
import { timePickerProps } from './types'
import { normalizeFormat } from './utils'

export default defineComponent({
  name: 'IxTimePicker',
  props: timePickerProps,
  setup(props, { attrs, expose, slots }) {
    const visibility = ɵUseVisibility(props, 'open')

    const { inputRef, accessor, isDisabled, handleChange, handleClear, handleBlur, handleFocus, focus, blur } =
      useCommonBindings(props)

    expose({ focus, blur })

    const config = useGlobalConfig('timePicker')
    const formContext = inject(FORM_TOKEN, null)
    const inputProps = useCommonInputProps(props, config, formContext)
    const panelProps = useCommonPanelProps(props)
    const overlayProps = useCommonOverlayProps(props)

    const inputValue = computed(() => {
      const value = accessor.valueRef.value
      return value ? dayjs(value).format(normalizeFormat(props.format)) : ''
    })

    return () => {
      const inputSlots = {
        suffix: slots.suffix,
        clearIcon: slots.clearIcon,
      }
      const renderInput = () => {
        const cls = visibility.value ? 'ix-input-focused' : ''
        return (
          <div class="ix-time-picker">
            <IxInput
              {...inputProps.value}
              {...attrs}
              class={cls}
              ref={inputRef}
              value={inputValue.value}
              disabled={isDisabled.value}
              readonly={props.readonly}
              placeholder={props.placeholder}
              onBlur={handleBlur}
              onFocus={handleFocus}
              onClear={handleClear}
              v-slots={inputSlots}
            />
          </div>
        )
      }

      const renderContent = () => (
        <TimePickerPanel
          {...panelProps.value}
          ref="overlayRef"
          defaultOpenValue={props.defaultOpenValue}
          value={accessor.valueRef.value}
          visible={visibility.value}
          onChange={handleChange}
        />
      )

      return (
        <ɵOverlay
          {...overlayProps.value}
          v-model={[visibility.value, 'visible']}
          v-slots={{ default: renderInput, content: renderContent }}
          disabled={isDisabled.value || props.readonly}
        />
      )
    }
  },
})
