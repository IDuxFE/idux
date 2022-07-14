/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CommonProps } from './types'
import type { InputConfig, TextareaConfig } from '@idux/components/config'
import type { ComputedRef, Ref } from 'vue'

import { computed, nextTick, ref, toRaw, watch } from 'vue'

import { FormAccessor, useAccessorAndControl } from '@idux/cdk/forms'
import { callEmit } from '@idux/cdk/utils'
import { useFormFocusMonitor, useFormItemRegister } from '@idux/components/form'

export interface InputContext<T extends HTMLInputElement | HTMLTextAreaElement> {
  elementRef: Ref<T | undefined>
  accessor: FormAccessor
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
  const { accessor, control } = useAccessorAndControl()
  useFormItemRegister(control)

  const clearable = computed(() => props.clearable ?? config.clearable)
  const clearIcon = computed(() => props.clearIcon ?? config.clearIcon)
  const clearVisible = computed(() => !accessor.disabled && !props.readonly && !!accessor.value)

  const isFocused = ref(false)
  const handleFocus = (evt: FocusEvent) => {
    isFocused.value = true
    callEmit(props.onFocus, evt)
  }
  const handleBlur = (evt: FocusEvent) => {
    isFocused.value = false
    accessor.markAsBlurred()
    callEmit(props.onBlur, evt)

    if (props.trim) {
      setValue((evt.target as HTMLInputElement).value.trim())
    }
  }

  const { elementRef, focus, blur } = useFormFocusMonitor<HTMLInputElement | HTMLTextAreaElement>({
    handleFocus,
    handleBlur,
  })

  const setValue = (value: string) => {
    const oldValue = toRaw(accessor.value)
    if (value !== oldValue) {
      accessor.setValue(value)
      callEmit(props.onChange, value, oldValue)

      //controlled value , see: https://github.com/IDuxFE/idux/issues/495
      nextTick(() => syncValue())
    }
  }

  const syncValue = () => {
    const element = elementRef.value
    const value = accessor.value ?? ''
    if (element && element.value !== value) {
      element.value = value
    }
  }

  watch(
    () => accessor.value,
    () => syncValue(),
  )

  const isComposing = ref(false)
  const handleInput = (evt: Event, emitInput = true) => {
    emitInput && callEmit(props.onInput, evt)
    if (isComposing.value) {
      return
    }

    setValue((evt.target as HTMLInputElement).value)
  }

  const handleCompositionStart = (evt: CompositionEvent) => {
    isComposing.value = true
    callEmit(props.onCompositionStart, evt)
  }
  const handleCompositionEnd = (evt: CompositionEvent) => {
    callEmit(props.onCompositionEnd, evt)
    if (isComposing.value) {
      isComposing.value = false
      handleInput(evt, false)
    }
  }

  const handleClear = (evt: MouseEvent) => {
    accessor.setValue('')
    callEmit(props.onClear, evt)
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
