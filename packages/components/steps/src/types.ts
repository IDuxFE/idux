import type { DefineComponent } from 'vue'

import { PropTypes } from '@idux/cdk/utils'

export type StepStatus = 'wait' | 'process' | 'finish' | 'error'

export interface StepsProps {
  active: number
  clickable: boolean
  direction: string
  placement: string
  percent?: number
  progressDot: boolean
  size?: string
  status: StepStatus
}

export const stepsPropsDef = {
  active: PropTypes.number.def(0),
  clickable: PropTypes.bool.def(false),
  direction: PropTypes.oneOf(['horizontal', 'vertical'] as const).def('horizontal'),
  placement: PropTypes.oneOf(['horizontal', 'vertical'] as const).def('horizontal'),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  percent: PropTypes.number.validate((value: any) => value <= 100 && value >= 0),
  progressDot: PropTypes.bool.def(false),
  size: PropTypes.oneOf(['medium', 'small'] as const).def('medium'),
  status: PropTypes.oneOf(['wait', 'process', 'finish', 'error'] as const).def('process'),
}

export type StepsInstance = InstanceType<DefineComponent<StepsProps>>

export interface StepProps {
  index: number
  title?: string
  subTitle?: string
  description?: string
  disabled: boolean
  icon?: string
  status?: StepStatus
}

export const stepPropsDef = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  description: PropTypes.string,
  disabled: PropTypes.bool.def(false),
  icon: PropTypes.string,
  status: PropTypes.oneOf(['wait', 'process', 'finish', 'error'] as const),
}

export type StepInstance = InstanceType<DefineComponent<StepProps>>
