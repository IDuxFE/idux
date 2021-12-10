/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { StyleValue } from 'vue'

import { computed, defineComponent, inject, normalizeClass } from 'vue'

import { useGlobalConfig } from '@idux/components/config'
import { FORM_TOKEN } from '@idux/components/form'
import { IxIcon } from '@idux/components/icon'
import { IxInput } from '@idux/components/input'
import { useFormElement } from '@idux/components/utils'

import { inputNumberProps } from './types'
import { useInputNumber } from './useInputNumber'

export default defineComponent({
  name: 'IxInputNumber',
  inheritAttrs: false,
  props: inputNumberProps,
  setup(props, { attrs, expose }) {
    const common = useGlobalConfig('common')
    const config = useGlobalConfig('inputNumber')
    const { elementRef, focus, blur } = useFormElement<HTMLInputElement>()
    const formContext = inject(FORM_TOKEN, null)
    const {
      displayValue,
      nowValue,
      isIllegal,
      isDisabled,
      handleInput,
      handleFocus,
      handleBlur,
      handleKeyDown,
      handleDec,
      handleInc,
    } = useInputNumber(props, config)

    const mergedPrefixCls = computed(() => `${common.prefixCls}-input-number`)
    const size = computed(() => props.size ?? formContext?.size.value ?? config.size)

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      const classes = {
        [prefixCls]: true,
        [`${prefixCls}-${size.value}`]: true,
        [`${prefixCls}-disabled`]: isDisabled.value,
        [`${prefixCls}-illegal`]: isIllegal.value,
      }
      return normalizeClass([classes, attrs.class])
    })

    expose({ focus, blur })

    return () => {
      const { class: className, style, ...rest } = attrs
      return (
        <span class={classes.value} style={style as StyleValue}>
          <IxInput
            {...rest}
            ref={elementRef}
            type="text"
            autocomplete="off"
            aria-valuemin={props.min}
            aria-valuemax={props.max}
            aria-valuenow={nowValue.value}
            disabled={isDisabled.value}
            readonly={props.readonly}
            placeholder={props.placeholder}
            size={props.size}
            value={displayValue.value}
            onInput={handleInput}
            onFocus={handleFocus}
            onBlur={handleBlur}
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
        </span>
      )
    }
  },
})
