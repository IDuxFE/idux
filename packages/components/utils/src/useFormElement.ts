/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { Ref, WatchStopHandle } from 'vue'

import { onBeforeUnmount, ref, watch } from 'vue'

import { useSharedFocusMonitor } from '@idux/cdk/a11y'

export interface FormElementContext<T> {
  elementRef: Ref<T | undefined>
  focus: (options?: FocusOptions) => void
  blur: () => void
}

export function useFormElement<T extends HTMLElement = HTMLElement>(): FormElementContext<T> {
  const elementRef = ref<T>()

  const focus = (options?: FocusOptions) => {
    elementRef.value?.focus(options)
  }

  const blur = () => elementRef.value?.blur()

  return { elementRef, focus, blur }
}

export interface FormFocusMonitor<T> {
  elementRef: Ref<T | undefined>
  focus: (options?: FocusOptions) => void
  blur: () => void
}

export function useFormFocusMonitor<T extends HTMLElement = HTMLElement>(options: {
  handleFocus: (evt: FocusEvent) => void
  handleBlur: (evt: FocusEvent) => void
}): FormFocusMonitor<T> {
  const focusMonitor = useSharedFocusMonitor()
  const elementRef = ref<T>()

  let watchStopHandle: WatchStopHandle | undefined

  watch(elementRef, (currElement, prevElement) => {
    watchStopHandle?.()
    focusMonitor.stopMonitoring(prevElement)

    watchStopHandle = watch(focusMonitor.monitor(currElement, false), evt => {
      const { origin, event } = evt
      if (event) {
        origin ? options.handleFocus(event) : options.handleBlur(event)
      }
    })
  })

  onBeforeUnmount(() => {
    watchStopHandle?.()
    focusMonitor.stopMonitoring(elementRef.value)
  })

  const focus = (options?: FocusOptions) => focusMonitor.focusVia(elementRef.value, 'program', options)
  const blur = () => focusMonitor.blurVia(elementRef.value)

  return { elementRef, focus, blur }
}
