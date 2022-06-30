/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { PortalTargetType } from '@idux/cdk/portal'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, VKey } from '@idux/cdk/utils'
import type { DefineComponent, FunctionalComponent, HTMLAttributes, PropType, VNode, VNodeChild } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

export type MenuMode = 'vertical' | 'horizontal' | 'inline'
export type MenuTheme = 'light' | 'dark'

export interface MenuClickOptions<K = VKey> {
  event: Event
  key: K
  type: 'item' | 'itemGroup' | 'sub'
}

export const menuProps = {
  expandedKeys: IxPropTypes.arrayOf(IxPropTypes.oneOfType([String, Number, Symbol])),
  selectedKeys: IxPropTypes.arrayOf(IxPropTypes.oneOfType([String, Number, Symbol])),

  collapsed: IxPropTypes.bool.def(false),
  customAdditional: { type: Object as PropType<MenuCustomAdditional>, default: undefined },
  dataSource: IxPropTypes.array<MenuData>(),
  getKey: { type: [String, Function] as PropType<string | (<K = VKey>(data: MenuData<K>) => K)>, default: undefined },
  indent: IxPropTypes.number,
  mode: IxPropTypes.oneOf<MenuMode>(['vertical', 'horizontal', 'inline']).def('vertical'),
  multiple: IxPropTypes.bool.def(false),
  overlayClassName: IxPropTypes.string,
  overlayContainer: {
    type: [String, HTMLElement, Function] as PropType<PortalTargetType>,
    default: undefined,
  },
  selectable: IxPropTypes.bool.def(true),
  /**
   * @deprecated please use `overlayContainer` instead'
   */
  target: {
    type: [String, HTMLElement, Function] as PropType<PortalTargetType>,
    default: undefined,
  },
  theme: IxPropTypes.oneOf<MenuTheme>(['light', 'dark']),

  // events
  'onUpdate:expandedKeys': IxPropTypes.emit<<K = VKey>(expandedKeys: K[]) => void>(),
  'onUpdate:selectedKeys': IxPropTypes.emit<<K = VKey>(selectedKeys: K[]) => void>(),
  onClick: IxPropTypes.emit<<K = VKey>(options: MenuClickOptions<K>) => void>(),
}

export type MenuProps = ExtractInnerPropTypes<typeof menuProps>
export type MenuPublicProps = Omit<ExtractPublicPropTypes<typeof menuProps>, 'target'>
export type MenuComponent = DefineComponent<Omit<HTMLAttributes, keyof MenuPublicProps> & MenuPublicProps>
export type MenuInstance = InstanceType<DefineComponent<MenuProps>>

export interface MenuItemSlots {
  icon?: string | ((data: MenuItemProps & { selected: boolean }) => VNodeChild)
  label?: string | ((data: MenuItemProps & { selected: boolean }) => VNodeChild)
}

export interface MenuItemProps<K = VKey> {
  key?: K
  type?: 'item'
  disabled?: boolean
  icon?: string | VNode
  label?: string
  /**
   * @deprecated please use `customIcon` and `customLabel` instead'
   */
  slots?: MenuItemSlots
  customIcon?: string | ((data: MenuItemProps<K> & { selected: boolean }) => VNodeChild)
  customLabel?: string | ((data: MenuItemProps<K> & { selected: boolean }) => VNodeChild)

  /**
   * @deprecated please use `customAdditional` instead'
   */
  additional?: {
    class?: any
    style?: any
    [key: string]: unknown
  }
}
export type MenuItemPublicProps = Omit<MenuItemProps, 'type' | 'additional' | 'slots'>
export type MenuItemComponent = FunctionalComponent<
  Omit<HTMLAttributes, keyof MenuItemPublicProps> & MenuItemPublicProps
>
export type MenuItemInstance = InstanceType<DefineComponent<MenuItemProps>>

export interface MenuItemGroupSlots {
  icon?: string | ((data: MenuItemGroupProps) => VNodeChild)
  label?: string | ((data: MenuItemGroupProps) => VNodeChild)
}

export interface MenuItemGroupProps<K = VKey> {
  type: 'itemGroup'
  key?: K
  children?: MenuData<K>[]
  icon?: string | VNode
  label?: string
  /**
   * @deprecated please use `customIcon` and `customLabel` instead'
   */
  slots?: MenuItemGroupSlots
  customIcon?: string | ((data: MenuItemGroupProps<K>) => VNodeChild)
  customLabel?: string | ((data: MenuItemGroupProps<K>) => VNodeChild)

  /**
   * @deprecated please use `customAdditional` instead'
   */
  additional?: {
    class?: any
    style?: any
    [key: string]: unknown
  }
}
export type MenuItemGroupPublicProps = Omit<MenuItemGroupProps, 'type' | 'additional' | 'slots'>
export type MenuItemGroupComponent = FunctionalComponent<
  Omit<HTMLAttributes, keyof MenuItemGroupPublicProps> & MenuItemGroupPublicProps
>
export type MenuItemGroupInstance = InstanceType<DefineComponent<MenuItemGroupProps>>

export interface MenuSubSlots {
  icon?: string | ((data: MenuSubProps & { expanded: boolean; selected: boolean }) => VNodeChild)
  label?: string | ((data: MenuSubProps & { expanded: boolean; selected: boolean }) => VNodeChild)
  suffix?: string | ((data: MenuSubProps & { expanded: boolean; selected: boolean }) => VNodeChild)
}

export interface MenuSubProps<K = VKey> {
  type: 'sub'
  key?: K
  children?: MenuData<K>[]
  disabled?: boolean
  icon?: string | VNode
  label?: string
  offset?: [number, number]
  suffix?: string
  /**
   * @deprecated please use `customIcon`, `customLabel` and `customSuffix` instead'
   */
  slots?: MenuSubSlots
  customIcon?: string | ((data: MenuSubProps<K> & { expanded: boolean; selected: boolean }) => VNodeChild)
  customLabel?: string | ((data: MenuSubProps<K> & { expanded: boolean; selected: boolean }) => VNodeChild)
  customSuffix?: string | ((data: MenuSubProps<K> & { expanded: boolean; selected: boolean }) => VNodeChild)

  /**
   * @deprecated please use `customAdditional` instead'
   */
  additional?: {
    class?: any
    style?: any
    [key: string]: unknown
  }
}

export type MenuSubPublicProps = Omit<MenuSubProps, 'type' | 'additional' | 'slots'>
export type MenuSubComponent = FunctionalComponent<Omit<HTMLAttributes, keyof MenuSubPublicProps> & MenuSubPublicProps>

export interface MenuDividerProps<K = VKey> {
  type: 'divider'
  key?: K
  /**
   * @deprecated please use `customAdditional` instead'
   */
  additional?: {
    class?: any
    style?: any
    [key: string]: unknown
  }
}

export type MenuDividerComponent = FunctionalComponent<HTMLAttributes>

export type MenuData<K = VKey> = MenuItemProps<K> | MenuItemGroupProps<K> | MenuSubProps<K> | MenuDividerProps<K>

export type MenuCustomAdditional = <K = VKey>(options: {
  data: MenuData<K>
  index: number
}) => Record<string, any> | undefined

// private
export const menuItemProps = {
  data: IxPropTypes.object<MenuItemProps>().isRequired,
  index: { type: Number, required: true },
} as const

export const menuItemGroupProps = {
  data: IxPropTypes.object<MenuItemGroupProps>().isRequired,
  index: { type: Number, required: true },
} as const

export const menuSubProps = {
  data: IxPropTypes.object<MenuSubProps>().isRequired,
  index: { type: Number, required: true },
} as const
