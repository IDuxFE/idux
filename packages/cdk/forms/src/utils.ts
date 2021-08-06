import type { ComputedRef, InjectionKey } from 'vue'
import type { AbstractControl, ControlPathType } from './controls'

import { inject, provide } from 'vue'
import { isNil } from 'lodash-es'
import { IxPropTypes } from '@idux/cdk/utils'

export const controlPropDef = IxPropTypes.oneOfType<string | number | AbstractControl | null>([
  String,
  Number,
  IxPropTypes.object<AbstractControl>(),
])

const controlToken: InjectionKey<AbstractControl> = Symbol('controlToken')

export function provideControl(control: AbstractControl): void {
  provide(controlToken, control)
}

export function injectControl(path?: ControlPathType): AbstractControl | null {
  const control = inject(controlToken, null)
  if (!control) {
    return null
  }

  return isNil(path) ? control : control.get(path)
}

const controlOrPathToken: InjectionKey<ComputedRef<AbstractControl | string | null | number>> =
  Symbol('controlOrPathToken')

export function provideControlOrPath(
  controlOrPath: ComputedRef<AbstractControl | string | number | null | undefined>,
): void {
  provide(controlOrPathToken, controlOrPath)
}

export function injectControlOrPath(): ComputedRef<AbstractControl | string | number | null | undefined> | null {
  return inject(controlOrPathToken, null)
}
