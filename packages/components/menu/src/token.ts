/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { MenuMode, MenuSubProps, MenuTheme } from './types'
import type { PortalTargetType } from '@idux/cdk/portal'
import type { VKey } from '@idux/cdk/utils'
import type { MenuSubConfig } from '@idux/components/config'
import type { ComputedRef, InjectionKey, Slots } from 'vue'

export interface MenuContext {
  mergedPrefixCls: ComputedRef<string>
  target: ComputedRef<PortalTargetType>
  indent: ComputedRef<number>
  mode: ComputedRef<MenuMode>
  multiple: ComputedRef<boolean>
  theme: ComputedRef<MenuTheme>
  expandedKeys: ComputedRef<VKey[]>
  handleExpand: (key: VKey, expanded: boolean) => void
  selectedKeys: ComputedRef<VKey[]>
  handleClick: (key: VKey, type: 'item' | 'itemGroup' | 'sub', evt: Event) => void
  overlayClassName: ComputedRef<string>
}

export const menuToken: InjectionKey<MenuContext> = Symbol('menuToken')

export interface MenuSubContext {
  props: MenuSubProps
  slots: Slots
  config: MenuSubConfig
  isExpanded: ComputedRef<boolean>
  mode: ComputedRef<MenuMode>
  level: number
  paddingLeft: ComputedRef<string | undefined>
  changeExpanded: (expanded: boolean) => void
  handleExpand: (key: VKey, expanded: boolean) => void
  handleMouseEvent: (hover: boolean) => void
  handleSelect: (key: VKey, selected: boolean) => void
  handleItemClick: () => void
}

export const menuSubToken: InjectionKey<MenuSubContext> = Symbol('menuSubToken')

export const menuItemGroupToken: InjectionKey<boolean> = Symbol('menuItemGroupToken')
