/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, inject, onMounted, onUpdated, ref } from 'vue'

import { ɵFooter } from '@idux/components/_private/footer'
import { ɵInput, type ɵInputInstance } from '@idux/components/_private/input'
import { ɵTimePanel } from '@idux/components/_private/time-panel'

import { useInputProps } from '../composables/useInputProps'
import { useActiveValue } from '../composables/usePanelActiveValue'
import { usePanelProps } from '../composables/usePanelProps'
import { timePickerContext } from '../tokens'

export default defineComponent({
  setup() {
    const context = inject(timePickerContext)!
    const {
      slots,
      props,
      locale,
      formatRef,
      dateConfig,
      inputRef,
      inputEnableStatus,
      mergedPrefixCls,
      overlayOpened,
      handleClear,
      handleKeyDown,
      controlContext: {
        inputValue,
        panelValue,
        inputFocused,
        handleInput,
        handleInputFocus,
        handleInputBlur,
        handlePanelChange,
      },
    } = context

    const inputInstance = ref<ɵInputInstance>()
    const setInputRef = () => {
      if (inputEnableStatus.value.enableInternalInput) {
        inputRef.value = inputInstance.value?.getInputElement()
      }
    }
    onMounted(setInputRef)
    onUpdated(setInputRef)

    const inputProps = useInputProps(context)
    const panelProps = usePanelProps(props, formatRef)

    const { activeValue, setActiveValue } = useActiveValue(props, dateConfig, formatRef, panelValue)

    const handleMouseDown = (e: MouseEvent) => {
      if (!(e.target instanceof HTMLInputElement)) {
        e.preventDefault()
      }
    }

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-overlay`
      const boardPrefixCls = `${mergedPrefixCls.value}-board`

      const _panelProps = {
        ...panelProps.value,
        activeValue: activeValue.value,
        visible: overlayOpened.value,
        value: panelValue.value,
        onChange: handlePanelChange,
        'onUpdate:activeValue': setActiveValue,
      }

      const children = [
        <div class={`${prefixCls}-body ${boardPrefixCls}`} tabindex={-1} onMousedown={handleMouseDown}>
          {inputEnableStatus.value.enableInternalInput && (
            <ɵInput
              ref={inputInstance}
              class={`${boardPrefixCls}-input`}
              {...inputProps.value}
              clearVisible={!!inputValue.value}
              value={inputValue.value}
              readonly={props.readonly}
              focused={inputFocused.value}
              placeholder={props.placeholder ?? locale.timePicker.placeholder}
              onInput={handleInput}
              onClear={handleClear}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onKeydown={handleKeyDown}
              v-slots={slots}
            />
          )}
          <ɵTimePanel {..._panelProps} class={`${boardPrefixCls}-panel`} tabindex={-1} />
        </div>,
        <ɵFooter v-slots={slots} class={`${prefixCls}-footer`} footer={props.footer} />,
      ]
      return props.overlayRender ? props.overlayRender(children) : <div onMousedown={handleMouseDown}>{children}</div>
    }
  },
})
