/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { PortalTargetType } from '@idux/cdk/portal'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray, VKey } from '@idux/cdk/utils'
import type { DefineComponent, FunctionalComponent, HTMLAttributes, PropType, VNode, VNodeChild } from 'vue'

export type MenuMode = 'vertical' | 'horizontal' | 'inline'
export type MenuTheme = 'light' | 'dark'

export interface MenuClickOptions<K = VKey> {
  event: Event
  key: K
  type: 'item' | 'itemGroup' | 'sub'
}

export const menuProps = {
  expandedKeys: Array as PropType<VKey[]>,
  selectedKeys: Array as PropType<VKey[]>,

  collapsed: {
    type: Boolean,
    default: false,
  },
  customAdditional: { type: Function as PropType<MenuCustomAdditional>, default: undefined },
  dataSource: Array as PropType<MenuData[]>,
  getKey: {
    type: [String, Function] as PropType<string | ((data: MenuData<any>) => any)>,
    default: undefined,
  },
  indent: Number,
  mode: {
    type: String as PropType<MenuMode>,
    default: 'vertical',
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  overlayClassName: String,
  overlayContainer: {
    type: [String, HTMLElement, Function] as PropType<PortalTargetType>,
    default: undefined,
  },
  selectable: {
    type: Boolean,
    default: true,
  },

  theme: String as PropType<MenuTheme>,

  // events
  'onUpdate:expandedKeys': [Function, Array] as PropType<MaybeArray<(expandedKeys: any[]) => void>>,
  'onUpdate:selectedKeys': [Function, Array] as PropType<MaybeArray<(selectedKeys: any[]) => void>>,
  onClick: [Function, Array] as PropType<MaybeArray<(options: MenuClickOptions<any>) => void>>,
}

export type MenuProps = ExtractInnerPropTypes<typeof menuProps>
export type MenuPublicProps = ExtractPublicPropTypes<typeof menuProps>
export type MenuComponent = DefineComponent<Omit<HTMLAttributes, keyof MenuPublicProps> & MenuPublicProps>
export type MenuInstance = InstanceType<DefineComponent<MenuProps>>

export interface MenuItemProps<K = VKey> {
  key?: K
  type?: 'item'
  disabled?: boolean
  icon?: string | VNode
  label?: string
  customIcon?: string | ((data: MenuItemProps<K> & { selected: boolean }) => VNodeChild)
  customLabel?: string | ((data: MenuItemProps<K> & { selected: boolean }) => VNodeChild)
}
export type MenuItemPublicProps = Omit<MenuItemProps, 'type'>
export type MenuItemComponent = FunctionalComponent<
  Omit<HTMLAttributes, keyof MenuItemPublicProps> & MenuItemPublicProps
>
export type MenuItemInstance = InstanceType<DefineComponent<MenuItemProps>>

export interface MenuItemGroupProps<K = VKey> {
  type: 'itemGroup'
  key?: K
  children?: MenuData<K>[]
  icon?: string | VNode
  label?: string
  customIcon?: string | ((data: MenuItemGroupProps<K>) => VNodeChild)
  customLabel?: string | ((data: MenuItemGroupProps<K>) => VNodeChild)
}
export type MenuItemGroupPublicProps = Omit<MenuItemGroupProps, 'type'>
export type MenuItemGroupComponent = FunctionalComponent<
  Omit<HTMLAttributes, keyof MenuItemGroupPublicProps> & MenuItemGroupPublicProps
>
export type MenuItemGroupInstance = InstanceType<DefineComponent<MenuItemGroupProps>>

export interface MenuSubProps<K = VKey> {
  type: 'sub'
  key?: K
  children?: MenuData<K>[]
  disabled?: boolean
  icon?: string | VNode
  label?: string
  offset?: [number, number]
  suffix?: string
  customIcon?: string | ((data: MenuSubProps<K> & { expanded: boolean; selected: boolean }) => VNodeChild)
  customLabel?: string | ((data: MenuSubProps<K> & { expanded: boolean; selected: boolean }) => VNodeChild)
  customSuffix?: string | ((data: MenuSubProps<K> & { expanded: boolean; selected: boolean }) => VNodeChild)
}

export type MenuSubPublicProps = Omit<MenuSubProps, 'type'>
export type MenuSubComponent = FunctionalComponent<Omit<HTMLAttributes, keyof MenuSubPublicProps> & MenuSubPublicProps>

export interface MenuDividerProps<K = VKey> {
  type: 'divider'
  key?: K
}

export type MenuDividerComponent = FunctionalComponent<HTMLAttributes>

export type MenuData<K = VKey> = MenuItemProps<K> | MenuItemGroupProps<K> | MenuSubProps<K> | MenuDividerProps<K>

export type MenuCustomAdditional = (options: { data: MenuData<any>; index: number }) => Record<string, any> | undefined

// private
export const menuItemProps = {
  data: {
    type: Object as PropType<MenuItemProps>,
    required: true,
  },
  index: { type: Number, required: true },
} as const

export const menuItemGroupProps = {
  data: {
    type: Object as PropType<MenuItemGroupProps>,
    required: true,
  },
  index: { type: Number, required: true },
} as const

export const menuSubProps = {
  data: {
    type: Object as PropType<MenuSubProps>,
    required: true,
  },
  index: { type: Number, required: true },
} as const
