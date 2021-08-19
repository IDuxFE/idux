/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AbstractControl, ControlPathType } from './controls'

import { reactive, getCurrentInstance, computed, ComputedRef, watch, toRef, WatchStopHandle } from 'vue'
import { isNil, isUndefined } from 'lodash-es'
import { Logger } from '@idux/cdk/utils'
import { isAbstractControl } from './typeof'
import { injectControl, injectControlOrPath } from './utils'

export function useValueControl<T = any>(controlKey = 'control'): ComputedRef<AbstractControl<T> | null> {
  const { props } = getCurrentInstance()!
  const controlOrPath = injectControlOrPath()
  return computed(() => {
    let control: AbstractControl | null = null
    // Only when `props[controlKey]` is `undefined`, will it find out if the parent component is injected with `path`
    // So you can disable it by setting `props[controlKey]` to `null`
    const _controlOrPath = isUndefined(props[controlKey]) ? controlOrPath?.value : props[controlKey]
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

export interface AccessorOptions {
  controlKey?: string
  valueKey?: string
  disabledKey?: string
}

export interface ValueAccessor<T = any> {
  value: T
  setValue: (value: T) => void
  markAsBlurred: () => void
  disabled: boolean
}

export function useValueAccessor<T = any>(options: AccessorOptions = {}): ValueAccessor<T> {
  const { controlKey, valueKey = 'value', disabledKey = 'disabled' } = options
  const accessor = reactive<ValueAccessor>({} as ValueAccessor)
  const { props, emit } = getCurrentInstance()!

  const control = useValueControl(controlKey)
  let valueWatchStop: WatchStopHandle | null = null

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
          valueWatchStop = null
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

  return accessor
}
