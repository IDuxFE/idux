/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ɵInputInstance } from '@idux/components/_private/input'

import { defineComponent, onMounted, ref } from 'vue'

import { ɵInput } from '@idux/components/_private/input'
import { useGlobalConfig } from '@idux/components/config'
import { useFormSize } from '@idux/components/form'

import { inputProps } from './types'
import { useInput } from './useInput'

export default defineComponent({
  name: 'IxInput',
  props: inputProps,
  setup(props, { slots, expose }) {
    const config = useGlobalConfig('input')
    const mergedSize = useFormSize(props, config)

    const {
      elementRef,
      accessor,
      clearable,
      clearIcon,
      clearVisible,
      isFocused,

      focus,
      blur,

      handleInput,
      handleCompositionStart,
      handleCompositionEnd,
      handleClear,
      syncValue,
    } = useInput(props, config)

    expose({ focus, blur })

    const inputRef = ref<ɵInputInstance>()
    onMounted(() => {
      elementRef.value = inputRef.value!.getInputElement()
      syncValue()
    })

    return () => {
      const { addonAfter, addonBefore, borderless, prefix, suffix } = props

      return (
        <ɵInput
          v-slots={slots}
          ref={inputRef}
          addonAfter={addonAfter}
          addonBefore={addonBefore}
          borderless={borderless}
          clearable={clearable.value}
          clearIcon={clearIcon.value}
          clearVisible={clearVisible.value}
          disabled={accessor.disabled}
          focused={isFocused.value}
          prefix={prefix}
          size={mergedSize.value}
          suffix={suffix}
          onClear={handleClear}
          readonly={props.readonly}
          onInput={handleInput}
          onCompositionstart={handleCompositionStart}
          onCompositionend={handleCompositionEnd}
        ></ɵInput>
      )
    }
  },
})
