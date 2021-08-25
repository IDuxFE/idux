import type {
  MenuComponent,
  MenuItemComponent,
  MenuItemGroupComponent,
  MenuDividerComponent,
  MenuSubComponent,
} from './src/types'

import Menu from './src/menu/Menu.vue'
import MenuItem from './src/menu/MenuItem.vue'
import MenuItemGroup from './src/menu/MenuItemGroup.vue'
import MenuDivider from './src/menu/MenuDivider.vue'
import MenuSub from './src/menu-sub/MenuSub.vue'

const IxMenu = Menu as unknown as MenuComponent
const IxMenuItem = MenuItem as unknown as MenuItemComponent
const IxMenuItemGroup = MenuItemGroup as unknown as MenuItemGroupComponent
const IxMenuDivider = MenuDivider as MenuDividerComponent
const IxMenuSub = MenuSub as unknown as MenuSubComponent

export { IxMenu, IxMenuItem, IxMenuItemGroup, IxMenuDivider, IxMenuSub }

export type {
  MenuInstance,
  MenuPublicProps as MenuProps,
  MenuItemInstance,
  MenuItemPublicProps as MenuItemProps,
  MenuItemGroupInstance,
  MenuItemGroupPublicProps as MenuItemGroupProps,
  MenuDividerInstance,
  MenuDividerPublicProps as MenuDividerProps,
  MenuSubInstance,
  MenuSubPublicProps as MenuSubProps,
  MenuMode,
  MenuTheme,
} from './src/types'
