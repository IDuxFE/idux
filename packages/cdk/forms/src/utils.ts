/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { AbstractControl, ControlPathType } from './controls'
import type { InjectionKey, Ref, WatchStopHandle } from 'vue'

import { getCurrentInstance, inject, shallowReactive, shallowRef, toRef, watch } from 'vue'

import { isNil } from 'lodash-es'

import { IxPropTypes, Logger } from '@idux/cdk/utils'

import { isAbstractControl } from './typeof'

export const controlPropDef = IxPropTypes.oneOfType<string | number | AbstractControl>([
  String,
  Number,
  IxPropTypes.object<AbstractControl>(),
])

export const controlToken: InjectionKey<Ref<AbstractControl>> = Symbol('controlToken')

export function useValueControl<T = any>(controlKey = 'control'): Ref<AbstractControl<T> | undefined> {
  const { props } = getCurrentInstance()!
  const parentControl = inject(controlToken, shallowRef<AbstractControl>())
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

export interface FormAccessorOptions {
  controlKey?: string
  valueKey?: string
  disabledKey?: string
}

export interface FormAccessor<T = any> {
  valueRef: Ref<T>
  disabled: Ref<boolean>
  markAsBlurred: () => void
  setValue: (value: T) => void
}

export function useValueAccessor<T = any>(
  options: FormAccessorOptions = {},
): { control: Ref<AbstractControl<T> | undefined>; accessor: FormAccessor<T> } {
  const { controlKey, valueKey = 'value', disabledKey = 'disabled' } = options
  const { props, emit } = getCurrentInstance()!
  const control = useValueControl(controlKey)

  const accessor = shallowReactive({}) as FormAccessor<T>
  watch(
    control,
    currControl => {
      if (currControl) {
        accessor.valueRef = currControl.valueRef
        accessor.disabled = currControl.disabled
        accessor.setValue = value => currControl.setValue(value, { dirty: true })
        accessor.markAsBlurred = () => currControl.markAsBlurred()
      } else {
        accessor.valueRef = toRef(props, valueKey) as Ref<T>
        accessor.disabled = toRef(props, disabledKey) as Ref<boolean>
        accessor.setValue = value => {
          accessor.valueRef.value = value
          emit(`update:${valueKey}`, value)
        }
        accessor.markAsBlurred = () => {}
      }
    },
    { immediate: true },
  )

  return { control, accessor }
}
