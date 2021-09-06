import type { InjectionKey } from 'vue'
import type { FormAccessor } from '@idux/cdk/forms'
import type { CheckboxGroupProps } from './types'

export interface CheckboxGroupContext {
  props: CheckboxGroupProps
  accessor: FormAccessor
}

export const checkboxGroupToken: InjectionKey<CheckboxGroupContext> = Symbol('checkboxGroupToken')
