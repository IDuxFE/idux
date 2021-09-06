import type { ComputedRef } from 'vue'
import type { RadioProps, RadioGroupProps } from './types'
import type { RadioGroupContext } from './token'

import { computed, defineComponent, inject, ref } from 'vue'
import { useValueAccessor } from '@idux/cdk/forms'
import { callEmit } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { useFormItemRegister } from '@idux/components/form'
import { radioGroupToken } from './token'
import { radioProps } from './types'

export default defineComponent({
  name: 'IxRadio',
  props: radioProps,
  setup(props, { attrs, expose, slots }) {
    const radioGroup = inject(radioGroupToken, null)
    const mergedName = computed(() => (attrs.name as string) ?? radioGroup?.props.name)
    const isButtoned = computed(() => props.buttoned ?? radioGroup?.props.buttoned)
    const { isChecked, isDisabled, handleChange, handleBlur, handleFocus } = useRadio(props, radioGroup)
    const classes = useClasses(props, radioGroup?.props, isButtoned, isChecked, isDisabled)
    const { inputRef, focus, blur } = useElement()

    expose({ focus, blur })

    return () => {
      const { autofocus, value, label } = props
      const labelNode = slots.default?.() ?? label
      const labelWrapper = labelNode ? <span class="ix-radio-label">{labelNode}</span> : undefined
      return (
        <label class={classes.value} role="radio" aria-checked={isChecked.value} aria-disabled={isDisabled.value}>
          <span class="ix-radio-input">
            <input
              ref={inputRef}
              type="radio"
              class="ix-radio-input-inner"
              aria-hidden
              autofocus={autofocus}
              checked={isChecked.value}
              disabled={isDisabled.value}
              name={mergedName.value}
              value={value}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
            ></input>
            {isButtoned.value ? null : <span class="ix-radio-input-box"></span>}
          </span>
          {labelWrapper}
        </label>
      )
    }
  },
})

const useRadio = (props: RadioProps, radioGroup: RadioGroupContext | null) => {
  let isChecked: ComputedRef<boolean>
  let isDisabled: ComputedRef<boolean>

  let handleChange: (evt: Event) => void
  let handleBlur: (evt: FocusEvent) => void
  const handleFocus = (evt: FocusEvent) => callEmit(props.onFocus, evt)

  if (radioGroup) {
    const { accessor, props: groupProps } = radioGroup
    isChecked = computed(() => accessor.value === props.value)
    isDisabled = computed(() => props.disabled ?? accessor.disabled)
    handleBlur = (evt: FocusEvent) => {
      callEmit(props.onBlur, evt)
      accessor.markAsBlurred()
    }
    handleChange = (evt: Event) => {
      const checked = (evt.target as HTMLInputElement).checked
      callEmit(props.onChange, checked)
      if (checked) {
        const value = props.value
        callEmit(groupProps.onChange, value)
        accessor.setValue(value)
      }
    }
  } else {
    const { accessor } = useValueAccessor<boolean>({ valueKey: 'checked' })
    useFormItemRegister()
    isChecked = computed(() => accessor.value)
    isDisabled = computed(() => accessor.disabled)
    handleBlur = (evt: FocusEvent) => {
      callEmit(props.onBlur, evt)
      accessor.markAsBlurred()
    }
    handleChange = (evt: Event) => {
      const checked = (evt.target as HTMLInputElement).checked
      callEmit(props.onChange, checked)
      accessor.setValue(checked)
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
