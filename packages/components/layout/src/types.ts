import type { DefineComponent, HTMLAttributes } from 'vue'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { BreakpointKey } from '@idux/cdk/breakpoint'

import { IxPropTypes } from '@idux/cdk/utils'

export type LayoutSiderCollapseType = 'trigger' | 'breakpoint'

export const layoutProps = {
  outSider: IxPropTypes.bool.def(false),
}

export type LayoutProps = IxInnerPropTypes<typeof layoutProps>
export type LayoutPublicProps = IxPublicPropTypes<typeof layoutProps>
export type LayoutComponent = DefineComponent<HTMLAttributes & typeof layoutProps>
export type LayoutInstance = InstanceType<DefineComponent<LayoutProps>>

export const layoutHeaderProps = {}

export type LayoutHeaderProps = IxInnerPropTypes<typeof layoutHeaderProps>
export type LayoutHeaderPublicProps = IxPublicPropTypes<typeof layoutHeaderProps>
export type LayoutHeaderComponent = DefineComponent<HTMLAttributes & typeof layoutHeaderProps>
export type LayoutHeaderInstance = InstanceType<DefineComponent<LayoutHeaderProps>>

export const layoutContentProps = {}

export type LayoutContentProps = IxInnerPropTypes<typeof layoutContentProps>
export type LayoutContentPublicProps = IxPublicPropTypes<typeof layoutContentProps>
export type LayoutContentComponent = DefineComponent<HTMLAttributes & typeof layoutContentProps>
export type LayoutContentInstance = InstanceType<DefineComponent<LayoutContentProps>>

export const layoutSiderProps = {
  collapsed: IxPropTypes.bool.def(false),
  collapsedWidth: IxPropTypes.number.def(64),
  breakpoint: IxPropTypes.oneOf<BreakpointKey>(['xs', 'sm', 'md', 'lg', 'xl']),
  placement: IxPropTypes.oneOf(['start', 'end'] as const).def('start'),
  width: IxPropTypes.number.def(200),
  showTrigger: IxPropTypes.bool.def(false),

  // events
  'onUpdate:collapsed': IxPropTypes.emit<(collapsed: boolean) => void>(),
  onCollapse: IxPropTypes.emit<(collapsed: boolean, type: LayoutSiderCollapseType) => void>(),
}

export const triggerProps = {
  collapsed: IxPropTypes.bool.def(false),
  onClick: IxPropTypes.emit<(collapsed: boolean) => void>(),
}

export type LayoutSiderProps = IxInnerPropTypes<typeof layoutSiderProps>
export type LayoutSiderPublicProps = IxPublicPropTypes<typeof layoutSiderProps>
export type LayoutSiderComponent = DefineComponent<HTMLAttributes & typeof layoutSiderProps>
export type LayoutSiderInstance = InstanceType<DefineComponent<LayoutSiderProps>>

export const layoutFooterProps = {}

export type LayoutFooterProps = IxInnerPropTypes<typeof layoutFooterProps>
export type LayoutFooterPublicProps = IxPublicPropTypes<typeof layoutFooterProps>
export type LayoutFooterComponent = DefineComponent<HTMLAttributes & typeof layoutFooterProps>
export type LayoutFooterInstance = InstanceType<DefineComponent<LayoutFooterProps>>
