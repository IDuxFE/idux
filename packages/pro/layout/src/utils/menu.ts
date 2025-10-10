/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { NoopArray, type VKey } from '@idux/cdk/utils'
import { type MenuData, MenuSubProps } from '@idux/components/menu'

export function getMenuChildren(menu: MenuData | undefined): MenuData[] {
  if (menu && Array.isArray((menu as MenuSubProps).children)) {
    return (menu as MenuSubProps).children!
  }
  return NoopArray as unknown as MenuData[]
}

// 获取目标 key 的菜单路径
export function getTargetPaths(menus: MenuData[], target?: VKey): MenuData[] {
  if (!target) {
    return getDefaultPaths(menus)
  }

  let result: MenuData[] = []
  for (let i = 0; i < menus.length; i++) {
    const curMenu = menus[i]
    if (curMenu.key === target) {
      result = [curMenu]
      break
    } else {
      const activeChildren = getTargetPaths(getMenuChildren(curMenu), target)
      if (activeChildren.length > 0) {
        result = [curMenu, ...activeChildren]
        break
      }
    }
  }
  return result
}

// 获取默认（第一个）的菜单路径
export function getDefaultPaths(menus: MenuData[] | undefined): MenuData[] {
  if (!menus || menus.length === 0) {
    return NoopArray as unknown as MenuData[]
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const currMenu = menus.find(menu => menu.type !== 'divider' && !(menu as any).disabled)
  if (!currMenu) {
    return NoopArray as unknown as MenuData[]
  }
  const paths = [currMenu]
  const children = getMenuChildren(currMenu)
  if (children.length > 0) {
    paths.push(...getDefaultPaths(children))
  }
  return paths
}
