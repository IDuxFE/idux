import type { ComputedRef, InjectionKey, Ref } from 'vue'
import type { AbstractControl } from '@idux/cdk/forms'
import type { ColType, FormLabelAlign } from './types'

import { computed, getCurrentInstance, inject, onBeforeUnmount } from 'vue'
import { useKey } from '@idux/components/utils'

export interface FormContext {
  colonless: ComputedRef<boolean>
  controlCol: Ref<ColType>
  hasFeedback: Ref<boolean>
  labelAlign: ComputedRef<FormLabelAlign>
  labelCol: Ref<ColType>
}

export const formToken: InjectionKey<FormContext> = Symbol('formToken')

export interface FormItemContext {
  registerControl: (key: string | number, controlOrPath: ComputedRef<string | AbstractControl | undefined>) => void
  unregisterControl: (key: string | number, controlOrPath: ComputedRef<string | AbstractControl | undefined>) => void
}

export const FORM_ITEM_TOKEN: InjectionKey<FormItemContext> = Symbol('FORM_ITEM_TOKEN')

export function useFormItemRegister(controlKey = 'control'): void {
  const context = inject(FORM_ITEM_TOKEN, null)
  if (context) {
    const key = useKey()
    const { props } = getCurrentInstance()!
    const controlOrPath = computed(() => props[controlKey] as string | AbstractControl | undefined)
    const { registerControl, unregisterControl } = context
    registerControl(key, controlOrPath)

    onBeforeUnmount(() => unregisterControl(key, controlOrPath))
  }
}
