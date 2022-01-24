/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, normalizeClass, provide } from 'vue'

import { useControlledProp } from '@idux/cdk/utils'
import { IxLayout, IxLayoutContent, IxLayoutFooter } from '@idux/components/layout'
import { useGlobalConfig } from '@idux/pro/config'

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
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-layout`)

    const { activeKey, setActiveKey } = useActiveKey(props)
    const activePaths = computed(() => getTargetPaths(props.menus, activeKey.value))
    const headerMenus = useHeaderMenus(props)
    const activeHeaderKey = useActiveHeaderKey(props, activePaths, headerMenus)
    const siderMenus = useSiderMenus(props, activeHeaderKey)
    const [collapsed, setCollapsed] = useControlledProp(props, 'collapsed', false)

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

    const layoutClasses = computed(() => {
      const { type, fixed } = props
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-is-${type}`]: true,
        [`${prefixCls}-fixed`]: fixed,
      })
    })

    const showSider = computed(() => {
      const { type } = props
      return (type === 'both' && siderMenus.value.length > 0) || type === 'sider' || type === 'mixin'
    })

    return () => {
      const prefixCls = mergedPrefixCls.value
      return (
        <IxLayout class={layoutClasses.value}>
          {props.type !== 'sider' && <Header />}
          {showSider.value && <Sider />}
          <IxLayoutContent class={`${prefixCls}-content`}>{slots.default?.()}</IxLayoutContent>
          {slots.footer && <IxLayoutFooter class={`${prefixCls}-footer`}>{slots.footer()}</IxLayoutFooter>}
        </IxLayout>
      )
    }
  },
})
