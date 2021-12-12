/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProLayoutMenuData, ProLayoutProps } from '../types'
import type { VKey } from '@idux/cdk/utils'
import type { ComputedRef } from 'vue'

import { computed } from 'vue'

import { NoopArray } from '@idux/cdk/utils'

import { getMenuChildren } from '../utils/menu'

export function useHeaderMenus(props: ProLayoutProps): ComputedRef<ProLayoutMenuData[]> {
  return computed(() => {
    const { type, menus } = props
    if (type === 'header') {
      return menus
    }

    if (type === 'both') {
      return menus.map(menu => {
        if (menu.type === 'item' || menu.type === 'divider') {
          return menu
        }
        const { children, ...rest } = menu
        return rest as ProLayoutMenuData
      })
    }

    return NoopArray as unknown as ProLayoutMenuData[]
  })
}

export function useSiderMenus(
  props: ProLayoutProps,
  activeHeaderKey: ComputedRef<VKey | undefined>,
): ComputedRef<ProLayoutMenuData[]> {
  return computed(() => {
    const { type, menus } = props
    if (['mixin', 'sider'].includes(type)) {
      return menus
    }
    if (type === 'both') {
      const currActiveMenu = menus.find(menu => menu.key === activeHeaderKey.value)
      return getMenuChildren(currActiveMenu)
    }
    return NoopArray as unknown as ProLayoutMenuData[]
  })
}
