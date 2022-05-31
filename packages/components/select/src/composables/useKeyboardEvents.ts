/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { VKey } from '@idux/cdk/utils'
import type { ComputedRef } from 'vue'

import { isNil } from 'lodash-es'

export function useKeyboardEvents(
  isMultiple: ComputedRef<boolean>,
  activeValue: ComputedRef<VKey>,
  changeActiveIndex: (offset: number) => void,
  changeSelected: (key: VKey) => void,
  clearInput: () => void,
  setOverlayOpened: (opened: boolean) => void,
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
        isMultiple.value ? clearInput() : setOverlayOpened(false)
        break
      }
      case 'Escape':
        evt.preventDefault()
        setOverlayOpened(false)
        break
    }
  }
}
