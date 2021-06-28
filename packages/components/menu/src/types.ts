import type { DefineComponent } from 'vue'
import type { MenuTheme } from '@idux/components/config'

import { IxExtractPropTypes, IxPropTypes } from '@idux/cdk/utils'

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

export type MenuProps = IxExtractPropTypes<typeof menuProps>

export type MenuInstance = InstanceType<DefineComponent<MenuProps>>

export const menuItemProps = {
  cid: IxPropTypes.oneOfType([String, Number]),
  disabled: IxPropTypes.bool.def(false),
  icon: IxPropTypes.string,
  title: IxPropTypes.string,
}

export type MenuItemProps = IxExtractPropTypes<typeof menuItemProps>

export type MenuItemInstance = InstanceType<DefineComponent<MenuItemProps>>

export const menuItemGroupProps = {
  icon: IxPropTypes.string,
  title: IxPropTypes.string,
}

export type MenuItemGroupProps = IxExtractPropTypes<typeof menuItemGroupProps>

export type MenuItemGroupInstance = InstanceType<DefineComponent<MenuItemGroupProps>>

export const subMenuProps = {
  cid: IxPropTypes.oneOfType([String, Number]),
  disabled: IxPropTypes.bool.def(false),
  icon: IxPropTypes.string,
  overlayClass: IxPropTypes.string,
  suffix: IxPropTypes.string,
  suffixRotates: IxPropTypes.arrayOf(Number),
  title: IxPropTypes.string,
}

export type SubMenuProps = IxExtractPropTypes<typeof subMenuProps>

export type SubMenuInstance = InstanceType<DefineComponent<SubMenuProps>>

export type MenuMode = 'vertical' | 'horizontal' | 'inline'
