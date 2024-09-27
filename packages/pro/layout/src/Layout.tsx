/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, normalizeClass, provide } from 'vue'

import { useControlledProp } from '@idux/cdk/utils'
import { IxLayout, IxLayoutContent, IxLayoutFooter } from '@idux/components/layout'
import { getMenuThemeTokens } from '@idux/components/menu'
import { useGlobalConfig } from '@idux/pro/config'
import { useThemeToken } from '@idux/pro/theme'

import { getThemeTokens } from '../theme'
import { useActiveHeaderKey, useActiveKey } from './composables/useActiveKey'
import { useHeaderMenus, useSiderMenus } from './composables/useMenu'
import Header from './contents/Header'
import Sider from './contents/Sider'
import { proLayoutToken } from './token'
import { proLayoutProps } from './types'
import { getTargetPaths } from './utils/menu'

export default defineComponent({
  name: 'IxProLayout',
  props: proLayoutProps,
  setup(props, { slots }) {
    const { globalHashId, hashId: menuHashId, registerToken: registerMenuTokens } = useThemeToken('menu')
    const { hashId, registerToken } = useThemeToken('proLayout')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    registerMenuTokens(getMenuThemeTokens as any)
    registerToken(getThemeTokens)

    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-layout`)

    const { activeKey, setActiveKey } = useActiveKey(props)
    const activePaths = computed(() => getTargetPaths(props.menus, activeKey.value))
    const headerMenus = useHeaderMenus(props)
    const activeHeaderKey = useActiveHeaderKey(props, activePaths, headerMenus)
    const siderMenus = useSiderMenus(props, activeHeaderKey)
    const [collapsed, setCollapsed] = useControlledProp(props, 'collapsed', () => {
      const { collapsed = false } = props.sider || {}
      return collapsed
    })

    provide(proLayoutToken, {
      props,
      slots,
      mergedPrefixCls,
      activeKey,
      setActiveKey,
      activePaths,
      headerMenus,
      activeHeaderKey,
      siderMenus,
      collapsed,
      setCollapsed,
    })

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [globalHashId.value]: !!globalHashId.value,
        [menuHashId.value]: !!menuHashId.value,
        [hashId.value]: !!hashId.value,
        [prefixCls]: true,
        [`${prefixCls}-is-${props.type}`]: true,
      })
    })

    const showSider = computed(() => {
      const { type } = props
      return (type === 'both' && siderMenus.value.length > 0) || type === 'sider' || type === 'mixin'
    })

    return () => {
      const prefixCls = mergedPrefixCls.value
      return (
        <IxLayout class={classes.value} fixed={props.fixed} floatSider={!props.compress}>
          {props.type !== 'sider' && <Header v-slots={slots} />}
          {showSider.value && <Sider v-slots={slots} />}
          <IxLayoutContent class={`${prefixCls}-content`}>{slots.default?.()}</IxLayoutContent>
          {slots.footer && <IxLayoutFooter class={`${prefixCls}-footer`}>{slots.footer()}</IxLayoutFooter>}
        </IxLayout>
      )
    }
  },
})
