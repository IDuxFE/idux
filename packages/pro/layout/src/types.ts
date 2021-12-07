/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { BreakpointKey } from '@idux/cdk/breakpoint'
import type { IxInnerPropTypes, IxPublicPropTypes, VKey } from '@idux/cdk/utils'
import type { MenuClickOptions, MenuData, MenuDivider, MenuItemGroup, MenuSub } from '@idux/components/menu'
import type { DefineComponent, HTMLAttributes, Ref } from 'vue'

import { VNode } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

const modeTypes = ['header', 'sider', 'mixin', 'both'] as const
const themes = ['light', 'dark'] as const

type SiderHeaderValue<T> = {
  sider: T
  header: T
}

export type SiderHeaderTheme = SiderHeaderValue<typeof themes[number]>

export type LayoutProSiderMode = 'vertical' | 'inline'
export type LayoutProModeTypes = typeof modeTypes[number]
export type LayoutProThemes = typeof themes[number] | SiderHeaderTheme
export type LayoutProMenuData = (
  | (Omit<Extract<MenuData, MenuItemGroup | MenuSub>, 'children'> & { children: LayoutProMenuData[] })
  | Exclude<MenuData, MenuItemGroup | MenuSub>
) & { key: VKey }
export type LayoutProHeaderMenu = Omit<LayoutProMenuData, 'children'>
export type LayoutProAvailableMenu = Exclude<LayoutProMenuData, MenuDivider> & {
  children: LayoutProAvailableMenu[]
}
export type LayoutProMenuPath = Pick<LayoutProAvailableMenu, 'key' | 'label' | 'type'>

export const layoutProProps = {
  collapsed: IxPropTypes.bool,
  activeKey: IxPropTypes.oneOfType<VKey>([String, Number, Symbol]),
  menus: IxPropTypes.array<LayoutProMenuData>().isRequired,
  mode: IxPropTypes.oneOf<LayoutProModeTypes>(['header', 'sider', 'mixin', 'both']).def('sider'),
  theme: IxPropTypes.oneOfType<LayoutProThemes>([IxPropTypes.oneOf(themes), Object]),
  indent: IxPropTypes.number,
  fixed: IxPropTypes.oneOfType<boolean | SiderHeaderValue<boolean>>([Boolean, Object]),
  breakpoint: IxPropTypes.oneOf<BreakpointKey>(['xs', 'sm', 'md', 'lg', 'xl']),

  // event
  'onUpdate:collapsed': IxPropTypes.emit<(collapsed: boolean) => void>(),
  'onUpdate:activeKey': IxPropTypes.emit<(activeKey: VKey | null) => void>(),
  onMenuClick: IxPropTypes.emit<(options: MenuClickOptions) => void>(),
}

export type LayoutProProps = IxInnerPropTypes<typeof layoutProProps>
export type LayoutProPublicProps = IxPublicPropTypes<typeof layoutProProps>
export type LayoutProComponent = DefineComponent<
  Omit<HTMLAttributes, keyof LayoutProPublicProps> & LayoutProPublicProps
>
export type LayoutProInstance = InstanceType<DefineComponent<LayoutProProps>>

export type LayoutProCtrlType = {
  collapsed: Readonly<Ref<boolean>>
  changeCollapsed: (collapsed: boolean) => void
}
export const layoutProCtrlProps = {
  foldedIcon: IxPropTypes.oneOfType<string | VNode>([String, IxPropTypes.vNode]),
  unfoldedIcon: IxPropTypes.oneOfType<string | VNode>([String, IxPropTypes.vNode]),
}
export type LayoutProCtrlProps = IxInnerPropTypes<typeof layoutProCtrlProps>
export type LayoutProCtrlPublicProps = IxPublicPropTypes<typeof layoutProProps>
export type LayoutProCtrlComponent = DefineComponent<
  Omit<HTMLAttributes, keyof LayoutProCtrlPublicProps> & LayoutProCtrlPublicProps
>
