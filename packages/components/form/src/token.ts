import type { ComputedRef, InjectionKey, Ref } from 'vue'
import type { ColType, FormItemProps, FormLabelAlign } from './types'

export interface FormContext {
  colonless: ComputedRef<boolean>
  controlCol: Ref<ColType>
  hasFeedback: Ref<boolean>
  labelAlign: ComputedRef<FormLabelAlign>
  labelCol: Ref<ColType>
}

export const formToken: InjectionKey<FormContext> = Symbol('formToken')

export const formItemToken: InjectionKey<FormItemProps> = Symbol('formItemToken')
