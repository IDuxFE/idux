/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { type DefineComponent, type FunctionalComponent, type HTMLAttributes, type VNode, type VNodeChild } from 'vue'

import { ɵPortalTargetDef } from '@idux/cdk/portal'
import { type IxInnerPropTypes, IxPropTypes, type IxPublicPropTypes, type VKey } from '@idux/cdk/utils'

export type MenuMode = 'vertical' | 'horizontal' | 'inline' | 'inlineStretch'
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
  mode: IxPropTypes.oneOf<MenuMode>(['vertical', 'horizontal', 'inline', 'inlineStretch']).def('vertical'),
  multiple: IxPropTypes.bool.def(false),
  selectable: IxPropTypes.bool.def(true),
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

export interface MenuCommonProps {
  type?: 'item' | 'itemGroup' | 'sub' | 'divider'
  key: VKey
  additional?: {
    class?: any
    style?: any
    [key: string]: unknown
  }
}

export interface MenuItemSlots {
  icon?: string | ((data: MenuItemProps & { selected: boolean }) => VNodeChild)
  label?: string | ((data: MenuItemProps & { selected: boolean }) => VNodeChild)
}

export interface MenuItemProps extends MenuCommonProps {
  type?: 'item'
  disabled?: boolean
  icon?: string | VNode
  label?: string
  /**
   * @deprecated please use `customIcon` and `customLabel` instead'
   */
  slots?: MenuItemSlots
  customIcon?: string | ((data: MenuItemProps & { selected: boolean }) => VNodeChild)
  customLabel?: string | ((data: MenuItemProps & { selected: boolean }) => VNodeChild)
}
export type MenuItemPublicProps = Omit<MenuItemProps, 'type' | 'additional'>
export type MenuItemComponent = FunctionalComponent<
  Omit<HTMLAttributes, keyof MenuItemPublicProps> & MenuItemPublicProps
>
export type MenuItemInstance = InstanceType<DefineComponent<MenuItemProps>>

export interface MenuItemGroupSlots {
  icon?: string | ((data: MenuItemGroupProps) => VNodeChild)
  label?: string | ((data: MenuItemGroupProps) => VNodeChild)
}

export interface MenuItemGroupProps extends MenuCommonProps {
  type: 'itemGroup'
  children?: MenuData[]
  icon?: string | VNode
  label?: string
  /**
   * @deprecated please use `customIcon` and `customLabel` instead'
   */
  slots?: MenuItemGroupSlots
  customIcon?: string | ((data: MenuItemGroupProps) => VNodeChild)
  customLabel?: string | ((data: MenuItemGroupProps) => VNodeChild)
}
export type MenuItemGroupPublicProps = Omit<MenuItemGroupProps, 'type' | 'additional'>
export type MenuItemGroupComponent = FunctionalComponent<
  Omit<HTMLAttributes, keyof MenuItemGroupPublicProps> & MenuItemGroupPublicProps
>
export type MenuItemGroupInstance = InstanceType<DefineComponent<MenuItemGroupProps>>

export interface MenuSubSlots {
  icon?: string | ((data: MenuSubProps & { expanded: boolean; selected: boolean }) => VNodeChild)
  label?: string | ((data: MenuSubProps & { expanded: boolean; selected: boolean }) => VNodeChild)
  suffix?: string | ((data: MenuSubProps & { expanded: boolean; selected: boolean }) => VNodeChild)
}

export interface MenuSubProps extends MenuCommonProps {
  type: 'sub'
  children?: MenuData[]
  disabled?: boolean
  icon?: string | VNode
  label?: string
  offset?: [number, number]
  suffix?: string
  /**
   * @deprecated please use `customIcon`, `customLabel` and `customSuffix` instead'
   */
  slots?: MenuSubSlots
  customIcon?: string | ((data: MenuSubProps & { expanded: boolean; selected: boolean }) => VNodeChild)
  customLabel?: string | ((data: MenuSubProps & { expanded: boolean; selected: boolean }) => VNodeChild)
  customSuffix?: string | ((data: MenuSubProps & { expanded: boolean; selected: boolean }) => VNodeChild)
}

export type MenuSubPublicProps = Omit<MenuSubProps, 'type' | 'additional'>
export type MenuSubComponent = FunctionalComponent<Omit<HTMLAttributes, keyof MenuSubPublicProps> & MenuSubPublicProps>

export interface MenuDividerProps {
  type: 'divider'
  key?: VKey
  additional?: {
    class?: any
    style?: any
    [key: string]: unknown
  }
}

export type MenuDividerComponent = FunctionalComponent<HTMLAttributes>

export type MenuData = MenuItemProps | MenuItemGroupProps | MenuSubProps | MenuDividerProps

// private
export const menuItemProps = {
  data: IxPropTypes.object<MenuItemProps>().isRequired,
}

export const menuItemGroupProps = {
  data: IxPropTypes.object<MenuItemGroupProps>().isRequired,
}

export const menuSubProps = {
  data: IxPropTypes.object<MenuSubProps>().isRequired,
}
