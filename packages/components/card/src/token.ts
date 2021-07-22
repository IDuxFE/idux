import type { ComputedRef, InjectionKey } from 'vue'

export interface CardContext {
  hoverable: ComputedRef<boolean>
}

export const cardToken: InjectionKey<CardContext> = Symbol('cardToken')
