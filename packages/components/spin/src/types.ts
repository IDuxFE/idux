/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

export type SpinTipAlignType = 'horizontal' | 'vertical'
export type SpinSize = 'lg' | 'md' | 'sm'

export const spinProps = {
  strokeWidth: { type: Number, default: undefined },
  radius: { type: Number, default: undefined },
  duration: { type: Number, default: undefined },
  spinning: { type: Boolean, default: true },
  rotate: { type: Boolean, default: true },
  icon: { type: String, default: undefined },
  tip: { type: String, default: undefined },
  tipAlign: { type: String as PropType<SpinTipAlignType>, default: undefined },
  size: { type: String as PropType<SpinSize>, default: undefined },
}

export const spinProviderProps = {}

export type SpinProviderOptions = Partial<
  Omit<SpinProps, 'spinning'> & { target?: string | HTMLElement | (() => string | HTMLElement) }
>

export interface SpinContainerOptions extends SpinProviderOptions {
  spinning: boolean
  width: number
  height: number
  isFullScreen: boolean
  hasScroll: boolean
  staticPosition: boolean
}

export interface SpinProviderRef {
  open: (tip?: string, options?: SpinProviderOptions) => void
  update: (tip?: string, options?: SpinProviderOptions) => void
  close: (target?: string | HTMLElement | (() => string | HTMLElement)) => void
  closeAll: () => void
}

export type SpinProps = ExtractInnerPropTypes<typeof spinProps>
export type SpinPublicProps = ExtractPublicPropTypes<typeof spinProps>
export type SpinComponent = DefineComponent<Omit<HTMLAttributes, keyof SpinPublicProps> & SpinPublicProps>
export type SpinInstance = InstanceType<DefineComponent<SpinProps>>

export type SpinProviderProps = ExtractInnerPropTypes<typeof spinProviderProps>
export type SpinProviderPublicProps = ExtractPublicPropTypes<typeof spinProviderProps>
export type SpinProviderComponent = DefineComponent<SpinProviderPublicProps, SpinProviderRef>
export type SpinProviderInstance = InstanceType<DefineComponent<SpinProviderProps, SpinProviderRef>>
