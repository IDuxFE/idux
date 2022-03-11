/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type DefineComponent, type HTMLAttributes } from 'vue'

import { type ExtractInnerPropTypes, type ExtractPublicPropTypes, IxPropTypes, type VKey } from '@idux/cdk/utils'

export type StepperLabelPlacement = 'end' | 'bottom'
export type StepperSize = 'md' | 'sm'
export type StepperStatus = 'process' | 'finish' | 'wait' | 'error'

export const stepperProps = {
  activeKey: IxPropTypes.oneOfType<VKey>([String, Number, Symbol]),
  clickable: IxPropTypes.bool,
  labelPlacement: IxPropTypes.oneOf<StepperLabelPlacement>(['end', 'bottom']),
  percent: IxPropTypes.range(0, 100),
  size: IxPropTypes.oneOf<StepperSize>(['md', 'sm']),
  status: IxPropTypes.oneOf<StepperStatus>(['process', 'finish', 'wait', 'error']).def('process'),
  vertical: IxPropTypes.bool.def(false),

  'onUpdate:activeKey': IxPropTypes.emit<(key: VKey) => void>(),
}

export type StepperProps = ExtractInnerPropTypes<typeof stepperProps>
export type StepperPublicProps = ExtractPublicPropTypes<typeof stepperProps>
export type StepperComponent = DefineComponent<Omit<HTMLAttributes, keyof StepperPublicProps> & StepperPublicProps>
export type StepperInstance = InstanceType<DefineComponent<StepperProps>>

export const stepperItemProps = {
  description: IxPropTypes.string,
  disabled: IxPropTypes.bool.def(false),
  icon: IxPropTypes.string,
  title: IxPropTypes.string,
  status: IxPropTypes.oneOf<StepperStatus>(['process', 'finish', 'wait', 'error']),
}

export type StepperItemProps = ExtractInnerPropTypes<typeof stepperItemProps>
export type StepperItemPublicProps = ExtractPublicPropTypes<typeof stepperItemProps>
export type StepperItemComponent = DefineComponent<
  Omit<HTMLAttributes, keyof StepperItemPublicProps> & StepperItemPublicProps
>
export type StepperItemInstance = InstanceType<DefineComponent<StepperItemProps>>
