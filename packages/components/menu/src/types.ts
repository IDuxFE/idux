import type { DefineComponent, HTMLAttributes } from 'vue'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'

import { IxPropTypes } from '@idux/cdk/utils'

export type MenuMode = 'vertical' | 'horizontal' | 'inline'
export type MenuTheme = 'light' | 'dark'

export const menuProps = {
  collapsed: IxPropTypes.bool.def(false),
  indent: IxPropTypes.number,
  mode: IxPropTypes.oneOf<MenuMode>(['vertical', 'horizontal', 'inline']).def('vertical'),
  multiple: IxPropTypes.bool.def(false),
  selectable: IxPropTypes.bool,
  selectedIds: IxPropTypes.arrayOf(IxPropTypes.oneOfType([String, Number])).def(() => []),
  openedIds: IxPropTypes.arrayOf(IxPropTypes.oneOfType([String, Number])).def(() => []),
  theme: IxPropTypes.oneOf<MenuTheme>(['light', 'dark']),
}

export type MenuProps = IxInnerPropTypes<typeof menuProps>
export type MenuPublicProps = IxPublicPropTypes<typeof menuProps>
export type MenuComponent = DefineComponent<HTMLAttributes & typeof menuProps>
export type MenuInstance = InstanceType<DefineComponent<MenuProps>>

export const menuItemProps = {
  cid: IxPropTypes.oneOfType([String, Number]),
  disabled: IxPropTypes.bool.def(false),
  icon: IxPropTypes.string,
  title: IxPropTypes.string,
}

export type MenuItemProps = IxInnerPropTypes<typeof menuItemProps>
export type MenuItemPublicProps = IxPublicPropTypes<typeof menuItemProps>
export type MenuItemComponent = DefineComponent<HTMLAttributes & typeof menuItemProps>
export type MenuItemInstance = InstanceType<DefineComponent<MenuItemProps>>

export const menuItemGroupProps = {
  icon: IxPropTypes.string,
  title: IxPropTypes.string,
}

export type MenuItemGroupProps = IxInnerPropTypes<typeof menuItemGroupProps>
export type MenuItemGroupPublicProps = IxPublicPropTypes<typeof menuItemGroupProps>
export type MenuItemGroupComponent = DefineComponent<HTMLAttributes & typeof menuItemGroupProps>
export type MenuItemGroupInstance = InstanceType<DefineComponent<MenuItemGroupProps>>

export const menuDividerProps = {}

export type MenuDividerProps = IxInnerPropTypes<typeof menuDividerProps>
export type MenuDividerPublicProps = IxPublicPropTypes<typeof menuDividerProps>
export type MenuDividerComponent = DefineComponent<HTMLAttributes & typeof menuDividerProps>
export type MenuDividerInstance = InstanceType<DefineComponent<MenuDividerProps>>

export const menuSubProps = {
  cid: IxPropTypes.oneOfType([String, Number]),
  disabled: IxPropTypes.bool.def(false),
  icon: IxPropTypes.string,
  overlayClass: IxPropTypes.string,
  suffix: IxPropTypes.string,
  suffixRotates: IxPropTypes.arrayOf(Number),
  title: IxPropTypes.string,
}

export type MenuSubProps = IxInnerPropTypes<typeof menuSubProps>
export type MenuSubPublicProps = IxPublicPropTypes<typeof menuSubProps>
export type MenuSubComponent = DefineComponent<HTMLAttributes & typeof menuSubProps>
export type MenuSubInstance = InstanceType<DefineComponent<MenuSubProps>>
