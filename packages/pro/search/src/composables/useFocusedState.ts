/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProSearchProps } from '../types'
import type { ɵOverlayInstance } from '@idux/components/_private/overlay'

import { type ComputedRef, type Ref, onBeforeUnmount } from 'vue'

import { type FocusOrigin } from '@idux/cdk/a11y'
import { type MaybeElement, type MaybeElementRef, callEmit } from '@idux/cdk/utils'
import { useOverlayFocusMonitor } from '@idux/components/utils'

type FocusHandler = (evt: FocusEvent, origin?: FocusOrigin) => void
type BlurHandler = (evt: FocusEvent) => void

export interface FocusStateContext {
  focused: ComputedRef<boolean>
  bindMonitor: (elRef: Ref<MaybeElement>) => void
  bindOverlayMonitor: (overlayRef: Ref<ɵOverlayInstance | undefined>, overlayOpened: Ref<boolean>) => void
  focusVia: (elRef: MaybeElementRef<MaybeElement>, origin?: FocusOrigin, options?: FocusOptions) => void
  blurVia: (elRef: MaybeElementRef<MaybeElement>) => void
  onFocus: (handler: FocusHandler) => void
  onBlur: (handler: BlurHandler) => void
}

export function useFocusedState(props: ProSearchProps): FocusStateContext {
  const focusHandlerSet = new Set<FocusHandler>()
  const blurHandlerSet = new Set<BlurHandler>()
  const onFocus = (handler: FocusHandler) => {
    focusHandlerSet.add(handler)
  }
  const onBlur = (handler: BlurHandler) => {
    blurHandlerSet.add(handler)
  }

  const focusHandler = (evt: FocusEvent, origin: FocusOrigin) => {
    focusHandlerSet.forEach(handler => handler(evt, origin))
    callEmit(props.onFocus, evt)
  }
  const blurHandler = (evt: FocusEvent) => {
    blurHandlerSet.forEach(handler => handler(evt))
    callEmit(props.onBlur, evt)
  }

  onBeforeUnmount(() => {
    focusHandlerSet.clear()
    blurHandlerSet.clear()
  })

  const { focused, bindMonitor, bindOverlayMonitor, focusVia, blurVia } = useOverlayFocusMonitor(
    focusHandler,
    blurHandler,
  )

  return { focused, bindMonitor, bindOverlayMonitor, focusVia, blurVia, onFocus, onBlur }
}
