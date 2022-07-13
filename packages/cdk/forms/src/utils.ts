/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  type ComputedRef,
  type InjectionKey,
  type ShallowRef,
  type WatchStopHandle,
  computed,
  getCurrentInstance,
  inject,
  onScopeDispose,
  reactive,
  shallowReactive,
  shallowRef,
  toRaw,
  watch,
  watchEffect,
} from 'vue'

import { isNil } from 'lodash-es'

import { Logger, NoopFunction, callEmit } from '@idux/cdk/utils'

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
  onScopeDispose(cleanWatch)

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
  markAsBlurred: () => void
  setValue: (value: T) => void
}

export function useAccessor<T = any>(
  control: ShallowRef<AbstractControl<T> | undefined>,
  valueKey = 'value',
  disabledKey = 'disabled',
): FormAccessor<T> {
  const { props } = getCurrentInstance()!
  const accessor = reactive({} as FormAccessor)
  let watchStop: WatchStopHandle | undefined
  let tempValueWatchStop: WatchStopHandle | undefined
  const cleanWatch = () => {
    if (watchStop) {
      watchStop()
      watchStop = undefined
    }
    if (tempValueWatchStop) {
      tempValueWatchStop()
      tempValueWatchStop = undefined
    }
  }
  onScopeDispose(cleanWatch)

  watch(
    control,
    currControl => {
      cleanWatch()

      if (currControl) {
        watchStop = watchEffect(() => {
          accessor.value = currControl.valueRef.value
          accessor.disabled = currControl.disabled.value
        })
        accessor.setValue = value => currControl.setValue(value, { dirty: true })
        accessor.markAsBlurred = () => currControl.markAsBlurred()
      } else {
        const tempRef = shallowRef(props[valueKey])
        tempValueWatchStop = watch(
          () => props[valueKey],
          value => (tempRef.value = value),
        )
        watchStop = watchEffect(() => {
          accessor.value = props[valueKey] ?? tempRef.value
          accessor.disabled = props[disabledKey] as boolean
        })
        accessor.setValue = value => {
          if (value != toRaw(accessor.value)) {
            tempRef.value = value
            callEmit((props as any)[`onUpdate:${valueKey}`], value)
          }
        }
        accessor.markAsBlurred = NoopFunction
      }
    },
    { immediate: true },
  )

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

/**
 * @deprecated
 */
export interface ValueControlOptions {
  controlKey?: string
}

/**
 * @deprecated please use  `useControl` or `useAccessorAndControl` instead
 */
export function useValueControl<T = any>(
  options: ValueControlOptions = {},
): ShallowRef<AbstractControl<T> | undefined> {
  const { controlKey = 'control' } = options
  const { props } = getCurrentInstance()!
  const parentControl = inject(FORMS_CONTROL_TOKEN, shallowRef<AbstractControl>())

  const control = shallowRef<AbstractControl>()
  let watchStop: WatchStopHandle | undefined

  watch(
    [() => props[controlKey], parentControl],
    ([controlOrPath, pControl]) => {
      if (watchStop) {
        watchStop()
        watchStop = undefined
      }
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

/**
 * @deprecated
 */
export interface ValueAccessorOptions<T = any> {
  control: ShallowRef<AbstractControl<T> | undefined>
  valueKey?: string
  disabledKey?: string
}

/**
 * @deprecated
 */
export interface ValueAccessor<T = any> {
  valueRef: ComputedRef<T>
  disabled: ComputedRef<boolean>
  markAsBlurred: () => void
  setValue: (value: T) => void
}

/**
 * @deprecated please use `useAccessor` or `useAccessorAndControl` instead
 */
export function useValueAccessor<T = any>(options: ValueAccessorOptions): ValueAccessor<T> {
  const { control, valueKey = 'value', disabledKey = 'disabled' } = options
  const { props } = getCurrentInstance()!

  const accessor = shallowReactive({} as ValueAccessor<T>)
  let watchStop: WatchStopHandle | undefined

  watch(
    control,
    currControl => {
      if (watchStop) {
        watchStop()
        watchStop = undefined
      }

      if (currControl) {
        accessor.valueRef = currControl.valueRef
        accessor.disabled = currControl.disabled
        accessor.setValue = value => currControl.setValue(value, { dirty: true })
        accessor.markAsBlurred = () => currControl.markAsBlurred()
      } else {
        const tempRef = shallowRef(props[valueKey])
        watchStop = watch(
          () => props[valueKey],
          value => (tempRef.value = value),
        )
        accessor.valueRef = computed(() => props[valueKey] ?? tempRef.value) as ComputedRef<T>
        accessor.disabled = computed(() => props[disabledKey]) as ComputedRef<boolean>
        accessor.setValue = value => {
          if (value != toRaw(accessor.valueRef.value)) {
            tempRef.value = value
            callEmit((props as any)[`onUpdate:${valueKey}`], value)
          }
        }
        accessor.markAsBlurred = NoopFunction
      }
    },
    { immediate: true },
  )

  return accessor
}
