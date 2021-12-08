/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type {
  LayoutProAvailableMenu,
  LayoutProHeaderMenu,
  LayoutProMenuData,
  LayoutProMenuPath,
  LayoutProProps,
  LayoutProSiderMode,
  SiderHeaderTheme,
} from './types'
import type { VKey } from '@idux/cdk/utils'
import type { MenuClickOptions } from '@idux/components/menu'
import type { ComputedRef, Ref, WritableComputedRef } from 'vue'

import { computed, defineComponent, provide, readonly, ref, watch } from 'vue'

import { isNil, isString, pick, xor } from 'lodash-es'

import { callEmit, convertCssPixel, useControlledProp } from '@idux/cdk/utils'
import { IxLayout, IxLayoutContent, IxLayoutHeader, IxLayoutSider } from '@idux/components/layout'
import { IxMenu } from '@idux/components/menu'

import { LayoutProToken } from './token'
import { layoutProProps } from './types'

const prefixCls = 'ix'
const comCls = `${prefixCls}-layout-pro`
const menuPathKeys = ['label', 'key', 'type'] as const // 菜单路径的字段

export default defineComponent({
  name: 'IxLayoutPro',
  props: layoutProProps,
  setup(props, { slots }) {
    const headerMenus = useHeaderMenus(props)
    const theme = useTheme(props)
    const headerMenuCls = useHeaderMenuCls(props)
    const siderMode = useSiderMenuMode(props)
    const realMenus = useAvailableMenus(props)
    const [collapsed, changeCollapsed] = useControlledProp(props, 'collapsed', false)
    const defaultActivePath = useDefaultActivePath(realMenus)
    const defaultActiveKey = useDefaultActiveKey(defaultActivePath)
    const activeKey = useActiveKey(props, defaultActiveKey, realMenus)
    const activePath = useActivePath(realMenus, activeKey)
    const { activeHeaderKeys } = useActiveHeaderKey(props, headerMenus, activePath)
    const siderMenus = useSiderMenus(props, activeHeaderKeys)
    const { headerShow, headerNavShow, siderShow } = useShow(props, siderMenus)
    const headerExpandedKeys = computed(() => (props.mode === 'header' ? undefined : activeHeaderKeys.value))
    const { siderExpandedKeys, onExpandedChange } = useSiderExpandedKeys(siderMode, siderMenus)
    const headerCls = computed(() => [
      `${comCls}-header`,
      `${comCls}-header-${theme.value.header}`,
      { [`${comCls}-header-fixed`]: props.fixed },
    ])
    const siderCls = computed(() => [
      `${comCls}-sider`,
      `${comCls}-sider-${theme.value.sider}`,
      { [`${comCls}-sider-collapsed`]: collapsed.value },
      { [`${comCls}-sider-fixed`]: props.fixed },
    ])
    const layoutCls = computed(() => [
      comCls,
      { [`${comCls}-with-header`]: headerShow.value },
      { [`${comCls}-fixed`]: props.fixed },
    ])

    provide(LayoutProToken, {
      collapsed: readonly(collapsed),
      changeCollapsed,
    })

    return () => {
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
      const siderMenuHandle = {
        selectedKeys: activeKey.value,
        'onUpdate:selectedKeys': (selectedKeys: VKey[]) => (activeKey.value = selectedKeys),
        expandedKeys: siderExpandedKeys.value,
        'onUpdate:expandedKeys': onExpandedChange,
      }

      return (
        <>
          <IxLayout class={layoutCls.value}>
            {headerShow.value && (
              <IxLayoutHeader class={headerCls.value}>
                {slots.logo && <section class={`${comCls}-header-logo`}>{slots.logo()}</section>}
                {headerNavShow.value && (
                  <IxMenu
                    class={headerMenuCls.value}
                    overlayClassName={`${comCls}-sub-overlay-${theme.value.header}`}
                    selectedKeys={activeHeaderKeys.value}
                    expandedKeys={headerExpandedKeys.value}
                    onClick={onClickHeaderMenu}
                    dataSource={headerMenus.value}
                    mode="horizontal"
                    theme={theme.value.header}
                  ></IxMenu>
                )}
                {slots.extra && <section class={`${comCls}-header-extra`}>{slots.extra()}</section>}
              </IxLayoutHeader>
            )}
            {siderShow.value && (
              <IxLayoutSider
                class={siderCls.value}
                breakpoint={props.breakpoint}
                collapsed={collapsed.value}
                onCollapse={changeCollapsed}
              >
                {slots.siderTop && <section class={`${comCls}-sider-top`}>{slots.siderTop()}</section>}
                <IxMenu
                  class={`${comCls}-sider-menu`}
                  overlayClassName={`${comCls}-sub-overlay-${theme.value.sider}`}
                  indent={props.indent}
                  dataSource={siderMenus.value}
                  mode={siderMode.value}
                  theme={theme.value.sider}
                  collapsed={collapsed.value}
                  onClick={onClickSiderMenu}
                  {...siderMenuHandle}
                ></IxMenu>
                {slots.siderBottom && <section class={`${comCls}-sider-bottom`}>{slots.siderBottom()}</section>}
              </IxLayoutSider>
            )}
            <IxLayoutContent>{slots.default?.({ activePath: activePath.value })}</IxLayoutContent>
          </IxLayout>
        </>
      )
    }
  },
})

function useHeaderMenuCls(props: LayoutProProps) {
  return computed(() => `${comCls}-header-menu ${comCls}-header-menu-${props.mode}`)
}

function useHeaderMenus(props: LayoutProProps) {
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

function useSiderMenus(props: LayoutProProps, activeHeaderKeys: Ref<VKey[]>): ComputedRef<LayoutProMenuData[]> {
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

function useSiderExpandedKeys(mode: ComputedRef<LayoutProSiderMode>, siderMenus: ComputedRef<LayoutProMenuData[]>) {
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

function useSiderMenuMode(props: LayoutProProps) {
  return computed(() => (convertCssPixel(props.indent) === '0px' ? 'vertical' : 'inline'))
}

function useAvailableMenus(props: LayoutProProps) {
  return computed(() => getAvailableMenus(props.menus))
}

// 选中的菜单值
function useActiveKey(
  props: LayoutProProps,
  defaultActiveKey: ComputedRef<VKey[]>,
  realMenus: ComputedRef<LayoutProAvailableMenu[]>,
) {
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

function useActiveHeaderKey(
  props: LayoutProProps,
  headerMenus: ComputedRef<LayoutProHeaderMenu[]>,
  activePath: ComputedRef<LayoutProMenuPath[]>,
) {
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

function useDefaultActiveKey(defaultActivePath: ComputedRef<LayoutProMenuPath[]>) {
  return computed(() => {
    if (defaultActivePath.value.length === 0) {
      return []
    }
    return [defaultActivePath.value.slice(-1)[0].key]
  })
}

function useDefaultActivePath(menus: ComputedRef<LayoutProAvailableMenu[]>) {
  return computed(() => getDefaultActivePath(menus.value))
}

function useActivePath(menus: ComputedRef<LayoutProAvailableMenu[]>, activeKey: WritableComputedRef<VKey[]>) {
  return computed(() => getTargetActivePath(menus.value, activeKey.value?.[0]))
}

// 获取可用的菜单
function getAvailableMenus(menus: LayoutProMenuData[] | LayoutProAvailableMenu[]): LayoutProAvailableMenu[] {
  const resultMenus: LayoutProAvailableMenu[] = []
  menus.forEach(menu => {
    const curMenu = menu as (LayoutProMenuData | LayoutProAvailableMenu) & { disabled: boolean }
    if (curMenu.type !== 'divider' && !curMenu.disabled) {
      resultMenus.push({
        ...curMenu,
        children: getAvailableMenus(getMenuItemChildren(curMenu)),
      })
    }
  })
  return resultMenus
}

// 根据key找到对应的节点
function getTargetMenu(menus: LayoutProAvailableMenu[], target: VKey): LayoutProAvailableMenu | null {
  let result: LayoutProAvailableMenu | null = null
  for (let i = 0; i < menus.length; i++) {
    const curMenu = menus[i]
    if (curMenu.key === target) {
      result = curMenu
      break
    } else {
      const activeChildren = getTargetMenu(getMenuItemChildren(curMenu), target)
      if (activeChildren) {
        result = activeChildren
      }
    }
  }
  return result
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

function getDefaultActivePath(menus?: LayoutProAvailableMenu[]): LayoutProMenuPath[] {
  if (!menus || menus.length === 0) {
    return []
  }
  const curDefaultMenu = menus[0]
  const curDefaultMenuPath = [pick(curDefaultMenu, ['key', 'label', 'type'])]
  if (curDefaultMenu.type !== 'item') {
    return curDefaultMenuPath.concat(getDefaultActivePath(getMenuItemChildren(curDefaultMenu)))
  }
  return curDefaultMenuPath
}

function getMenuItemChildren<T extends LayoutProMenuData | LayoutProAvailableMenu>(menu: T) {
  if (!menu) {
    return []
  }
  if ('children' in menu) {
    return (menu.children ?? []) as T[]
  }
  return []
}

// 获取按照菜单层级整理keys
function getKeysDeepth(menus: LayoutProAvailableMenu[], keys: VKey[]) {
  const resultDeepth: Record<string, VKey[]> = {}
  const handleResultDeepth = (menus: LayoutProAvailableMenu[], deepth = 0) => {
    resultDeepth[deepth] = resultDeepth[deepth] ?? []
    menus.forEach(menu => {
      if (keys.includes(menu.key)) {
        resultDeepth[deepth].push(menu.key)
      }
      handleResultDeepth(menu.children, deepth + 1)
    })
  }
  handleResultDeepth(menus)
  return resultDeepth
}
