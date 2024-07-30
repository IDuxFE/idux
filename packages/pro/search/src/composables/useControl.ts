/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ActiveSegmentContext } from './useActiveSegment'
import type { FocusStateContext } from './useFocusedState'
import type { SearchStateContext } from './useSearchStates'

import { type Ref, onBeforeUnmount, watch } from 'vue'

import { useEventListener } from '@idux/cdk/utils'

export function useControl(
  elementRef: Ref<HTMLElement | undefined>,
  activeSegmentContext: ActiveSegmentContext,
  searchStateContext: SearchStateContext,
  focusEventContext: FocusStateContext,
): void {
  const { isActive, nameSelectActive, quickSelectActive, setOverlayOpened, setInactive, setTempActive } =
    activeSegmentContext
  const { searchStates } = searchStateContext
  const { focused, focusVia, onFocus, onBlur } = focusEventContext

  onFocus(evt => {
    if (evt.target === elementRef.value) {
      setTempActive()
    }
  })
  onBlur(() => {
    setInactive()
  })

  watch([isActive, searchStates], ([active]) => {
    if (!active && focused.value) {
      focusVia(elementRef)
    }
  })

  const clearListener = ((clearHandlers: (() => void)[]) => {
    return () => {
      clearHandlers.forEach(handler => handler())
    }
  })([
    useEventListener(elementRef, 'mousedown', evt => {
      if (!focused.value) {
        return
      }

      if (!nameSelectActive.value && !quickSelectActive.value) {
        setTempActive()
      } else {
        setOverlayOpened(true)
      }

      if (!(evt.target instanceof HTMLInputElement)) {
        evt.preventDefault()
      }
    }),
    useEventListener(elementRef, 'keydown', evt => {
      if (focused.value && !isActive.value && !['Backspace', 'Escape'].includes(evt.code)) {
        setTempActive()
      }
    }),
  ])
  onBeforeUnmount(() => {
    clearListener()
  })
}
