/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type DefineComponent, type HTMLAttributes, PropType } from 'vue'

import {
  type ExtractInnerPropTypes,
  type ExtractPublicPropTypes,
  IxPropTypes,
  MaybeArray,
  type VKey,
} from '@idux/cdk/utils'

export type StepperLabelPlacement = 'end' | 'bottom'
export type StepperSize = 'md' | 'sm'
export type StepperStatus = 'process' | 'finish' | 'wait' | 'error'

export const stepperProps = {
  activeKey: [String, Number, Symbol] as PropType<VKey>,
  clickable: {
    type: Boolean,
    default: undefined,
  },
  labelPlacement: String as PropType<StepperLabelPlacement>,
  percent: IxPropTypes.range(0, 100),
  size: String as PropType<StepperSize>,
  status: {
    type: String as PropType<StepperStatus>,
    default: 'process',
  },
  vertical: {
    type: Boolean,
    default: false,
  },

  'onUpdate:activeKey': [Function, Array] as PropType<MaybeArray<<K = VKey>(key: K) => void>>,
}

export type StepperProps = ExtractInnerPropTypes<typeof stepperProps>
export type StepperPublicProps = ExtractPublicPropTypes<typeof stepperProps>
export type StepperComponent = DefineComponent<Omit<HTMLAttributes, keyof StepperPublicProps> & StepperPublicProps>
export type StepperInstance = InstanceType<DefineComponent<StepperProps>>

export const stepperItemProps = {
  description: String,
  disabled: {
    type: Boolean,
    default: false,
  },
  icon: String,
  title: String,
  status: String as PropType<StepperStatus>,
}

export type StepperItemProps = ExtractInnerPropTypes<typeof stepperItemProps>
export type StepperItemPublicProps = ExtractPublicPropTypes<typeof stepperItemProps>
export type StepperItemComponent = DefineComponent<
  Omit<HTMLAttributes, keyof StepperItemPublicProps> & StepperItemPublicProps
>
export type StepperItemInstance = InstanceType<DefineComponent<StepperItemProps>>
