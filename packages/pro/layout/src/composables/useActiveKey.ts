/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed } from 'vue'

import { isNil } from 'lodash-es'

import { type VKey, useControlledProp } from '@idux/cdk/utils'
import { type MenuData } from '@idux/components/menu'

import { type ProLayoutProps } from '../types'
import { getDefaultPaths } from '../utils/menu'

export function useActiveKey(props: ProLayoutProps): {
  activeKey: ComputedRef<VKey>
  setActiveKey: (value: VKey) => void
} {
  let defaultActiveKey = props.activeKey
  const [activeKey, setActiveKey] = useControlledProp(props, 'activeKey', defaultActiveKey)

  // 如果没有默认的 key, 则自动查找第一个 key
  if (isNil(defaultActiveKey)) {
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
  activePaths: ComputedRef<MenuData[]>,
  headerMenus: ComputedRef<MenuData[]>,
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
