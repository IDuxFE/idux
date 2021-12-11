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

import { useControlledProp } from '@idux/cdk/utils'

import { getDefaultPaths } from '../utils/menu'

export function useActiveKey(props: ProLayoutProps): {
  activeKey: ComputedRef<VKey>
  setActiveKey: (value: VKey) => void
} {
  let defaultActiveKey = props.activeKey
  const [activeKey, setActiveKey] = useControlledProp(props, 'activeKey', defaultActiveKey)

  // 如果没有默认的 key, 则自动查早第一个 key
  if (!defaultActiveKey) {
    const defaultPaths = getDefaultPaths(props.menus)
    defaultActiveKey = defaultPaths[defaultPaths.length - 1]?.key
    if (defaultActiveKey) {
      setActiveKey(defaultActiveKey)
    }
  }

  return { activeKey, setActiveKey }
}

export function useActiveHeaderKey(
  props: ProLayoutProps,
  activePaths: ComputedRef<ProLayoutMenuData[]>,
  headerMenus: ComputedRef<ProLayoutMenuData[]>,
): ComputedRef<VKey | undefined> {
  return computed(() => {
    const { type } = props
    const currActivePaths = activePaths.value
    if (type === 'both') {
      if (currActivePaths.length === 0) {
        const [firstMenu] = headerMenus.value
        return firstMenu?.key
      }
      return currActivePaths[0].key
    }
    if (type === 'header') {
      const lastPath = currActivePaths[currActivePaths.length - 1]
      return lastPath?.key
    }
    return undefined
  })
}
