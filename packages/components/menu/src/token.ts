/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { MenuMode, MenuProps, MenuSubProps, MenuTheme } from './types'
import type { VKey } from '@idux/cdk/utils'
import type { MenuConfig } from '@idux/components/config'
import type { ComputedRef, InjectionKey, Slots } from 'vue'

export interface MenuContext {
  props: MenuProps
  slots: Slots
  config: MenuConfig
  mergedPrefixCls: ComputedRef<string>
  indent: ComputedRef<number>
  mode: ComputedRef<MenuMode>
  theme: ComputedRef<MenuTheme>
  expandedKeys: ComputedRef<VKey[]>
  handleExpand: (key: VKey, expanded: boolean) => void
  selectedKeys: ComputedRef<VKey[]>
  handleSelected: (key: VKey) => void
  handleClick: (key: VKey, type: 'item' | 'itemGroup' | 'sub', evt: Event) => void
}

export const menuToken: InjectionKey<MenuContext> = Symbol('menuToken')

export interface MenuSubContext {
  props: { data: MenuSubProps }
  isExpanded: ComputedRef<boolean>
  isSelected: ComputedRef<boolean>
  mode: ComputedRef<MenuMode>
  level: number
  paddingLeft: ComputedRef<string | undefined>
  changeExpanded: (expanded: boolean) => void
  handleMouseEvent: (hover: boolean) => void
  handleItemClick: () => void
}

export const menuSubToken: InjectionKey<MenuSubContext> = Symbol('menuSubToken')

export const menuItemGroupToken: InjectionKey<boolean> = Symbol('menuItemGroupToken')
