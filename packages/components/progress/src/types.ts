/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, PropType, VNode, VNodeChild } from 'vue'

export type ProgressSize = 'sm' | 'md' | 'lg'
export type ProgressFormat = (percent: number, successPercent?: number) => VNodeChild
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

export interface ProgressIcons {
  success: string | VNode
  exception: string | VNode
}

export const progressStatus = ['normal', 'success', 'exception', 'active'] as const

export const progressProps = {
  type: {
    type: String as PropType<ProgressType>,
    default: 'line',
  },
  format: Function as PropType<ProgressFormat>,
  percent: {
    type: [String, Number] as PropType<string | number>,
    default: 0,
  },
  status: String as PropType<ProgressStatus>,
  hideInfo: {
    type: Boolean,
    default: false,
  },
  success: Object as PropType<ProgressSuccess>,
  trailColor: String,
  strokeColor: [String, Object] as PropType<string | ProgressGradient>,
  strokeLinecap: String as PropType<ProgressStrokeLinecap>,
  strokeWidth: [String, Number] as PropType<string | number>,
  gapDegree: [String, Number] as PropType<string | number>,
  gapPosition: String as PropType<ProgressGapPositionType>,
  width: {
    type: [String, Number] as PropType<string | number>,
    default: 132,
  },
  size: String as PropType<ProgressSize>,
  icons: Object as PropType<ProgressIcons>,
} as const

export type ProgressProps = ExtractInnerPropTypes<typeof progressProps>
export type ProgressPublicProps = ExtractPublicPropTypes<typeof progressProps>
export type ProgressComponent = DefineComponent<Omit<HTMLAttributes, keyof ProgressPublicProps> & ProgressPublicProps>
export type ProgressInstance = InstanceType<DefineComponent<ProgressProps>>
