import type { InjectionKey } from 'vue'
import type { ValueAccessor } from '@idux/cdk/forms'
import type { RadioGroupProps } from './types'

export interface RadioGroupContext {
  props: RadioGroupProps
  valueAccessor: ValueAccessor
}

export const radioGroupToken: InjectionKey<RadioGroupContext> = Symbol('radioGroupToken')
