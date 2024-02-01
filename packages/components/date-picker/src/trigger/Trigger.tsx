/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, ref } from 'vue'

import { callEmit } from '@idux/cdk/utils'
import { ɵTrigger } from '@idux/components/_private/trigger'
import { useThemeToken } from '@idux/components/theme'

import { useTriggerProps } from '../composables/useTriggerProps'
import { datePickerToken } from '../token'

export default defineComponent({
  inheritAttrs: false,
  setup(_, { attrs, expose }) {
    const context = inject(datePickerToken)!
    const { globalHashId, hashId } = useThemeToken('datePicker')
    const {
      accessor,
      props,
      slots,
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

    const triggerProps = useTriggerProps(context)

    const focus = () => {
      ;(inputEnableStatus.value.allowInput === 'overlay' ? triggerInputRef : inputRef).value?.focus()
    }

    expose({ focus })

    const handleInput = (evt: Event) => {
      _handleInput(evt)
      callEmit(props.onInput, evt)
    }

    const renderContent = (prefixCls: string) => {
      return (
        <div class={`${prefixCls}-input`}>
          <input
            ref={inputEnableStatus.value.allowInput === 'overlay' ? triggerInputRef : inputRef}
            class={`${prefixCls}-input-inner`}
            autocomplete="off"
            disabled={accessor.disabled}
            placeholder={placeholder.value}
            readonly={props.readonly || inputEnableStatus.value.enableInput === false}
            size={inputSize.value}
            value={inputValue.value}
            onInput={handleInput}
          />
        </div>
      )
    }

    return () => {
      const prefixCls = mergedPrefixCls.value
      const triggerSlots = {
        default: () => renderContent(prefixCls),
        suffix: slots.suffix,
        clearIcon: slots.clearIcon,
      }

      return (
        <ɵTrigger
          className={`${prefixCls} ${globalHashId.value} ${hashId.value}`}
          v-slots={triggerSlots}
          {...triggerProps.value}
          {...attrs}
        />
      )
    }
  },
})
