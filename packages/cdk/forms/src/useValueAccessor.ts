/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { AbstractControl, ControlPathType } from './controls'
import type { ComputedRef, WatchStopHandle } from 'vue'

import { computed, getCurrentInstance, reactive, toRef, watch } from 'vue'

import { isNil } from 'lodash-es'

import { Logger } from '@idux/cdk/utils'

import { isAbstractControl } from './typeof'
import { injectControl } from './utils'

export function useValueControl<T = any>(controlKey = 'control'): ComputedRef<AbstractControl<T> | undefined> {
  const { props } = getCurrentInstance()!

  return computed(() => {
    let control: AbstractControl | undefined
    const _controlOrPath = props[controlKey]
    if (!isNil(_controlOrPath)) {
      if (isAbstractControl(_controlOrPath)) {
        control = _controlOrPath
      } else {
        control = injectControl(_controlOrPath as ControlPathType)

        if (__DEV__ && !control) {
          Logger.warn('cdk/forms', `not find control by [${_controlOrPath}]`)
        }
      }
    }
    return control
  })
}

export interface FormAccessorOptions {
  controlKey?: string
  valueKey?: string
  disabledKey?: string
}

export interface FormAccessor<T = any> {
  value: T
  setValue: (value: T) => void
  markAsBlurred: () => void
  disabled: boolean
}

export function useValueAccessor<T = any>(
  options: FormAccessorOptions = {},
): { control: ComputedRef<AbstractControl<T> | undefined>; accessor: FormAccessor<T> } {
  const { controlKey, valueKey = 'value', disabledKey = 'disabled' } = options
  const accessor = reactive<FormAccessor>({} as FormAccessor)
  const { props, emit } = getCurrentInstance()!

  const control = useValueControl(controlKey)
  let valueWatchStop: WatchStopHandle | undefined

  watch(
    control,
    currControl => {
      if (currControl) {
        accessor.value = currControl.valueRef
        accessor.setValue = value => currControl.setValue(value, { dirty: true })
        accessor.markAsBlurred = () => currControl.markAsBlurred()
        accessor.disabled = currControl.disabled as unknown as boolean
        if (valueWatchStop) {
          valueWatchStop()
          valueWatchStop = undefined
        }
      } else {
        accessor.value = toRef(props, valueKey)
        accessor.setValue = value => (accessor.value = value)
        accessor.markAsBlurred = () => {}
        accessor.disabled = toRef(props, disabledKey) as unknown as boolean
        if (valueWatchStop) {
          valueWatchStop()
        }
        valueWatchStop = watch(
          () => accessor.value,
          value => emit(`update:${valueKey}`, value),
        )
      }
    },
    { immediate: true },
  )

  return { control, accessor }
}
