/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, type Ref, computed, nextTick, ref, toRaw, watch } from 'vue'

import { type FormAccessor, type ValidateStatus, useAccessorAndControl } from '@idux/cdk/forms'
import { callEmit } from '@idux/cdk/utils'
import {
  type FormSize,
  useFormFocusMonitor,
  useFormItemRegister,
  useFormSize,
  useFormStatus,
} from '@idux/components/form'

import { type InputCommonProps } from './types'

export interface InputContext<T extends HTMLInputElement | HTMLTextAreaElement> {
  elementRef: Ref<T | undefined>
  accessor: FormAccessor
  mergedSize: ComputedRef<FormSize | undefined>
  mergedStatus: ComputedRef<ValidateStatus | undefined>
  clearIcon: ComputedRef<string>
  clearVisible: ComputedRef<boolean>
  clearable: ComputedRef<boolean>
  isFocused: Ref<boolean>
  isComposing: Ref<boolean>

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

export function useInput<T extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement | HTMLTextAreaElement>(
  props: InputCommonProps,
  config: { clearable: boolean; clearIcon: string; size: FormSize; trim: boolean },
): InputContext<T> {
  const { accessor, control } = useAccessorAndControl()
  useFormItemRegister(control)
  const mergedSize = useFormSize(props, config)
  const mergedStatus = useFormStatus(props, control)

  const clearable = computed(() => props.clearable ?? config.clearable)
  const clearIcon = computed(() => props.clearIcon ?? config.clearIcon)
  const clearVisible = computed(() => !accessor.disabled && !props.readonly && !!accessor.value)
  const mergedTrim = computed(() => props.trim ?? config.trim)

  const isFocused = ref(false)
  const handleFocus = (evt: FocusEvent) => {
    isFocused.value = true
    callEmit(props.onFocus, evt)
  }
  const handleBlur = (evt: FocusEvent) => {
    isFocused.value = false
    accessor.markAsBlurred()
    callEmit(props.onBlur, evt)

    if (mergedTrim.value) {
      setValue((evt.target as T).value.trim())
    }
  }

  const { elementRef, focus, blur } = useFormFocusMonitor<T>({
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

    setValue((evt.target as T).value)
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
    mergedSize,
    mergedStatus,
    clearable,
    clearIcon,
    clearVisible,
    isFocused,
    isComposing,

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
