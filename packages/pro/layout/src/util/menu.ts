/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { LayoutProAvailableMenu, LayoutProMenuData, LayoutProMenuPath } from '../types'
import type { VKey } from '@idux/cdk/utils'

import { pick } from 'lodash-es'

// 根据key找到对应的节点
export function getTargetMenu(menus: LayoutProAvailableMenu[], target: VKey): LayoutProAvailableMenu | null {
  let result: LayoutProAvailableMenu | null = null
  for (let i = 0; i < menus.length; i++) {
    const curMenu = menus[i]
    if (curMenu.key === target) {
      result = curMenu
      break
    } else {
      const activeChildren = getTargetMenu(getMenuItemChildren(curMenu), target)
      if (activeChildren) {
        result = activeChildren
      }
    }
  }
  return result
}

export function getAvailableMenus(menus: LayoutProMenuData[] | LayoutProAvailableMenu[]): LayoutProAvailableMenu[] {
  const resultMenus: LayoutProAvailableMenu[] = []
  menus.forEach(menu => {
    const curMenu = menu as (LayoutProMenuData | LayoutProAvailableMenu) & { disabled: boolean }
    if (curMenu.type !== 'divider' && !curMenu.disabled) {
      resultMenus.push({
        ...curMenu,
        children: getAvailableMenus(getMenuItemChildren(curMenu)),
      })
    }
  })
  return resultMenus
}

export function getMenuItemChildren<T extends LayoutProMenuData | LayoutProAvailableMenu>(menu: T): T[] {
  if (!menu) {
    return []
  }
  if ('children' in menu) {
    return (menu.children ?? []) as T[]
  }
  return []
}

// 获取当前菜单下默认激活的路径
export function getDefaultActivePath(menus?: LayoutProAvailableMenu[]): LayoutProMenuPath[] {
  if (!menus || menus.length === 0) {
    return []
  }
  const curDefaultMenu = menus[0]
  const curDefaultMenuPath = [pick(curDefaultMenu, ['key', 'label', 'type'])]
  if (curDefaultMenu.type !== 'item') {
    return curDefaultMenuPath.concat(getDefaultActivePath(getMenuItemChildren(curDefaultMenu)))
  }
  return curDefaultMenuPath
}
