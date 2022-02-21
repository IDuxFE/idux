/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IxInnerPropTypes, IxPublicPropTypes, VKey } from '@idux/cdk/utils'
import type { LayoutSiderProps } from '@idux/components/layout'
import type { MenuClickOptions, MenuData, MenuProps, MenuTheme } from '@idux/components/menu'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

export interface SiderHover {
  delay: number
}

export interface SiderHoverCtrl extends SiderHover {
  enable: boolean
}

export const proLayoutProps = {
  activeKey: IxPropTypes.oneOfType<VKey>([String, Number, Symbol]),
  collapsed: IxPropTypes.bool,
  siderHover: IxPropTypes.oneOfType([IxPropTypes.bool, IxPropTypes.object<SiderHover>()]),
  compress: IxPropTypes.bool.def(true),
  fixed: IxPropTypes.oneOfType([Boolean, IxPropTypes.object<{ header: boolean; sider: boolean }>()]).def(false),
  menus: IxPropTypes.array<MenuData>().def(() => []),
  sider: IxPropTypes.object<LayoutSiderProps>(),
  siderMenu: IxPropTypes.object<MenuProps>(),
  theme: IxPropTypes.oneOfType([
    IxPropTypes.oneOf(['light', 'dark']),
    IxPropTypes.object<{ header: MenuTheme; sider: MenuTheme }>(),
  ]).def('light'),
  type: IxPropTypes.oneOf<ProLayoutType>(['header', 'sider', 'both', 'mixin']).def('mixin'),

  // event
  'onUpdate:activeKey': IxPropTypes.emit<(activeKey: VKey | null) => void>(),
  'onUpdate:collapsed': IxPropTypes.emit<(collapsed: boolean) => void>(),
  onMenuClick: IxPropTypes.emit<(options: MenuClickOptions) => void>(),
}

export type ProLayoutProps = IxInnerPropTypes<typeof proLayoutProps>
export type ProLayoutPublicProps = IxPublicPropTypes<typeof proLayoutProps>
export type ProLayoutComponent = DefineComponent<
  Omit<HTMLAttributes, keyof ProLayoutPublicProps> & ProLayoutPublicProps
>
export type ProLayoutInstance = InstanceType<DefineComponent<ProLayoutProps>>

export type ProLayoutFixed = boolean | { header: boolean; sider: boolean }
export type ProLayoutType = 'header' | 'sider' | 'mixin' | 'both'

export const proLayoutSiderTriggerProps = {
  icon: IxPropTypes.arrayOf(IxPropTypes.oneOfType([String, IxPropTypes.vNode])),
}

export type ProLayoutSiderTriggerProps = IxInnerPropTypes<typeof proLayoutSiderTriggerProps>
export type ProLayoutSiderTriggerPublicProps = IxPublicPropTypes<typeof proLayoutSiderTriggerProps>
export type ProLayoutSiderTriggerComponent = DefineComponent<
  Omit<HTMLAttributes, keyof ProLayoutSiderTriggerPublicProps> & ProLayoutSiderTriggerPublicProps
>
export type ProLayoutSiderTriggerInstance = InstanceType<DefineComponent<ProLayoutSiderTriggerProps>>
