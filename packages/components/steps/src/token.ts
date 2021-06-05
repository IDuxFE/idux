import type { InjectionKey, Ref, Slot } from 'vue'
import type { StepsProps } from './types'

export interface StepItem {
  setIndex: (index: number) => void
}

export interface StepsContext {
  props: StepsProps
  currActive: Ref<number>
  changeActive: (index: number) => void
  progressDot: Slot | undefined
}

export const stepsToken: InjectionKey<StepsContext> = Symbol('stepsToken')
