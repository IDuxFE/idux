/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, ref } from 'vue'

import { callEmit } from '@idux/cdk/utils'

import { datePickerToken } from '../token'

export default defineComponent({
  inheritAttrs: false,
  setup(_, { expose, slots }) {
    const context = inject(datePickerToken)!
    const {
      accessor,
      props,
      locale,
      controlContext: { inputValue, handleInput: _handleInput },
      mergedPrefixCls,
      formatRef,
      inputEnableStatus,
      inputRef,
    } = context

    const triggerInputRef = ref<HTMLInputElement>()

    const placeholder = computed(() => props.placeholder ?? locale.datePicker[`${props.type}Placeholder`])
    const inputSize = computed(() => Math.max(10, formatRef.value.length) + 2)

    const focus = () => {
      ;(inputEnableStatus.value.allowInput === 'overlay' ? triggerInputRef : inputRef).value?.focus()
    }

    expose({ focus })

    const handleInput = (evt: Event) => {
      _handleInput(evt)
      callEmit(props.onInput, evt)
    }

    return () => {
      return (
        <div class={`${mergedPrefixCls.value}-input`}>
          {slots.triggerContent?.({
            inputValue: inputValue.value,
            placeholder: placeholder.value,
            readonly: props.readonly || inputEnableStatus.value.enableInput === false,
            disabled: accessor.disabled,
            handleInput,
          }) ?? (
            <input
              ref={inputEnableStatus.value.allowInput === 'overlay' ? triggerInputRef : inputRef}
              class={`${mergedPrefixCls.value}-input-inner`}
              autocomplete="off"
              disabled={accessor.disabled}
              placeholder={placeholder.value}
              readonly={props.readonly || inputEnableStatus.value.enableInput === false}
              size={inputSize.value}
              value={inputValue.value}
              onInput={handleInput}
            />
          )}
        </div>
      )
    }
  },
})
