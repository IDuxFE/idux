/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PickerRangeControlContext } from './useRangeControl'

export function useKeyboardEvents(setOverlayOpened: (opened: boolean) => void): (evt: KeyboardEvent) => void {
  return (evt: KeyboardEvent) => {
    if (evt.code === 'Escape' || evt.code === 'Enter') {
      setOverlayOpened(false)
    }
  }
}

export function useRangeKeyboardEvents(
  rangeControl: PickerRangeControlContext,
  setOverlayOpened: (opened: boolean) => void,
  handleChange: (value: (Date | undefined)[] | undefined) => void,
): (evt: KeyboardEvent) => void {
  const { bufferUpdated, buffer } = rangeControl
  return (evt: KeyboardEvent) => {
    switch (evt.code) {
      case 'Escape':
        setOverlayOpened(false)
        break

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
