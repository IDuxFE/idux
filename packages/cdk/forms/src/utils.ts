import type { ComputedRef, InjectionKey } from 'vue'
import type { AbstractControl } from './controls/abstractControl'

import { inject, provide } from 'vue'
import { object } from 'vue-types'
import { isNil, PropTypes, withUndefined } from '@idux/cdk/utils'

export const controlPropTypeDef = withUndefined(
  PropTypes.oneOfType([PropTypes.string, PropTypes.number, object<AbstractControl>()]),
)

const controlToken: InjectionKey<AbstractControl> = Symbol('controlToken')

export function provideControl(control: AbstractControl): void {
  provide(controlToken, control)
}

export function injectControl(path?: Array<string | number> | string | number): AbstractControl | null {
  const control = inject(controlToken, null)
  if (!control) {
    return null
  }

  return isNil(path) ? control : control.get(path)
}

const controlOrPathToken: InjectionKey<ComputedRef<AbstractControl | string | number>> = Symbol('controlOrPathToken')

export function provideControlOrPath(controlOrPath: ComputedRef<AbstractControl | string | number | undefined>): void {
  provide(controlOrPathToken, controlOrPath)
}

export function injectControlOrPath(): ComputedRef<AbstractControl | string | number | undefined> | null {
  return inject(controlOrPathToken, null)
}
