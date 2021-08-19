import type { ComputedRef, StyleValue } from 'vue'
import type { CheckboxProps, CheckValue } from './types'
import type { CheckboxGroupContext } from './token'

import { defineComponent, ref, computed, inject } from 'vue'
import { useValueAccessor } from '@idux/cdk/forms'
import { callEmit } from '@idux/cdk/utils'
import { useAttrs } from '@idux/components/utils/'
import { checkboxGroupToken } from './token'
import { checkboxProps } from './types'

export default defineComponent({
  name: 'IxCheckbox',
  props: checkboxProps,
  inheritAttrs: false,
  setup(props) {
    const checkboxGroup = inject(checkboxGroupToken, null)
    const attrs = useAttrs({ keys: ['type', 'tabindex'] })
    const name = computed(() => (attrs.value.name as string) ?? checkboxGroup?.props.name)
    const { isChecked, isDisabled, handleChange, handleBlur, handleFocus } = useCheckbox(props, checkboxGroup)
    const classes = useClasses(props, isChecked, isDisabled)
    const { inputRef, focus, blur } = useElement()

    return {
      classes,
      attrs,
      name,
      isChecked,
      isDisabled,
      handleChange,
      handleBlur,
      handleFocus,
      inputRef,
      focus,
      blur,
    }
  },
  render() {
    const {
      autofocus,
      classes,
      isChecked,
      isDisabled,
      attrs,
      $attrs,
      name,
      value,
      handleChange,
      handleBlur,
      handleFocus,
    } = this
    const child = this.$slots.default ? this.$slots.default() : this.label
    return (
      <label
        class={[classes, $attrs.class]}
        role="checkbox"
        aria-checked={isChecked}
        aria-disabled={isDisabled}
        style={$attrs.style as StyleValue}
      >
        <span class="ix-checkbox-input-wrapper">
          <input
            ref="inputRef"
            type="checkbox"
            class="ix-checkbox-input"
            aria-hidden
            {...attrs}
            autofocus={autofocus}
            name={name}
            value={value}
            checked={isChecked}
            disabled={isDisabled}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
          <span class="ix-checkbox-inner" tabindex={$attrs.tabindex as number | string} />
        </span>
        <span class="ix-checkbox-label">{child}</span>
      </label>
    )
  },
})

const useCheckbox = (props: CheckboxProps, checkboxGroup: CheckboxGroupContext | null) => {
  let isChecked: ComputedRef<boolean>
  let isDisabled: ComputedRef<boolean>

  let handleChange: (evt: Event) => void
  let handleBlur: (evt: FocusEvent) => void
  const handleFocus = (evt: FocusEvent) => callEmit(props.onFocus, evt)

  if (checkboxGroup) {
    const { valueAccessor, props: groupProps } = checkboxGroup
    isChecked = computed(() => valueAccessor.value?.includes(props.value ?? props.trueValue))
    isDisabled = computed(() => props.disabled ?? valueAccessor.disabled)

    handleBlur = (evt: FocusEvent) => {
      callEmit(props.onBlur, evt)
      valueAccessor.markAsBlurred()
    }
    handleChange = (evt: Event) => {
      const checked = (evt.target as HTMLInputElement).checked
      const checkValue = checked ? props.trueValue : props.falseValue
      const value = props.value
      const groupCheckedValue = [...valueAccessor.value]
      const checkValueIndex = valueAccessor.value.indexOf(value)
      if (checkValueIndex === -1) {
        groupCheckedValue.push(value)
      } else {
        groupCheckedValue.splice(checkValueIndex, 1)
      }
      callEmit(props.onChange, checkValue)

      callEmit(groupProps.onChange, groupCheckedValue)
      valueAccessor.setValue(groupCheckedValue)
    }
  } else {
    const valueAccessor = useValueAccessor<CheckValue>({ valueKey: 'checked' })
    isChecked = computed(() => valueAccessor.value === props.trueValue)
    isDisabled = computed(() => valueAccessor.disabled)

    handleBlur = (evt: FocusEvent) => {
      callEmit(props.onBlur, evt)
      valueAccessor.markAsBlurred()
    }
    handleChange = (evt: Event) => {
      const checked = (evt.target as HTMLInputElement).checked
      const checkValue = checked ? props.trueValue : props.falseValue
      callEmit(props.onChange, checkValue)
      valueAccessor.setValue(checkValue)
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
