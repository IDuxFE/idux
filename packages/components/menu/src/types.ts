/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { IxInnerPropTypes, IxPublicPropTypes, VKey } from '@idux/cdk/utils'
import type { DefineComponent, FunctionalComponent, HTMLAttributes, VNodeChild } from 'vue'
import type { VueTypeDef } from 'vue-types'

import { ɵPortalTargetDef } from '@idux/cdk/portal'
import { IxPropTypes } from '@idux/cdk/utils'

export type MenuMode = 'vertical' | 'horizontal' | 'inline'
export type MenuTheme = 'light' | 'dark'

export interface MenuClickOptions {
  event: Event
  key: VKey
  type: 'item' | 'itemGroup' | 'sub'
}

export const menuProps = {
  expandedKeys: IxPropTypes.arrayOf(IxPropTypes.oneOfType([String, Number, Symbol])),
  selectedKeys: IxPropTypes.arrayOf(IxPropTypes.oneOfType([String, Number, Symbol])),
  collapsed: IxPropTypes.bool.def(false),
  dataSource: IxPropTypes.array<MenuData>(),
  indent: IxPropTypes.number,
  mode: IxPropTypes.oneOf<MenuMode>(['vertical', 'horizontal', 'inline']).def('vertical'),
  multiple: IxPropTypes.bool.def(false),
  selectable: IxPropTypes.bool,
  target: ɵPortalTargetDef,
  theme: IxPropTypes.oneOf<MenuTheme>(['light', 'dark']),
  overlayClassName: IxPropTypes.string,

  // events
  'onUpdate:expandedKeys': IxPropTypes.emit<(expandedKeys: VKey[]) => void>(),
  'onUpdate:selectedKeys': IxPropTypes.emit<(selectedKeys: VKey[]) => void>(),
  onClick: IxPropTypes.emit<(options: MenuClickOptions) => void>(),
}

export type MenuProps = IxInnerPropTypes<typeof menuProps>
export type MenuPublicProps = IxPublicPropTypes<typeof menuProps>
export type MenuComponent = DefineComponent<Omit<HTMLAttributes, keyof MenuPublicProps> & MenuPublicProps>
export type MenuInstance = InstanceType<DefineComponent<MenuProps>>

export const menuItemProps = {
  disabled: IxPropTypes.bool.def(false),
  icon: IxPropTypes.oneOfType([String, IxPropTypes.vNode]),
  label: IxPropTypes.string,

  slots: IxPropTypes.object<MenuItemSlots>(),
}

export type MenuItemProps = IxInnerPropTypes<typeof menuItemProps>
export type MenuItemPublicProps = Omit<IxPublicPropTypes<typeof menuItemProps>, 'slots'>
export type MenuItemComponent = FunctionalComponent<
  Omit<HTMLAttributes, keyof MenuItemPublicProps> & MenuItemPublicProps
>
export type MenuItemInstance = InstanceType<DefineComponent<MenuItemProps>>

export const menuItemGroupProps = {
  children: IxPropTypes.array<MenuData>(),
  icon: IxPropTypes.oneOfType([String, IxPropTypes.vNode]),
  label: IxPropTypes.string,

  slots: IxPropTypes.object<MenuItemGroupSlots>(),
}

export type MenuItemGroupProps = IxInnerPropTypes<typeof menuItemGroupProps>
export type MenuItemGroupPublicProps = Omit<IxPublicPropTypes<typeof menuItemGroupProps>, 'slots'>
export type MenuItemGroupComponent = FunctionalComponent<
  Omit<HTMLAttributes, keyof MenuItemGroupPublicProps> & MenuItemGroupPublicProps
>
export type MenuItemGroupInstance = InstanceType<DefineComponent<MenuItemGroupProps>>

export const menuSubProps = {
  children: IxPropTypes.array<MenuData>(),
  disabled: IxPropTypes.bool.def(false),
  icon: IxPropTypes.oneOfType([String, IxPropTypes.vNode]),
  label: IxPropTypes.string,
  offset: IxPropTypes.array() as unknown as VueTypeDef<[number, number]>,
  suffix: IxPropTypes.string,

  slots: IxPropTypes.object<MenuSubSlots>(),
}

export type MenuSubProps = IxInnerPropTypes<typeof menuSubProps>
export type MenuSubPublicProps = Omit<IxPublicPropTypes<typeof menuSubProps>, 'slots'>
export type MenuSubComponent = FunctionalComponent<Omit<HTMLAttributes, keyof MenuSubPublicProps> & MenuSubPublicProps>
export type MenuSubInstance = InstanceType<DefineComponent<MenuSubProps>>

export type MenuDividerComponent = FunctionalComponent<HTMLAttributes>

export interface MenuCommon {
  type?: 'item' | 'itemGroup' | 'sub' | 'divider'
  additional?: {
    class?: any
    style?: any
    [key: string]: unknown
  }
  key: VKey
  slots?: unknown
}

export interface MenuItemSlots {
  icon?: string | ((data: MenuItem & { selected: boolean }) => VNodeChild)
  label?: string | ((data: MenuItem & { selected: boolean }) => VNodeChild)
}
export interface MenuItem extends MenuItemPublicProps, MenuCommon {
  type?: 'item'
  slots?: MenuItemSlots
}

export interface MenuItemGroupSlots {
  icon?: string | ((data: MenuItemGroup) => VNodeChild)
  label?: string | ((data: MenuItemGroup) => VNodeChild)
}
export interface MenuItemGroup extends MenuItemGroupPublicProps, MenuCommon {
  type: 'itemGroup'
  slots?: MenuItemGroupSlots
}

export interface MenuSubSlots {
  icon?: string | ((data: MenuSub & { expanded: boolean; selected: boolean }) => VNodeChild)
  label?: string | ((data: MenuSub & { expanded: boolean; selected: boolean }) => VNodeChild)
  suffix?: string | ((data: MenuSub & { expanded: boolean; selected: boolean }) => VNodeChild)
}
export interface MenuSub extends MenuSubPublicProps, MenuCommon {
  type: 'sub'
  additional?: {
    class?: any
    style?: any
    [key: string]: unknown
  }
  slots?: MenuSubSlots
}

export interface MenuDivider {
  type: 'divider'
  additional?: {
    class?: any
    style?: any
    [key: string]: unknown
  }
  key?: VKey
}

export type MenuData = MenuItem | MenuItemGroup | MenuSub | MenuDivider
