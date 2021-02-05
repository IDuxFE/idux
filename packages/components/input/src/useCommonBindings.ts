import type { ComputedRef, Ref } from 'vue'
import type { ValueAccessor } from '@idux/cdk/forms'
import type { InputConfig, TextareaConfig } from '@idux/components/core/config'
import type { InputProps, TextareaProps } from './types'

import { computed, getCurrentInstance, onMounted, ref, watchEffect } from 'vue'
import { useValueAccessor } from '@idux/cdk/forms'

interface CommonBindings {
  onCompositionStart: (evt: CompositionEvent) => void
  onCompositionEnd: (evt: CompositionEvent) => void
  onInput: (evt: Event) => void
  onFocus: (evt: FocusEvent) => void
  onBlur: (evt: FocusEvent) => void
  onClearClick: (evt: MouseEvent) => void
  isClearable: ComputedRef<boolean>
  clearHidden: ComputedRef<boolean>
  isFocused: Ref<boolean>
  valueAccessor: ValueAccessor
}

export const useCommonBindings = (
  props: InputProps | TextareaProps,
  config: InputConfig | TextareaConfig,
  elementRef: Ref<HTMLInputElement | HTMLTextAreaElement>,
): CommonBindings => {
  const { emit } = getCurrentInstance()!
  const valueAccessor = useValueAccessor()

  const isComposing = ref(false)
  const onCompositionStart = (evt: CompositionEvent) => {
    isComposing.value = true
    emit('compositionStart', evt)
  }
  const onCompositionEnd = (evt: CompositionEvent) => {
    if (isComposing.value) {
      isComposing.value = false
      onInput(evt)
    }
    emit('compositionEnd', evt)
  }
  const onInput = (evt: Event) => {
    if (isComposing.value) {
      return
    }
    const { value } = evt.target as HTMLInputElement
    valueAccessor.setValue?.(value)
    emit('input', evt)
  }

  const isFocused = ref(false)
  const onFocus = (evt: FocusEvent) => {
    isFocused.value = true
    emit('focus', evt)
  }
  const onBlur = (evt: FocusEvent) => {
    valueAccessor.markAsBlurred?.()
    isFocused.value = false
    emit('blur', evt)
  }

  const onClearClick = (evt: MouseEvent) => {
    valueAccessor.setValue?.('')
    emit('afterClear', evt)
  }

  const isClearable = computed(() => props.clearable ?? config.clearable)
  const clearHidden = computed(() => props.disabled || props.readonly || !valueAccessor.value)

  onMounted(() => {
    watchEffect(() => {
      const value = valueAccessor.value ?? ''
      const element = elementRef.value
      if (element.value !== value) {
        element.value = value
      }
    })
  })

  return {
    onCompositionStart,
    onCompositionEnd,
    onInput,
    onFocus,
    onBlur,
    onClearClick,
    isClearable,
    clearHidden,
    isFocused,
    valueAccessor,
  }
}
