/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray, VKey } from '@idux/cdk/utils'
import type { LayoutCollapseChangeType, LayoutFixedType, LayoutProps, LayoutSiderProps } from '@idux/components/layout'
import type { MenuClickOptions, MenuData, MenuProps, MenuTheme } from '@idux/components/menu'
import type { DefineComponent, HTMLAttributes, PropType, VNode } from 'vue'

export const proLayoutProps = {
  activeKey: { type: [String, Number, Symbol] as PropType<VKey>, default: undefined },
  collapsed: { type: Boolean, default: undefined },
  /**
   * @deprecated
   */
  compress: { type: Boolean, default: true },
  fixed: {
    type: [Boolean, Object] as PropType<LayoutFixedType>,
    default: true,
  },
  headerMenu: {
    type: Object as PropType<MenuProps>,
    default: undefined,
  },
  logo: {
    type: Object as PropType<ProLayoutLogo>,
    default: undefined,
  },
  menus: {
    type: Array as PropType<MenuData[]>,
    default: (): MenuData[] => [],
  },
  sider: {
    type: Object as PropType<LayoutSiderProps>,
    default: undefined,
  },
  /**
   * @deprecated
   */ siderHover: {
    type: [Boolean, Object] as PropType<boolean | { delay: number }>,
    default: undefined,
  },
  siderMenu: {
    type: Object as PropType<MenuProps>,
    default: undefined,
  },
  theme: {
    type: [String, Object] as PropType<ProLayoutTheme>,
    default: () => ({ header: 'dark', sider: 'light' }),
  },
  type: {
    type: String as PropType<ProLayoutType>,
    default: 'both',
  },

  // event
  'onUpdate:activeKey': [Function, Array] as PropType<MaybeArray<(activeKey: any | null) => void>>,
  'onUpdate:collapsed': [Function, Array] as PropType<
    MaybeArray<(collapsed: boolean, changeType: LayoutCollapseChangeType) => void>
  >,
  onMenuClick: [Function, Array] as PropType<MaybeArray<(options: MenuClickOptions<any>) => void>>,
} as const

export type ProLayoutProps = ExtractInnerPropTypes<typeof proLayoutProps>
export type ProLayoutPublicProps = ExtractPublicPropTypes<typeof proLayoutProps>
export type ProLayoutComponent = DefineComponent<
  Omit<HTMLAttributes, keyof ProLayoutPublicProps> & LayoutProps & ProLayoutPublicProps
>
export type ProLayoutInstance = InstanceType<DefineComponent<ProLayoutProps>>

export interface ProLayoutLogo {
  image: string | VNode
  title: string
  link: string
}
export type ProLayoutTheme = MenuTheme | { header: MenuTheme; sider: MenuTheme }
export type ProLayoutType = 'header' | 'sider' | 'mixin' | 'both'
