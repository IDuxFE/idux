/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed } from 'vue'

import { NoopArray, type VKey } from '@idux/cdk/utils'
import { type MenuData } from '@idux/components/menu'

import { type ProLayoutProps } from '../types'
import { getMenuChildren } from '../utils/menu'

export function useHeaderMenus(props: ProLayoutProps): ComputedRef<MenuData[]> {
  return computed(() => {
    const { type, menus } = props
    if (type === 'header') {
      return menus
    }

    if (type === 'both') {
      return menus.map(menu => {
        if (!menu.type || menu.type === 'item' || menu.type === 'divider') {
          return menu
        }
        const { children, ...rest } = menu
        rest.type = 'item'
        return rest as MenuData
      })
    }

    return NoopArray as MenuData[]
  })
}

export function useSiderMenus(
  props: ProLayoutProps,
  activeHeaderKey: ComputedRef<VKey | undefined>,
): ComputedRef<MenuData[]> {
  return computed(() => {
    const { type, menus } = props
    if (['mixin', 'sider'].includes(type)) {
      return menus
    }
    if (type === 'both') {
      const currActiveMenu = menus.find(menu => menu.key === activeHeaderKey.value)
      return getMenuChildren(currActiveMenu)
    }
    return NoopArray as MenuData[]
  })
}
