/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject } from 'vue'

import { ɵTrigger } from '@idux/components/_private/trigger'

import { useTriggerProps } from '../composables/useTriggerProps'
import { timePickerContext } from '../tokens'

export default defineComponent({
  inheritAttrs: false,
  setup(_, { attrs }) {
    const context = inject(timePickerContext)!
    const {
      props: pickerProps,
      slots,
      locale,
      mergedPrefixCls,
      formatRef,
      inputRef,
      inputEnableStatus,
      controlContext: { inputValue, handleInput },
    } = context

    const placeholder = computed(() => pickerProps.placeholder ?? locale.timePicker.placeholder)
    const inputSize = computed(() => Math.max(10, formatRef.value.length) + 2)

    const triggerProps = useTriggerProps(context)
    const renderContent = (prefixCls: string) => {
      const { readonly, disabled } = triggerProps.value

      return (
        <input
          ref={inputEnableStatus.value.enableExternalInput ? inputRef : undefined}
          class={`${prefixCls}-input`}
          autocomplete="off"
          disabled={disabled}
          placeholder={placeholder.value}
          readonly={readonly}
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
