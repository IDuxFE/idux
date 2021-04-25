import type { App } from 'vue'

import IxMenu from './src/menu/Menu.vue'
import IxMenuItem from './src/menu/MenuItem.vue'
import IxMenuItemGroup from './src/menu/MenuItemGroup.vue'
import IxMenuDivider from './src/menu/MenuDivider.vue'
import IxSubMenu from './src/sub-menu/SubMenu.vue'

IxMenu.install = (app: App): void => {
  app.component(IxMenu.name, IxMenu)
}

IxMenuItem.install = (app: App): void => {
  app.component(IxMenuItem.name, IxMenuItem)
}

IxMenuItemGroup.install = (app: App): void => {
  app.component(IxMenuItemGroup.name, IxMenuItemGroup)
}

IxMenuDivider.install = (app: App): void => {
  app.component(IxMenuDivider.name, IxMenuDivider)
}

IxSubMenu.install = (app: App): void => {
  app.component(IxSubMenu.name, IxSubMenu)
}

export { IxMenu, IxMenuItem, IxMenuItemGroup, IxMenuDivider, IxSubMenu }

export type {
  MenuComponent,
  MenuProps,
  MenuItemComponent,
  MenuItemProps,
  MenuItemGroupComponent,
  MenuItemGroupProps,
  SubMenuComponent,
  SubMenuProps,
} from './src/types'
