/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, ref, watch } from 'vue'

import { callEmit } from '@idux/cdk/utils'

import { dateRangePickerToken } from '../token'

export default defineComponent({
  inheritAttrs: false,
  setup(_, { expose, slots }) {
    const context = inject(dateRangePickerToken)!
    const {
      accessor,
      props,
      locale,
      rangeControlContext: { fromControl, toControl },
      mergedPrefixCls,
      formatRef,
      inputRef,
      inputEnableStatus,
      selectedShortcut,
      renderSeparator,
    } = context

    const triggerInputRef = ref<HTMLInputElement>()
    const triggerToInputRef = ref<HTMLInputElement>()
    const triggerRef = ref<HTMLElement>()

    const placeholders = computed(() => [
      props.placeholder?.[0] ?? locale.dateRangePicker[`${props.type}Placeholder`][0],
      props.placeholder?.[1] ?? locale.dateRangePicker[`${props.type}Placeholder`][1],
    ])
    const inputSize = computed(() => Math.max(10, formatRef.value.length) + 2)

    const handleFromInput = (evt: Event) => {
      fromControl.handleInput(evt)
      callEmit(props.onInput, true, evt)
    }
    const handleToInput = (evt: Event) => {
      toControl.handleInput(evt)
      callEmit(props.onInput, false, evt)
    }

    const focus = () => {
      const inputEl = (inputEnableStatus.value.allowInput === 'overlay' ? triggerInputRef : inputRef).value

      if (inputEl) {
        inputEl.focus()
      } else {
        triggerRef.value?.focus()
      }
    }
    expose({ focus })

    watch(
      () => selectedShortcut.value?.selectedLabel,
      label => {
        if (!label) {
          return
        }

        if (
          document.activeElement === triggerInputRef.value ||
          document.activeElement === triggerToInputRef.value ||
          document.activeElement === inputRef.value
        ) {
          triggerRef.value?.focus()
        }
      },
    )

    const renderSide = (isFrom: boolean) => {
      const prefixCls = mergedPrefixCls.value
      const { inputValue } = isFrom ? fromControl : toControl
      const placeholder = placeholders.value[isFrom ? 0 : 1]
      const handleInput = isFrom ? handleFromInput : handleToInput

      return (
        <input
          ref={
            isFrom ? (inputEnableStatus.value.allowInput === 'overlay' ? triggerInputRef : inputRef) : triggerToInputRef
          }
          class={`${prefixCls}-input-inner`}
          autocomplete="off"
          disabled={accessor.disabled}
          placeholder={placeholder}
          readonly={props.readonly || inputEnableStatus.value.enableInput === false}
          size={inputSize.value}
          value={inputValue.value}
          onInput={handleInput}
        />
      )
    }

    return () => (
      <div ref={triggerRef} class={`${mergedPrefixCls.value}-input`} tabindex={-1}>
        {slots.triggerContent?.({
          selectedShortcut: selectedShortcut.value,
          inputValue: [fromControl.inputValue.value, toControl.inputValue.value],
          placeholder: placeholders.value,
          readonly: props.readonly || inputEnableStatus.value.enableInput === false,
          disabled: accessor.disabled,
          handleFromInput,
          handleToInput,
        }) ??
          selectedShortcut.value?.selectedLabel ?? [
            renderSide(true),
            <span class={`${mergedPrefixCls.value}-input-separator`}>{renderSeparator()}</span>,
            renderSide(false),
          ]}
      </div>
    )
  },
})
