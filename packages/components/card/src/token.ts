import type { ComputedRef, InjectionKey } from 'vue'

export interface CardContext {
  hoverable: ComputedRef<boolean>
  registerGrid: () => void
  unregisterGrid: () => void
}

export const cardToken: InjectionKey<CardContext> = Symbol('cardToken')
