/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProSearchProps } from '../types'
import type { ɵOverlayInstance } from '@idux/components/_private/overlay'

import { type ComputedRef, type Ref, onBeforeUnmount, watch } from 'vue'

import { type FocusOrigin, useSharedFocusMonitor } from '@idux/cdk/a11y'
import { type MaybeElement, type MaybeElementRef, callEmit, useState } from '@idux/cdk/utils'

type FocusHandler = (evt: FocusEvent, origin?: FocusOrigin) => void
type BlurHandler = (evt: FocusEvent) => void

export interface FocusStateContext {
  focused: ComputedRef<boolean>
  bindMonitor: (elRef: Ref<MaybeElement>) => void
  bindOverlayMonitor: (overlayRef: Ref<ɵOverlayInstance | undefined>, overlayOpened: Ref<boolean>) => void
  focusVia: (elRef: MaybeElementRef<MaybeElement>, origin?: FocusOrigin, options?: FocusOptions) => void
  blurVia: (elRef: MaybeElementRef<MaybeElement>) => void
  onFocus: (handler: FocusHandler, deep?: boolean) => void
  onBlur: (handler: BlurHandler, deep?: boolean) => void
}

export function useFocusedState(props: ProSearchProps): FocusStateContext {
  const [focused, setFocused] = useState(false)
  const { handleFocus, handleBlur } = useFocusHandlers(props, focused, setFocused)

  const focusHandlerSet = new Set<FocusHandler>()
  const blurHandlerSet = new Set<BlurHandler>()
  const deepFocusHandlerSet = new Set<FocusHandler>()
  const deepBlurHandlerSet = new Set<BlurHandler>()
  const onFocus = (handler: FocusHandler, deep = false) => {
    ;(deep ? deepFocusHandlerSet : focusHandlerSet).add(handler)
  }
  const onBlur = (handler: BlurHandler, deep = false) => {
    ;(deep ? deepBlurHandlerSet : blurHandlerSet).add(handler)
  }

  onBeforeUnmount(() => {
    focusHandlerSet.clear()
    blurHandlerSet.clear()
    deepFocusHandlerSet.clear()
    deepBlurHandlerSet.clear()
  })

  const _handleFocus = (evt: FocusEvent, origin: FocusOrigin) => {
    if (props.disabled) {
      return
    }

    deepFocusHandlerSet.forEach(handler => handler(evt, origin))

    handleFocus(evt, () => {
      focusHandlerSet.forEach(handler => handler(evt, origin))
    })
  }
  const _handleBlur = (evt: FocusEvent) => {
    if (props.disabled) {
      return
    }

    deepBlurHandlerSet.forEach(handler => handler(evt))

    handleBlur(evt, () => {
      blurHandlerSet.forEach(handler => handler(evt))
    })
  }

  const { bindMonitor, bindOverlayMonitor, focusVia, blurVia } = useMonitor(_handleFocus, _handleBlur)

  return { focused, bindMonitor, bindOverlayMonitor, focusVia, blurVia, onFocus, onBlur }
}

function useFocusHandlers(
  props: ProSearchProps,
  focused: ComputedRef<boolean>,
  setFocused: (focused: boolean) => void,
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
  const handleBlur = async (evt: FocusEvent, cb?: () => void) => {
    // if a subsequent focus event is triggered within the monitored elements
    // we considered the pro search component is still focused
    // then we skip the blur handler for this time
    if (await checkSubsequentFocus(evt)) {
      return
    }

    cb?.()

    setFocused(false)

    callEmit(props.onBlur, evt)
  }

  const handleFocus = (evt: FocusEvent, cb?: () => void) => {
    // record focus evt time stamp
    lastFocusEvtTime = evt.timeStamp

    if (focused.value) {
      return
    }

    cb?.()

    setFocused(true)
    callEmit(props.onFocus, evt)
  }

  return {
    handleFocus,
    handleBlur,
  }
}

function useMonitor(
  handleFocus: (evt: FocusEvent, origin: FocusOrigin) => void,
  handleBlur: (evt: FocusEvent) => void,
): {
  bindMonitor: (elRef: Ref<MaybeElement>) => void
  bindOverlayMonitor: (overlayRef: Ref<ɵOverlayInstance | undefined>, overlayOpened: Ref<boolean>) => void
  focusVia: (elRef: MaybeElementRef<MaybeElement>, origin?: FocusOrigin, options?: FocusOptions) => void
  blurVia: (elRef: MaybeElementRef<MaybeElement>) => void
} {
  const { monitor, stopMonitoring, focusVia: _focusVia, blurVia } = useSharedFocusMonitor()

  const monitorStops = new Set<() => void>()
  const _bindMonitor = (el: MaybeElement) => {
    const stop = watch(monitor(el, true), evt => {
      const { origin, event } = evt
      if (event) {
        if (origin) {
          handleFocus(event, origin)
        } else {
          handleBlur(event)
        }
      }
    })

    return () => {
      stop()
      stopMonitoring(el)
    }
  }

  const bindMonitor = (elRef: Ref<MaybeElement>) => {
    let stop: () => void | undefined
    const stopWatch = watch(
      elRef,
      el => {
        stop?.()

        if (!el) {
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
  const bindOverlayMonitor = (overlayRef: Ref<ɵOverlayInstance | undefined>, overlayOpened: Ref<boolean>) => {
    let stop: () => void | undefined

    const stopWatch = watch(
      [() => overlayRef.value?.getPopperElement(), overlayOpened],
      ([el, opened], [formerEl]) => {
        stop?.()
        formerEl && stopMonitoring(formerEl)
        if (!opened || !el) {
          return
        }

        _bindMonitor(el)
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

  onBeforeUnmount(() => {
    unbindAllMonitor()
  })

  const focusVia = (elRef: MaybeElementRef<MaybeElement>, origin?: FocusOrigin, options?: FocusOptions) => {
    _focusVia(elRef, origin ?? 'program', options)
  }

  return {
    bindMonitor,
    bindOverlayMonitor,
    focusVia,
    blurVia,
  }
}
