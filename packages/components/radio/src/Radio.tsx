/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { RadioGroupContext } from './token'
import type { RadioProps } from './types'
import type { ComputedRef, Ref, StyleValue } from 'vue'

import { computed, defineComponent, inject, normalizeClass, ref } from 'vue'

import { callEmit } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { FORM_TOKEN } from '@idux/components/form'
import { useFormAccessor, useFormElement } from '@idux/components/utils'

import { radioGroupToken } from './token'
import { radioProps } from './types'

export default defineComponent({
  name: 'IxRadio',
  inheritAttrs: false,
  props: radioProps,
  setup(props, { attrs, expose, slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-radio`)
    const config = useGlobalConfig('radio')

    const { elementRef, focus, blur } = useFormElement<HTMLInputElement>()
    expose({ focus, blur })

    const formContext = inject(FORM_TOKEN, null)
    const radioGroup = inject(radioGroupToken, null)
    const mergedName = computed(() => (attrs.name as string) ?? radioGroup?.props.name)
    const isButtoned = computed(() => props.buttoned ?? radioGroup?.props.buttoned)
    const size = computed(() => props.size ?? radioGroup?.props.size ?? formContext?.size.value ?? config.size)
    const mode = computed(() => props.mode ?? radioGroup?.props.mode ?? 'default')
    const { isChecked, isDisabled, isFocused, handleChange, handleBlur, handleFocus } = useRadio(
      props,
      radioGroup,
      elementRef,
    )
    const classes = computed(() => {
      const buttoned = isButtoned.value
      const prefixCls = mergedPrefixCls.value
      const classes = {
        [prefixCls]: true,
        [`${prefixCls}-button`]: buttoned,
        [`${prefixCls}-checked`]: isChecked.value,
        [`${prefixCls}-disabled`]: isDisabled.value,
        [`${prefixCls}-focused`]: isFocused.value,
        [`${prefixCls}-${mode.value}`]: buttoned,
        [`${prefixCls}-${size.value}`]: buttoned,
      }
      return normalizeClass([classes, attrs.class])
    })

    return () => {
      const prefixCls = mergedPrefixCls.value
      const { autofocus, value, label } = props
      const labelNode = slots.default?.() ?? label
      const labelWrapper = labelNode && <span class={`${prefixCls}-label`}>{labelNode}</span>
      const { class: className, style, type, tabindex, ...restAttrs } = attrs
      return (
        <label
          class={classes.value}
          style={style as StyleValue}
          role="radio"
          aria-checked={isChecked.value}
          aria-disabled={isDisabled.value}
        >
          <span class={`${prefixCls}-input`}>
            <input
              ref={elementRef}
              type="radio"
              class={`${prefixCls}-input-inner`}
              aria-hidden
              {...restAttrs}
              autofocus={autofocus}
              checked={isChecked.value}
              disabled={isDisabled.value}
              name={mergedName.value}
              value={value}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
            />
            {isButtoned.value ? null : <span class={`${prefixCls}-input-box`} tabindex={tabindex as number}></span>}
          </span>
          {labelWrapper}
        </label>
      )
    }
  },
})

const useRadio = (
  props: RadioProps,
  radioGroup: RadioGroupContext | null,
  elementRef: Ref<HTMLInputElement | undefined>,
) => {
  let isChecked: ComputedRef<boolean>
  let isDisabled: ComputedRef<boolean>
  const isFocused = ref(false)

  let handleChange: (evt: Event) => void
  let handleBlur: (evt: FocusEvent) => void
  const handleFocus = (evt: FocusEvent) => {
    isFocused.value = true
    callEmit(props.onFocus, evt)
  }

  if (radioGroup) {
    const { accessor, props: groupProps } = radioGroup
    isChecked = computed(() => accessor.valueRef.value === props.value)
    isDisabled = computed(() => props.disabled ?? accessor.disabled.value)
    handleBlur = (evt: FocusEvent) => {
      isFocused.value = false
      callEmit(props.onBlur, evt)
      accessor.markAsBlurred()
    }
    handleChange = (evt: Event) => {
      if (elementRef.value) {
        const checked = (evt.target as HTMLInputElement).checked
        const value = props.value
        const oldValue = accessor.valueRef.value
        accessor.setValue(value)
        // 为了保持受控模式下保持原生input状态和数据一致
        elementRef.value.checked = false
        callEmit(props.onChange, checked, !checked)
        callEmit(groupProps.onChange, value, oldValue)
      }
    }
  } else {
    const accessor = useFormAccessor<boolean>('checked')
    isChecked = computed(() => !!accessor.valueRef.value)
    isDisabled = computed(() => accessor.disabled.value)
    handleBlur = (evt: FocusEvent) => {
      isFocused.value = false
      callEmit(props.onBlur, evt)
      accessor.markAsBlurred()
    }
    handleChange = (evt: Event) => {
      if (elementRef.value) {
        const checked = (evt.target as HTMLInputElement).checked
        accessor.setValue(checked)
        elementRef.value.checked = false
        callEmit(props.onChange, checked, !checked)
      }
    }
  }

  return { isChecked, isDisabled, isFocused, handleChange, handleBlur, handleFocus }
}
