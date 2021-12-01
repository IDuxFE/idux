/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { SelectProps } from '../types'
import type { FormAccessor } from '@idux/cdk/forms'
import type { Ref } from 'vue'

import { onMounted, ref } from 'vue'

import { callEmit } from '@idux/cdk/utils'

export interface InputStateContext {
  mirrorRef: Ref<HTMLSpanElement | undefined>
  inputValue: Ref<string>
  inputWidth: Ref<string>
  isComposing: Ref<boolean>
  isFocused: Ref<boolean>
  handleCompositionStart: (evt: CompositionEvent) => void
  handleCompositionEnd: (evt: CompositionEvent) => void
  handleInput: (evt: Event) => void
  handleFocus: (evt: FocusEvent) => void
  handleBlur: (evt: FocusEvent) => void
  clearInput: () => void
}

export function useInputState(
  props: SelectProps,
  inputRef: Ref<HTMLInputElement | undefined>,
  accessor: FormAccessor,
): InputStateContext {
  const mirrorRef = ref<HTMLSpanElement>()
  const inputValue = ref('')
  const inputWidth = ref('')
  const isComposing = ref(false)
  const isFocused = ref(false)

  const syncMirrorWidth = () => {
    if (props.multiple) {
      const inputElement = inputRef.value
      const mirrorElement = mirrorRef.value
      if (inputElement && mirrorElement) {
        // don't remove the space char, this is placeholder.
        mirrorElement.innerText = ` ${inputElement.value}`
        inputWidth.value = `${mirrorElement.scrollWidth}px`
      }
    }
  }

  const handleCompositionStart = (evt: CompositionEvent) => {
    isComposing.value = true
    callEmit(props.onCompositionStart, evt)
  }

  const handleCompositionEnd = (evt: CompositionEvent) => {
    if (isComposing.value) {
      isComposing.value = false
    }
    callEmit(props.onCompositionEnd, evt)
  }

  const handleInput = (evt: Event) => {
    callEmit(props.onInput, evt)
    if (isComposing.value) {
      return
    }
    if (props.allowInput || props.searchable) {
      const { value } = evt.target as HTMLInputElement
      if (value !== inputValue.value) {
        inputValue.value = value
      }
      callEmit(props.onSearch, value)
      syncMirrorWidth()
    }
  }

  const handleFocus = (evt: FocusEvent) => {
    isFocused.value = true

    callEmit(props.onFocus, evt)
  }

  const handleBlur = (evt: FocusEvent) => {
    isFocused.value = false
    callEmit(props.onBlur, evt)
    accessor.markAsBlurred()
  }

  const clearInput = () => {
    const inputElement = inputRef.value
    if (inputElement) {
      inputElement.value = ''
    }
    inputValue.value = ''

    syncMirrorWidth()
  }

  onMounted(() => syncMirrorWidth())

  return {
    mirrorRef,
    inputValue,
    inputWidth,
    isComposing,
    isFocused,
    handleCompositionStart,
    handleCompositionEnd,
    handleInput,
    handleFocus,
    handleBlur,
    clearInput,
  }
}
