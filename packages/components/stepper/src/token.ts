/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, type InjectionKey, type Slots } from 'vue'

import { type VKey } from '@idux/cdk/utils'

import { type StepperProps } from './types'

export interface StepperContext {
  props: StepperProps
  slots: Slots
  activeKey: ComputedRef<VKey | undefined>
  setActiveKey: (value: VKey) => void
}

export const stepperToken: InjectionKey<StepperContext> = Symbol('stepperToken')

export const stepperItemKey = Symbol('IDUX_STEPPER_ITEM_KEY')
