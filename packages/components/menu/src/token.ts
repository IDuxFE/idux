import type { ComputedRef, InjectionKey, Ref } from 'vue'
import type { MenuItemProps, MenuMode } from './types'

export interface MenuItem {
  cid: ComputedRef<string | number>
  selected: Ref<boolean>
}

export interface SubMenu {
  cid: ComputedRef<string | number>
  selected: Ref<boolean>
  opened: Ref<boolean>
}

export type MenuRegisterFn = (item: MenuItem | SubMenu, isSubMenu: boolean) => void
export type MenuItemClickFn = (evt: Event, cid: string | number, item: MenuItemProps) => void
export type SetChildOpenStateFn = (cid: string | number, opened: boolean) => void
export type SetChildSelectStateFn = (cid: string | number, selected: boolean) => void

export interface MenuContext {
  multiple: ComputedRef<boolean>
  mode: ComputedRef<MenuMode>
  indent: ComputedRef<number>
  theme: ComputedRef<string>
  selectedIds: Ref<Array<string | number>>
  openedIds: Ref<Array<string | number>>
  menuItemClick: MenuItemClickFn
  childMenuItemClick: () => void
  setChildOpenState: SetChildOpenStateFn
}

export const menuToken: InjectionKey<MenuContext> = Symbol('menuToken')

export interface SubMenuContext {
  level: number
  menuItemClick: MenuItemClickFn
  setChildOpenState: SetChildOpenStateFn
  setChildSelectState: SetChildSelectStateFn
}

export const subMenuToken: InjectionKey<SubMenuContext> = Symbol('subMenuToken')

export const menuItemGroupToken: InjectionKey<boolean> = Symbol('menuItemGroupToken')
