/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { LayoutProAvailableMenu, LayoutProMenuPath } from '../types'
import type { VKey } from '@idux/cdk/utils'
import type { ComputedRef, WritableComputedRef } from 'vue'

import { computed } from 'vue'

import { pick } from 'lodash-es'

import { getDefaultActivePath, getMenuItemChildren } from '../util/menu'

const menuPathKeys = ['label', 'key', 'type'] as const // 菜单路径的字段

export function useDefaultActivePath(menus: ComputedRef<LayoutProAvailableMenu[]>): ComputedRef<LayoutProMenuPath[]> {
  return computed(() => getDefaultActivePath(menus.value))
}

export function useActivePath(
  menus: ComputedRef<LayoutProAvailableMenu[]>,
  activeKey: WritableComputedRef<VKey[]>,
): ComputedRef<LayoutProMenuPath[]> {
  return computed(() => getTargetActivePath(menus.value, activeKey.value?.[0]))
}

// 获取激活的菜单路径
function getTargetActivePath(menus: LayoutProAvailableMenu[], target?: VKey): LayoutProMenuPath[] {
  if (!target) {
    return getDefaultActivePath(menus)
  }
  let result: LayoutProMenuPath[] = []
  for (let i = 0; i < menus.length; i++) {
    const curMenu = menus[i]
    if (curMenu.key === target) {
      result = [pick(curMenu, menuPathKeys)]
      break
    } else {
      const activeChildren = getTargetActivePath(getMenuItemChildren(curMenu), target)
      if (activeChildren.length !== 0) {
        result = [pick(curMenu, menuPathKeys)].concat(activeChildren)
      }
    }
  }
  return result
}
