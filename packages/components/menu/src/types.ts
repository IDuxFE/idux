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
  customAdditional: { type: Object as PropType<MenuCustomAdditional>, default: undefined },
  dataSource: Array as PropType<MenuData[]>,
  getKey: { type: [String, Function] as PropType<string | (<K = VKey>(data: MenuData<K>) => K)>, default: undefined },
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
  /**
   * @deprecated please use `overlayContainer` instead'
   */
  target: {
    type: [String, HTMLElement, Function] as PropType<PortalTargetType>,
    default: undefined,
  },
  theme: String as PropType<MenuTheme>,

  // events
  'onUpdate:expandedKeys': [Function, Array] as PropType<MaybeArray<<K = VKey>(expandedKeys: K[]) => void>>,
  'onUpdate:selectedKeys': [Function, Array] as PropType<MaybeArray<<K = VKey>(selectedKeys: K[]) => void>>,
  onClick: [Function, Array] as PropType<MaybeArray<<K = VKey>(options: MenuClickOptions<K>) => void>>,
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
