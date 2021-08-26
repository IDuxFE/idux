import type { ComputedRef, InjectionKey, Ref } from 'vue'
import type { MenuItemProps, MenuMode, MenuTheme } from './types'

export interface MenuItem {
  cid: ComputedRef<string | number>
  selected: Ref<boolean>
}

export interface MenuSub {
  cid: ComputedRef<string | number>
  selected: Ref<boolean>
  opened: Ref<boolean>
}

export type MenuRegisterFn = (item: MenuItem | MenuSub, isMenuSub: boolean) => void
export type MenuItemClickFn = (evt: Event, cid: string | number, item: MenuItemProps) => void
export type SetChildOpenStateFn = (cid: string | number, opened: boolean) => void
export type SetChildSelectStateFn = (cid: string | number, selected: boolean) => void

export interface MenuContext {
  multiple: ComputedRef<boolean>
  mode: ComputedRef<MenuMode>
  indent: ComputedRef<number>
  theme: ComputedRef<MenuTheme>
  selectedIds: Ref<Array<string | number>>
  openedIds: Ref<Array<string | number>>
  menuItemClick: MenuItemClickFn
  childMenuItemClick: () => void
  setChildOpenState: SetChildOpenStateFn
}

export const menuToken: InjectionKey<MenuContext> = Symbol('menuToken')

export interface MenuSubContext {
  level: number
  menuItemClick: MenuItemClickFn
  setChildOpenState: SetChildOpenStateFn
  setChildSelectState: SetChildSelectStateFn
}

export const menuSubToken: InjectionKey<MenuSubContext> = Symbol('menuSubToken')

export const menuItemGroupToken: InjectionKey<boolean> = Symbol('menuItemGroupToken')
