/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray, VKey } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

export type StepperLabelPlacement = 'end' | 'bottom'
export type StepperLineStyle = 'solid' | 'dotted' | 'dashed'
export type StepperSize = 'md' | 'sm'
export type StepperStatus = 'process' | 'finish' | 'wait' | 'error'

export const stepperProps = {
  activeKey: [String, Number, Symbol] as PropType<VKey>,
  clickable: {
    type: Boolean,
    default: undefined,
  },
  labelPlacement: String as PropType<StepperLabelPlacement>,
  percent: {
    type: Number,
    validator: (value: number) => value >= 0 && value <= 100,
  },
  size: String as PropType<StepperSize>,
  status: {
    type: String as PropType<StepperStatus>,
    default: 'process',
  },
  vertical: {
    type: Boolean,
    default: false,
  },
  lineStyle: {
    type: String as PropType<StepperLineStyle>,
    default: 'solid',
  },

  'onUpdate:activeKey': [Function, Array] as PropType<MaybeArray<(key: any) => void>>,
} as const

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
} as const

export type StepperItemProps = ExtractInnerPropTypes<typeof stepperItemProps>
export type StepperItemPublicProps = ExtractPublicPropTypes<typeof stepperItemProps>
export type StepperItemComponent = DefineComponent<
  Omit<HTMLAttributes, keyof StepperItemPublicProps> & StepperItemPublicProps
>
export type StepperItemInstance = InstanceType<DefineComponent<StepperItemProps>>
