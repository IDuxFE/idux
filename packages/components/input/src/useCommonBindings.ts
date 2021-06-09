import type { ComputedRef, Ref } from 'vue'
import type { ValueAccessor } from '@idux/cdk/forms'
import type { InputConfig, TextareaConfig } from '@idux/components/config'
import type { InputProps, TextareaProps } from './types'

import { computed, onMounted, ref, watchEffect } from 'vue'
import { useValueAccessor } from '@idux/cdk/forms'
import { callEmit } from '@idux/cdk/utils'

interface CommonBindings {
  disabled: ComputedRef<boolean>
  focus: (options?: FocusOptions) => void
  blur: () => void
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
  const valueAccessor = useValueAccessor()
  const disabled = computed(() => valueAccessor.disabled)

  const isComposing = ref(false)
  const onCompositionStart = (evt: CompositionEvent) => {
    isComposing.value = true
    callEmit(props.onCompositionStart, evt)
  }
  const onCompositionEnd = (evt: CompositionEvent) => {
    callEmit(props.onCompositionEnd, evt)
    if (isComposing.value) {
      isComposing.value = false
      onInput(evt)
    }
  }
  const onInput = (evt: Event) => {
    if (isComposing.value) {
      return
    }
    const { value } = evt.target as HTMLInputElement
    valueAccessor.setValue?.(value)
    callEmit(props.onInput, evt)
  }

  const isFocused = ref(false)
  const onFocus = (evt: FocusEvent) => {
    isFocused.value = true
    callEmit(props.onFocus, evt)
  }
  const onBlur = (evt: FocusEvent) => {
    valueAccessor.markAsBlurred?.()
    isFocused.value = false
    callEmit(props.onBlur, evt)
  }

  const focus = (options?: FocusOptions) => elementRef.value.focus(options)
  const blur = () => elementRef.value.blur()

  const onClearClick = (evt: MouseEvent) => {
    valueAccessor.setValue?.('')
    callEmit(props.onAfterClear, evt)
  }

  const isClearable = computed(() => props.clearable ?? config.clearable)
  const clearHidden = computed(() => disabled.value || props.readonly || !valueAccessor.value)

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
    disabled,
    focus,
    blur,
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
