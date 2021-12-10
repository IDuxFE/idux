/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { BreakpointKey } from '@idux/cdk/breakpoint'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

export const layoutProps = {}

export type LayoutProps = IxInnerPropTypes<typeof layoutProps>
export type LayoutPublicProps = IxPublicPropTypes<typeof layoutProps>
export type LayoutComponent = DefineComponent<Omit<HTMLAttributes, keyof LayoutPublicProps> & LayoutPublicProps>
export type LayoutInstance = InstanceType<DefineComponent<LayoutProps>>

export const layoutHeaderProps = {}

export type LayoutHeaderProps = IxInnerPropTypes<typeof layoutHeaderProps>
export type LayoutHeaderPublicProps = IxPublicPropTypes<typeof layoutHeaderProps>
export type LayoutHeaderComponent = DefineComponent<
  Omit<HTMLAttributes, keyof LayoutHeaderPublicProps> & LayoutHeaderPublicProps
>
export type LayoutHeaderInstance = InstanceType<DefineComponent<LayoutHeaderProps>>

export const layoutContentProps = {}

export type LayoutContentProps = IxInnerPropTypes<typeof layoutContentProps>
export type LayoutContentPublicProps = IxPublicPropTypes<typeof layoutContentProps>
export type LayoutContentComponent = DefineComponent<
  Omit<HTMLAttributes, keyof LayoutContentPublicProps> & LayoutContentPublicProps
>
export type LayoutContentInstance = InstanceType<DefineComponent<LayoutContentProps>>

export const layoutFooterProps = {}

export type LayoutFooterProps = IxInnerPropTypes<typeof layoutFooterProps>
export type LayoutFooterPublicProps = IxPublicPropTypes<typeof layoutFooterProps>
export type LayoutFooterComponent = DefineComponent<
  Omit<HTMLAttributes, keyof LayoutFooterPublicProps> & LayoutFooterPublicProps
>
export type LayoutFooterInstance = InstanceType<DefineComponent<LayoutFooterProps>>

export const layoutSiderProps = {
  collapsed: IxPropTypes.bool,
  breakpoint: IxPropTypes.oneOf<BreakpointKey>(['xs', 'sm', 'md', 'lg', 'xl']),

  // events
  'onUpdate:collapsed': IxPropTypes.emit<(collapsed: boolean) => void>(),
  onCollapse: IxPropTypes.emit<(collapsed: boolean, type: 'trigger' | 'breakpoint') => void>(),
}

export type LayoutSiderProps = IxInnerPropTypes<typeof layoutSiderProps>
export type LayoutSiderPublicProps = IxPublicPropTypes<typeof layoutSiderProps>
export type LayoutSiderComponent = DefineComponent<
  Omit<HTMLAttributes, keyof LayoutSiderPublicProps> & LayoutSiderPublicProps
>
export type LayoutSiderInstance = InstanceType<DefineComponent<LayoutSiderProps>>

export const layoutSiderTriggerProps = {
  icons: IxPropTypes.arrayOf(IxPropTypes.oneOfType([String, IxPropTypes.vNode])),
}

export type LayoutSiderTriggerProps = IxInnerPropTypes<typeof layoutSiderTriggerProps>
export type LayoutSiderTriggerPublicProps = IxPublicPropTypes<typeof layoutSiderTriggerProps>
export type LayoutSiderTriggerComponent = DefineComponent<
  Omit<HTMLAttributes, keyof LayoutSiderTriggerPublicProps> & LayoutSiderTriggerPublicProps
>
export type LayoutSiderTriggerInstance = InstanceType<DefineComponent<LayoutSiderTriggerProps>>
