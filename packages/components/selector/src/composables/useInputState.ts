/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { type ComputedRef, type Ref, computed, nextTick, onMounted, ref, watch } from 'vue'

import { callEmit, useControlledProp } from '@idux/cdk/utils'

import { type SelectorProps } from '../types'

export interface InputStateContext {
  mirrorRef: Ref<HTMLSpanElement | undefined>
  inputRef: Ref<HTMLInputElement | undefined>
  inputValue: Ref<string>
  isComposing: Ref<boolean>
  mergedFocused: ComputedRef<boolean>
  handleCompositionStart: (evt: CompositionEvent) => void
  handleCompositionEnd: (evt: CompositionEvent) => void
  handleInput: (evt: Event) => void
  clearInput: () => void
  handleEnterDown: (evt: KeyboardEvent) => void
  handleFocus: (evt: FocusEvent) => void
  handleBlur: (evt: FocusEvent) => void
}

export function useInputState(props: SelectorProps, mergedSearchable: ComputedRef<boolean>): InputStateContext {
  const mirrorRef = ref<HTMLSpanElement>()
  const inputRef = ref<HTMLInputElement>()
  const [inputValue, setInputValue] = useControlledProp(props, 'input', '')
  const isComposing = ref(false)
  const focused = ref(false)
  const mergedFocused = computed(() => props.focused ?? focused.value)

  const handleFocus = (evt: FocusEvent) => {
    focused.value = true
    callEmit(props.onFocus, evt)

    nextTick(() => {
      inputRef.value?.focus()
    })
  }

  const handleBlur = (evt: FocusEvent) => {
    focused.value = false
    callEmit(props.onBlur, evt)
  }

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

  // 处理中文输入法下的回车无法触发 compositionEnd 事件的问题
  const handleEnterDown = (evt: KeyboardEvent) => {
    if (evt.code === 'Enter' && isComposing.value) {
      evt.stopImmediatePropagation()
      handleCompositionEnd(evt as any)
    }
  }

  const handleInput = (evt: Event, emitInput = true) => {
    emitInput && callEmit(props.onInput, evt)

    const inputEnabled = props.allowInput || mergedSearchable.value

    if (isComposing.value) {
      inputEnabled && syncMirrorWidth(evt)
      return
    }

    if (inputEnabled) {
      const { value } = evt.target as HTMLInputElement
      if (value !== inputValue.value) {
        setInputValue(value)
        callEmit(props.onInputValueChange, value)
      }
      syncMirrorWidth()
    }
  }

  const clearInput = () => {
    const inputElement = inputRef.value
    if (inputElement) {
      inputElement.value = ''
    }
    setInputValue('')
    callEmit(props.onInputValueChange, '')
    syncMirrorWidth()
  }

  onMounted(() => syncMirrorWidth())
  watch(mirrorRef, val => {
    if (val) {
      syncMirrorWidth()
    }
  })

  return {
    inputRef,
    mirrorRef,
    inputValue,
    isComposing,
    mergedFocused,
    handleCompositionStart,
    handleCompositionEnd,
    handleInput,
    clearInput,
    handleEnterDown,
    handleFocus,
    handleBlur,
  }
}
