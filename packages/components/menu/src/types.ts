/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes } from 'vue'
import type { VueTypeDef } from 'vue-types'

import { IxPropTypes } from '@idux/cdk/utils'

export type MenuMode = 'vertical' | 'horizontal' | 'inline'
export type MenuTheme = 'light' | 'dark'

export const menuProps = {
  expandedKeys: IxPropTypes.arrayOf(IxPropTypes.oneOfType([String, Number])).def(() => []),
  selectedKeys: IxPropTypes.arrayOf(IxPropTypes.oneOfType([String, Number])).def(() => []),
  collapsed: IxPropTypes.bool.def(false),
  collapsedWidth: IxPropTypes.oneOfType([String, Number]),
  indent: IxPropTypes.number,
  mode: IxPropTypes.oneOf<MenuMode>(['vertical', 'horizontal', 'inline']).def('vertical'),
  multiple: IxPropTypes.bool.def(false),
  selectable: IxPropTypes.bool,
  theme: IxPropTypes.oneOf<MenuTheme>(['light', 'dark']),

  // events
  'onUpdate:expandedKeys': IxPropTypes.emit<(expandedKeys: (string | number)[]) => void>(),
  'onUpdate:selectedKeys': IxPropTypes.emit<(selectedKeys: (string | number)[]) => void>(),
  onItemClick: IxPropTypes.emit<(key: string | number, evt: Event) => void>(),
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

export const menuDividerProps = {}

export type MenuDividerProps = IxInnerPropTypes<typeof menuDividerProps>
export type MenuDividerPublicProps = IxPublicPropTypes<typeof menuDividerProps>
export type MenuDividerComponent = DefineComponent<
  Omit<HTMLAttributes, keyof MenuDividerPublicProps> & MenuDividerPublicProps
>
export type MenuDividerInstance = InstanceType<DefineComponent<MenuDividerProps>>

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
