import type { InjectionKey } from 'vue'
import type { FormAccessor } from '@idux/cdk/forms'
import type { RadioGroupProps } from './types'

export interface RadioGroupContext {
  props: RadioGroupProps
  accessor: FormAccessor
}

export const radioGroupToken: InjectionKey<RadioGroupContext> = Symbol('radioGroupToken')
