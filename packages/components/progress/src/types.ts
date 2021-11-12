/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

export type ProgressSize = 'sm' | 'md'
export type ProgressFormat = (percent: number, successPercent?: number) => string
export type ProgressType = 'line' | 'circle' | 'dashboard'
export type ProgressGapPositionType = 'top' | 'bottom' | 'left' | 'right'
export type ProgressStatus = 'normal' | 'success' | 'exception' | 'active'
export type ProgressStrokeLinecap = 'round' | 'square'
export type StringGradients = { [percentage: string]: string }
export type FromToGradients = { from: string; to: string }
export type ProgressGradient = { direction?: string } & (StringGradients | FromToGradients)

export interface ProgressSuccess {
  percent?: number | string
  strokeColor?: string
}

export interface ConvertProgressSuccess extends ProgressSuccess {
  percent: number
}

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
  size: IxPropTypes.oneOf<ProgressSize>(['sm', 'md']),
}

export type ProgressProps = IxInnerPropTypes<typeof progressProps>
export type ProgressPublicProps = IxPublicPropTypes<typeof progressProps>
export type ProgressComponent = DefineComponent<Omit<HTMLAttributes, keyof ProgressPublicProps> & ProgressPublicProps>
export type ProgressInstance = InstanceType<DefineComponent<ProgressProps>>

export const convertProgressProps = {
  ...progressProps,
  success: IxPropTypes.object<ConvertProgressSuccess>().def(() => ({ percent: 0 })),
  percent: IxPropTypes.number.def(0),
}

export type ConvertProgressProps = IxPublicPropTypes<typeof convertProgressProps>
