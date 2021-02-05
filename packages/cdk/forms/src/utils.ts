import type { InjectionKey } from 'vue'
import type { AbstractControl } from './controls/abstractControl'

import { inject, provide } from 'vue'

const token: InjectionKey<AbstractControl> = Symbol()

export function provideControl(control: AbstractControl): void {
  provide(token, control)
}

export function injectControl(path: Array<string | number> | string): AbstractControl | null {
  const controlParent = inject(token, null)
  return controlParent ? controlParent.get(path) : null
}
