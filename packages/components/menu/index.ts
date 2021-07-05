import type {
  MenuComponent,
  MenuItemComponent,
  MenuItemGroupComponent,
  MenuDividerComponent,
  SubMenuComponent,
} from './src/types'

import Menu from './src/menu/Menu.vue'
import MenuItem from './src/menu/MenuItem.vue'
import MenuItemGroup from './src/menu/MenuItemGroup.vue'
import MenuDivider from './src/menu/MenuDivider.vue'
import SubMenu from './src/sub-menu/SubMenu.vue'

const IxMenu = Menu as unknown as MenuComponent
const IxMenuItem = MenuItem as unknown as MenuItemComponent
const IxMenuItemGroup = MenuItemGroup as unknown as MenuItemGroupComponent
const IxMenuDivider = MenuDivider as MenuDividerComponent
const IxSubMenu = SubMenu as unknown as SubMenuComponent

export { IxMenu, IxMenuItem, IxMenuItemGroup, IxMenuDivider, IxSubMenu }

export type {
  MenuInstance,
  MenuPublicProps as MenuProps,
  MenuItemInstance,
  MenuItemPublicProps as MenuItemProps,
  MenuItemGroupInstance,
  MenuItemGroupPublicProps as MenuItemGroupProps,
  MenuDividerInstance,
  MenuDividerPublicProps as MenuDividerProps,
  SubMenuInstance,
  SubMenuPublicProps as SubMenuProps,
  MenuMode,
  MenuTheme,
} from './src/types'
