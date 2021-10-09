/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { StepperProps } from './types'
import type { InjectionKey, Slots, WritableComputedRef } from 'vue'

export interface StepperContext {
  props: StepperProps
  slots: Slots
  currActive: WritableComputedRef<number>
}

export const stepperToken: InjectionKey<StepperContext> = Symbol('stepperToken')
