/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { MenuComponent } from './src/types'

import Menu from './src/Menu'
import _MenuDivider from './src/contents/MenuDivider'
import _MenuItem from './src/contents/MenuItem'
import _MenuItemGroup from './src/contents/MenuItemGroup'
import { componentFactory } from './src/contents/Utils'
import _MenuSub from './src/contents/menu-sub/MenuSub'
import { MenuDivider, MenuGroupItem, MenuItem, MenuSub } from './src/menus'

componentFactory.registerComponent('item', _MenuItem)
componentFactory.registerComponent('itemGroup', _MenuItemGroup)
componentFactory.registerComponent('sub', _MenuSub)
componentFactory.registerComponent('divider', _MenuDivider)

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
  MenuItemProps,
  MenuItemGroupComponent,
  MenuItemGroupProps,
  MenuSubComponent,
  MenuSubProps,
  MenuDividerComponent,
  MenuMode,
  MenuClickOptions,
  MenuCustomAdditional,
  MenuData,
  MenuTheme,
} from './src/types'

export { getThemeTokens as getMenuThemeTokens } from './theme'
export type { MenuThemeTokens } from './theme'
