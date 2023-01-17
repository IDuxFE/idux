/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProSearchProps } from '../types'
import type { ɵOverlayProps } from '@idux/components/_private/overlay'

import { type ComputedRef, type Ref, nextTick, onBeforeUnmount, onMounted, watch } from 'vue'

import { isFunction, isString } from 'lodash-es'

import { type FocusOrigin, useSharedFocusMonitor } from '@idux/cdk/a11y'
import { MaybeElementRef, callEmit, useState } from '@idux/cdk/utils'

type FocusHandler = (evt: FocusEvent, origin?: FocusOrigin) => void
type BlurHandler = (evt: FocusEvent) => void

export interface FocusStateContext {
  focused: ComputedRef<boolean>
  focus: (options?: FocusOptions) => void
  blur: () => void
  onFocus: (handler: FocusHandler, deep?: boolean) => void
  onBlur: (handler: BlurHandler, deep?: boolean) => void
}

export function useFocusedState(
  props: ProSearchProps,
  elementRef: Ref<HTMLElement | undefined>,
  commonOverlayProps: ComputedRef<ɵOverlayProps>,
): FocusStateContext {
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

  const { focus, blur } = registerFocusBlurHandlers(
    elementRef,
    () => getContainerEl(commonOverlayProps.value),
    _handleFocus,
    _handleBlur,
  )

  const _focus = (options?: FocusOptions) => {
    focus('program', options)
  }
  const _blur = () => {
    blur()
    setFocused(false)
  }

  return { focused, focus: _focus, blur: _blur, onFocus, onBlur }
}

function getContainerEl(commonOverlayProps: ɵOverlayProps): HTMLElement | null {
  const container = isFunction(commonOverlayProps.container)
    ? commonOverlayProps.container()
    : commonOverlayProps.container
  const resolvedContainer = container ?? commonOverlayProps.containerFallback

  return isString(resolvedContainer)
    ? document.querySelector(/^[.#]/.test(resolvedContainer) ? resolvedContainer : `.${resolvedContainer}`)
    : resolvedContainer
}

function useFocusHandlers(
  props: ProSearchProps,
  focused: ComputedRef<boolean>,
  setFocused: (focused: boolean) => void,
): {
  handleFocus: (evt: FocusEvent, cb?: () => void) => void
  handleBlur: (evt: FocusEvent, cb?: () => void) => void
} {
  let shouldCheck = false
  let subsequentFocus = false

  // check if the next focus event within the monitored elements
  // is triggered right away
  const checkSubsequentFocus = async () => {
    subsequentFocus = false
    shouldCheck = true
    await new Promise<void>(resolve => setTimeout(resolve))

    const _subsequentFocus = subsequentFocus
    subsequentFocus = false
    shouldCheck = false

    return _subsequentFocus
  }
  const handleBlur = async (evt: FocusEvent, cb?: () => void) => {
    // if a subsequent focus event is triggered within the monitored elements
    // we considered the pro search component is still focused
    // then we skip the blur handler for this time
    if (await checkSubsequentFocus()) {
      return
    }

    cb?.()

    setFocused(false)

    callEmit(props.onBlur, evt)
  }

  const handleFocus = (evt: FocusEvent, cb?: () => void) => {
    // set subsequentFocus to true for check
    if (shouldCheck) {
      subsequentFocus = true
    }

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

function registerFocusBlurHandlers(
  elementRef: Ref<HTMLElement | undefined>,
  getOverlayContainer: () => HTMLElement | null,
  handleFocus: (evt: FocusEvent, origin: FocusOrigin) => void,
  handleBlur: (evt: FocusEvent) => void,
): {
  focus: (origin: FocusOrigin | undefined, options?: FocusOptions) => void
  blur: () => void
} {
  const { monitor, stopMonitoring, focusVia, blurVia } = useSharedFocusMonitor()

  const monitoredElements = new Set<MaybeElementRef>()
  const bindMonitor = (
    elRef: MaybeElementRef<HTMLElement | undefined | null>,
    onFocus: (evt: FocusEvent, origin: FocusOrigin) => void,
    onBlur: (evt: FocusEvent) => void,
  ) => {
    watch(monitor(elRef, true), evt => {
      const { origin, event } = evt
      if (event) {
        if (origin) {
          onFocus(event, origin)
        } else {
          onBlur(event)
        }
      }
    })

    // store monitored elements for later destruction
    monitoredElements.add(elRef)
  }
  const unbindMonitor = () => {
    monitoredElements.forEach(el => stopMonitoring(el))
  }

  let overlayContainerMonitored = false

  onMounted(() => {
    bindMonitor(
      elementRef,
      (evt, origin) => {
        handleFocus(evt, origin)

        // overlayContainer isn't rendered until at least one of the inner overlays is rendered
        // so we monitor the overlay container after focus (current logic ensures that overlay renders after focus)
        nextTick(() => {
          if (overlayContainerMonitored) {
            return
          }

          const container = getOverlayContainer()
          if (container) {
            bindMonitor(container, handleFocus, handleBlur)
            overlayContainerMonitored = true
          }
        })
      },
      handleBlur,
    )
  })
  onBeforeUnmount(() => {
    unbindMonitor()
  })

  return {
    focus: (origin, options) => focusVia(elementRef.value, origin ?? 'program', options),
    blur: () => blurVia(elementRef.value),
  }
}
