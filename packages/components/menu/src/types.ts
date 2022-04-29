/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  type DefineComponent,
  type FunctionalComponent,
  type HTMLAttributes,
  type PropType,
  type VNode,
  type VNodeChild,
} from 'vue'

import { ɵPortalTargetDef } from '@idux/cdk/portal'
import { type ExtractInnerPropTypes, type ExtractPublicPropTypes, IxPropTypes, type VKey } from '@idux/cdk/utils'

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
  customAdditional: { type: Object as PropType<MenuCustomAdditional>, default: undefined },
  dataSource: IxPropTypes.array<MenuData>(),
  getKey: { type: [String, Function] as PropType<string | ((data: MenuData) => VKey)>, default: undefined },
  indent: IxPropTypes.number,
  mode: IxPropTypes.oneOf<MenuMode>(['vertical', 'horizontal', 'inline']).def('vertical'),
  multiple: IxPropTypes.bool.def(false),
  overlayClassName: IxPropTypes.string,
  overlayContainer: ɵPortalTargetDef,
  selectable: IxPropTypes.bool.def(true),
  /**
   * @deprecated please use `overlayContainer` instead'
   */
  target: ɵPortalTargetDef,
  theme: IxPropTypes.oneOf<MenuTheme>(['light', 'dark']),

  // events
  'onUpdate:expandedKeys': IxPropTypes.emit<(expandedKeys: VKey[]) => void>(),
  'onUpdate:selectedKeys': IxPropTypes.emit<(selectedKeys: VKey[]) => void>(),
  onClick: IxPropTypes.emit<(options: MenuClickOptions) => void>(),
}

export type MenuProps = ExtractInnerPropTypes<typeof menuProps>
export type MenuPublicProps = Omit<ExtractPublicPropTypes<typeof menuProps>, 'target'>
export type MenuComponent = DefineComponent<Omit<HTMLAttributes, keyof MenuPublicProps> & MenuPublicProps>
export type MenuInstance = InstanceType<DefineComponent<MenuProps>>

export interface MenuItemSlots {
  icon?: string | ((data: MenuItemProps & { selected: boolean }) => VNodeChild)
  label?: string | ((data: MenuItemProps & { selected: boolean }) => VNodeChild)
}

export interface MenuItemProps {
  key?: VKey
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

export interface MenuItemGroupProps {
  type: 'itemGroup'
  key?: VKey
  children?: MenuData[]
  icon?: string | VNode
  label?: string
  /**
   * @deprecated please use `customIcon` and `customLabel` instead'
   */
  slots?: MenuItemGroupSlots
  customIcon?: string | ((data: MenuItemGroupProps) => VNodeChild)
  customLabel?: string | ((data: MenuItemGroupProps) => VNodeChild)

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

export interface MenuSubProps {
  type: 'sub'
  key?: VKey
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

export interface MenuDividerProps {
  type: 'divider'
  key?: VKey
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

export type MenuData = MenuItemProps | MenuItemGroupProps | MenuSubProps | MenuDividerProps

export type MenuCustomAdditional = (options: { data: MenuData; index: number }) => Record<string, any> | undefined

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
