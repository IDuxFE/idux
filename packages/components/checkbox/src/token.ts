import type { InjectionKey } from 'vue'
import type { ValueAccessor } from '@idux/cdk/forms'
import type { CheckboxGroupProps } from './types'

export interface CheckboxGroupContext {
  props: CheckboxGroupProps
  valueAccessor: ValueAccessor
}

export const checkboxGroupToken: InjectionKey<CheckboxGroupContext> = Symbol('checkboxGroupToken')
