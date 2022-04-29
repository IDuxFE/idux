/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed, defineComponent, inject, normalizeClass, ref } from 'vue'

import { isNil } from 'lodash-es'

import { callEmit } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { FORM_TOKEN } from '@idux/components/form'
import { convertStringVNode, useFormAccessor, useFormElement, useKey } from '@idux/components/utils'

import { type CheckboxGroupContext, checkboxGroupToken } from './token'
import { type CheckValue, type CheckboxProps, checkboxProps } from './types'

export default defineComponent({
  name: 'IxCheckbox',
  inheritAttrs: false,
  props: checkboxProps,
  setup(props, { attrs, expose, slots }) {
    const key = useKey()
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-checkbox`)
    const config = useGlobalConfig('checkbox')

    const { elementRef, focus, blur } = useFormElement()
    expose({ focus, blur })

    const formContext = inject(FORM_TOKEN, null)
    const checkboxGroup = inject(checkboxGroupToken, null)
    const mergedName = computed(() => (attrs.name as string) ?? checkboxGroup?.props.name)
    const mergedValue = computed(() => {
      const { value } = props
      if (!isNil(value)) {
        return value
      }
      // 当在 group 中使用时，不传 value 就使用 key 作为 value
      return checkboxGroup ? key : undefined
    })
    const isButtoned = computed(() => props.buttoned ?? checkboxGroup?.props.buttoned ?? false)
    const size = computed(() => props.size ?? checkboxGroup?.props.size ?? formContext?.size.value ?? config.size)
    const { isChecked, isDisabled, isFocused, handleChange, handleBlur, handleFocus } = useCheckbox(
      props,
      checkboxGroup,
      mergedValue,
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
      const { autofocus, label } = props
      const { class: className, style, type, tabindex, ...restAttrs } = attrs
      const prefixCls = mergedPrefixCls.value
      const labelNode = convertStringVNode(slots.default, label)
      return (
        <label
          class={classes.value}
          style={style as string}
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
              autofocus={autofocus}
              name={mergedName.value}
              value={mergedValue.value}
              checked={isChecked.value}
              disabled={isDisabled.value}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              {...restAttrs}
            />
            {!isButtoned.value && <span class={`${prefixCls}-input-box`} tabindex={tabindex as number} />}
          </span>
          {labelNode && <span class={`${prefixCls}-label`}>{labelNode}</span>}
          {isButtoned.value && <span class={`${prefixCls}-button-tick`} tabindex={tabindex as number} />}
        </label>
      )
    }
  },
})

const useCheckbox = (
  props: CheckboxProps,
  checkboxGroup: CheckboxGroupContext | null,
  mergedValue: ComputedRef<unknown>,
) => {
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
    isChecked = computed(() => (accessor.valueRef.value || []).includes(mergedValue.value))
    isDisabled = computed(() => accessor.disabled.value || !!props.disabled)

    handleBlur = (evt: FocusEvent) => {
      isFocused.value = false
      callEmit(props.onBlur, evt)
      accessor.markAsBlurred()
    }

    handleChange = (evt: Event) => {
      const checked = (evt.target as HTMLInputElement).checked
      const { trueValue, falseValue } = props
      const value = mergedValue.value
      const checkValue = checked ? trueValue : falseValue
      const oldCheckValue = !checked ? trueValue : falseValue

      const oldValue = accessor.valueRef.value || []
      const newValue = [...oldValue]
      const checkValueIndex = newValue.indexOf(value)
      if (checkValueIndex === -1) {
        newValue.push(value)
      } else {
        newValue.splice(checkValueIndex, 1)
      }

      accessor.setValue(newValue)
      callEmit(props.onChange, checkValue, oldCheckValue)
      callEmit(groupProps.onChange, newValue, oldValue)
    }
  } else {
    const accessor = useFormAccessor<CheckValue>('checked')

    isChecked = computed(() => accessor.valueRef.value === props.trueValue)
    isDisabled = computed(() => accessor.disabled.value)

    handleBlur = (evt: FocusEvent) => {
      isFocused.value = false
      callEmit(props.onBlur, evt)
      accessor.markAsBlurred()
    }

    handleChange = (evt: Event) => {
      const checked = (evt.target as HTMLInputElement).checked
      const { trueValue, falseValue } = props
      const newChecked = checked ? trueValue : falseValue
      const oldChecked = !checked ? trueValue : falseValue
      accessor.setValue(newChecked)
      callEmit(props.onChange, newChecked, oldChecked)
    }
  }

  return { isChecked, isDisabled, isFocused, handleChange, handleBlur, handleFocus }
}
