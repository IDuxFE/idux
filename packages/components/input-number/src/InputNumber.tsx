/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ɵInputInstance } from '@idux/components/_private/input'

import { computed, defineComponent, normalizeClass, onMounted, ref } from 'vue'

import { ɵInput } from '@idux/components/_private/input'
import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'
import { useFormFocusMonitor, useFormSize } from '@idux/components/utils'

import { inputNumberProps } from './types'
import { useInputNumber } from './useInputNumber'

export default defineComponent({
  name: 'IxInputNumber',
  props: inputNumberProps,
  setup(props, { expose }) {
    const common = useGlobalConfig('common')
    const config = useGlobalConfig('inputNumber')
    const {
      displayValue,
      nowValue,
      isIllegal,
      isDisabled,
      isFocused,
      handleInput,
      handleFocus,
      handleBlur,
      handleKeyDown,
      handleDec,
      handleInc,
    } = useInputNumber(props, config)
    const { elementRef, focus, blur } = useFormFocusMonitor<HTMLInputElement>({ handleBlur, handleFocus })
    expose({ focus, blur })

    const mergedPrefixCls = computed(() => `${common.prefixCls}-input-number`)
    const mergedSize = useFormSize(props, config)

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-illegal`]: isIllegal.value,
      })
    })

    const inputRef = ref<ɵInputInstance>()
    onMounted(() => {
      elementRef.value = inputRef.value!.getInputElement()
    })

    return () => {
      return (
        <ɵInput
          class={classes.value}
          ref={inputRef}
          type="text"
          autocomplete="off"
          aria-valuemin={props.min}
          aria-valuemax={props.max}
          aria-valuenow={nowValue.value}
          disabled={isDisabled.value}
          focused={isFocused.value}
          readonly={props.readonly}
          placeholder={props.placeholder}
          size={mergedSize.value}
          value={displayValue.value}
          onInput={handleInput}
          onKeydown={handleKeyDown}
          v-slots={{
            addonBefore: () => (
              <span class="ix-input-number-decrease" role="button" onClick={handleDec}>
                <IxIcon name="minus" />
              </span>
            ),
            addonAfter: () => (
              <span class="ix-input-number-increase" role="button" onClick={handleInc}>
                <IxIcon name="plus" />
              </span>
            ),
          }}
        />
      )
    }
  },
})
