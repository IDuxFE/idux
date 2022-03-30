/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { type Ref, onMounted, ref } from 'vue'

import { callEmit } from '@idux/cdk/utils'
import { useFormFocusMonitor } from '@idux/components/utils'

import { type SelectorProps } from '../types'

export interface InputStateContext {
  mirrorRef: Ref<HTMLSpanElement | undefined>
  inputRef: Ref<HTMLInputElement | undefined>
  inputValue: Ref<string>
  isComposing: Ref<boolean>
  isFocused: Ref<boolean>
  focus: (options?: FocusOptions) => void
  blur: () => void
  handleCompositionStart: (evt: CompositionEvent) => void
  handleCompositionEnd: (evt: CompositionEvent) => void
  handleInput: (evt: Event) => void
  clearInput: () => void
}

export function useInputState(props: SelectorProps): InputStateContext {
  const mirrorRef = ref<HTMLSpanElement>()
  const inputValue = ref('')
  const isComposing = ref(false)
  const isFocused = ref(false)

  const handleFocus = (evt: FocusEvent) => {
    isFocused.value = true
    callEmit(props.onFocus, evt)
  }

  const handleBlur = (evt: FocusEvent) => {
    isFocused.value = false
    callEmit(props.onBlur, evt)
  }

  const { elementRef: inputRef, focus, blur } = useFormFocusMonitor<HTMLInputElement>({ handleBlur, handleFocus })

  const syncMirrorWidth = (evt?: Event) => {
    if (props.multiple) {
      const mirrorElement = mirrorRef.value
      if (!mirrorElement) {
        return
      }
      const inputText = evt ? (evt.target as HTMLInputElement).value : inputRef.value!.value
      mirrorElement.textContent = inputText
      inputRef.value!.style.width = `${mirrorElement.offsetWidth}px`
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
      handleInput(evt, false)
    }
  }

  const handleInput = (evt: Event, emitInput = true) => {
    emitInput && callEmit(props.onInput, evt)
    if (isComposing.value) {
      syncMirrorWidth(evt)
      return
    }
    if (props.allowInput || props.searchable) {
      const { value } = evt.target as HTMLInputElement
      if (value !== inputValue.value) {
        inputValue.value = value
        callEmit(props.onInputValueChange, value)
      }
      callEmit(props.onSearch, value)
      syncMirrorWidth()
    }
  }

  const clearInput = () => {
    const inputElement = inputRef.value
    if (inputElement) {
      inputElement.value = ''
    }
    inputValue.value = ''
    callEmit(props.onInputValueChange, '')
    syncMirrorWidth()
  }

  onMounted(() => syncMirrorWidth())

  return {
    inputRef,
    focus,
    blur,
    mirrorRef,
    inputValue,
    isComposing,
    isFocused,
    handleCompositionStart,
    handleCompositionEnd,
    handleInput,
    clearInput,
  }
}
