/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProLayoutMenuData } from '../types'
import type { VKey } from '@idux/cdk/utils'
import type { MenuClickOptions, MenuProps } from '@idux/components/menu'
import type { ComputedRef } from 'vue'

import { computed, defineComponent, inject, normalizeClass, watch } from 'vue'

import { isObject } from 'lodash-es'

import { callEmit, useState } from '@idux/cdk/utils'
import { IxLayoutSider } from '@idux/components/layout'
import { IxMenu } from '@idux/components/menu'

import { proLayoutToken } from '../token'
import { getTargetPaths } from '../utils/menu'

export default defineComponent({
  setup() {
    const { props, slots, mergedPrefixCls, activeKey, setActiveKey, activePaths, siderMenus, collapsed, setCollapsed } =
      inject(proLayoutToken)!

    const { expandedKeys, setExpandedKeys } = useExpandedKeys(activePaths, siderMenus)

    const theme = computed(() => {
      const { theme } = props
      return isObject(theme) ? theme.sider : theme
    })

    const fixed = computed(() => {
      const { fixed } = props
      return isObject(fixed) ? fixed.sider : fixed
    })

    const classes = computed(() => {
      const prefixCls = `${mergedPrefixCls.value}-sider`
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-${theme.value}`]: true,
        [`${prefixCls}-collapsed`]: collapsed.value,
        [`${prefixCls}-fixed`]: fixed.value,
      })
    })

    const menuSelectedKeys = computed(() => [activeKey.value])
    const onMenuClick = (menuClickOption: MenuClickOptions) => {
      callEmit(props['onMenuClick'], menuClickOption)
    }

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-sider`

      const menuProps: MenuProps = {
        overlayClassName: `${prefixCls}-menu-overlay`,
        collapsed: collapsed.value,
        dataSource: siderMenus.value,
        expandedKeys: expandedKeys.value,
        'onUpdate:expandedKeys': setExpandedKeys,
        selectedKeys: menuSelectedKeys.value,
        'onUpdate:selectedKeys': keys => setActiveKey(keys[0]),
        mode: 'inline',
        theme: theme.value,
        onClick: onMenuClick,
      }
      const contentNode = slots.siderContent ? (
        slots.siderContent(menuProps)
      ) : (
        <IxMenu {...menuProps} {...props.siderMenu} />
      )

      return (
        <IxLayoutSider class={classes.value} onCollapse={setCollapsed} {...props.sider}>
          {slots.siderHeader && <div class={`${mergedPrefixCls.value}-sider-header`}>{slots.siderHeader()}</div>}
          <div class={`${prefixCls}-content`}>{contentNode}</div>
          {slots.siderFooter && <div class={`${mergedPrefixCls.value}-sider-footer`}>{slots.siderFooter()}</div>}
        </IxLayoutSider>
      )
    }
  },
})

function useExpandedKeys(activePaths: ComputedRef<ProLayoutMenuData[]>, siderMenus: ComputedRef<ProLayoutMenuData[]>) {
  const [expandedKeys, _setExpandedKeys] = useState(getExpandedKeys(activePaths.value))

  watch(activePaths, paths => _setExpandedKeys(getExpandedKeys(paths)))

  const setExpandedKeys = (keys: VKey[]) => {
    const oldKeys = expandedKeys.value
    // 表示折叠了某个菜单
    if (oldKeys.length > keys.length) {
      _setExpandedKeys(keys)
      return
    }

    let targetPaths: ProLayoutMenuData[]
    const lastKey = keys[keys.length - 1]
    const targetIndex = activePaths.value.findIndex(menu => menu.key === lastKey)
    // 表示打开的是当前激活菜单路径的某个菜单
    if (targetIndex > -1) {
      targetPaths = activePaths.value.slice(0, targetIndex + 1)
    } else {
      // 重新打开一个菜单路径。
      targetPaths = getTargetPaths(siderMenus.value, lastKey)
    }
    _setExpandedKeys(getExpandedKeys(targetPaths))
  }

  return { expandedKeys, setExpandedKeys }
}

function getExpandedKeys(menus: ProLayoutMenuData[]): VKey[] {
  return menus.filter(menu => menu.type === 'sub' && menu.children?.length > 0).map(menu => menu.key)
}
