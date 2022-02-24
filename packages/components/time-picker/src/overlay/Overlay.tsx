/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { InputInstance } from '@idux/components/input'

import { defineComponent, inject, nextTick, ref, watch } from 'vue'

import { ɵTimePanel } from '@idux/components/_private/time-panel'
import { IxInput } from '@idux/components/input'

import { useCommonInputProps, useCommonPanelProps } from '../composables/useProps'
import { timePickerContext, timePickerControl } from '../tokens'
import { convertToDate } from '../utils'

export default defineComponent({
  name: 'IxTimePickerOverlay',
  setup() {
    const {
      slots,
      props,
      locale,
      config,
      format,
      dateConfig,
      formContext,
      inputEnableStatus,
      mergedPrefixCls,
      overlayOpened,
      commonBindings: { isDisabled, handleClear },
    } = inject(timePickerContext)!
    const { inputValue, panelValue, setInputValue, handleInputChange, handlePanelChange } = inject(timePickerControl)!

    const handleInputClear = (evt: Event) => {
      evt.stopPropagation()
      handleClear(evt)
      setInputValue('')
    }

    const inputProps = useCommonInputProps(props, config, formContext)
    const panelProps = useCommonPanelProps(props, config)

    const inputSlots = {
      clearIcon: slots.clearIcon,
    }

    const inputRef = ref<InputInstance>()
    watch(overlayOpened, opened => {
      if (opened) {
        nextTick(() => inputRef.value?.focus())
      }
    })

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-overlay`
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
              placeholder={props.placeholder ?? locale.timePicker.placeholder}
              onChange={handleInputChange}
              onClear={handleInputClear}
              v-slots={inputSlots}
            />
          )}
          <ɵTimePanel
            {...panelProps.value}
            visible={overlayOpened.value}
            defaultOpenValue={convertToDate(dateConfig, props.defaultOpenValue, format.value)}
            value={panelValue.value}
            onChange={handlePanelChange}
          />
        </div>
      )
    }
  },
})
