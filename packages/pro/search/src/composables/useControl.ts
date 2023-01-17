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
  const { activeSegment, setInactive, setTempActive } = activeSegmentContext
  const { searchStates, initTempSearchState } = searchStateContext
  const { focused, focus, onFocus, onBlur } = focusEventContext

  onFocus(evt => {
    if (evt.target === elementRef.value) {
      setTempActive(true)
    }
  })
  onFocus((evt, origin) => {
    if (focused.value && evt.target === elementRef.value && origin !== 'program') {
      setTempActive(true)
    }
  }, true)
  onBlur(() => {
    setInactive()
    initTempSearchState()
  })

  watch([activeSegment, searchStates], ([segment]) => {
    if (!segment && focused.value) {
      focus()
    }
  })

  const clearListener = ((clearHandlers: (() => void)[]) => {
    return () => {
      clearHandlers.forEach(handler => handler())
    }
  })([
    useEventListener(elementRef, 'mousedown', () => {
      if (focused.value && !activeSegment.value) {
        setTempActive(true)
      }
    }),
    useEventListener(elementRef, 'keydown', evt => {
      if (focused.value && !activeSegment.value && !['Backspace', 'Escape'].includes(evt.code)) {
        setTempActive(true)
      }
    }),
  ])
  onBeforeUnmount(() => {
    clearListener()
  })
}
