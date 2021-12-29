/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CommonProps } from './types'
import type { ValueAccessor } from '@idux/cdk/forms'
import type { InputConfig, TextareaConfig } from '@idux/components/config'
import type { ComputedRef, Ref } from 'vue'

import { computed, nextTick, ref, toRaw, watch } from 'vue'

import { callEmit } from '@idux/cdk/utils'
import { useFormAccessor, useFormFocusMonitor } from '@idux/components/utils'

export interface InputContext<T extends HTMLInputElement | HTMLTextAreaElement> {
  elementRef: Ref<T | undefined>
  accessor: ValueAccessor
  clearIcon: ComputedRef<string>
  clearVisible: ComputedRef<boolean>
  clearable: ComputedRef<boolean>
  isFocused: Ref<boolean>

  focus: (options?: FocusOptions) => void
  blur: () => void

  handleInput: (evt: Event) => void
  handleCompositionStart: (evt: CompositionEvent) => void
  handleCompositionEnd: (evt: CompositionEvent) => void
  handleFocus: (evt: FocusEvent) => void
  handleBlur: (evt: FocusEvent) => void
  handleClear: (evt: MouseEvent) => void
  syncValue: () => void
}

export function useInput(
  props: CommonProps,
  config: InputConfig | TextareaConfig,
): InputContext<HTMLInputElement | HTMLTextAreaElement> {
  const accessor = useFormAccessor()

  const clearable = computed(() => props.clearable ?? config.clearable)
  const clearIcon = computed(() => props.clearIcon ?? config.clearIcon)
  const clearVisible = computed(() => !accessor.disabled.value && !props.readonly && !!accessor.valueRef.value)

  const isFocused = ref(false)
  const handleFocus = (evt: FocusEvent) => {
    isFocused.value = true
    callEmit(props.onFocus, evt)
  }
  const handleBlur = (evt: FocusEvent) => {
    isFocused.value = false
    callEmit(props.onBlur, evt)
    accessor.markAsBlurred()
  }

  const { elementRef, focus, blur } = useFormFocusMonitor<HTMLInputElement | HTMLTextAreaElement>({
    handleFocus,
    handleBlur,
  })

  const syncValue = () => {
    const element = elementRef.value!
    const value = accessor.valueRef.value ?? ''
    if (element && element.value !== value) {
      element.value = value
    }
  }

  watch(accessor.valueRef, () => syncValue())

  const isComposing = ref(false)
  const handleInput = (evt: Event) => {
    callEmit(props.onInput, evt)
    if (isComposing.value) {
      return
    }
    const { value } = evt.target as HTMLInputElement
    const oldValue = toRaw(accessor.valueRef.value)
    if (value !== oldValue) {
      accessor.setValue(value)
      callEmit(props.onChange, value, oldValue)

      //controlled value , see: https://github.com/IDuxFE/idux/issues/495
      nextTick(() => syncValue())
    }
  }

  const handleCompositionStart = (evt: CompositionEvent) => {
    isComposing.value = true
    callEmit(props.onCompositionStart, evt)
  }
  const handleCompositionEnd = (evt: CompositionEvent) => {
    callEmit(props.onCompositionEnd, evt)
    if (isComposing.value) {
      isComposing.value = false
      handleInput(evt)
    }
  }

  const handleClear = (evt: MouseEvent) => {
    callEmit(props.onClear, evt)
    accessor.setValue('')
  }

  return {
    elementRef,
    accessor,
    clearable,
    clearIcon,
    clearVisible,
    isFocused,

    focus,
    blur,

    handleInput,
    handleCompositionStart,
    handleCompositionEnd,
    handleFocus,
    handleBlur,
    handleClear,
    syncValue,
  }
}
