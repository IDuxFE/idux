import type { DefineComponent, HTMLAttributes } from 'vue'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'

import { IxPropTypes } from '@idux/cdk/utils'

export type StepStatus = 'wait' | 'process' | 'finish' | 'error'
export type StepsSize = 'medium' | 'small'

export const stepsProps = {
  active: IxPropTypes.number.def(0),
  clickable: IxPropTypes.bool.def(false),
  direction: IxPropTypes.oneOf(['horizontal', 'vertical'] as const).def('horizontal'),
  placement: IxPropTypes.oneOf(['horizontal', 'vertical'] as const).def('horizontal'),
  percent: IxPropTypes.range(0, 100),
  progressDot: IxPropTypes.bool.def(false),
  size: IxPropTypes.oneOf(['medium', 'small'] as const).def('medium'),
  status: IxPropTypes.oneOf<StepStatus>(['wait', 'process', 'finish', 'error']).def('process'),
}

export type StepsProps = IxInnerPropTypes<typeof stepsProps>
export type StepsPublicProps = IxPublicPropTypes<typeof stepsProps>
export type StepsComponent = DefineComponent<HTMLAttributes & typeof stepsProps>
export type StepsInstance = InstanceType<DefineComponent<StepsProps>>

export const stepProps = {
  index: IxPropTypes.number.isRequired,
  title: IxPropTypes.string,
  subTitle: IxPropTypes.string,
  description: IxPropTypes.string,
  disabled: IxPropTypes.bool.def(false),
  icon: IxPropTypes.string,
  status: IxPropTypes.oneOf<StepStatus>(['wait', 'process', 'finish', 'error']),
}

export type StepProps = IxInnerPropTypes<typeof stepProps>
export type StepPublicProps = IxPublicPropTypes<typeof stepProps>
export type StepComponent = DefineComponent<HTMLAttributes & typeof stepProps>
export type StepInstance = InstanceType<DefineComponent<StepProps>>
