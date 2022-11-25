/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { BreakpointKey } from '@idux/cdk/breakpoint'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, PropType, VNodeChild } from 'vue'

export const layoutProps = {
  fixed: { type: [Boolean, Object] as PropType<LayoutFixedType>, default: false },
  floatSider: { type: Boolean, default: false },
} as const

export type LayoutProps = ExtractInnerPropTypes<typeof layoutProps>
export type LayoutPublicProps = ExtractPublicPropTypes<typeof layoutProps>
export type LayoutComponent = DefineComponent<Omit<HTMLAttributes, keyof LayoutPublicProps> & LayoutPublicProps>
export type LayoutInstance = InstanceType<DefineComponent<LayoutProps>>

export const layoutHeaderProps = {} as const

export type LayoutHeaderProps = ExtractInnerPropTypes<typeof layoutHeaderProps>
export type LayoutHeaderPublicProps = ExtractPublicPropTypes<typeof layoutHeaderProps>
export type LayoutHeaderComponent = DefineComponent<
  Omit<HTMLAttributes, keyof LayoutHeaderPublicProps> & LayoutHeaderPublicProps
>
export type LayoutHeaderInstance = InstanceType<DefineComponent<LayoutHeaderProps>>

export const layoutContentProps = {} as const

export type LayoutContentProps = ExtractInnerPropTypes<typeof layoutContentProps>
export type LayoutContentPublicProps = ExtractPublicPropTypes<typeof layoutContentProps>
export type LayoutContentComponent = DefineComponent<
  Omit<HTMLAttributes, keyof LayoutContentPublicProps> & LayoutContentPublicProps
>
export type LayoutContentInstance = InstanceType<DefineComponent<LayoutContentProps>>

export const layoutFooterProps = {} as const

export type LayoutFooterProps = ExtractInnerPropTypes<typeof layoutFooterProps>
export type LayoutFooterPublicProps = ExtractPublicPropTypes<typeof layoutFooterProps>
export type LayoutFooterComponent = DefineComponent<
  Omit<HTMLAttributes, keyof LayoutFooterPublicProps> & LayoutFooterPublicProps
>
export type LayoutFooterInstance = InstanceType<DefineComponent<LayoutFooterProps>>

export const layoutSiderProps = {
  collapsed: { type: Boolean, default: undefined },
  breakpoint: String as PropType<BreakpointKey>,
  pointer: { type: Boolean, default: false },
  pointerDelay: { type: [Number, Array] as PropType<number | [number, number]>, default: () => [0, 100] },

  // events
  'onUpdate:collapsed': [Function, Array] as PropType<
    MaybeArray<(collapsed: boolean, changeType: LayoutCollapseChangeType) => void>
  >,
} as const

export type LayoutSiderProps = ExtractInnerPropTypes<typeof layoutSiderProps>
export type LayoutSiderPublicProps = ExtractPublicPropTypes<typeof layoutSiderProps>
export type LayoutSiderComponent = DefineComponent<
  Omit<HTMLAttributes, keyof LayoutSiderPublicProps> & LayoutSiderPublicProps
>
export type LayoutSiderInstance = InstanceType<DefineComponent<LayoutSiderProps>>

export const layoutSiderTriggerProps = {
  icon: {
    type: [String, Array] as PropType<string | VNodeChild | Array<string | VNodeChild>>,
    default: undefined,
  },
} as const

export type LayoutSiderTriggerProps = ExtractInnerPropTypes<typeof layoutSiderTriggerProps>
export type LayoutSiderTriggerPublicProps = ExtractPublicPropTypes<typeof layoutSiderTriggerProps>
export type LayoutSiderTriggerComponent = DefineComponent<
  Omit<HTMLAttributes, keyof LayoutSiderTriggerPublicProps> & LayoutSiderTriggerPublicProps
>
export type LayoutSiderTriggerInstance = InstanceType<DefineComponent<LayoutSiderTriggerProps>>

export type LayoutFixedType = boolean | { header: boolean; sider: boolean }
export type LayoutCollapseChangeType = 'breakpoint' | 'pointer' | 'trigger'
