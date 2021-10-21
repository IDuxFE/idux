/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CheckboxGroupContext } from './token'
import type { CheckValue, CheckboxProps } from './types'
import type { ComputedRef, StyleValue } from 'vue'

import { computed, defineComponent, inject, normalizeClass, ref } from 'vue'

import { useValueAccessor } from '@idux/cdk/forms'
import { callEmit } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { useFormItemRegister } from '@idux/components/form'
import { useFormElement } from '@idux/components/utils'

import { checkboxGroupToken } from './token'
import { checkboxProps } from './types'

export default defineComponent({
  name: 'IxCheckbox',
  inheritAttrs: false,
  props: checkboxProps,
  setup(props, { attrs, expose, slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-checkbox`)
    const config = useGlobalConfig('checkbox')

    const { elementRef, focus, blur } = useFormElement()
    expose({ focus, blur })

    const checkboxGroup = inject(checkboxGroupToken, null)
    const mergedName = computed(() => (attrs.name as string) ?? checkboxGroup?.props.name)
    const isButtoned = computed(() => props.buttoned ?? checkboxGroup?.props.buttoned ?? false)
    const size = computed(() => props.size ?? checkboxGroup?.props.size ?? config.size)
    const { isChecked, isDisabled, isFocused, handleChange, handleBlur, handleFocus } = useCheckbox(
      props,
      checkboxGroup,
    )
    const classes = computed(() => {
      const { indeterminate } = props
      const buttoned = isButtoned.value
      const prefixCls = mergedPrefixCls.value
      const classes = {
        [prefixCls]: true,
        [`${prefixCls}-button`]: buttoned,
        [`${prefixCls}-checked`]: !indeterminate && isChecked.value,
        [`${prefixCls}-disabled`]: isDisabled.value,
        [`${prefixCls}-focused`]: isFocused.value,
        [`${prefixCls}-indeterminate`]: indeterminate,
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
          role="checkbox"
          aria-checked={isChecked.value}
          aria-disabled={isDisabled.value}
        >
          <span class={`${prefixCls}-input`}>
            <input
              ref={elementRef}
              type="checkbox"
              class={`${prefixCls}-input-inner`}
              aria-hidden
              {...restAttrs}
              autofocus={autofocus}
              name={mergedName.value}
              value={value}
              checked={isChecked.value}
              disabled={isDisabled.value}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
            />
            {!isButtoned.value && <span class={`${prefixCls}-input-box`} tabindex={tabindex as number} />}
          </span>
          {labelWrapper}
          {isButtoned.value && <span class={`${prefixCls}-button-tick`} tabindex={tabindex as number} />}
        </label>
      )
    }
  },
})

const useCheckbox = (props: CheckboxProps, checkboxGroup: CheckboxGroupContext | null) => {
  let isChecked: ComputedRef<boolean>
  let isDisabled: ComputedRef<boolean>

  let handleChange: (evt: Event) => void
  let handleBlur: (evt: FocusEvent) => void
  const isFocused = ref(false)
  const handleFocus = (evt: FocusEvent) => {
    isFocused.value = true
    callEmit(props.onFocus, evt)
  }

  if (checkboxGroup) {
    const { props: groupProps, accessor } = checkboxGroup
    isChecked = computed(() => accessor.valueRef.value?.includes(props.value ?? props.trueValue))
    isDisabled = computed(() => props.disabled ?? accessor.disabled.value)

    handleBlur = (evt: FocusEvent) => {
      isFocused.value = false
      callEmit(props.onBlur, evt)
      accessor.markAsBlurred()
    }
    handleChange = (evt: Event) => {
      const checked = (evt.target as HTMLInputElement).checked
      const checkValue = checked ? props.trueValue : props.falseValue
      const value = props.value
      const groupCheckedValue = [...accessor.valueRef.value]
      const checkValueIndex = accessor.valueRef.value.indexOf(value)
      if (checkValueIndex === -1) {
        groupCheckedValue.push(value)
      } else {
        groupCheckedValue.splice(checkValueIndex, 1)
      }
      callEmit(props.onChange, checkValue)

      callEmit(groupProps.onChange, groupCheckedValue)
      accessor.setValue(groupCheckedValue)
    }
  } else {
    const { accessor, control } = useValueAccessor<CheckValue>({ valueKey: 'checked' })
    useFormItemRegister(control)

    isChecked = computed(() => accessor.valueRef.value === props.trueValue)
    isDisabled = computed(() => accessor.disabled.value)

    handleBlur = (evt: FocusEvent) => {
      isFocused.value = false
      callEmit(props.onBlur, evt)
      accessor.markAsBlurred()
    }
    handleChange = (evt: Event) => {
      const checked = (evt.target as HTMLInputElement).checked
      const checkValue = checked ? props.trueValue : props.falseValue
      callEmit(props.onChange, checkValue)
      accessor.setValue(checkValue)
    }
  }

  return { isChecked, isDisabled, isFocused, handleChange, handleBlur, handleFocus }
}
