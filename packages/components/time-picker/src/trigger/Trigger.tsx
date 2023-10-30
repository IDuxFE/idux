/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, ref } from 'vue'

import { callEmit } from '@idux/cdk/utils'
import { ɵTrigger } from '@idux/components/_private/trigger'

import { useTriggerProps } from '../composables/useTriggerProps'
import { timePickerContext } from '../tokens'

export default defineComponent({
  inheritAttrs: false,
  setup(_, { expose, attrs }) {
    const context = inject(timePickerContext)!
    const {
      accessor,
      props,
      slots,
      locale,
      mergedPrefixCls,
      formatRef,
      inputRef,
      inputEnableStatus,
      controlContext: { inputValue, handleInput: _handleInput },
    } = context

    const triggerInputRef = ref<HTMLInputElement>()

    const placeholder = computed(() => props.placeholder ?? locale.timePicker.placeholder)
    const inputSize = computed(() => Math.max(10, formatRef.value.length) + 2)

    const handleInput = (evt: Event) => {
      _handleInput(evt)
      callEmit(props.onInput, evt)
    }

    const focus = () => {
      ;(inputEnableStatus.value.enableExternalInput ? inputRef : triggerInputRef).value?.focus()
    }
    expose({ focus })

    const triggerProps = useTriggerProps(context)
    const renderContent = (prefixCls: string) => {
      return (
        <input
          ref={inputEnableStatus.value.enableExternalInput ? inputRef : triggerInputRef}
          class={`${prefixCls}-input`}
          autocomplete="off"
          disabled={accessor.disabled}
          placeholder={placeholder.value}
          readonly={props.readonly || !inputEnableStatus.value.enableExternalInput}
          size={inputSize.value}
          value={inputValue.value}
          onInput={handleInput}
        />
      )
    }

    return () => {
      const prefixCls = mergedPrefixCls.value
      const triggerSlots = {
        default: () => renderContent(prefixCls),
        suffix: slots.suffix,
        clearIcon: slots.clearIcon,
      }

      return <ɵTrigger className={prefixCls} v-slots={triggerSlots} {...triggerProps.value} {...attrs} />
    }
  },
})
