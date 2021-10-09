/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { AbstractControl, ControlPathType } from './controls'
import type { InjectionKey } from 'vue'

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
