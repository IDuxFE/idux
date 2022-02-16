/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, type Ref, computed, defineComponent, normalizeClass, provide, ref } from 'vue'

import { isBoolean } from 'lodash-es'

import { useControlledProp } from '@idux/cdk/utils'
import { IxLayout, IxLayoutContent, IxLayoutFooter } from '@idux/components/layout'
import { useGlobalConfig } from '@idux/pro/config'

import { useActiveHeaderKey, useActiveKey } from './composables/useActiveKey'
import { useHeaderMenus, useSiderMenus } from './composables/useMenu'
import Header from './contents/Header'
import Sider from './contents/Sider'
import { proLayoutToken } from './token'
import { type HoverTriggerOption, type ProLayoutProps, proLayoutProps } from './types'
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
    const hoverTrigger = useHoverTrigger(props)

    const { handleCollapsedDelay } = useHandleCollapsedDelay(hoverTrigger, setCollapsed)

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
      hoverTrigger,
      handleCollapsedDelay, // 延迟折叠
      setCollapsed,
    })

    const layoutClasses = computed(() => {
      const { type, fixed, compress } = props
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-is-${type}`]: true,
        [`${prefixCls}-fixed`]: fixed,
        [`${prefixCls}-float`]: !compress,
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

function useHoverTrigger(props: ProLayoutProps) {
  return computed(() => {
    if (isBoolean(props.hoverTrigger)) {
      return {
        enable: props.hoverTrigger,
        delay: 0,
      }
    }
    return props.hoverTrigger
  })
}

function useHandleCollapsedDelay(
  hoverTrigger: ComputedRef<HoverTriggerOption>,
  setCollapsed: (collapsed: boolean) => void,
) {
  const timer: Ref<number | null> = ref(null)

  const handleCollapsedDelay = (collapsed: boolean) => {
    if (hoverTrigger.value.delay) {
      timer.value && clearTimeout(timer.value)
      if (!collapsed) {
        timer.value = setTimeout(() => {
          setCollapsed(collapsed)
          timer.value = null
        }, hoverTrigger.value.delay)
      } else {
        setCollapsed(collapsed)
      }
    } else {
      setCollapsed(collapsed)
    }
  }

  return {
    timer,
    handleCollapsedDelay,
  }
}
