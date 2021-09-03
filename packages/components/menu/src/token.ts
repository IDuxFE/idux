import type { ComputedRef, InjectionKey, Ref, Slots } from 'vue'
import type { MenuSubConfig } from '@idux/components/config'
import type { MenuMode, MenuSubProps, MenuTheme } from './types'

export interface MenuContext {
  expandedKeys: Ref<Array<string | number>>
  handleExpand: (key: string | number, expanded: boolean) => void
  selectedKeys: Ref<Array<string | number>>
  handleItemClick: (key: string | number) => void
  indent: ComputedRef<number>
  mode: ComputedRef<MenuMode>
  multiple: ComputedRef<boolean>
  theme: ComputedRef<MenuTheme>
}

export const menuToken: InjectionKey<MenuContext> = Symbol('menuToken')

export interface MenuSubContext {
  props: MenuSubProps
  slots: Slots
  config: MenuSubConfig
  isExpanded: ComputedRef<boolean>
  changeExpanded: (expanded: boolean) => void
  handleExpand: (key: string | number, expanded: boolean) => void
  handleMouseEvent: (hover: boolean) => void
  handleSelect: (key: string | number, selected: boolean) => void
  handleItemClick: () => void
  level: number
  mode: ComputedRef<MenuMode>
  paddingLeft: ComputedRef<string | undefined>
  theme: ComputedRef<MenuTheme>
}

export const menuSubToken: InjectionKey<MenuSubContext> = Symbol('menuSubToken')

export const menuItemGroupToken: InjectionKey<boolean> = Symbol('menuItemGroupToken')
