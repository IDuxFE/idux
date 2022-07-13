/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import {
  type ComputedRef,
  type Ref,
  type ShallowRef,
  type WatchStopHandle,
  computed,
  inject,
  onBeforeUnmount,
  ref,
  watch,
} from 'vue'

import { useSharedFocusMonitor } from '@idux/cdk/a11y'
import { type AbstractControl, type ValueAccessor, useValueAccessor, useValueControl } from '@idux/cdk/forms'
import { useKey } from '@idux/components/utils'

import { FORM_ITEM_TOKEN, FORM_TOKEN } from '../token'
import { type FormSize } from '../types'

export function useFormItemRegister(control: ShallowRef<AbstractControl | undefined>): void {
  const context = inject(FORM_ITEM_TOKEN, null)
  if (context) {
    const key = useKey()
    const { registerControl, unregisterControl } = context
    registerControl(key, control)
    onBeforeUnmount(() => unregisterControl(key))
  }
}

/**
 * @deprecated 使用 useAccessorAndControl + useFormItemRegister 替代
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useFormAccessor<T = any>(valueKey?: string): ValueAccessor<T> {
  const control = useValueControl()
  const accessor = useValueAccessor({ control, valueKey })

  useFormItemRegister(control)

  return accessor
}

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
  checkChildren?: boolean
  handleFocus: (evt: FocusEvent) => void
  handleBlur: (evt: FocusEvent) => void
}): FormFocusMonitor<T> {
  const focusMonitor = useSharedFocusMonitor()
  const elementRef = ref<T>()

  let watchStopHandle: WatchStopHandle | undefined

  watch(elementRef, (currElement, prevElement) => {
    if (watchStopHandle) {
      watchStopHandle()
    }

    if (prevElement) {
      focusMonitor.stopMonitoring(prevElement)
    }

    watchStopHandle = watch(focusMonitor.monitor(currElement, options.checkChildren), evt => {
      const { origin, event } = evt
      if (event) {
        origin ? options.handleFocus(event) : options.handleBlur(event)
      }
    })
  })

  onBeforeUnmount(() => {
    if (watchStopHandle) {
      watchStopHandle()
    }
    focusMonitor.stopMonitoring(elementRef.value)
  })

  const focus = (options?: FocusOptions) => focusMonitor.focusVia(elementRef.value, 'program', options)
  const blur = () => focusMonitor.blurVia(elementRef.value)

  return { elementRef, focus, blur }
}

export function useFormSize(props: { size?: FormSize }, config: { size: FormSize }): ComputedRef<FormSize> {
  const formContext = inject(FORM_TOKEN, null)

  return computed(() => props.size ?? formContext?.size.value ?? config.size)
}
