/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { MenuComponent } from './src/types'

import Menu from './src/Menu'
import { MenuDivider, MenuGroupItem, MenuItem, MenuSub } from './src/menus'

const IxMenu = Menu as unknown as MenuComponent
const IxMenuDivider = MenuDivider
const IxMenuItem = MenuItem
const IxMenuItemGroup = MenuGroupItem
const IxMenuSub = MenuSub

export { IxMenu, IxMenuItem, IxMenuItemGroup, IxMenuDivider, IxMenuSub }

export type {
  MenuInstance,
  MenuComponent,
  MenuPublicProps as MenuProps,
  MenuItemComponent,
  MenuItemPublicProps as MenuItemProps,
  MenuItemGroupComponent,
  MenuItemGroupPublicProps as MenuItemGroupProps,
  MenuSubComponent,
  MenuSubPublicProps as MenuSubProps,
  MenuDividerComponent,
  MenuMode,
  MenuTheme,
  MenuClickOptions,
  MenuData,
} from './src/types'
