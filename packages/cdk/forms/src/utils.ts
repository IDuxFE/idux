/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { AbstractControl, ControlPathType } from './controls'
import type { ComputedRef, InjectionKey, PropType, ShallowRef, WatchStopHandle } from 'vue'

import { computed, getCurrentInstance, inject, ref, shallowReactive, shallowRef, toRaw, watch } from 'vue'

import { isNil } from 'lodash-es'

import { Logger, NoopFunction, callEmit } from '@idux/cdk/utils'

import { isAbstractControl } from './typeof'

export const controlPropDef = [String, Number, Object] as PropType<string | number | AbstractControl>

export const FORMS_CONTROL_TOKEN: InjectionKey<ShallowRef<AbstractControl>> = Symbol('cdk-forms-control')

export interface ValueControlOptions {
  controlKey?: string
}

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

export interface ValueAccessorOptions<T = any> {
  control: ShallowRef<AbstractControl<T> | undefined>
  valueKey?: string
  disabledKey?: string
}

export interface ValueAccessor<T = any> {
  valueRef: ComputedRef<T>
  disabled: ComputedRef<boolean>
  markAsBlurred: () => void
  setValue: (value: T) => void
}

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
        const tempRef = ref(props[valueKey])
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
