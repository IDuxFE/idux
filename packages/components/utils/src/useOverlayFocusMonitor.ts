/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ɵOverlayInstance } from '@idux/components/_private/overlay'

import { type ComputedRef, type Ref, watch } from 'vue'

import { useSharedFocusMonitor } from '@idux/cdk/a11y'
import { type MaybeElement, tryOnScopeDispose, useState } from '@idux/cdk/utils'

export function useOverlayFocusMonitor(
  onFocus: (evt: FocusEvent) => void,
  onBlur: (evt: FocusEvent) => void,
): {
  focused: ComputedRef<boolean>
  overlayFocused: ComputedRef<boolean>
  triggerFocused: ComputedRef<boolean>
  bindOverlayMonitor: (overlayRef: Ref<ɵOverlayInstance | undefined>, overlayOpened: Ref<boolean>) => void
  handleFocus: (evt: FocusEvent) => void
  handleBlur: (evt: FocusEvent) => void
} {
  const [focused, setFocused] = useState(false)
  const [overlayFocused, setOverlayFocused] = useState(false)
  const [triggerFocused, setTriggerFocused] = useState(false)
  const { monitor, stopMonitoring } = useSharedFocusMonitor()
  const { handleFocus: _handleFocus, handleBlur: _handleBlur } = useFocusHandlers(focused, setFocused, onFocus, onBlur)

  const handleFocus = (evt: FocusEvent) => {
    _handleFocus(evt)
    setTriggerFocused(true)
  }
  const handleBlur = (evt: FocusEvent) => {
    _handleBlur(evt)
    setTriggerFocused(false)
  }

  const monitorStops = new Set<() => void>()
  const _bindMonitor = (el: MaybeElement) => {
    const stop = watch(monitor(el, true), evt => {
      const { origin, event } = evt
      if (event) {
        if (origin) {
          _handleFocus(event)
          setOverlayFocused(true)
        } else {
          _handleBlur(event)
          setOverlayFocused(false)
        }
      }
    })

    return () => {
      stop()
      stopMonitoring(el)
    }
  }

  const bindOverlayMonitor = (overlayRef: Ref<ɵOverlayInstance | undefined>, overlayOpened: Ref<boolean>) => {
    let stop: () => void | undefined

    const stopWatch = watch(
      [() => overlayRef.value?.getPopperElement(), overlayOpened],
      ([el, opened]) => {
        stop?.()

        if (!opened || !el) {
          return
        }

        stop = _bindMonitor(el)
      },
      {
        immediate: true,
      },
    )

    const stopMonitor = () => {
      stop?.()
      stopWatch()
    }

    monitorStops.add(stopMonitor)

    return stopMonitor
  }

  const unbindAllMonitor = () => {
    monitorStops.forEach(stop => stop())
  }

  tryOnScopeDispose(() => {
    unbindAllMonitor()
  })

  return {
    focused,
    overlayFocused,
    triggerFocused,
    bindOverlayMonitor,
    handleFocus,
    handleBlur,
  }
}

function useFocusHandlers(
  focused: ComputedRef<boolean>,
  setFocused: (focused: boolean) => void,
  onFocus: (evt: FocusEvent) => void,
  onBlur: (evt: FocusEvent) => void,
): {
  handleFocus: (evt: FocusEvent, cb?: () => void) => void
  handleBlur: (evt: FocusEvent, cb?: () => void) => void
} {
  let lastFocusEvtTime = 0

  // check if the next focus event within the monitored elements
  // is triggered right away
  const checkSubsequentFocus = async (evt: FocusEvent) => {
    await new Promise<void>(resolve => setTimeout(resolve))

    // if last focus evt triggered time is after current blur event
    // we treat it as a subsquent focus event
    return lastFocusEvtTime > evt.timeStamp
  }
  const handleBlur = async (evt: FocusEvent) => {
    // if a subsequent focus event is triggered within the monitored elements
    // we considered the pro search component is still focused
    // then we skip the blur handler for this time
    if (await checkSubsequentFocus(evt)) {
      return
    }

    setFocused(false)
    onBlur(evt)
  }

  const handleFocus = (evt: FocusEvent, cb?: () => void) => {
    // record focus evt time stamp
    lastFocusEvtTime = evt.timeStamp

    if (focused.value) {
      return
    }

    cb?.()

    setFocused(true)
    onFocus(evt)
  }

  return {
    handleFocus,
    handleBlur,
  }
}
