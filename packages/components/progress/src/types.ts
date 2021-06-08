import type { DefineComponent } from 'vue'

import { IxExtractPropTypes, IxPropTypes } from '@idux/cdk/utils'
import { ProgressSize } from '@idux/components/config'

export const progressStatus = ['normal', 'success', 'exception', 'active'] as const

export const progressProps = {
  type: IxPropTypes.oneOf<ProgressType>(['line', 'circle', 'dashboard']).def('line'),
  format: IxPropTypes.func<ProgressFormat>(),
  percent: IxPropTypes.oneOfType([String, Number]).def(0),
  status: IxPropTypes.oneOf<ProgressStatus>(['normal', 'success', 'exception', 'active']),
  hideInfo: IxPropTypes.bool.def(false),
  success: IxPropTypes.object<ProgressSuccess>(),
  trailColor: IxPropTypes.string,
  strokeColor: IxPropTypes.oneOfType([String, IxPropTypes.object<ProgressGradient>()]),
  strokeLinecap: IxPropTypes.oneOf<ProgressStrokeLinecap>(['round', 'square']).def('round'),
  strokeWidth: IxPropTypes.oneOfType([String, Number]),
  gapDegree: IxPropTypes.oneOfType([String, Number]),
  gapPosition: IxPropTypes.oneOf<ProgressGapPositionType>(['top', 'bottom', 'left', 'right']),
  width: IxPropTypes.oneOfType([String, Number]).def(132),
  size: IxPropTypes.oneOf<ProgressSize>(['small', 'medium']),
}

export type ProgressProps = IxExtractPropTypes<typeof progressProps>

export type ProgressInstance = InstanceType<DefineComponent<ProgressProps>>

export type ProgressType = 'line' | 'circle' | 'dashboard'
export type ProgressGapPositionType = 'top' | 'bottom' | 'left' | 'right'
export type ProgressStatus = 'normal' | 'success' | 'exception' | 'active'
export type ProgressStrokeLinecap = 'round' | 'square'
export type StringGradients = { [percentage: string]: string }
export type FromToGradients = { from: string; to: string }
export type ProgressGradient = { direction?: string } & (StringGradients | FromToGradients)
export type ProgressFormat = (percent?: number, successPercent?: number) => string

export interface ProgressSuccess {
  percent?: number | string
  strokeColor?: string
}

export interface ConvertProgressSuccess extends ProgressSuccess {
  percent: number
}

export const convertProgressProps = {
  ...progressProps,
  success: IxPropTypes.object<ConvertProgressSuccess>().def(() => ({ percent: 0 })),
  percent: IxPropTypes.number.def(0),
}

export type ConvertProgressProps = IxExtractPropTypes<typeof convertProgressProps>
