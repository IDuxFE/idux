/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AbstractControl } from './controls/abstractControl'

import { reactive, getCurrentInstance, watchEffect } from 'vue'
import { Logger } from '@idux/components/core/logger'
import { isDevMode } from '@idux/components/core/utils'
import { isAbstractControl } from './typeof'
import { injectControl } from './utils'

interface AccessorOptions {
  controlKey?: string
  valueKey?: string
}

export interface ValueAccessor {
  value?: any
  setValue?: (value: any) => void
  markAsBlurred?: () => void
}

export function useValueAccessor(options: AccessorOptions = {}): ValueAccessor {
  const { controlKey = 'control', valueKey = 'value' } = options
  const accessor = reactive({} as ValueAccessor)
  const { props, emit } = getCurrentInstance()!

  watchEffect(() => {
    const controlOrPath = props[controlKey] as string | AbstractControl
    if (controlOrPath) {
      let control: AbstractControl | null = null
      if (isAbstractControl(controlOrPath)) {
        control = controlOrPath
      } else {
        control = injectControl(controlOrPath)
        if (isDevMode && !control) {
          Logger.error(`not find control by [${controlOrPath}]`)
        }
      }
      if (control) {
        accessor.value = control.valueRef
        accessor.setValue = (value: any) => control!.setValue(value, { dirty: true })
        accessor.markAsBlurred = () => control!.markAsBlurred()
      }
    } else {
      accessor.setValue = value => {
        accessor.value = value
        emit(`update:${valueKey}`, value)
      }
      accessor.markAsBlurred = () => {}
    }
  })

  watchEffect(() => {
    const control = props[controlKey]
    if (!control) {
      accessor.value = props[valueKey]
    }
  })

  return accessor
}
