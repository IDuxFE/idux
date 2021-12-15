/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { MenuDividerComponent, MenuItemComponent, MenuItemGroupComponent, MenuSubComponent } from './types'

const itemKey = '__IDUX_MENU_ITEM'
const MenuItem = (() => {}) as MenuItemComponent
MenuItem.displayName = 'IxMenuItem'
;(MenuItem as any)[itemKey] = true

const itemGroupKey = '__IDUX_MENU_ITEM_GROUP'
const MenuGroupItem = (() => {}) as MenuItemGroupComponent
MenuGroupItem.displayName = 'IxMenuItemGroup'
;(MenuGroupItem as any)[itemGroupKey] = true

const subKey = '__IDUX_MENU_SUB'
const MenuSub = (() => {}) as MenuSubComponent
MenuSub.displayName = 'IxMenuSub'
;(MenuSub as any)[subKey] = true

const dividerKey = '__IDUX_MENU_DIVIDER'
const MenuDivider = (() => {}) as MenuDividerComponent
MenuDivider.displayName = 'IxMenuDivider'
;(MenuDivider as any)[dividerKey] = true

export { MenuItem, MenuGroupItem, MenuSub, MenuDivider, itemKey, itemGroupKey, subKey, dividerKey }
