/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { MenuComponent, MenuItemComponent, MenuItemGroupComponent, MenuSubComponent } from './src/types'

import Menu from './src/Menu'
import MenuDividerCpm from './src/MenuDivider'
import MenuItem from './src/MenuItem'
import MenuItemGroup from './src/MenuItemGroup'
import MenuSub from './src/menu-sub/MenuSub'

const IxMenu = Menu as unknown as MenuComponent
const IxMenuDivider = MenuDividerCpm
const IxMenuItem = MenuItem as unknown as MenuItemComponent
const IxMenuItemGroup = MenuItemGroup as unknown as MenuItemGroupComponent
const IxMenuSub = MenuSub as unknown as MenuSubComponent

export { IxMenu, IxMenuItem, IxMenuItemGroup, IxMenuDivider, IxMenuSub }

export type {
  MenuInstance,
  MenuPublicProps as MenuProps,
  MenuItemInstance,
  MenuItemPublicProps as MenuItemProps,
  MenuItemGroupInstance,
  MenuItemGroupPublicProps as MenuItemGroupProps,
  MenuSubInstance,
  MenuSubPublicProps as MenuSubProps,
  MenuMode,
  MenuTheme,
  MenuClickOptions,
  MenuData,
  MenuItem,
  MenuItemGroup,
  MenuSub,
  MenuDivider,
} from './src/types'
