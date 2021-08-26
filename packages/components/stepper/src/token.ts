import type { InjectionKey, Slots, WritableComputedRef } from 'vue'
import type { StepperProps } from './types'

export interface StepperContext {
  props: StepperProps
  slots: Slots
  currActive: WritableComputedRef<number>
}

export const stepperToken: InjectionKey<StepperContext> = Symbol('stepperToken')
