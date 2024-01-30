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
  overlayOpened: ComputedRef<boolean>,
  changeActiveIndex: (offset: number) => void,
  changeSelected: (key: VKey) => void,
  handleRemove: (key: VKey) => void,
  clearInput: () => void,
  setOverlayOpened: (opened: boolean) => void,
): (evt: KeyboardEvent) => void {
  return (evt: KeyboardEvent) => {
    const ensureOverlayOpened = () => {
      if (['Backspace', 'Tab'].includes(evt.code)) {
        return
      }

      if (!overlayOpened.value) {
        setOverlayOpened(true)
      }
    }

    switch (evt.code) {
      case 'ArrowUp':
        evt.preventDefault()
        changeActiveIndex(-1)
        ensureOverlayOpened()
        break
      case 'ArrowDown':
        evt.preventDefault()
        changeActiveIndex(1)
        ensureOverlayOpened()
        break
      case 'Enter': {
        evt.preventDefault()
        const key = activeValue.value

        if (!isNil(key) && ((props.allowInput && inputValue.value) || overlayOpened.value)) {
          changeSelected(key)
        }

        if (!overlayOpened.value && (!props.allowInput || !inputValue.value)) {
          ensureOverlayOpened()
        } else if (!props.multiple) {
          setOverlayOpened(false)
        }

        ;(props.allowInput || !props.multiple) && clearInput()
        break
      }
      case 'Backspace': {
        const selectedLength = selectedValue.value.length
        if (!inputValue.value && selectedLength) {
          handleRemove(selectedValue.value[selectedLength - 1])
        }
        break
      }
      case 'Escape': {
        evt.preventDefault()
        setOverlayOpened(false)
        break
      }

      default: {
        ensureOverlayOpened()
      }
    }
  }
}
