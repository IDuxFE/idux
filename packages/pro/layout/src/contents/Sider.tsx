/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed, defineComponent, inject, mergeProps, normalizeClass, watch } from 'vue'

import { isObject } from 'lodash-es'

import { type VKey, callEmit, useState } from '@idux/cdk/utils'
import { IxLayoutSider, type LayoutSiderProps } from '@idux/components/layout'
import { IxMenu, type MenuClickOptions, type MenuData, type MenuProps } from '@idux/components/menu'
import { useThemeToken } from '@idux/pro/theme'

import Logo from './Logo'
import { proLayoutToken } from '../token'
import { getTargetPaths } from '../utils/menu'

export default defineComponent({
  name: 'IxProLayoutSider',
  setup(_, { slots }) {
    const { props, mergedPrefixCls, activeKey, setActiveKey, activePaths, siderMenus, collapsed, setCollapsed } =
      inject(proLayoutToken)!
    const { hashId } = useThemeToken('proLayout')

    const { expandedKeys, setExpandedKeys } = useExpandedKeys(activePaths, siderMenus)

    const theme = computed(() => {
      const { theme } = props
      return isObject(theme) ? theme.sider : theme
    })

    const classes = computed(() => {
      const prefixCls = `${mergedPrefixCls.value}-sider`
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-${theme.value}`]: true,
      })
    })

    const menuSelectedKeys = computed(() => [activeKey.value])
    const onMenuClick = (menuClickOption: MenuClickOptions) => {
      callEmit(props['onMenuClick'], menuClickOption)
    }

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-sider`
      const { siderHover } = props
      const innerSiderProps: LayoutSiderProps = {
        collapsed: collapsed.value,
        'onUpdate:collapsed': setCollapsed,
        pointer: !!siderHover,
        pointerDelay: isObject(siderHover) ? siderHover.delay : undefined,
      }
      const siderProps = mergeProps(innerSiderProps, props.sider!) as LayoutSiderProps

      const innerMenuProps: MenuProps = {
        overlayClassName: `${prefixCls}-menu-overlay ${hashId.value}`,
        collapsed: siderProps.collapsed,
        dataSource: siderMenus.value,
        expandedKeys: expandedKeys.value,
        'onUpdate:expandedKeys': setExpandedKeys,
        selectedKeys: menuSelectedKeys.value,
        'onUpdate:selectedKeys': keys => setActiveKey(keys[0]),
        mode: !siderProps.collapsed || siderProps.pointer ? 'inline' : 'vertical',
        theme: theme.value,
        onClick: onMenuClick,
      }
      const menuProps = mergeProps(innerMenuProps, props.siderMenu!)

      const contentNode = slots.siderContent ? slots.siderContent(menuProps) : <IxMenu v-slots={slots} {...menuProps} />

      return (
        <IxLayoutSider class={classes.value} {...siderProps}>
          {props.type === 'sider' && <Logo v-slots={slots} />}
          {slots.siderHeader && <div class={`${prefixCls}-header`}>{slots.siderHeader()}</div>}
          <div class={`${prefixCls}-content`}>{contentNode}</div>
          {slots.siderFooter && <div class={`${prefixCls}-footer`}>{slots.siderFooter()}</div>}
        </IxLayoutSider>
      )
    }
  },
})

function useExpandedKeys(activePaths: ComputedRef<MenuData[]>, siderMenus: ComputedRef<MenuData[]>) {
  const [expandedKeys, _setExpandedKeys] = useState(getExpandedKeys(activePaths.value))

  watch(activePaths, paths => _setExpandedKeys(getExpandedKeys(paths)))

  const setExpandedKeys = (keys: VKey[]) => {
    const oldKeys = expandedKeys.value
    // 表示折叠了某个菜单
    if (oldKeys.length > keys.length) {
      _setExpandedKeys(keys)
      return
    }

    let targetPaths: MenuData[]
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

function getExpandedKeys(menus: MenuData[]): VKey[] {
  return menus.filter(menu => menu.type === 'sub' && !!menu.children?.length).map(menu => menu.key!)
}
