import type { AbstractControl } from './abstractControl'

export type ArrayElement<A> = A extends (infer T)[] ? T : never

export type GroupControls<T> = {
  [K in keyof T]: AbstractControl<T[K]>
}
