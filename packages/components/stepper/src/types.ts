import type { DefineComponent, HTMLAttributes } from 'vue'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'

import { IxPropTypes } from '@idux/cdk/utils'

export type StepperStatus = 'wait' | 'process' | 'finish' | 'error'
export type StepperSize = 'medium' | 'small'

export const stepperProps = {
  active: IxPropTypes.number.def(0),
  clickable: IxPropTypes.bool.def(false),
  direction: IxPropTypes.oneOf(['horizontal', 'vertical'] as const).def('horizontal'),
  placement: IxPropTypes.oneOf(['horizontal', 'vertical'] as const).def('horizontal'),
  percent: IxPropTypes.range(0, 100),
  progressDot: IxPropTypes.bool.def(false),
  size: IxPropTypes.oneOf<StepperSize>(['medium', 'small']).def('medium'),
  status: IxPropTypes.oneOf<StepperStatus>(['wait', 'process', 'finish', 'error']).def('process'),

  'onUpdate:active': IxPropTypes.emit<(index: number) => void>(),
}

export type StepperProps = IxInnerPropTypes<typeof stepperProps>
export type StepperPublicProps = IxPublicPropTypes<typeof stepperProps>
export type StepperComponent = DefineComponent<HTMLAttributes & typeof stepperProps>
export type StepperInstance = InstanceType<DefineComponent<StepperProps>>

export const stepperItemProps = {
  index: IxPropTypes.number.isRequired,
  title: IxPropTypes.string,
  subTitle: IxPropTypes.string,
  description: IxPropTypes.string,
  disabled: IxPropTypes.bool.def(false),
  icon: IxPropTypes.string,
  status: IxPropTypes.oneOf<StepperStatus>(['wait', 'process', 'finish', 'error']),
}

export type StepperItemProps = IxInnerPropTypes<typeof stepperItemProps>
export type StepperItemPublicProps = IxPublicPropTypes<typeof stepperItemProps>
export type StepperItemComponent = DefineComponent<HTMLAttributes & typeof stepperItemProps>
export type StepperItemInstance = InstanceType<DefineComponent<StepperItemProps>>
