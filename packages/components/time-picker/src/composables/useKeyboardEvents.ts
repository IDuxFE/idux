/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PickerRangeControlContext } from './useRangeControl'
import type { ComputedRef } from 'vue'

export function useKeyboardEvents(
  overlayOpened: ComputedRef<boolean>,
  setOverlayOpened: (opened: boolean) => void,
): (evt: KeyboardEvent) => void {
  return (evt: KeyboardEvent) => {
    if (evt.code === 'Escape') {
      setOverlayOpened(false)
      return
    }

    if (!overlayOpened.value && !['Backspace', 'Tab'].includes(evt.code)) {
      evt.preventDefault()
      setOverlayOpened(true)
      return
    }

    if (evt.code === 'Enter') {
      setOverlayOpened(false)
    }
  }
}

export function useRangeKeyboardEvents(
  rangeControl: PickerRangeControlContext,
  overlayOpened: ComputedRef<boolean>,
  setOverlayOpened: (opened: boolean) => void,
  handleChange: (value: (Date | undefined)[] | undefined) => void,
): (evt: KeyboardEvent) => void {
  const { bufferUpdated, buffer } = rangeControl
  return (evt: KeyboardEvent) => {
    if (evt.code === 'Escape') {
      setOverlayOpened(false)
      return
    }

    if (!overlayOpened.value && !['Backspace', 'Tab'].includes(evt.code)) {
      evt.preventDefault()
      setOverlayOpened(true)
      return
    }

    switch (evt.code) {
      case 'Enter':
        if (bufferUpdated.value) {
          handleChange(buffer.value)
        }
        setOverlayOpened(false)
        break

      default:
        break
    }
  }
}
