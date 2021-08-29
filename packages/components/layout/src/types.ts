import type { DefineComponent, HTMLAttributes } from 'vue'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { BreakpointKey } from '@idux/cdk/breakpoint'

import { IxPropTypes } from '@idux/cdk/utils'

export type SiderDirection = 'left' | 'right'
export type CollapseType = 'trigger' | 'breakpoint'

export const layoutProps = {
  siderOut: IxPropTypes.bool.def(false),
}

export const layoutHeaderProps = {
  borderless: IxPropTypes.bool.def(false),
  height: IxPropTypes.number.def(80),
}

export const layoutContentProps = {}

export const layoutSiderProps = {
  borderless: IxPropTypes.bool.def(false),
  width: IxPropTypes.number.def(272),
  direction: IxPropTypes.oneOf<SiderDirection>(['left', 'right']).def('left'),
  collapsed: IxPropTypes.bool,
  breakpoint: IxPropTypes.oneOf<BreakpointKey>(['xs', 'sm', 'md', 'lg', 'xl']),
  collapsedWidth: IxPropTypes.number.def(80),
  trigger: IxPropTypes.vNode,
  // events
  'onUpdate:collapsed': IxPropTypes.emit<(collapsed: boolean) => void>(),
  onCollapse: IxPropTypes.emit<(collapsed: boolean, type: CollapseType) => void>(),
  onBreakpoint: IxPropTypes.emit<(collapsed: boolean) => void>(),
}

export const layoutFooterProps = {
  borderless: IxPropTypes.bool.def(false),
  height: IxPropTypes.number.def(80),
}

export type LayoutProps = IxInnerPropTypes<typeof layoutProps>
export type LayoutPublicProps = IxPublicPropTypes<typeof layoutProps>
export type LayoutComponent = DefineComponent<HTMLAttributes & typeof layoutProps>
export type LayoutInstance = InstanceType<DefineComponent<LayoutProps>>

export type LayoutHeaderProps = IxInnerPropTypes<typeof layoutHeaderProps>
export type LayoutHeaderPublicProps = IxPublicPropTypes<typeof layoutHeaderProps>
export type LayoutHeaderComponent = DefineComponent<HTMLAttributes & typeof layoutHeaderProps>
export type LayoutHeaderInstance = InstanceType<DefineComponent<LayoutHeaderProps>>

export type LayoutContentProps = IxInnerPropTypes<typeof layoutContentProps>
export type LayoutContentPublicProps = IxPublicPropTypes<typeof layoutContentProps>
export type LayoutContentComponent = DefineComponent<HTMLAttributes & typeof layoutContentProps>
export type LayoutContentInstance = InstanceType<DefineComponent<LayoutContentProps>>

export type LayoutSiderProps = IxInnerPropTypes<typeof layoutSiderProps>
export type LayoutSiderPublicProps = IxPublicPropTypes<typeof layoutSiderProps>
export type LayoutSiderComponent = DefineComponent<HTMLAttributes & typeof layoutSiderProps>
export type LayoutSiderInstance = InstanceType<DefineComponent<LayoutSiderProps>>

export type LayoutFooterProps = IxInnerPropTypes<typeof layoutFooterProps>
export type LayoutFooterPublicProps = IxPublicPropTypes<typeof layoutFooterProps>
export type LayoutFooterComponent = DefineComponent<HTMLAttributes & typeof layoutFooterProps>
export type LayoutFooterInstance = InstanceType<DefineComponent<LayoutFooterProps>>
