/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { IxInnerPropTypes, IxPublicPropTypes, VKey } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, Slots, VNode } from 'vue'
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
  collapsedWidth: IxPropTypes.oneOfType([String, Number]),
  dataSource: IxPropTypes.array<MenuData>(),
  indent: IxPropTypes.number,
  mode: IxPropTypes.oneOf<MenuMode>(['vertical', 'horizontal', 'inline']).def('vertical'),
  multiple: IxPropTypes.bool.def(false),
  selectable: IxPropTypes.bool,
  target: ɵPortalTargetDef,
  theme: IxPropTypes.oneOf<MenuTheme>(['light', 'dark']),

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
  icon: IxPropTypes.string,
  label: IxPropTypes.string,
}

export type MenuItemProps = IxInnerPropTypes<typeof menuItemProps>
export type MenuItemPublicProps = IxPublicPropTypes<typeof menuItemProps>
export type MenuItemComponent = DefineComponent<Omit<HTMLAttributes, keyof MenuItemPublicProps> & MenuItemPublicProps>
export type MenuItemInstance = InstanceType<DefineComponent<MenuItemProps>>

export const menuItemGroupProps = {
  icon: IxPropTypes.string,
  label: IxPropTypes.string,
}

export type MenuItemGroupProps = IxInnerPropTypes<typeof menuItemGroupProps>
export type MenuItemGroupPublicProps = IxPublicPropTypes<typeof menuItemGroupProps>
export type MenuItemGroupComponent = DefineComponent<
  Omit<HTMLAttributes, keyof MenuItemGroupPublicProps> & MenuItemGroupPublicProps
>
export type MenuItemGroupInstance = InstanceType<DefineComponent<MenuItemGroupProps>>

export const menuSubProps = {
  disabled: IxPropTypes.bool.def(false),
  icon: IxPropTypes.string,
  label: IxPropTypes.string,
  offset: IxPropTypes.array() as unknown as VueTypeDef<[number, number]>,
  overlayClassName: IxPropTypes.string,
  suffix: IxPropTypes.string,
  suffixRotates: IxPropTypes.arrayOf(Number),
}

export type MenuSubProps = IxInnerPropTypes<typeof menuSubProps>
export type MenuSubPublicProps = IxPublicPropTypes<typeof menuSubProps>
export type MenuSubComponent = DefineComponent<Omit<HTMLAttributes, keyof MenuSubPublicProps> & MenuSubPublicProps>
export type MenuSubInstance = InstanceType<DefineComponent<MenuSubProps>>

export interface MenuItem extends MenuItemPublicProps {
  type: 'item'
  additional?: {
    class?: any
    style?: any
    [key: string]: unknown
  }
  key?: VKey
  slots?: Slots | Record<string, (...args: any[]) => VNode>
}

export interface MenuItemGroup extends MenuItemGroupPublicProps {
  type: 'itemGroup'
  additional?: {
    class?: any
    style?: any
    [key: string]: unknown
  }
  key?: VKey
  children?: MenuData[]
  slots?: Slots | Record<string, (...args: any[]) => VNode>
}

export interface MenuSub extends MenuSubPublicProps {
  type: 'sub'
  additional?: {
    class?: any
    style?: any
    [key: string]: unknown
  }
  key?: VKey
  children?: MenuData[]
  slots?: Slots | Record<string, (...args: any[]) => VNode>
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
