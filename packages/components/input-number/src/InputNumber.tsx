/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, normalizeClass, onMounted, ref } from 'vue'

import { ɵInput, type ɵInputInstance } from '@idux/components/_private/input'
import { useGlobalConfig } from '@idux/components/config'
import { useFormFocusMonitor } from '@idux/components/form'
import { IxIcon } from '@idux/components/icon'

import { inputNumberProps } from './types'
import { useInputNumber } from './useInputNumber'

export default defineComponent({
  name: 'IxInputNumber',
  props: inputNumberProps,
  setup(props, { expose, slots }) {
    const common = useGlobalConfig('common')
    const config = useGlobalConfig('inputNumber')
    const {
      mergedSize,
      mergedStatus,
      displayValue,
      nowValue,
      isIllegal,
      isDisabled,
      isDisabledDec,
      isDisabledInc,
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

    const handleIncrease = (evt: MouseEvent) => {
      evt.stopPropagation()
      handleInc()
    }

    const handleDecrease = (evt: MouseEvent) => {
      evt.stopPropagation()
      handleDec()
    }

    return () => {
      const prefixCls = mergedPrefixCls.value
      const vSlots = {
        ...slots,
        suffix: () => [
          <span
            key="increase"
            class={normalizeClass({
              [`${prefixCls}-increase`]: true,
              [`${prefixCls}-increase-disabled`]: isDisabled.value || isDisabledInc.value,
            })}
            role="button"
            onClick={handleIncrease}
          >
            <IxIcon name="up" />
          </span>,
          <span
            key="decrease"
            class={normalizeClass({
              [`${prefixCls}-decrease`]: true,
              [`${prefixCls}-decrease-disabled`]: isDisabled.value || isDisabledDec.value,
            })}
            role="button"
            onClick={handleDecrease}
          >
            <IxIcon name="down" />
          </span>,
        ],
      }
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
          status={mergedStatus.value}
          value={displayValue.value}
          onInput={handleInput}
          onKeydown={handleKeyDown}
          v-slots={vSlots}
        />
      )
    }
  },
})
