/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ActiveSegmentContext } from './useActiveSegment'
import type { SearchStateContext } from './useSearchStates'
import type { ProSearchProps } from '../types'
import type { ɵOverlayProps } from '@idux/components/_private/overlay'

import { type ComputedRef, type Ref, nextTick, onBeforeUnmount, onMounted, watch } from 'vue'

import { isFunction, isString } from 'lodash-es'

import { useSharedFocusMonitor } from '@idux/cdk/a11y'
import { MaybeElementRef, callEmit, useState } from '@idux/cdk/utils'

export interface FocusEventContext {
  focused: ComputedRef<boolean>
  focus: (options?: FocusOptions) => void
  blur: () => void
}

export function useFocusedState(
  props: ProSearchProps,
  elementRef: Ref<HTMLElement | undefined>,
  commonOverlayProps: ComputedRef<ɵOverlayProps>,
  searchStateContext: SearchStateContext,
  activeSegmentContext: ActiveSegmentContext,
): FocusEventContext {
  const { searchStates, initTempSearchState } = searchStateContext
  const { activeSegment, setInactive, setTempActive } = activeSegmentContext
  const [focused, setFocused] = useState(false)

  const { handleFocus, handleBlur } = useFocusHandlers(props, focused, setFocused, setInactive, initTempSearchState)

  watch([activeSegment, searchStates], ([segment]) => {
    if (!segment && focused.value) {
      nextTick(setTempActive)
    }
  })

  const _handleFocus = (evt: FocusEvent) => {
    if (props.disabled) {
      return
    }

    handleFocus(evt, () => {
      if (evt.target === elementRef.value) {
        setTempActive(true)
      }
    })
  }

  const focus = (options?: FocusOptions) => {
    elementRef.value?.focus(options)
  }
  const blur = () => {
    setInactive(true)
    setFocused(false)
  }

  registerHandlers(elementRef, () => getContainerEl(commonOverlayProps.value), _handleFocus, handleBlur)

  return { focused, focus, blur }
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
  setInactive: (blur?: boolean) => void,
  initTempSearchState: () => void,
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

    initTempSearchState()
    cb?.()

    setInactive(true)
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

function registerHandlers(
  elementRef: Ref<HTMLElement | undefined>,
  getOverlayContainer: () => HTMLElement | null,
  handleFocus: (evt: FocusEvent) => void,
  handleBlur: (evt: FocusEvent) => void,
): void {
  const { monitor, stopMonitoring } = useSharedFocusMonitor()

  const monitoredElements = new Set<MaybeElementRef>()
  const bindMonitor = (
    elRef: MaybeElementRef<HTMLElement | undefined | null>,
    onFocus: (evt: FocusEvent) => void,
    onBlur: (evt: FocusEvent) => void,
  ) => {
    watch(monitor(elRef, true), evt => {
      const { origin, event } = evt
      if (event) {
        if (origin) {
          onFocus(event)
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
      (...args) => {
        handleFocus(...args)

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
}
