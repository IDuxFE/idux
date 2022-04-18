/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject } from 'vue'

import { callEmit } from '@idux/cdk/utils'
import { ɵTrigger } from '@idux/components/_private/trigger'
import { FORM_TOKEN } from '@idux/components/form'

import { useTriggerProps } from '../composables/useTriggerProps'
import { datePickerToken } from '../token'

export default defineComponent({
  setup() {
    const context = inject(datePickerToken)!
    const {
      props,
      slots,
      locale,
      controlContext: { inputValue, handleInput: _handleInput },
      mergedPrefixCls,
      formatRef,
      inputEnableStatus,
      inputRef,
    } = context
    const formContext = inject(FORM_TOKEN, null)

    const placeholder = computed(() => props.placeholder ?? locale.datePicker[`${props.type}Placeholder`])
    const inputSize = computed(() => Math.max(10, formatRef.value.length) + 2)

    const triggerProps = useTriggerProps(context, formContext)

    const handleInput = (evt: Event) => {
      _handleInput(evt)
      callEmit(props.onInput, evt)
    }

    return () => {
      const { readonly, disabled } = triggerProps.value
      const prefixCls = mergedPrefixCls.value

      return (
        <ɵTrigger className={prefixCls} v-slots={slots} {...triggerProps.value}>
          <div class={`${prefixCls}-input`}>
            <input
              ref={inputEnableStatus.value.allowInput === true ? inputRef : undefined}
              class={`${prefixCls}-input-inner`}
              autocomplete="off"
              disabled={disabled}
              placeholder={placeholder.value}
              readonly={readonly}
              size={inputSize.value}
              value={inputValue.value}
              onInput={handleInput}
            />
          </div>
        </ɵTrigger>
      )
    }
  },
})
