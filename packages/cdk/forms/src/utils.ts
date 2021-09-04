import type { InjectionKey } from 'vue'
import type { AbstractControl, ControlPathType } from './controls'

import { inject, provide } from 'vue'
import { isNil } from 'lodash-es'
import { IxPropTypes } from '@idux/cdk/utils'

export const controlPropDef = IxPropTypes.oneOfType<string | number | AbstractControl>([
  String,
  Number,
  IxPropTypes.object<AbstractControl>(),
])

const controlToken: InjectionKey<AbstractControl> = Symbol('controlToken')

export function provideControl(control: AbstractControl): void {
  provide(controlToken, control)
}

export function injectControl(path?: ControlPathType): AbstractControl | undefined {
  const control = inject(controlToken, null)
  if (!control) {
    return undefined
  }

  return isNil(path) ? control : control.get(path)
}
