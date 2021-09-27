import type { ComputedRef, StyleValue, Ref } from 'vue'
import type { CheckboxProps, CheckValue } from './types'
import type { CheckboxGroupContext } from './token'

import { defineComponent, ref, computed, inject } from 'vue'
import { useValueAccessor } from '@idux/cdk/forms'
import { useFormItemRegister } from '@idux/components/form'
import { callEmit } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { checkboxGroupToken } from './token'
import { checkboxProps, CheckboxSize } from './types'

export default defineComponent({
  name: 'IxCheckbox',
  inheritAttrs: false,
  props: checkboxProps,
  setup(props, { attrs, expose, slots }) {
    const config = useGlobalConfig('checkbox')

    const checkboxGroup = inject(checkboxGroupToken, null)
    const mergedName = computed(() => (attrs.name as string) ?? checkboxGroup?.props.name)
    const isButtoned = computed(() => props.buttoned ?? checkboxGroup?.props.buttoned ?? false)
    const size = computed(() => props.size ?? checkboxGroup?.props.size ?? config.size)
    const { isChecked, isDisabled, isFocused, handleChange, handleBlur, handleFocus } = useCheckbox(
      props,
      checkboxGroup,
    )
    const classes = useClasses(props, isChecked, isDisabled, isFocused, isButtoned, size)
    const { inputRef, focus, blur } = useElement()
    const style = useStyle(checkboxGroup, attrs.style as StyleValue)
    expose({ focus, blur })

    return () => {
      const child = slots.default ? slots.default() : props.label
      const labelNode = child ? <span class="ix-checkbox-label">{child}</span> : undefined
      const { class: className, type, tabindex, ...restAttrs } = attrs

      return (
        <label
          class={[classes.value, className]}
          style={style.value}
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
            {isButtoned.value ? null : <span class="ix-checkbox-inner" tabindex={tabindex as number} />}
          </span>
          {labelNode}
          {isButtoned.value ? <span class="ix-checkbox-button-inner" tabindex={tabindex as number} /> : null}
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
    isChecked = computed(() => accessor.value?.includes(props.value ?? props.trueValue))
    isDisabled = computed(() => props.disabled ?? accessor.disabled)

    handleBlur = (evt: FocusEvent) => {
      isFocused.value = false
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

const useClasses = (
  props: CheckboxProps,
  isChecked: ComputedRef<boolean>,
  isDisabled: ComputedRef<boolean>,
  isFocused: Ref<boolean>,
  isButtoned: ComputedRef<boolean>,
  size: ComputedRef<CheckboxSize>,
) => {
  return computed(() => {
    const disabled = isDisabled.value
    const checked = isChecked.value
    const focused = isFocused.value
    const indeterminate = props.indeterminate
    const buttoned = isButtoned.value
    const buttonSize = size.value

    return {
      'ix-checkbox': true,
      'ix-checkbox-button': !!buttoned,
      'ix-checkbox-disabled': !!disabled,
      'ix-checkbox-focused': !!focused,
      'ix-checkbox-indeterminate': !!indeterminate,
      'ix-checkbox-checked': !indeterminate && checked,
      [`ix-checkbox-button-${buttonSize}`]: !!buttoned,
    }
  })
}

const useElement = () => {
  const inputRef = ref<HTMLInputElement>()
  const focus = (options?: FocusOptions) => inputRef.value?.focus(options)
  const blur = () => inputRef.value?.blur()
  return { inputRef, focus, blur }
}

const useStyle = (checkboxGroup: CheckboxGroupContext | null, style: StyleValue = {}) => {
  return computed(() => {
    let _style: StyleValue
    const gap = checkboxGroup?.props.gap
    if (gap) {
      if (typeof style === 'string') {
        _style = `margin-right: ${gap}px;` + style
      } else if (Array.isArray(style)) {
        _style = [`margin-right: ${gap}px;`, ...style]
      } else {
        _style = Object.assign(
          {
            marginRight: `${gap}px`,
          },
          style,
        )
      }
    } else {
      _style = style
    }

    return _style
  })
}
