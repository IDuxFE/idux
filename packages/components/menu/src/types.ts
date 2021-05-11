import type { DefineComponent } from 'vue'
import type { MenuTheme } from '@idux/components/config'

import { PropTypes } from '@idux/cdk/utils'
import { VueTypeDef } from 'vue-types'

export type MenuMode = 'vertical' | 'horizontal' | 'inline'

export interface MenuProps {
  collapsed: boolean
  indent?: number
  mode: MenuMode
  multiple: boolean
  selectable?: boolean
  selectedIds: Array<string | number>
  openedIds: Array<string | number>
  theme?: MenuTheme
}

export const menuPropsDef = {
  collapsed: PropTypes.bool.def(false),
  indent: PropTypes.number,
  mode: PropTypes.oneOf(['vertical', 'horizontal', 'inline'] as const).def('vertical'),
  multiple: PropTypes.bool.def(false),
  selectable: PropTypes.bool,
  selectedIds: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).def(() => []),
  openedIds: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).def(() => []),
  theme: PropTypes.oneOf(['light', 'dark'] as const),
}

export type MenuComponent = InstanceType<DefineComponent<MenuProps>>

export interface MenuItemProps {
  cid?: string | number
  disabled: boolean
  icon?: string
  title?: string
}

export const menuItemPropsDef = {
  cid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool.def(false),
  icon: PropTypes.string,
  title: PropTypes.string,
}

export type MenuItemComponent = InstanceType<DefineComponent<MenuItemProps>>

export interface MenuItemGroupProps {
  icon?: string
  title?: string
}

export const menuItemGroupPropsDef = {
  icon: PropTypes.string,
  title: PropTypes.string,
}

export type MenuItemGroupComponent = InstanceType<DefineComponent<MenuItemGroupProps>>

export interface SubMenuProps {
  cid?: string | number
  disabled: boolean
  icon?: string
  suffix?: string
  suffixRotates?: [number, number]
  title?: string
}

export const subMenuPropsDef = {
  cid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool.def(false),
  icon: PropTypes.string,
  overlayClass: PropTypes.string,
  suffix: PropTypes.string,
  suffixRotates: PropTypes.arrayOf(PropTypes.number) as unknown as VueTypeDef<[number, number]>,
  title: PropTypes.string,
}

export type SubMenuComponent = InstanceType<DefineComponent<SubMenuProps>>

export const arr: Array<string | number> = [1, '2']
