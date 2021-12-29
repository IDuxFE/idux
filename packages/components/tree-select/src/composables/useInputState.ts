/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { TreeSelectProps } from '../types'
import type { ValueAccessor } from '@idux/cdk/forms'
import type { Ref } from 'vue'

import { onMounted, ref } from 'vue'

import { callEmit } from '@idux/cdk/utils'

export interface InputStateContext {
  mirrorRef: Ref<HTMLSpanElement | undefined>
  inputWidth: Ref<string>
  isFocused: Ref<boolean>
  handleInput: (evt: Event) => void
  handleFocus: (evt: FocusEvent) => void
  handleBlur: (evt: FocusEvent) => void
  clearInput: () => void
}

export function useInputState(
  props: TreeSelectProps,
  inputRef: Ref<HTMLInputElement | undefined>,
  accessor: ValueAccessor,
  searchValue: Ref<string>,
): InputStateContext {
  const mirrorRef = ref<HTMLSpanElement>()
  const inputWidth = ref('')
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

  const handleInput = (evt: Event) => {
    if (props.searchable === true) {
      const { value } = evt.target as HTMLInputElement
      if (value !== searchValue.value) {
        searchValue.value = value
      }
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
    accessor.markAsBlurred?.()
  }

  const clearInput = () => {
    const inputElement = inputRef.value
    if (inputElement) {
      inputElement.value = ''
    }
    searchValue.value = ''
    syncMirrorWidth()
  }

  onMounted(() => syncMirrorWidth())

  return {
    mirrorRef,
    inputWidth,
    isFocused,
    handleInput,
    handleFocus,
    handleBlur,
    clearInput,
  }
}
