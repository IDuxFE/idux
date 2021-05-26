/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AbstractControl } from './controls/abstractControl'

import { reactive, getCurrentInstance, watchEffect, computed, ComputedRef } from 'vue'
import { isNil, Logger } from '@idux/cdk/utils'
import { isAbstractControl } from './typeof'
import { injectControl, injectControlOrPath } from './utils'

interface AccessorOptions {
  controlKey?: string
  valueKey?: string
}

export interface ValueAccessor {
  value: any
  setValue: (value: any) => void
  markAsBlurred: () => void
}

export function useValueControl(controlKey = 'control'): ComputedRef<AbstractControl | null> {
  const { props } = getCurrentInstance()!
  const controlOrPath = injectControlOrPath()
  return computed(() => {
    let control: AbstractControl | null = null
    const _controlOrPath = (props[controlKey] ?? controlOrPath?.value) as AbstractControl | string | number | undefined
    if (!isNil(_controlOrPath)) {
      if (isAbstractControl(_controlOrPath)) {
        control = _controlOrPath
      } else {
        control = injectControl(_controlOrPath)
        if (!control) {
          Logger.error(`not find control by [${_controlOrPath}]`)
        }
      }
    }
    return control
  })
}

export function useValueAccessor(options: AccessorOptions = {}): ValueAccessor {
  const { controlKey, valueKey = 'value' } = options
  const accessor = reactive<ValueAccessor>({} as ValueAccessor)
  const { props, emit } = getCurrentInstance()!

  const control = useValueControl(controlKey)

  watchEffect(() => {
    const currControl = control.value
    if (currControl) {
      accessor.value = currControl.valueRef
      accessor.setValue = (value: any) => currControl.setValue(value, { dirty: true })
      accessor.markAsBlurred = () => currControl.markAsBlurred()
    } else {
      accessor.setValue = value => {
        accessor.value = value
        emit(`update:${valueKey}`, value)
      }
      accessor.markAsBlurred = () => {}
    }
  })

  watchEffect(() => {
    if (!control.value) {
      accessor.value = props[valueKey]
    }
  })

  return accessor
}
