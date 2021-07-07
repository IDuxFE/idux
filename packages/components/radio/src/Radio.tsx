import type { ComputedRef } from 'vue'
import type { RadioProps, RadioGroupProps } from './types'
import type { RadioGroupContext } from './token'

import { computed, defineComponent, inject, ref } from 'vue'
import { useValueAccessor } from '@idux/cdk/forms'
import { callEmit } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { radioGroupToken } from './token'
import { radioProps } from './types'

export default defineComponent({
  name: 'IxRadio',
  props: radioProps,
  setup(props) {
    const radioGroup = inject(radioGroupToken, null)
    const name = computed(() => radioGroup?.props.name)
    const isButtoned = computed(() => props.buttoned ?? radioGroup?.props.buttoned)
    const { isChecked, isDisabled, handleChange, handleBlur, handleFocus } = useRadio(props, radioGroup)
    const classes = useClasses(props, radioGroup?.props, isButtoned, isChecked, isDisabled)
    const { inputRef, focus, blur } = useElement()
    return {
      classes,
      isButtoned,
      isChecked,
      isDisabled,
      name,
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
      classes,
      autofocus,
      isButtoned,
      isChecked,
      isDisabled,
      name,
      value,
      handleChange,
      handleBlur,
      handleFocus,
    } = this
    const child = this.$slots.default ? this.$slots.default() : this.label
    return (
      <label class={classes} role="radio" aria-checked={isChecked} aria-disabled={isDisabled}>
        <span class="ix-radio-input">
          <input
            ref="inputRef"
            type="radio"
            class="ix-radio-input-inner"
            aria-hidden
            autofocus={autofocus}
            checked={isChecked}
            disabled={isDisabled}
            name={name}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
          ></input>
          {isButtoned ? null : <span class="ix-radio-input-box"></span>}
        </span>
        <span class="ix-radio-label">{child}</span>
      </label>
    )
  },
})

const useRadio = (props: RadioProps, radioGroup: RadioGroupContext | null) => {
  let isChecked: ComputedRef<boolean>
  let isDisabled: ComputedRef<boolean>

  let handleChange: (evt: Event) => void
  let handleBlur: (evt: FocusEvent) => void
  const handleFocus = (evt: FocusEvent) => callEmit(props.onFocus, evt)

  if (radioGroup) {
    const { valueAccessor, props: groupProps } = radioGroup
    isChecked = computed(() => valueAccessor.value === props.value)
    isDisabled = computed(() => props.disabled ?? valueAccessor.disabled)
    handleBlur = (evt: FocusEvent) => {
      callEmit(props.onBlur, evt)
      valueAccessor.markAsBlurred()
    }
    handleChange = (evt: Event) => {
      const checked = (evt.target as HTMLInputElement).checked
      callEmit(props.onChange, checked)
      if (checked) {
        const value = props.value
        valueAccessor.setValue(value)
        callEmit(groupProps.onChange, value)
      }
    }
  } else {
    const valueAccessor = useValueAccessor<boolean>({ valueKey: 'checked' })
    isChecked = computed(() => valueAccessor.value)
    isDisabled = computed(() => valueAccessor.disabled)
    handleBlur = (evt: FocusEvent) => {
      callEmit(props.onBlur, evt)
      valueAccessor.markAsBlurred()
    }
    handleChange = (evt: Event) => {
      const checked = (evt.target as HTMLInputElement).checked
      callEmit(props.onChange, checked)
      valueAccessor.setValue(checked)
    }
  }

  return { isChecked, isDisabled, handleChange, handleBlur, handleFocus }
}

const useClasses = (
  props: RadioProps,
  groupProps: RadioGroupProps | undefined,
  isButtoned: ComputedRef<boolean | undefined>,
  isChecked: ComputedRef<boolean>,
  isDisabled: ComputedRef<boolean>,
) => {
  const config = useGlobalConfig('radio')
  return computed(() => {
    const isButton = isButtoned.value
    const mode = props.mode ?? groupProps?.mode ?? 'default'
    const size = props.size ?? groupProps?.size ?? config.size
    return {
      'ix-radio': true,
      'ix-radio-button': isButton,
      'ix-radio-checked': isChecked.value,
      'ix-radio-disabled': isDisabled.value,
      [`ix-radio-${mode}`]: isButton,
      [`ix-radio-${size}`]: isButton,
    }
  })
}

const useElement = () => {
  const inputRef = ref<HTMLInputElement>()
  const focus = (options?: FocusOptions) => inputRef.value?.focus(options)
  const blur = () => inputRef.value?.blur()
  return { inputRef, focus, blur }
}
