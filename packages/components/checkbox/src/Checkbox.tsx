import type { ComputedRef, StyleValue } from 'vue'
import type { CheckboxProps, CheckValue } from './types'
import type { CheckboxGroupContext } from './token'

import { defineComponent, ref, computed, inject } from 'vue'
import { useValueAccessor } from '@idux/cdk/forms'
import { useFormItemRegister } from '@idux/components/form'
import { callEmit } from '@idux/cdk/utils'
import { checkboxGroupToken } from './token'
import { checkboxProps } from './types'

export default defineComponent({
  name: 'IxCheckbox',
  inheritAttrs: false,
  props: checkboxProps,
  setup(props, { attrs, expose, slots }) {
    const checkboxGroup = inject(checkboxGroupToken, null)
    const mergedName = computed(() => (attrs.name as string) ?? checkboxGroup?.props.name)
    const { isChecked, isDisabled, handleChange, handleBlur, handleFocus } = useCheckbox(props, checkboxGroup)
    const classes = useClasses(props, isChecked, isDisabled)
    const { inputRef, focus, blur } = useElement()

    expose({ focus, blur })

    return () => {
      const child = slots.default ? slots.default() : props.label
      const labelNode = child ? <span class="ix-checkbox-label">{child}</span> : undefined
      const { class: className, style, type, tabindex, ...restAttrs } = attrs
      return (
        <label
          class={[classes.value, className]}
          style={style as StyleValue}
          role="checkbox"
          aria-checked={isChecked.value}
          aria-disabled={isDisabled.value}
        >
          <span class="ix-checkbox-input-wrapper">
            <input
              ref={inputRef}
              type="checkbox"
              class="ix-checkbox-input"
              aria-hidden
              {...restAttrs}
              autofocus={props.autofocus}
              name={mergedName.value}
              value={props.value}
              checked={isChecked.value}
              disabled={isDisabled.value}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
            />
            <span class="ix-checkbox-inner" tabindex={tabindex as number} />
          </span>
          {labelNode}
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
  const handleFocus = (evt: FocusEvent) => callEmit(props.onFocus, evt)

  if (checkboxGroup) {
    const { props: groupProps, accessor } = checkboxGroup
    isChecked = computed(() => accessor.value?.includes(props.value ?? props.trueValue))
    isDisabled = computed(() => props.disabled ?? accessor.disabled)

    handleBlur = (evt: FocusEvent) => {
      callEmit(props.onBlur, evt)
      accessor.markAsBlurred()
    }
    handleChange = (evt: Event) => {
      const checked = (evt.target as HTMLInputElement).checked
      const checkValue = checked ? props.trueValue : props.falseValue
      const value = props.value
      const groupCheckedValue = [...accessor.value]
      const checkValueIndex = accessor.value.indexOf(value)
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
    const { accessor } = useValueAccessor<CheckValue>({ valueKey: 'checked' })
    useFormItemRegister()
    isChecked = computed(() => accessor.value === props.trueValue)
    isDisabled = computed(() => accessor.disabled)

    handleBlur = (evt: FocusEvent) => {
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

  return { isChecked, isDisabled, handleChange, handleBlur, handleFocus }
}

const useClasses = (props: CheckboxProps, isChecked: ComputedRef<boolean>, isDisabled: ComputedRef<boolean>) => {
  return computed(() => {
    const disabled = isDisabled.value
    const checked = isChecked.value
    const indeterminate = props.indeterminate

    return {
      'ix-checkbox': true,
      'ix-checkbox-disabled': !!disabled,
      'ix-checkbox-indeterminate': !!indeterminate,
      'ix-checkbox-checked': !indeterminate && checked,
    }
  })
}

const useElement = () => {
  const inputRef = ref<HTMLInputElement>()
  const focus = (options?: FocusOptions) => inputRef.value?.focus(options)
  const blur = () => inputRef.value?.blur()
  return { inputRef, focus, blur }
}
