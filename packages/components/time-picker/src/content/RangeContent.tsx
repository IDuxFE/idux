/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, onMounted, onUpdated, ref } from 'vue'

import { ɵFooter } from '@idux/components/_private/footer'
import { ɵInput, type ɵInputInstance } from '@idux/components/_private/input'
import { ɵTimePanel } from '@idux/components/_private/time-panel'

import { useInputProps } from '../composables/useInputProps'
import { useRangeActiveValue } from '../composables/usePanelActiveValue'
import { usePanelProps } from '../composables/usePanelProps'
import { timeRangePickerContext } from '../tokens'

export default defineComponent({
  setup() {
    const context = inject(timeRangePickerContext)!
    const {
      props,
      slots,
      dateConfig,
      locale,
      mergedPrefixCls,
      formatRef,
      inputRef,
      inputEnableStatus,
      overlayOpened,
      handleChange,
      handleKeyDown,
      renderSeparator,
      setOverlayOpened,
      rangeControlContext: { buffer, fromControl, toControl },
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

    const { fromActiveValue, toActiveValue, setFromActiveValue, setToActiveValue } = useRangeActiveValue(
      props,
      dateConfig,
      formatRef,
      computed(() => [fromControl.panelValue.value, toControl.panelValue.value]),
    )

    const handleConfirm = () => {
      handleChange(buffer.value)
      setOverlayOpened(false)
    }

    function renderBoard(isFrom: boolean) {
      const {
        inputValue,
        inputFocused,
        panelValue,
        handleInput,
        handleInputClear,
        handleInputFocus,
        handleInputBlur,
        handlePanelChange,
      } = isFrom ? fromControl : toControl

      const idx = isFrom ? 0 : 1
      const placeholder = props.placeholder?.[idx] ?? locale.timeRangePicker.placeholder[idx]
      const prefixCls = `${mergedPrefixCls.value}-board`

      const _panelProps = {
        ...panelProps.value,
        activeValue: isFrom ? fromActiveValue.value : toActiveValue.value,
        visible: overlayOpened.value,
        value: panelValue.value,
        onChange: handlePanelChange,
        'onUpdate:activeValue': isFrom ? setFromActiveValue : setToActiveValue,
      }

      return (
        <div class={prefixCls}>
          {inputEnableStatus.value.enableInternalInput && (
            <ɵInput
              ref={isFrom ? inputInstance : undefined}
              class={`${prefixCls}-input`}
              {...inputProps.value}
              clearVisible={!!inputValue.value}
              value={inputValue.value}
              readonly={props.readonly}
              focused={inputFocused.value}
              placeholder={placeholder}
              onInput={handleInput}
              onClear={handleInputClear}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onKeydown={handleKeyDown}
              v-slots={slots}
            />
          )}
          <ɵTimePanel {..._panelProps} class={`${prefixCls}-panel`} tabindex={-1} />
        </div>
      )
    }

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-overlay`
      const separatorClasses = {
        [`${prefixCls}-separator`]: true,
        [`${prefixCls}-separator-line`]: !inputEnableStatus.value.enableInternalInput,
      }

      const children = [
        <div class={`${prefixCls}-body`}>
          {renderBoard(true)}
          <div class={separatorClasses}>{inputEnableStatus.value.enableInternalInput && renderSeparator()}</div>
          {renderBoard(false)}
        </div>,
        <ɵFooter
          v-slots={slots}
          class={`${prefixCls}-footer`}
          footer={props.footer}
          okText={locale.timeRangePicker.okText}
          okButton={{ size: 'xs', mode: 'primary' }}
          cancelVisible={false}
          ok={handleConfirm}
        />,
      ]
      return props.overlayRender ? props.overlayRender(children) : <div>{children}</div>
    }
  },
})
