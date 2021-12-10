/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { MenuComponent, MenuItemComponent, MenuItemGroupComponent, MenuSubComponent } from './src/types'

import Menu from './src/Menu'
import MenuDividerCpm from './src/MenuDivider'
import MenuItemCpm from './src/MenuItem'
import MenuItemGroupCpm from './src/MenuItemGroup'
import MenuSubCpm from './src/menu-sub/MenuSub'

const IxMenu = Menu as unknown as MenuComponent
const IxMenuDivider = MenuDividerCpm
const IxMenuItem = MenuItemCpm as unknown as MenuItemComponent
const IxMenuItemGroup = MenuItemGroupCpm as unknown as MenuItemGroupComponent
const IxMenuSub = MenuSubCpm as unknown as MenuSubComponent

export { IxMenu, IxMenuItem, IxMenuItemGroup, IxMenuDivider, IxMenuSub }

export type {
  MenuInstance,
  MenuComponent,
  MenuPublicProps as MenuProps,
  MenuItemInstance,
  MenuItemComponent,
  MenuItemPublicProps as MenuItemProps,
  MenuItemGroupInstance,
  MenuItemGroupComponent,
  MenuItemGroupPublicProps as MenuItemGroupProps,
  MenuSubInstance,
  MenuSubComponent,
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

export type MenuDividerComponent = typeof IxMenuDivider
