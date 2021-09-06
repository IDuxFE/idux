import type { ComputedRef, Ref } from 'vue'
import type { FormAccessor } from '@idux/cdk/forms'
import type { InputConfig, TextareaConfig } from '@idux/components/config'
import type { CommonProps } from './types'

import { computed, onMounted, ref, watchEffect } from 'vue'
import { useValueAccessor } from '@idux/cdk/forms'
import { callEmit } from '@idux/cdk/utils'

export interface CommonBindings<T extends HTMLInputElement | HTMLTextAreaElement> {
  elementRef: Ref<T | undefined>
  accessor: FormAccessor

  isDisabled: ComputedRef<boolean>
  clearIcon: ComputedRef<string>
  clearHidden: ComputedRef<boolean>
  isClearable: ComputedRef<boolean>
  isFocused: Ref<boolean>

  focus: (options?: FocusOptions) => void
  blur: () => void

  handlerInput: (evt: Event) => void
  handlerCompositionStart: (evt: CompositionEvent) => void
  handlerCompositionEnd: (evt: CompositionEvent) => void
  handlerFocus: (evt: FocusEvent) => void
  handlerBlur: (evt: FocusEvent) => void
  handlerClear: (evt: MouseEvent) => void
}

export function useCommonBindings(
  props: CommonProps,
  config: InputConfig | TextareaConfig,
): CommonBindings<HTMLInputElement | HTMLTextAreaElement> {
  const elementRef = ref<HTMLInputElement | HTMLTextAreaElement>()
  const { accessor } = useValueAccessor()

  onMounted(() => {
    watchEffect(() => {
      const value = accessor.value ?? ''
      const element = elementRef.value!
      if (element.value !== value) {
        element.value = value
      }
    })
  })

  const isDisabled = computed(() => accessor.disabled)
  const isClearable = computed(() => props.clearable ?? config.clearable)
  const clearIcon = computed(() => props.clearIcon ?? config.clearIcon)
  const clearHidden = computed(() => isDisabled.value || props.readonly || !accessor.value)

  const focus = (options?: FocusOptions) => elementRef.value?.focus(options)
  const blur = () => elementRef.value?.blur()

  const isComposing = ref(false)
  const handlerInput = (evt: Event) => {
    if (isComposing.value) {
      return
    }
    const { value } = evt.target as HTMLInputElement
    callEmit(props.onInput, evt)
    accessor.setValue?.(value)
  }

  const handlerCompositionStart = (evt: CompositionEvent) => {
    isComposing.value = true
    callEmit(props.onCompositionStart, evt)
  }
  const handlerCompositionEnd = (evt: CompositionEvent) => {
    callEmit(props.onCompositionEnd, evt)
    if (isComposing.value) {
      isComposing.value = false
      handlerInput(evt)
    }
  }

  const isFocused = ref(false)
  const handlerFocus = (evt: FocusEvent) => {
    isFocused.value = true
    callEmit(props.onFocus, evt)
  }
  const handlerBlur = (evt: FocusEvent) => {
    isFocused.value = false
    callEmit(props.onBlur, evt)
    accessor.markAsBlurred?.()
  }

  const handlerClear = (evt: MouseEvent) => {
    callEmit(props.onClear, evt)
    accessor.setValue?.('')
  }

  return {
    elementRef,
    accessor,
    isDisabled,
    clearIcon,
    clearHidden,
    isClearable,
    isFocused,

    focus,
    blur,

    handlerInput,
    handlerCompositionStart,
    handlerCompositionEnd,
    handlerFocus,
    handlerBlur,
    handlerClear,
  }
}
