/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { HeaderMenu, LayoutProAvailableMenu, LayoutProMenuData, LayoutProProps } from '../types'
import type { VKey } from '@idux/cdk/utils'
import type { ComputedRef, Ref } from 'vue'

import { computed } from 'vue'

import { getAvailableMenus, getMenuItemChildren } from '../util/menu'

export function useHeaderMenus(props: LayoutProProps): ComputedRef<HeaderMenu> {
  return computed(() => {
    if (props.mode === 'both') {
      return props.menus.map(menu => {
        if (menu.type === 'item' || menu.type === 'divider') {
          return menu
        }
        const { children, ...rest } = menu
        return rest
      })
    }
    if (props.mode === 'header') {
      return props.menus
    }
    return []
  })
}

export function useSiderMenus(props: LayoutProProps, activeHeaderKeys: Ref<VKey[]>): ComputedRef<LayoutProMenuData[]> {
  return computed(() => {
    if (['mixin', 'sider'].includes(props.mode)) {
      return props.menus
    }
    if (props.mode === 'header') {
      return []
    }
    if (activeHeaderKeys.value.length === 0) {
      return []
    }
    const curActiveMenu = props.menus.filter(menu => menu.key === activeHeaderKeys.value[0])
    return getMenuItemChildren(curActiveMenu?.[0])
  })
}

export function useAvailableMenus(props: LayoutProProps): ComputedRef<LayoutProAvailableMenu[]> {
  return computed(() => getAvailableMenus(props.menus))
}
