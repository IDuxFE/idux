/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { HeaderMenu, LayoutProMenuData, LayoutProProps, SiderHeaderTheme } from './types'
import type { VKey } from '@idux/cdk/utils'
import type { MenuClickOptions } from '@idux/components/menu'
import type { ComputedRef, Ref, Slots, WritableComputedRef } from 'vue'

import { computed, defineComponent, normalizeClass, provide, readonly } from 'vue'

import { isString } from 'lodash-es'

import { callEmit, convertCssPixel, useControlledProp } from '@idux/cdk/utils'
import { IxLayout, IxLayoutContent, IxLayoutHeader, IxLayoutSider } from '@idux/components/layout'
import { IxMenu } from '@idux/components/menu'

import { useActiveHeaderKey, useActiveKey } from './composables/useActiveKey'
import { useActivePath } from './composables/useActivePath'
import { useSiderExpandedKeys } from './composables/useExpanded'
import { useAvailableMenus, useHeaderMenus, useSiderMenus } from './composables/useMenu'
import { LayoutProToken } from './token'
import { layoutProProps } from './types'
import { getDefaultActivePath } from './util/menu'
import { layoutCls as cpmCls } from './util/prefix'

interface SiderMenuHandle {
  selectedKeys: VKey[] | undefined
  'onUpdate:selectedKeys': (selectedKeys: VKey[]) => void
  expandedKeys: VKey[] | undefined
  'onUpdate:expandedKeys': (expandedKeys: VKey[]) => void
}

export default defineComponent({
  name: 'IxLayoutPro',
  props: layoutProProps,
  setup(props, { slots }) {
    const headerMenus = useHeaderMenus(props)
    const theme = useTheme(props)
    const headerMenuClasses = useHeaderMenuClasses(props)
    const siderMode = useSiderMenuMode(props)
    const realMenus = useAvailableMenus(props)
    const [collapsed, changeCollapsed] = useControlledProp(props, 'collapsed', false)
    const activeKey = useActiveKey(props, realMenus)
    const activePath = useActivePath(realMenus, activeKey)
    const { activeHeaderKeys } = useActiveHeaderKey(props, headerMenus, activePath)
    const siderMenus = useSiderMenus(props, activeHeaderKeys)
    const { headerShow, headerNavShow, siderShow } = useShow(props, siderMenus)
    const headerExpandedKeys = computed(() => (props.mode === 'header' ? undefined : activeHeaderKeys.value))
    const { siderExpandedKeys, onExpandedChange } = useSiderExpandedKeys(siderMode, siderMenus)

    const headerClasses = computed(() =>
      normalizeClass([
        `${cpmCls}-header`,
        `${cpmCls}-header-${theme.value.header}`,
        { [`${cpmCls}-header-fixed`]: props.fixed },
      ]),
    )
    const siderClasses = computed(() =>
      normalizeClass([
        `${cpmCls}-sider`,
        `${cpmCls}-sider-${theme.value.sider}`,
        { [`${cpmCls}-sider-collapsed`]: collapsed.value },
        { [`${cpmCls}-sider-fixed`]: props.fixed },
      ]),
    )
    const layoutClasses = computed(() =>
      normalizeClass([cpmCls, { [`${cpmCls}-with-header`]: headerShow.value }, { [`${cpmCls}-fixed`]: props.fixed }]),
    )

    const onClickHeaderMenu = (menuClickOption: MenuClickOptions) => {
      const isBothMode = props.mode === 'both'
      const curMenu = realMenus.value.find(menu => menu.key === menuClickOption.key)
      if (menuClickOption.type === 'item') {
        activeKey.value = [menuClickOption.key]
      } else if (isBothMode && !!curMenu?.children) {
        activeKey.value = [getDefaultActivePath(curMenu.children).slice(-1)[0]?.key]
      }
      callEmit(props['onMenuClick'], menuClickOption)
    }
    const onClickSiderMenu = (menuClickOption: MenuClickOptions) => {
      callEmit(props['onMenuClick'], menuClickOption)
    }

    provide(LayoutProToken, {
      collapsed: readonly(collapsed),
      changeCollapsed,
    })

    return () => {
      const siderMenuHandle = {
        selectedKeys: activeKey.value,
        'onUpdate:selectedKeys': (selectedKeys: VKey[]) => (activeKey.value = selectedKeys),
        expandedKeys: siderExpandedKeys.value,
        'onUpdate:expandedKeys': onExpandedChange,
      }

      const headerNode = renderHeaderNode(
        headerClasses,
        headerMenuClasses,
        slots,
        headerNavShow,
        theme,
        headerMenus,
        activeHeaderKeys,
        headerExpandedKeys,
        onClickHeaderMenu,
      )

      const siderNode = renderSiderNode(
        props,
        slots,
        siderClasses,
        collapsed,
        activeKey,
        theme,
        siderMode,
        siderMenus,
        changeCollapsed,
        siderMenuHandle,
        onClickSiderMenu,
      )

      return (
        <>
          <IxLayout class={layoutClasses.value}>
            {headerShow.value && headerNode}
            {siderShow.value && siderNode}
            <IxLayoutContent>{slots.default?.({ activePath: activePath.value })}</IxLayoutContent>
          </IxLayout>
        </>
      )
    }
  },
})

function useHeaderMenuClasses(props: LayoutProProps) {
  return computed(() => normalizeClass(`${cpmCls}-header-menu ${cpmCls}-header-menu-${props.mode}`))
}

function useTheme(props: LayoutProProps) {
  return computed<SiderHeaderTheme>(() => {
    const curTheme = props.theme
    if (isString(curTheme)) {
      return {
        sider: curTheme,
        header: curTheme,
      }
    }
    return curTheme
  })
}

function useShow(props: LayoutProProps, siderMenu: ComputedRef<LayoutProMenuData[]>) {
  const headerShow = computed(() => ['header', 'mixin', 'both'].includes(props.mode))
  const headerNavShow = computed(() => ['header', 'both'].includes(props.mode))
  const siderShow = computed(() => ['sider', 'mixin', 'both'].includes(props.mode) && siderMenu.value.length > 0)
  return {
    headerShow,
    headerNavShow,
    siderShow,
  }
}

export function useSiderMenuMode(props: LayoutProProps): ComputedRef<'vertical' | 'inline'> {
  return computed(() => (convertCssPixel(props.indent) === '0px' ? 'vertical' : 'inline'))
}

function renderHeaderNode(
  headerClasses: ComputedRef<string>,
  headerMenuClasses: ComputedRef<string>,
  slots: Slots,
  headerNavShow: ComputedRef<boolean>,
  theme: ComputedRef<SiderHeaderTheme>,
  headerMenus: ComputedRef<HeaderMenu>,
  activeHeaderKeys: Ref<VKey[]>,
  headerExpandedKeys: ComputedRef<VKey[] | undefined>,
  onClickHeaderMenu: (menuClickOption: MenuClickOptions) => void,
) {
  return (
    <IxLayoutHeader class={headerClasses.value}>
      {slots.logo && <section class={`${cpmCls}-header-logo`}>{slots.logo()}</section>}
      {headerNavShow.value && (
        <IxMenu
          class={headerMenuClasses.value}
          overlayClassName={`${cpmCls}-sub-overlay-${theme.value.header}`}
          selectedKeys={activeHeaderKeys.value}
          expandedKeys={headerExpandedKeys.value}
          onClick={onClickHeaderMenu}
          dataSource={headerMenus.value}
          mode="horizontal"
          theme={theme.value.header}
        ></IxMenu>
      )}
      {slots.extra && <section class={`${cpmCls}-header-extra`}>{slots.extra()}</section>}
    </IxLayoutHeader>
  )
}

function renderSiderNode(
  props: LayoutProProps,
  slots: Slots,
  siderClasses: ComputedRef<string>,
  collapsed: ComputedRef<boolean>,
  activeKey: WritableComputedRef<VKey[]>,
  theme: ComputedRef<SiderHeaderTheme>,
  siderMode: ComputedRef<'vertical' | 'inline'>,
  siderMenus: ComputedRef<LayoutProMenuData[]>,
  changeCollapsed: (value: boolean) => void,
  siderMenuHandle: SiderMenuHandle,
  onClickSiderMenu: (menuClickOption: MenuClickOptions) => void,
) {
  return (
    <IxLayoutSider
      class={siderClasses.value}
      breakpoint={props.breakpoint}
      collapsed={collapsed.value}
      onCollapse={changeCollapsed}
    >
      {slots.siderTop && <section class={`${cpmCls}-sider-top`}>{slots.siderTop()}</section>}
      <IxMenu
        class={`${cpmCls}-sider-menu`}
        overlayClassName={`${cpmCls}-sub-overlay-${theme.value.sider}`}
        indent={props.indent}
        dataSource={siderMenus.value}
        mode={siderMode.value}
        theme={theme.value.sider}
        collapsed={collapsed.value}
        onClick={onClickSiderMenu}
        {...siderMenuHandle}
      ></IxMenu>
      {slots.siderBottom && <section class={`${cpmCls}-sider-bottom`}>{slots.siderBottom()}</section>}
    </IxLayoutSider>
  )
}
