/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray, VKey } from '@idux/cdk/utils'
import type { LayoutSiderProps } from '@idux/components/layout'
import type { MenuClickOptions, MenuData, MenuProps, MenuTheme } from '@idux/components/menu'
import type { DefineComponent, HTMLAttributes, PropType, VNode } from 'vue'

export const proLayoutProps = {
  activeKey: {
    type: [String, Number, Symbol] as PropType<VKey>,
    default: undefined,
  },
  collapsed: {
    type: Boolean,
    default: undefined,
  },
  compress: {
    type: Boolean,
    default: true,
  },
  fixed: {
    type: [Boolean, Object] as PropType<boolean | { header: boolean; sider: boolean }>,
    default: false,
  },
  menus: {
    type: Array as PropType<MenuData[]>,
    default: (): MenuData[] => [],
  },
  sider: {
    type: Object as PropType<LayoutSiderProps>,
    default: undefined,
  },
  siderHover: {
    type: [Boolean, Object] as PropType<boolean | SiderHover>,
    default: undefined,
  },
  siderMenu: {
    type: Object as PropType<MenuProps>,
    default: (): MenuData[] => [],
  },
  theme: {
    type: [String, Object] as PropType<MenuTheme | { header: MenuTheme; sider: MenuTheme }>,
    default: 'light',
  },
  type: {
    type: String as PropType<ProLayoutType>,
    default: 'mixin',
  },

  // event
  'onUpdate:activeKey': [Function, Array] as PropType<MaybeArray<(activeKey: VKey | null) => void>>,
  'onUpdate:collapsed': [Function, Array] as PropType<MaybeArray<(collapsed: boolean) => void>>,
  onMenuClick: [Function, Array] as PropType<MaybeArray<(options: MenuClickOptions) => void>>,
}

export type ProLayoutProps = ExtractInnerPropTypes<typeof proLayoutProps>
export type ProLayoutPublicProps = ExtractPublicPropTypes<typeof proLayoutProps>
export type ProLayoutComponent = DefineComponent<
  Omit<HTMLAttributes, keyof ProLayoutPublicProps> & ProLayoutPublicProps
>
export type ProLayoutInstance = InstanceType<DefineComponent<ProLayoutProps>>

export const proLayoutSiderTriggerProps = {
  icon: {
    type: [String, Array] as PropType<string | Array<string | VNode>>,
    default: undefined,
  },
}

export type ProLayoutSiderTriggerProps = ExtractInnerPropTypes<typeof proLayoutSiderTriggerProps>
export type ProLayoutSiderTriggerPublicProps = ExtractPublicPropTypes<typeof proLayoutSiderTriggerProps>
export type ProLayoutSiderTriggerComponent = DefineComponent<
  Omit<HTMLAttributes, keyof ProLayoutSiderTriggerPublicProps> & ProLayoutSiderTriggerPublicProps
>
export type ProLayoutSiderTriggerInstance = InstanceType<DefineComponent<ProLayoutSiderTriggerProps>>

export type ProLayoutFixed = boolean | { header: boolean; sider: boolean }
export type ProLayoutType = 'header' | 'sider' | 'mixin' | 'both'
export interface SiderHover {
  delay: number
}
export interface SiderHoverCtrl extends SiderHover {
  enable: boolean
}
