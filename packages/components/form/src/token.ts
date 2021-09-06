import type { ComputedRef, InjectionKey, Ref } from 'vue'
import type { AbstractControl } from '@idux/cdk/forms'
import type { ColType, FormLabelAlign } from './types'

export interface FormContext {
  colonless: ComputedRef<boolean>
  controlCol: Ref<ColType>
  hasFeedback: Ref<boolean>
  labelAlign: ComputedRef<FormLabelAlign>
  labelCol: Ref<ColType>
}

export const formToken: InjectionKey<FormContext> = Symbol('formToken')

export interface FormItemContext {
  registerControl: (control: ComputedRef<AbstractControl | undefined>) => void
  unregisterControl: (control: ComputedRef<AbstractControl | undefined>) => void
}
