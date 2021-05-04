import type { DefineComponent } from 'vue'
import { object } from 'vue-types'
import { PropTypes } from '@idux/cdk/utils'
import { ProgressSize } from '@idux/components/config'

export const progressStatus = ['normal', 'success', 'exception', 'active'] as const

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

export const progressPropsDef = {
  type: PropTypes.oneOf(['line', 'circle', 'dashboard'] as const).def('line'),
  format: PropTypes.func,
  percent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).def(0),
  status: PropTypes.oneOf(progressStatus),
  hideInfo: PropTypes.bool.def(false),
  success: object<ProgressSuccess>(),
  trailColor: PropTypes.string,
  strokeColor: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  strokeLinecap: PropTypes.oneOf(['round', 'square'] as const).def('round'),
  strokeWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  gapDegree: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  gapPosition: PropTypes.oneOf(['top', 'bottom', 'left', 'right'] as const),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).def(132),
  size: PropTypes.oneOf(['small', 'medium'] as const),
}

export const convertProgressPropsDef = {
  ...progressPropsDef,
  percent: PropTypes.number.def(0),
  success: object<ConvertProgressSuccess>().def(() => ({ percent: 0 })),
}

export interface ConvertProgressProps extends ProgressProps {
  percent: number
  success: ConvertProgressSuccess
}

export interface ProgressProps {
  type: ProgressType
  format?: ProgressFormat
  percent: string | number
  status?: ProgressStatus
  hideInfo: boolean
  success?: ProgressSuccess
  trailColor?: string
  strokeColor?: string | ProgressGradient
  strokeLinecap: ProgressStrokeLinecap
  strokeWidth?: string | number
  gapDegree?: string | number
  gapPosition?: ProgressGapPositionType
  width: string | number
  size?: ProgressSize
}

export type ProgressComponent = InstanceType<DefineComponent<ProgressProps>>
