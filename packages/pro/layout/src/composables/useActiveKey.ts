/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { LayoutProAvailableMenu, LayoutProHeaderMenu, LayoutProMenuPath, LayoutProProps } from '../types'
import type { VKey } from '@idux/cdk/utils'
import type { ComputedRef, Ref, WritableComputedRef } from 'vue'

import { computed, ref, watch } from 'vue'

import { isNil } from 'lodash-es'

import { callEmit } from '@idux/cdk/utils'

import { getDefaultActivePath, getTargetMenu } from '../util/menu'
import { useDefaultActivePath } from './useActivePath'

interface ActiveKeyType {
  activeHeaderKeys: Ref<VKey[]>
  changeActiveHeaderKey: (activeKey: VKey) => void
}

export function useActiveKey(
  props: LayoutProProps,
  realMenus: ComputedRef<LayoutProAvailableMenu[]>,
): WritableComputedRef<VKey[]> {
  const defaultActiveKey = useDefaultActiveKey(realMenus)
  return computed({
    get() {
      if (isNil(props.activeKey)) {
        const defaultActive = defaultActiveKey.value
        callEmit(props['onUpdate:activeKey'], defaultActive?.[0])
        return defaultActive
      }
      // 如果当前不是MenuItem叶子节点则继续往下查找
      const targetMenu = getTargetMenu(realMenus.value, props.activeKey)
      if (targetMenu?.type === 'itemGroup' || targetMenu?.type === 'sub') {
        const defaultActive = getDefaultActivePath(targetMenu.children).slice(-1)[0]?.key
        callEmit(props['onUpdate:activeKey'], defaultActive)
        return [getDefaultActivePath(targetMenu.children).slice(-1)[0]?.key]
      }
      return [props.activeKey]
    },
    set(activeKey: VKey[]) {
      callEmit(props['onUpdate:activeKey'], activeKey?.[0])
    },
  })
}

export function useActiveHeaderKey(
  props: LayoutProProps,
  headerMenus: ComputedRef<LayoutProHeaderMenu[]>,
  activePath: ComputedRef<LayoutProMenuPath[]>,
): ActiveKeyType {
  const activeHeaderKeys = ref<VKey[]>([])

  const changeActiveHeaderKey = (activeKey: VKey) => {
    activeHeaderKeys.value = [activeKey]
  }

  watch(
    [headerMenus, activePath, () => props.mode],
    ([headerMenus$$, activePath$$, mode$$]) => {
      if (mode$$ === 'both') {
        // both情况下，顶部导航栏只展示一层菜单节点
        if (activePath$$.length === 0) {
          activeHeaderKeys.value = headerMenus$$.length !== 0 ? [headerMenus$$[0].key] : []
        } else {
          activeHeaderKeys.value = [activePath$$[0].key]
        }
        return
      }
      if (mode$$ === 'header') {
        activeHeaderKeys.value = [activePath$$.slice(-1)?.[0]?.key]
      }
    },
    { immediate: true },
  )

  return {
    activeHeaderKeys,
    changeActiveHeaderKey,
  }
}

function useDefaultActiveKey(realMenus: ComputedRef<LayoutProAvailableMenu[]>) {
  const defaultActivePath = useDefaultActivePath(realMenus)
  return computed(() => {
    if (defaultActivePath.value.length === 0) {
      return []
    }
    return [defaultActivePath.value.slice(-1)[0].key]
  })
}
