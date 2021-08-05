import type { ComputedRef, InjectionKey } from 'vue'

export interface RowContext {
  gutter: ComputedRef<[number, number]>
}

export const rowToken: InjectionKey<RowContext> = Symbol('rowToken')
