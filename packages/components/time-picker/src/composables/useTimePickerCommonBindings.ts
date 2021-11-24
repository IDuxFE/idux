import type { TimePickerProps } from '../types'
import type { FormAccessor } from '@idux/cdk/forms'
import type { InputInstance } from '@idux/components/input'
import type { ComputedRef, Ref } from 'vue'

import { computed, ref } from 'vue'

import { useValueAccessor } from '@idux/cdk/forms'
import { callEmit } from '@idux/cdk/utils'
import { useFormItemRegister } from '@idux/components/form'

export interface TimePickerCommonBindings {
  inputRef: Ref<InputInstance | undefined>
  accessor: FormAccessor<Date>
  isDisabled: ComputedRef<boolean>
  handleChange: (value: Date) => void
  handleClear: (evt: Event) => void
  handleBlur: (evt: FocusEvent) => void
  handleFocus: (evt: FocusEvent) => void

  focus: (options?: FocusOptions) => void
  blur: () => void
}

export function useTimePickerCommonBindings(props: TimePickerProps): TimePickerCommonBindings {
    const inputRef = ref<InputInstance>()
    const { accessor, control } = useValueAccessor()
    useFormItemRegister(control)
  
    const isDisabled = computed(() => accessor.disabled.value)
  
    const focus = (options?: FocusOptions) => inputRef.value?.focus(options)
    const blur = () => inputRef.value?.blur()
  
    function handleChange(value: Date) {
      callEmit(props.onChange, value)
      accessor.setValue(value)
      inputRef.value?.focus()
    }
  
    function handleClear(evt: Event) {
      callEmit(props.onClear, evt as MouseEvent)
      accessor.setValue(undefined)
    }
  
    function handleBlur(evt: FocusEvent) {
      callEmit(props.onBlur, evt)
      accessor.markAsBlurred()
    }
  
    function handleFocus(evt: FocusEvent) {
      callEmit(props.onFocus, evt)
    }
  
    return {
      inputRef,
      accessor,
      isDisabled,
      handleChange,
      handleClear,
      handleBlur,
      handleFocus,
      focus,
      blur,
    }
  }