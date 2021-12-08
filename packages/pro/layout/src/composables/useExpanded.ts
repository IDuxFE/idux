/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { LayoutProAvailableMenu, LayoutProMenuData, LayoutProSiderMode } from '../types'
import type { VKey } from '@idux/cdk/utils'
import type { ComputedRef, Ref } from 'vue'

import { ref, watch } from 'vue'

import { pick, xor } from 'lodash-es'

import { getAvailableMenus } from '../util/menu'

interface SiderExpandedType {
  siderExpandedKeys: Ref<VKey[] | undefined>
  onExpandedChange: (keys: VKey[]) => void
}

export function useSiderExpandedKeys(
  mode: ComputedRef<LayoutProSiderMode>,
  siderMenus: ComputedRef<LayoutProMenuData[]>,
): SiderExpandedType {
  const siderExpandedKeys = ref<VKey[] | undefined>() // 数组的下标表示第几层，同一层只能展开一个

  watch(
    mode,
    mode$$ => {
      if (mode$$ === 'inline') {
        // 只处理inline情况，同时展开收起只有一个
        siderExpandedKeys.value = []
      } else {
        siderExpandedKeys.value = undefined
      }
    },
    { immediate: true },
  )

  const onExpandedChange = (keys: VKey[]) => {
    const curAvailableSiderMenu = getAvailableMenus(siderMenus.value)
    if (mode.value !== 'inline') {
      return
    }
    if (keys.length === 0) {
      siderExpandedKeys.value = []
      return
    }

    // 同一层仅能展开一个
    const keysDeepth = getKeysDeepth(curAvailableSiderMenu, keys)
    const sortDeepth = Object.keys(keysDeepth).sort((a, b) => Number(a) - Number(b))
    const notAvailableFloor = Number(sortDeepth.find(deepth => !keysDeepth[deepth] || keysDeepth[deepth].length === 0))
    const availableKeysDeepth = pick(
      keysDeepth,
      sortDeepth.filter(item => Number(item) < notAvailableFloor),
    )
    siderExpandedKeys.value = Object.keys(availableKeysDeepth).reduce((acc, item) => {
      const curDeepth = Number(item)
      const preCurDeepthSiderExpandedKey = siderExpandedKeys.value?.[curDeepth]
      const curExpanded = preCurDeepthSiderExpandedKey ? [preCurDeepthSiderExpandedKey] : []
      if (curExpanded.length !== availableKeysDeepth[curDeepth].length) {
        acc[curDeepth] = xor(curExpanded, availableKeysDeepth[curDeepth])?.[0]
      } else {
        acc[curDeepth] = preCurDeepthSiderExpandedKey!
      }
      return acc
    }, [] as VKey[])
  }

  return {
    siderExpandedKeys,
    onExpandedChange,
  }
}

// 获取按照菜单层级整理keys
export function getKeysDeepth(menus: LayoutProAvailableMenu[], keys: VKey[]): Record<string, VKey[]> {
  const resultDeepth: Record<string, VKey[]> = {}
  const handleResultDeepth = (menus: LayoutProAvailableMenu[], deepth = 0) => {
    resultDeepth[deepth] = resultDeepth[deepth] ?? []
    menus.forEach(menu => {
      const isItemGroup = menu.type === 'itemGroup'
      if (keys.includes(menu.key)) {
        resultDeepth[deepth].push(menu.key)
      }
      handleResultDeepth(menu.children, isItemGroup ? deepth : deepth + 1) // itemGroup不算展开的层级，下边的子节点相当于和itemGroup同级
    })
  }
  handleResultDeepth(menus)
  return resultDeepth
}
