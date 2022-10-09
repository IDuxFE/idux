/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  type InjectionKey,
  type ShallowRef,
  type WatchStopHandle,
  getCurrentInstance,
  inject,
  reactive,
  shallowRef,
  toRaw,
  unref,
  watch,
} from 'vue'

import { isNil } from 'lodash-es'

import { Logger, type MaybeRef, NoopFunction, callEmit, tryOnScopeDispose } from '@idux/cdk/utils'

import { type AbstractControl, type ControlPathType } from './controls'
import { isAbstractControl } from './typeof'

export const FORMS_CONTROL_TOKEN: InjectionKey<ShallowRef<AbstractControl>> = Symbol('cdk-forms-control')

export function useControl<T = any>(controlKey = 'control'): ShallowRef<AbstractControl<T> | undefined> {
  const { props } = getCurrentInstance()!
  const parentControl = inject(FORMS_CONTROL_TOKEN, shallowRef<AbstractControl>())

  const control = shallowRef<AbstractControl>()
  let watchStop: WatchStopHandle | undefined
  const cleanWatch = () => {
    if (watchStop) {
      watchStop()
      watchStop = undefined
    }
  }
  tryOnScopeDispose(cleanWatch)

  watch(
    [() => props[controlKey], parentControl],
    ([controlOrPath, pControl]) => {
      cleanWatch()
      if (isAbstractControl(controlOrPath)) {
        control.value = controlOrPath
      } else if (!!pControl && !isNil(controlOrPath)) {
        watchStop = watch(
          pControl.controls,
          () => {
            const _control = pControl.get(controlOrPath as ControlPathType)
            if (__DEV__ && !_control) {
              Logger.warn('cdk/forms', `not find control by [${controlOrPath}]`)
            }
            control.value = _control
          },
          { immediate: true },
        )
      }
    },
    { immediate: true },
  )

  return control
}

export interface FormAccessor<T = any> {
  value: T
  disabled: boolean
  /**
   * Marks the control as `blurred`.
   */
  markAsBlurred: () => void
  /**
   * Sets a new value for the control.
   *
   * @param value The new value.
   * @param options
   * * `dirty`: Marks it dirty, default is `true`.
   * * `blur`: Marks it blurred, default is `false`.
   */
  setValue: (value: T, options?: { dirty?: boolean; blur?: boolean }) => void
}

export function useAccessor<T = any>(
  control: MaybeRef<AbstractControl<T> | undefined>,
  valueKey = 'value',
  disabledKey = 'disabled',
): FormAccessor<T> {
  const accessor = reactive({} as FormAccessor)

  const { props } = getCurrentInstance()!

  let valueStop: WatchStopHandle | undefined
  let disabledStop: WatchStopHandle | undefined
  let tempValueWatchStop: WatchStopHandle | undefined

  const cleanWatch = () => {
    if (valueStop) {
      valueStop()
      valueStop = undefined
    }
    if (disabledStop) {
      disabledStop()
      disabledStop = undefined
    }
    if (tempValueWatchStop) {
      tempValueWatchStop()
      tempValueWatchStop = undefined
    }
  }

  const generateAccessorByControl = (currControl: AbstractControl<T>) => {
    valueStop = watch(
      currControl.valueRef,
      value => {
        accessor.value = value
      },
      { immediate: true },
    )
    disabledStop = watch(
      currControl.disabled,
      disabled => {
        accessor.disabled = disabled
      },
      { immediate: true },
    )
    accessor.setValue = (value, options) => currControl.setValue(value, { dirty: true, ...options })
    accessor.markAsBlurred = () => currControl.markAsBlurred()
  }

  const generateAccessorByProps = () => {
    const tempRef = shallowRef(props[valueKey])
    tempValueWatchStop = watch(
      () => props[valueKey],
      value => (tempRef.value = value),
    )
    valueStop = watch(
      () => props[valueKey] ?? tempRef.value,
      value => {
        accessor.value = value
      },
      { immediate: true },
    )
    disabledStop = watch(
      () => props[disabledKey] as boolean,
      disabled => {
        accessor.disabled = disabled
      },
      { immediate: true },
    )
    accessor.setValue = value => {
      if (value != toRaw(accessor.value)) {
        tempRef.value = value
        callEmit((props as any)[`onUpdate:${valueKey}`], value)
      }
    }
    accessor.markAsBlurred = NoopFunction
  }

  watch(
    () => unref(control),
    currControl => {
      cleanWatch()
      if (currControl) {
        generateAccessorByControl(currControl)
      } else {
        generateAccessorByProps()
      }
    },
    { immediate: true },
  )

  tryOnScopeDispose(cleanWatch)

  return accessor
}

export interface FormAccessorOptions {
  /**
   * the control key in props
   *
   * @default 'control'
   */
  controlKey?: string
  /**
   * the value key in props
   *
   * @default 'value'
   */
  valueKey?: string
  /**
   * the disabled key in props
   *
   * @default 'disabled'
   */
  disabledKey?: string
}

export function useAccessorAndControl<T = any>(
  options?: FormAccessorOptions,
): {
  accessor: FormAccessor<T>
  control: ShallowRef<AbstractControl<T> | undefined>
} {
  const { controlKey, valueKey, disabledKey } = options ?? {}

  const control = useControl(controlKey)
  const accessor = useAccessor(control, valueKey, disabledKey)

  return { accessor, control }
}
