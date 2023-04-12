/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { SelectProps } from '../types'
import type { VKey } from '@idux/cdk/utils'
import type { ComputedRef } from 'vue'

import { isNil } from 'lodash-es'

export function useKeyboardEvents(
  props: SelectProps,
  inputValue: ComputedRef<string>,
  selectedValue: ComputedRef<VKey[]>,
  activeValue: ComputedRef<VKey>,
  changeActiveIndex: (offset: number) => void,
  changeSelected: (key: VKey) => void,
  handleRemove: (key: VKey) => void,
  clearInput: () => void,
  setOverlayOpened: (opened: boolean) => void,
  blur: () => void | undefined,
): (evt: KeyboardEvent) => void {
  return (evt: KeyboardEvent) => {
    switch (evt.code) {
      case 'ArrowUp':
        evt.preventDefault()
        changeActiveIndex(-1)
        break
      case 'ArrowDown':
        evt.preventDefault()
        changeActiveIndex(1)
        break
      case 'Enter': {
        evt.preventDefault()
        const key = activeValue.value
        !isNil(key) && changeSelected(key)
        props.allowInput && clearInput()
        if (!props.multiple) {
          setOverlayOpened(false)
          blur()
        }
        break
      }
      case 'Backspace': {
        const selectedLength = selectedValue.value.length
        if (!inputValue.value && selectedLength) {
          handleRemove(selectedValue.value[selectedLength - 1])
        }
        break
      }
      case 'Escape':
        evt.preventDefault()
        setOverlayOpened(false)
        break
    }
  }
}
