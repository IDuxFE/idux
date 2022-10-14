/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PortalTargetType } from '@idux/cdk/portal'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

export type SpinTipAlignType = 'horizontal' | 'vertical'
export type SpinSize = 'lg' | 'md' | 'sm'

export const spinProps = {
  strokeWidth: Number,
  radius: Number,
  duration: Number,
  spinning: {
    type: Boolean,
    default: true,
  },
  rotate: {
    type: Boolean,
    default: true,
  },
  icon: String,
  tip: String,
  tipAlign: String as PropType<'horizontal' | 'vertical'>,
  size: String as PropType<'lg' | 'md' | 'sm'>,
} as const

export const spinProviderProps = {}

export type SpinOptions = Partial<
  Omit<SpinProps, 'spinning'> & {
    tip: string
    target: PortalTargetType
    zIndex: number
  }
>

export type SpinRefUpdateOptions = Omit<SpinOptions, 'target'>

export interface SpinMergedOptions extends SpinOptions {
  target: PortalTargetType
  spinning: boolean
  width: number
  height: number
  hasScroll: boolean
  isFullScreen: boolean
  staticPosition: boolean
}

export interface SpinRef {
  update: (options: SpinOptions) => void
  destroy: () => void
}

export interface SpinProviderRef {
  open: (options: SpinOptions) => SpinRef
  update: (options: SpinOptions) => void
  destroy: (target?: PortalTargetType | PortalTargetType[]) => void
  destroyAll: () => void
}

export type SpinProps = ExtractInnerPropTypes<typeof spinProps>
export type SpinPublicProps = ExtractPublicPropTypes<typeof spinProps>
export type SpinComponent = DefineComponent<Omit<HTMLAttributes, keyof SpinPublicProps> & SpinPublicProps>
export type SpinInstance = InstanceType<DefineComponent<SpinProps>>

export type SpinProviderProps = ExtractInnerPropTypes<typeof spinProviderProps>
export type SpinProviderPublicProps = ExtractPublicPropTypes<typeof spinProviderProps>
export type SpinProviderComponent = DefineComponent<SpinProviderPublicProps, SpinProviderRef>
export type SpinProviderInstance = InstanceType<DefineComponent<SpinProviderProps, SpinProviderRef>>
