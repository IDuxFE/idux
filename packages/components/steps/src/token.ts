import { InjectionKey, Slot } from 'vue'
import type { StepsProps } from './types'

export const stepsToken: InjectionKey<{ stepsProps: StepsProps; progressDotSlot?: Slot }> = Symbol()
