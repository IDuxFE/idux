import type {
  MenuComponent,
  MenuDividerComponent,
  MenuItemComponent,
  MenuItemGroupComponent,
  MenuSubComponent,
} from './src/types'

import Menu from './src/Menu'
import MenuDivider from './src/MenuDivider'
import MenuItem from './src/MenuItem'
import MenuItemGroup from './src/MenuItemGroup'
import MenuSub from './src/menu-sub/MenuSub'

const IxMenu = Menu as unknown as MenuComponent
const IxMenuDivider = MenuDivider as unknown as MenuDividerComponent
const IxMenuItem = MenuItem as unknown as MenuItemComponent
const IxMenuItemGroup = MenuItemGroup as unknown as MenuItemGroupComponent
const IxMenuSub = MenuSub as unknown as MenuSubComponent

export { IxMenu, IxMenuItem, IxMenuItemGroup, IxMenuDivider, IxMenuSub }

export type {
  MenuInstance,
  MenuPublicProps as MenuProps,
  MenuDividerInstance,
  MenuDividerPublicProps as MenuDividerProps,
  MenuItemInstance,
  MenuItemPublicProps as MenuItemProps,
  MenuItemGroupInstance,
  MenuItemGroupPublicProps as MenuItemGroupProps,
  MenuSubInstance,
  MenuSubPublicProps as MenuSubProps,
  MenuMode,
  MenuTheme,
} from './src/types'
