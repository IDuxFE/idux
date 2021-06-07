import type { DefineComponent } from 'vue'

import { IxExtractPropTypes, IxPropTypes } from '@idux/cdk/utils'

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

export type StepsProps = IxExtractPropTypes<typeof stepsProps>

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

export type StepProps = IxExtractPropTypes<typeof stepProps>

export type StepInstance = InstanceType<DefineComponent<StepProps>>

export type StepStatus = 'wait' | 'process' | 'finish' | 'error'
