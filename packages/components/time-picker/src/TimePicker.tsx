import { computed, defineComponent } from 'vue'
import dayjs from 'dayjs/esm'
import { IxOverlay, ɵUseVisibility } from '@idux/components/_private'
import { useGlobalConfig } from '@idux/components/config'
import { IxInput } from '@idux/components/input'
import TimePickerPanel from './TimePickerPanel'
import { useCommonBindings, useCommonInputProps, useCommonPanelProps, useCommonOverlayProps } from './hooks'
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
    const inputProps = useCommonInputProps(props, config)
    const panelProps = useCommonPanelProps(props)
    const overlayProps = useCommonOverlayProps(props)

    const inputValue = computed(() =>
      accessor.value ? dayjs(accessor.value).format(normalizeFormat(props.format)) : '',
    )

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
          value={accessor.value}
          visible={visibility.value}
          onChange={handleChange}
        />
      )

      return (
        <IxOverlay
          {...overlayProps.value}
          v-model={[visibility.value, 'visible']}
          v-slots={{ default: renderInput, content: renderContent }}
          disabled={isDisabled.value || props.readonly}
        />
      )
    }
  },
})
